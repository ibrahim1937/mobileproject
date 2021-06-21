import { Component } from '@angular/core';
import { Platform , NavController} from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Router } from '@angular/router';

import { Storage } from '@ionic/storage';
@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  constructor(
    private platform: Platform,
    private statusBar: StatusBar,
    private storage: Storage,
    private navCtrl : NavController,
    public router: Router
  ) {
    this.initializeApp();
  }
  initializeApp(){
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.router.navigateByUrl('splash');
    });

  //   this.storage.get('storage_session').then((res) => {
  //     if(res==null){
  //       this.navCtrl.navigateRoot('/login');
  //     }else {
  //       this.navCtrl.navigateRoot('/home');
  //     }
  //   })
  }
}
