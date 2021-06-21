import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { VisitepagePage } from './visitepage.page';

const routes: Routes = [
  {
    path: '',
    component: VisitepagePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class VisitepagePageRoutingModule {}
