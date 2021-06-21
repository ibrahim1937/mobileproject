import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TestfilePageRoutingModule } from './testfile-routing.module';

import { TestfilePage } from './testfile.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TestfilePageRoutingModule
  ],
  declarations: [TestfilePage]
})
export class TestfilePageModule {}
