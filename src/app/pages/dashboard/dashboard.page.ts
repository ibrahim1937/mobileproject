import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { StorageServiceService } from "../../providers/storage-service.service";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {

  monuments;
  selected:any;

  constructor(private http: HttpClient, private router: Router, private storage: StorageServiceService) { 
    this.http.get('http://localhost:3000/mobile/monuments').subscribe(data => {
      this.monuments = data;
    })
  }

  ngOnInit() {

    
  }

  rowClicked(monument){
    this.router.navigate(['monument/'+ monument.id]);
  }

  redirect(option : string){
    if(option == 'monument'){
      this.router.navigateByUrl('dashboard');
    }else if(option == "visite"){
      this.router.navigateByUrl('visite');
    }
  }

  onChange(event){
    const value = event.target.value;
    if(value){
      this.http.get(`http://localhost:3000/mobile/monuments/${value}`).subscribe(data => {
      this.monuments = data;
    })
    } else {
      this.http.get('http://localhost:3000/mobile/monuments').subscribe(data => {
      this.monuments = data;
    })
    }
    
  }

  logout(event){
    StorageServiceService.user_id = null;
    this.router.navigateByUrl('login');
  }


}
