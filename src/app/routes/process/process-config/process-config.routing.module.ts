import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ConfigComponent } from './config/config.component';
import { ConfigBuildComponent } from './config-build/config-build.component';

const routes: Routes = [
  {
    path: '',
    component: ConfigComponent
  }, {
    path: 'build',
    component: ConfigBuildComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class ProcessConfigRoutingModule {}
