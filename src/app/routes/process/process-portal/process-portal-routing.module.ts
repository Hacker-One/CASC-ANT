import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProcessPortalComponent } from './process-portal/process-portal.component';

const routes: Routes = [
  { path: '', component: ProcessPortalComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcessPortalRoutingModule { }
