import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageService } from './../../core/api/manage.service';
import { Router } from '@angular/router';
import { GlobalState } from '../../../app/global.state';
import { environment } from '../../..//environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent {
  public menuList: any = [];

  constructor(private manageSeivice: ManageService, private router: Router, private _state: GlobalState) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuList = menuData;
    })
  }

  ngOnInit() {
    this.getTopMenu();
  }

  getTopMenu() {
    // const url = `${environment.apiURl.getSysMenus}/fangshufeng`;
    // this.menuList = [
    //   {
    //     "id": "100",
    //     "resourceId": "8shome",
    //     "appExtId": "7012984",
    //     "createTime": "2019-07-17 15:39:35",
    //     "state": "1",
    //     "content": "Root-1",
    //     "desc": "首页",
    //     "action": "home-right"
    //   },
    //   {
    //     "id": "101",
    //     "resourceId": "8sfactory",
    //     "appExtId": "7012984",
    //     "createTime": "2019-07-17 15:41:59",
    //     "state": "1",
    //     "content": "Root-10",
    //     "desc": "生产类",
    //     "action": "query"
    //   },
    //   {
    //     "id": "847ad5e6ecdf43bea45b40f5977dda0b",
    //     "resourceId": "MangeTools",
    //     "appExtId": "7012984",
    //     "createTime": "2019-07-17 15:12:38",
    //     "state": "1",
    //     "content": "Root-20",
    //     "desc": "管理工具",
    //     "resourcess": [
    //       {
    //         "id": "16f372f7f97a5455299fe1a1738e0f2db",
    //         "resourceId": "8sauthority",
    //         "appExtId": "7012984",
    //         "createTime": "2019-07-17 15:41:59",
    //         "state": "1",
    //         "content": "847ad5e6ecdf43bea45b40f5977dda0b-Menu-1-1",
    //         "desc": "角色管理",
    //         "action": "/manage/role-list",
    //         "resourcessButton": [
    //           {
    //             "id": "020a7d8914f049e981d4ec75243d1fc123",
    //             "resourceId": "appMenuUpd",
    //             "appExtId": "7012984",
    //             "createTime": "2019-07-17 15:13:45",
    //             "state": "1",
    //             "content": "020a7478914f049e980d4ec75243d1fc1-Button-1-4",
    //             "desc": "新建角色",
    //             "action": "/manage/role-new-edit"
    //           }
    //         ]
    //       },
    //       {
    //         "id": "994e6ff94ad96485e85f1b17da191f518",
    //         "resourceId": "8saccount",
    //         "appExtId": "7012984",
    //         "createTime": "2019-07-17 15:39:35",
    //         "state": "1",
    //         "content": "847ad5e6ecdf43bea45b40f5977dda0b-Menu-1-10",
    //         "desc": "账号管理",
    //         "action": "/manage/account-list"
    //       },
    //       {
    //         "id": "994e6ff94ad96485e85f1b17da191f518",
    //         "resourceId": "8saccount",
    //         "appExtId": "7012984",
    //         "createTime": "2019-07-17 15:39:35",
    //         "state": "1",
    //         "content": "847ad5e6ecdf43bea45b40f5977dda0b-Menu-1-10",
    //         "desc": "栏目管理",
    //         "action": "/manage/column-list",
    //         "resourcessButton": [
    //           {
    //             "id": "020a7d8914f049e981d4ec75243d1fc123",
    //             "resourceId": "appMenuUpd",
    //             "appExtId": "7012984",
    //             "createTime": "2019-07-17 15:13:45",
    //             "state": "1",
    //             "content": "020a7478914f049e980d4ec75243d1fc1-Button-1-4",
    //             "desc": "新建栏目",
    //             "action": "/manage/column-new-edit"
    //           }
    //         ]
    //       },
    //       {
    //         "id": "020a7478914f049e980d4ec75243d1fc1",
    //         "resourceId": "appManage",
    //         "appExtId": "7012984",
    //         "createTime": "2019-07-17 15:13:45",
    //         "state": "1",
    //         "content": "847ad5e6ecdf43bea45b40f5977dda0b-Menu-1-20",
    //         "desc": "应用管理",
    //         "action": "/manage/applicat-list",
    //         "resourcessButton": [
    //           {
    //             "id": "020a7d8914f049e981d4ec75243d1fc123",
    //             "resourceId": "appMenuUpd",
    //             "appExtId": "7012984",
    //             "createTime": "2019-07-17 15:13:45",
    //             "state": "1",
    //             "content": "020a7478914f049e980d4ec75243d1fc1-Button-1-4",
    //             "desc": "创建目录",
    //             "action": "/manage/applicat-directory"
    //           },
    //           {
    //             "id": "020a7d8914f049e981d4ec75243d1fc124",
    //             "resourceId": "appMenuUpd",
    //             "appExtId": "7012984",
    //             "createTime": "2019-07-17 15:13:45",
    //             "state": "1",
    //             "content": "020a7478914f049e980d4ec75243d1fc1-Button-1-4",
    //             "desc": "创建链接",
    //             "action": "/manage/applicat-link"
    //           }
    //         ]
    //       }
    //     ],
    //     "action": "query"
    //   },
    //   {
    //     "id": "45df3422aa764ea48451584f43f355c7",
    //     "resourceId": "07b1adf36a9ce4044a9de20d05853a348",
    //     "appExtId": "7012984",
    //     "createTime": "2019-07-23 16:10:30",
    //     "state": "1",
    //     "content": "Root-21",
    //     "desc": "一级目录3",
    //     "action": "read"
    //   },
    //   {
    //     "id": "020a7d8914f049e980D4ec75243d1fc121",
    //     "resourceId": "8ssupport",
    //     "appExtId": "7012984",
    //     "createTime": "2019-07-17 15:43:02",
    //     "state": "1",
    //     "content": "Root-30",
    //     "desc": "支持类",
    //     "action": "query"
    //   }
    // ];
    // setTimeout(() => {
    //   this._state.notifyDataChanged('menu.data', this.menuList);
    // }, 1000);
    this.manageSeivice.getSysMenus('fangshufeng').subscribe(res => {
      console.log(res);
      this.menuList = res.result;
      this._state.notifyDataChanged('menu.data', this.menuList);
    })
  }

  goPage(item) {
    console.log(item);
    this.router.navigate([`${item.action}`])
  }
}
