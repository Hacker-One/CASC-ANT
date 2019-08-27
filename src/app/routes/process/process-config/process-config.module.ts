import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ComponentModule } from '../../../component';
import { ConfigComponent } from './config/config.component';
import { ProcessConfigRoutingModule } from './process-config.routing.module';
import { ConfigBuildComponent } from './config-build/config-build.component';

@NgModule({
  declarations: [
    ConfigComponent,
    ConfigBuildComponent,
  ],
  imports: [
    CommonModule,
    ComponentModule,
    ProcessConfigRoutingModule
  ]
})
export class ProcessConfigModule {}
