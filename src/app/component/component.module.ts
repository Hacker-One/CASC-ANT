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
} from 'ng-zorro-antd';
import { LoadingComponent } from './loading/loading.component';

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
  NzTableModule
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
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...ZORROCOMPONENTS,
    LoadingComponent,
  ]
})
export class ComponentModule {}
