import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AngularDraggableModule } from 'angular2-draggable';

import { ManageRoutingModule } from './manage-routing.module';
import { ApplicationComponent } from './application/application.component';
import { ApplicationDirectoryComponent } from './application/application-directory/application-directory.component';
import { ColumnComponent } from './column/column.component';
import { ApplicationLinkComponent } from './application/application-link/application-link.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleNewEditComponent } from './role/role-new-edit/role-new-edit.component';
import { ComponentModule } from '../../component';
import { ShareModule } from '../share/share.module';
import { ReleaseComponent } from './release/release.component';
import { ReleaseBuildComponent } from './release/release-build/release-build.component';
import { ColumnNewEditComponent } from './column/column-new-edit/column-new-edit.component';
import { LibraryComponent } from './library/library.component';
import { LibraryNewEditComponent } from './library/library-new-edit/library-new-edit.component';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    ManageRoutingModule,
    ComponentModule,
    AngularDraggableModule
  ],
  declarations: [
    ApplicationComponent,
    ApplicationDirectoryComponent,
    ApplicationLinkComponent,
    RoleComponent,
    RoleNewEditComponent,
    AccountDetailComponent,
    AccountComponent,
    RoleComponent,
    RoleNewEditComponent,
    ReleaseComponent,
    ReleaseBuildComponent,
    ColumnComponent,
    ColumnNewEditComponent,
    LibraryComponent,
    LibraryNewEditComponent,
  ]
})
export class ManageModule { }
