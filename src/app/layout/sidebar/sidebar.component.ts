import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalState } from '../../../app/global.state';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  menuList = [];
  collectCboxsArr = [];
  collectDialog = false;

  constructor(private _state: GlobalState) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuList = menuData;
      this.setCollectCboxsArr();
    })
  }

  ngOnInit() {
  }

  setCollectCboxsArr() {
    const arr = [];
    for (let element of this.menuList) {
      if (element.hasOwnProperty('resourcess')) {
        for (let item of element['resourcess']) {
          arr.push(item);
        }
      }
    };
    arr.map(item => {
      return item['selected'] = false;
    });
    this.collectCboxsArr = arr;
  }

  collect() {

  }

  showModal(): void {
    this.collectDialog = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.collectDialog = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.collectDialog = false;
  }

}
