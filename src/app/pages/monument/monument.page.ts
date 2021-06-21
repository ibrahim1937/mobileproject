import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as Leaflet from 'leaflet';

import { StorageServiceService } from "../../providers/storage-service.service";

@Component({
  selector: 'app-monument',
  templateUrl: './monument.page.html',
  styleUrls: ['./monument.page.scss'],
})
export class MonumentPage implements OnInit {
  monument:any;
  data:any;
  map: Leaflet.Map;
  constructor(private route: ActivatedRoute, private router: Router, private http: HttpClient,
    private storage: StorageServiceService) { 

    this.data = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:3000/mobile/monument/'+ parseInt(this.data)).subscribe(data => {
        this.monument = data;
        this.leaftmap(this.monument);
    })

    
    
  }

  ngOnInit() {
  }

  

  async leaftmap(data : any){
    this.map =  Leaflet.map('mapid').setView([34.0132500, -6.8325500], 10);

    Leaflet.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(this.map);

    Leaflet.marker([data[0].latitude, data[0].longitude], {draggable: true,        // Make the icon dragable
            title: 'Hover Text',     // Add a title
            opacity: 0.5}
            ).addTo(this.map).bindPopup("<b>Monument</b><br>" + data[0].nom)
            .openPopup();
    this.map.panTo(new Leaflet.LatLng(data[0].latitude, data[0].longitude));




  }
  

  goDashboard(){
    console.log('click');
    this.router.navigateByUrl('dashboard');
  }


  

}
