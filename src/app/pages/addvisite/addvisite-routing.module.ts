import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AddvisitePage } from './addvisite.page';

const routes: Routes = [
  {
    path: '',
    component: AddvisitePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AddvisitePageRoutingModule {}
