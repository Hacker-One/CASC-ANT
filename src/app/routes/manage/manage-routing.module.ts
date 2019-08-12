import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ApplicationComponent } from './application/application.component';
import { ApplicationDirectoryComponent } from './application/application-directory/application-directory.component';
import { ApplicationLinkComponent } from './application/application-link/application-link.component';
import { AccountComponent } from './account/account.component';
import { AccountDetailComponent } from './account/account-detail/account-detail.component';
import { RoleComponent } from './role/role.component';
import { RoleNewEditComponent } from './role/role-new-edit/role-new-edit.component';
import { ReleaseComponent } from './release/release.component';
import { ReleaseBuildComponent } from './release/release-build/release-build.component';
import { ColumnComponent } from './column/column.component';

const routes: Routes = [
  // { path: '', component: ApplicationComponent },
  { path: 'applicat-list', component: ApplicationComponent, data: { breadcrumb: '应用管理' } },
  { path: 'applicat-directory', component: ApplicationDirectoryComponent, data: { breadcrumb: '新建目录' } },
  { path: 'applicat-link', component: ApplicationLinkComponent, data: { breadcrumb: '新建链接' } },
  { path: 'account-list', component: AccountComponent },
  { path: 'account-detail', component: AccountDetailComponent },
  { path: 'role-list', component: RoleComponent },
  { path: 'role-new-edit', component: RoleNewEditComponent },
  { path: 'info-release', component: ReleaseComponent },
  { path: 'release-build', component: ReleaseBuildComponent },
  { path: 'column-list', component: ColumnComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ManageRoutingModule { }
