import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { LayoutComponent } from './layout/layout.component';
import { AuthGuard } from './routes/share/guard/auth.guard';

const routes: Routes = [
  {
    path: '',
    component: LayoutComponent,
    children: [
      {
        path: '',
        loadChildren: './routes/home/home.module#HomeModule'
      },
      {
        path: 'manage',
        loadChildren: './routes/manage/manage.module#ManageModule',
        data: { breadcrumb: '管理工具' },
        canActivateChild: [AuthGuard]
      },
      {
        path: 'classify',
        loadChildren: './routes/process/process-classify/process-classify.module#ProcessClassifyModule',
      },
      {
        path: 'config',
        loadChildren: './routes/process/process-config/process-config.module#ProcessConfigModule',
      },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class AppRoutingModule { }
