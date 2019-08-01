import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NZ_I18N, zh_CN } from 'ng-zorro-antd';
import { registerLocaleData } from '@angular/common';
import zh from '@angular/common/locales/zh';

registerLocaleData(zh);

import { httpInterceptorProviders } from './core';

import { LayoutModule } from './layout/layout.module';
import { ComponentModule } from './component';
import { ClassifyComponent } from './routes/classify/classify.component';
import { GlobalState } from './global.state';

@NgModule({
  declarations: [
    AppComponent,
    ClassifyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    LayoutModule,
    ComponentModule,
    HttpClientModule
  ],
  providers: [{ provide: NZ_I18N, useValue: zh_CN }, httpInterceptorProviders, GlobalState],
  bootstrap: [AppComponent]
})
export class AppModule { }
