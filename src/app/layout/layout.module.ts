import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzPopoverModule, NzMenuModule, NzDropDownModule, NzBreadCrumbModule, NzModalModule, NzCheckboxModule, NzMessageModule, NzMessageService } from 'ng-zorro-antd';
import { PathNavComponent } from './path-nav/path-nav.component';

const COMPONENTS = [HeaderComponent, SidebarComponent, PathNavComponent, LayoutComponent];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    NzPopoverModule,
    NzMenuModule,
    NzDropDownModule,
    NzBreadCrumbModule,
    NzModalModule,
    BrowserAnimationsModule,
    RouterModule,
    NzCheckboxModule,
    NzMessageModule
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [NzMessageService]
})
export class LayoutModule { }
