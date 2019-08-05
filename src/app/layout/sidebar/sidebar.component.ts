import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalState } from '../../../app/global.state';
import { ManageService } from '../../../app/core/api/manage.service';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  collectionList = [];
  menuList = [];
  collectCboxsArr = [];
  collectDialog = false;
  modalOkLoading = false;

  constructor(private _state: GlobalState, private manageService: ManageService, private message: NzMessageService) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuList = menuData;
      this.setCollectCboxsArr();
    })
  }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const userName = 'fangshufeng';
    this.manageService.getCollections(userName).subscribe(res => {
      this.collectionList = res.result;
    })
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
    console.log(this.collectCboxsArr)
    let params = {
      userId: 'fangshufeng',  // will
      resourceIds: []
    };
    for (let element of this.collectCboxsArr) {
      if (element.selected) {
        params.resourceIds.push(element.resourceId);
      }
    };
    this.modalOkLoading = true;
    this.manageService.addCollection(params).subscribe(res => {
      this.getList();
      this.collectDialog = false;
      this.modalOkLoading = false;
      this.message.create('success', '添加成功');
    });
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.collectDialog = false;
  }

}
