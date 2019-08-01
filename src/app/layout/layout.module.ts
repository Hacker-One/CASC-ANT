import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzPopoverModule, NzMenuModule, NzDropDownModule, NzBreadCrumbModule } from 'ng-zorro-antd';

const COMPONENTS = [HeaderComponent, SidebarComponent, LayoutComponent];

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
    BrowserAnimationsModule,
    RouterModule
  ],
  exports: [
    ...COMPONENTS
  ]
})
export class LayoutModule {}
