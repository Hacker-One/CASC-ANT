import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
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
} from 'ng-zorro-antd';

import { LoadingComponent } from './loading/loading.component';

// 文本编辑器
import { NgxNeditorModule } from '@notadd/ngx-neditor';

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
    NgxNeditorModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...ZORROCOMPONENTS,
    LoadingComponent,
    NgxNeditorModule
  ]
})
export class ComponentModule {}
