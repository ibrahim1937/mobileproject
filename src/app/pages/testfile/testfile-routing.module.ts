import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TestfilePage } from './testfile.page';

const routes: Routes = [
  {
    path: '',
    component: TestfilePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TestfilePageRoutingModule {}
