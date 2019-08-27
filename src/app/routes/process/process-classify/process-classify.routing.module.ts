import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClassifyComponent } from './classify/classify.component';

const routes: Routes = [
  {
    path: '',
    component: ClassifyComponent
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProcessClassifyRoutingModule {}
