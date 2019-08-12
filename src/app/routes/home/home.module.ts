import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { TextNewsComponent } from './text-news/text-news.component';
import { ImageNewsComponent } from './image-news/image-news.component';
import { ComponentModule } from 'src/app/component';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HomeRoutingModule,
    ComponentModule
  ],
  declarations: [HomeComponent, TextNewsComponent, ImageNewsComponent],
  entryComponents: [TextNewsComponent]
})
export class HomeModule { }
