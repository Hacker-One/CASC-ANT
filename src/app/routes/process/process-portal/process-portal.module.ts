import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../../component';
import { ProcessPortalRoutingModule } from './process-portal-routing.module';
import { ProcessPortalComponent } from './process-portal/process-portal.component';
import { NzCardModule } from 'ng-zorro-antd';

@NgModule({
  declarations: [ProcessPortalComponent],
  imports: [
    CommonModule,
    ComponentModule,
    NzCardModule,
    ProcessPortalRoutingModule
  ]
})
export class ProcessPortalModule { }
