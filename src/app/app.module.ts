import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { IonicStorageModule } from '@ionic/storage-angular';

import { Geolocation } from '@ionic-native/geolocation/ngx';


import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { HttpClientModule , HttpClient} from '@angular/common/http';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { HTTP } from '@ionic-native/http/ngx';

import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { Camera } from '@ionic-native/camera/ngx';
import { File } from '@ionic-native/file/ngx';
import { WebView } from '@ionic-native/ionic-webview/ngx';
import { FilePath } from '@ionic-native/file-path/ngx';

import { FileTransfer } from '@ionic-native/file-transfer/ngx';

import { IonIntlTelInputModule } from 'ion-intl-tel-input';



@NgModule({
  declarations: [AppComponent],
  entryComponents: [],
  imports: [BrowserModule,
     IonicModule.forRoot(),
      AppRoutingModule,
      HttpClientModule,
      IonicStorageModule.forRoot(),
      FormsModule,
      ReactiveFormsModule

    ],
  providers: [StatusBar, HTTP, HttpClient, Geolocation, IonIntlTelInputModule,   { provide: RouteReuseStrategy, useClass: IonicRouteStrategy} , Camera , File, WebView, FilePath, FileTransfer ],
  bootstrap: [AppComponent],
})
export class AppModule {}
