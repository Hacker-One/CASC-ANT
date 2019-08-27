import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ClassifyComponent } from './classify/classify.component';
import { ComponentModule } from '../../../component';
import { ProcessClassifyRoutingModule } from './process-classify.routing.module';

@NgModule({
  declarations: [
    ClassifyComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ProcessClassifyRoutingModule
  ]
})
export class ProcessClassifyModule {}
