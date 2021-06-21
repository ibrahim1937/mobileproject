import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

import * as Leaflet from 'leaflet';

@Component({
  selector: 'app-visitepage',
  templateUrl: './visitepage.page.html',
  styleUrls: ['./visitepage.page.scss'],
})
export class VisitepagePage implements OnInit {
  visites:any;
  id:any;
  map: Leaflet.Map;
  constructor(private router :Router, private http: HttpClient, private route: ActivatedRoute) { 
    this.id = this.route.snapshot.paramMap.get('id');
    this.http.get('http://localhost:3000/mobile/visitesid/' + parseInt(this.id)).subscribe(data => {
      this.visites = data;
      this.leaftmap(this.visites);
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
            ).addTo(this.map).bindPopup("<b>Tentation visite: </b><br>" + data[0].nomm)
            .openPopup();
    this.map.panTo(new Leaflet.LatLng(data[0].latitude, data[0].longitude));




  }

}
