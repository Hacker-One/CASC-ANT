import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ManageRoutingModule } from './manage-routing.module';
import { ApplicationComponent } from './application/application.component';
import { ApplicationDirectoryComponent } from './application/application-directory/application-directory.component';
// import { AuthorityComponent } from './authority/authority.component';
// import { ColumnComponent } from './column/column.component';
import { ApplicationLinkComponent } from './application/application-link/application-link.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleNewEditComponent } from './role/role-new-edit/role-new-edit.component';
import { ComponentModule } from '../../component';
import { ShareModule } from '../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    ManageRoutingModule,
    ComponentModule,
  ],
  declarations: [
    ApplicationComponent,
    ApplicationDirectoryComponent,
    ApplicationLinkComponent,
    RoleComponent, RoleNewEditComponent,
    AccountDetailComponent,AccountComponent, RoleComponent, RoleNewEditComponent]
})
export class ManageModule { }
