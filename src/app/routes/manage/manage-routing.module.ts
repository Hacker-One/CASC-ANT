import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { ApplicationDirectoryComponent } from './application/application-directory/application-directory.component';
import { ApplicationLinkComponent } from './application/application-link/application-link.component';
import { AccountComponent } from './account/account.component';
import { RoleComponent } from './role/role.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RoleNewEditComponent } from './role/role-new-edit/role-new-edit.component';

const routes: Routes = [
  // { path: '', component: ApplicationComponent },
  { path: 'applicat-list', component: ApplicationComponent },
  { path: 'applicat-directory', component: ApplicationDirectoryComponent },
  { path: 'applicat-link', component: ApplicationLinkComponent },
  { path: 'account-list', component: AccountComponent },
  { path: 'account-detail/:id', component: AccountDetailComponent },
  { path: 'role-list', component: RoleComponent },
  { path: 'role-new-edit', component: RoleNewEditComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }