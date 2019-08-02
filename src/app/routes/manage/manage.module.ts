import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ManageRoutingModule } from './manage-routing.module';
import { ApplicationComponent } from './application/application.component';
// import { AccountComponent } from './account/account.component';
// import { AuthorityComponent } from './authority/authority.component';
// import { ColumnComponent } from './column/column.component';
// import { ApplicationDirectoryComponent } from './application/application-directory/application-directory.component';
// import { ApplicationLinkComponent } from './application/application-link/application-link.component';
// import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleNewEditComponent } from './role/role-new-edit/role-new-edit.component';
import { ComponentModule } from './../../../app/component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ShareModule,
    ManageRoutingModule,
    ComponentModule
  ],
  declarations: [
    ApplicationComponent,
    // ApplicationComponent, AccountComponent, AuthorityComponent, ColumnComponent, ApplicationDirectoryComponent,
    // ApplicationLinkComponent, AccountDetailComponent,
    RoleComponent, RoleNewEditComponent]
})
export class ManageModule { }
