import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { GlobalState } from '../../../app/global.state';
import { ManageService } from '../../../app/core/api/manage.service';
import { NzMessageService } from 'ng-zorro-antd';
import { USER, CONSTANTS } from 'src/app/constants';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss'],
})
export class SidebarComponent implements OnInit {
  userName = 'fangshufeng';
  collectionList = [];
  menuList = [];
  allCollections = [];
  collectCboxsArr = [];
  collectDialog = false;
  modalOkLoading = false;

  constructor(private _state: GlobalState, private manageService: ManageService, private message: NzMessageService, private router: Router) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuList = menuData;
      this.setCollectCboxsArr();
    })
  }

  ngOnInit() {
    this.getList();
  }

  // 获取已选收藏列表
  getList() {
    this.manageService.getCollections(this.userName).subscribe(res => {
      if (res.resultCode === '0') {
        this.collectionList = res.result;
      }
      this.mapCboxsChecked(this.allCollections);
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
    this.allCollections = arr;
  }

  mapCboxsChecked(allCollections) {
    allCollections.map(item => {
      item['checked'] = false;
      for (let tm of this.collectionList) {
        if (item.resourceId == tm.resourceId) {
          item['checked'] = true;
        }
      }
    })
    this.collectCboxsArr = allCollections;
  }

  showModal(): void {
    this.getList();
    this.collectDialog = true;
  }

  handleOk(): void {
    console.log(this.collectCboxsArr)
    let params = {
      userId: this.userName,
      resourceIds: []
    };
    for (let element of this.collectCboxsArr) {
      if (element.checked) {
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

  goPage(element) {
    if (element.resourceUrl.indexOf('http') > -1) {
      window.open(element.resourceUrl)
    } else {
      this.router.navigate([`${element.resourceUrl}`]);
    }
  }

}
