import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NzCalendarModule } from 'ng-zorro-antd';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TextNewsComponent } from './text-news/text-news.component';
import { ImageNewsComponent } from './image-news/image-news.component';
import { ComponentModule } from 'src/app/component';
import { ShareModule } from '../share/share.module';
import { TransactionNewsComponent } from './transaction-news/transaction-news.component';
import { CalendarNewsComponent } from './calendar-news/calendar-news.component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ComponentModule,
    ShareModule,
    NzCalendarModule
  ],
  declarations: [HomeComponent, TextNewsComponent, ImageNewsComponent, TransactionNewsComponent, CalendarNewsComponent],
  entryComponents: []
})
export class HomeModule { }
