import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { AjaxTableComponent } from './components/ajax-table/ajax-table.component';
import { ComponentModule } from '../../../app/component';
import { AuthorityDirective } from './directive/authority/authority.directive';
import { HtmlPipe } from './pipe/html.pipe';

const COMPONENTS = [
  AjaxTableComponent
]
const DIRECTIVE = [
  AuthorityDirective
]
const PIPE = [
  HtmlPipe
]

@NgModule({
  imports: [
    CommonModule,
    ComponentModule
  ],
  declarations: [...COMPONENTS, ...DIRECTIVE, ...PIPE],
  providers: [HttpService],
  exports: [...COMPONENTS, ...DIRECTIVE, ...PIPE]
})
export class ShareModule { }
