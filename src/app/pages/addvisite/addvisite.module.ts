import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AddvisitePageRoutingModule } from './addvisite-routing.module';

import { AddvisitePage } from './addvisite.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AddvisitePageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [AddvisitePage]
})
export class AddvisitePageModule {}
