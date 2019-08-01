import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpService } from './http.service';
import { PathNavComponent } from './components/path-nav/path-nav.component';

@NgModule({
  imports: [
    CommonModule,
  ],
  declarations: [PathNavComponent],
  providers: [HttpService],
  exports: [PathNavComponent]
})
export class ShareModule { }
