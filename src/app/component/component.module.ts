import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule, PreloadAllModules } from '@angular/router';
import {
  NzButtonModule,
  NzFormModule,
  NzModalModule,
  NzInputModule,
  NzPopoverModule,
  NzMenuModule,
  NzSelectModule,
  NzDatePickerModule,
  NzRadioModule,
  NzSpinModule,
  NzGridModule,
  NzUploadModule,
  NzDropDownModule,
  NzTreeModule,
  NzTableModule,
  NzMessageModule,
  NzSkeletonModule,
  NzBreadCrumbModule,
  NzCheckboxModule,
  NzIconModule,
  NzToolTipModule,
  NzCarouselModule,
  NzTabsModule,
  NzTreeSelectModule,
  NzBadgeModule,
  NzAlertModule,
} from 'ng-zorro-antd';

import { LoadingComponent } from './loading/loading.component';

// 文本编辑器
import { NgxNeditorModule } from '@notadd/ngx-neditor';

import { PerfectScrollbarModule } from 'ngx-perfect-scrollbar';
import { PERFECT_SCROLLBAR_CONFIG } from 'ngx-perfect-scrollbar';
import { PerfectScrollbarConfigInterface } from 'ngx-perfect-scrollbar';
import PerfectScrollbar from 'perfect-scrollbar';
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true
};

// zorro组件
const ZORROCOMPONENTS = [
  NzButtonModule,
  NzFormModule,
  NzModalModule,
  NzInputModule,
  NzPopoverModule,
  NzMenuModule,
  NzSelectModule,
  NzDatePickerModule,
  NzRadioModule,
  NzSpinModule,
  NzGridModule,
  NzUploadModule,
  NzDropDownModule,
  NzTreeModule,
  NzTableModule,
  NzCheckboxModule,
  NzMessageModule,
  NzSkeletonModule,
  NzBreadCrumbModule,
  NzIconModule,
  NzToolTipModule,
  NzCarouselModule,
  NzTabsModule,
  NzTreeSelectModule,
  NzBadgeModule,
  NzAlertModule
];

@NgModule({
  declarations: [
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...ZORROCOMPONENTS,
    NgxNeditorModule,
    PerfectScrollbarModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...ZORROCOMPONENTS,
    LoadingComponent,
    NgxNeditorModule,
    PerfectScrollbarModule
  ],
  providers: [
    { provide: PERFECT_SCROLLBAR_CONFIG, useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG }
  ]
})
export class ComponentModule { }
