import { Component, OnInit } from '@angular/core';

import { HttpClient } from '@angular/common/http';
import { Router, ActivatedRoute } from '@angular/router';


import { StorageServiceService } from "../../providers/storage-service.service";


@Component({
  selector: 'app-visite',
  templateUrl: './visite.page.html',
  styleUrls: ['./visite.page.scss'],
})
export class VisitePage implements OnInit {
  visites:any;
  constructor(private http: HttpClient, private router: Router, route: ActivatedRoute) { 
    var id = StorageServiceService.user_id ? StorageServiceService.user_id : 3;
    this.http.get(`http://localhost:3000/mobile/visites/${id}`).subscribe(data => {
      this.visites = data;
    })
  }

  ngOnInit() {
  }

  rowClicked(visite){
    this.router.navigate(['visitepage/'+ visite.id]);
    console.log('clicked');
  }
  add(event){
    this.router.navigateByUrl('addvisite');
  }

  redirect(option : string){
    if(option == 'monument'){
      this.router.navigateByUrl('dashboard');
    }else if(option == "visite"){
      this.router.navigateByUrl('visite');
    }
  }

  logout(event){
    StorageServiceService.user_id = null;
    this.router.navigateByUrl('login')
  }

}
