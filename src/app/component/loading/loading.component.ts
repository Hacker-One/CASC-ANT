/**
 * 全局loading,依赖注入：LoadingService
 * @function: show() close()
 * */

import { Component, OnInit } from '@angular/core';
import { LoadingService } from '../../core';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styleUrls: ['./loading.component.styl'],
  providers: [LoadingService]
})
export class LoadingComponent implements OnInit {
  open = false;

  constructor() {
    LoadingService.loading = this;
  }

  ngOnInit() {
  }

  show() {
    this.open = true;
  }

  close() {
    this.open = false;
  }

}
