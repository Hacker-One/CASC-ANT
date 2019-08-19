import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeaderComponent } from './header/header.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { LayoutComponent } from './layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { NzMenuModule, NzBreadCrumbModule, NzModalModule, NzMessageService, NzAvatarModule, NzIconModule } from 'ng-zorro-antd';
import { PathNavComponent } from './path-nav/path-nav.component';
import { ComponentModule } from '../component';

const COMPONENTS = [HeaderComponent, SidebarComponent, PathNavComponent, LayoutComponent];

@NgModule({
  declarations: [
    ...COMPONENTS
  ],
  imports: [
    CommonModule,
    ComponentModule,
    NzMenuModule,
    NzBreadCrumbModule,
    NzModalModule,
    BrowserAnimationsModule,
    NzAvatarModule,
    NzIconModule,
  ],
  exports: [
    ...COMPONENTS
  ],
  providers: [NzMessageService]
})
export class LayoutModule { }
