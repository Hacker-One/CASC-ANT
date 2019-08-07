import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { AjaxTableComponent } from './components/ajax-table/ajax-table.component';
import { ComponentModule } from '../../../app/component';
import { AuthorityDirective } from './directive/authority/authority.directive';

@NgModule({
  imports: [
    CommonModule,
    ComponentModule
  ],
  declarations: [AjaxTableComponent, AuthorityDirective],
  providers: [HttpService],
  exports: [AjaxTableComponent, AuthorityDirective]
})
export class ShareModule { }
