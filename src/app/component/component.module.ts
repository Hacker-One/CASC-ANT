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
// import { MyEditorComponent } from './my-editor/my-editor.component';
import { EditorModule } from '@tinymce/tinymce-angular';

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
    EditorModule
  ],
  exports: [
    CommonModule,
    FormsModule,
    RouterModule,
    ReactiveFormsModule,
    ...ZORROCOMPONENTS,
    LoadingComponent,
    EditorModule
  ]
})
export class ComponentModule {}
