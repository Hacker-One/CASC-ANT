import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { AjaxTableComponent } from './components/ajax-table/ajax-table.component';
import { ComponentModule } from '../../../app/component';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule
  ],
  declarations: [AjaxTableComponent],
  providers: [HttpService],
  exports: [AjaxTableComponent]
})
export class ShareModule { }
