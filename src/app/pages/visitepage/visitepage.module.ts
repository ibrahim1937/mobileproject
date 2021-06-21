import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { VisitepagePageRoutingModule } from './visitepage-routing.module';

import { VisitepagePage } from './visitepage.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    VisitepagePageRoutingModule
  ],
  declarations: [VisitepagePage]
})
export class VisitepagePageModule {}
