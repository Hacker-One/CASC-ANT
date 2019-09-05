import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../share/http.service';
import { GlobalState } from '../../../global.state';
import { ManageService, CommonService } from '../../../core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { USER, CONSTANTS, AUTHORITYBTNMAPPING } from 'src/app/constants';

export interface TreeNodeInterface {
  desc: string;
  id: string;
  action: string;
  appExtId: string;
  content: string;
  state: string;
  resourceId: string;
  resourcess?: TreeNodeInterface[];
  parent?: any;
  level?: number;
  expand?: boolean;
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss'],
})
export class ApplicationComponent implements OnInit {
  authority = AUTHORITYBTNMAPPING;
  public tableLoading = false;    // table loading
  public tableData = [];          // table data
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};
  deleteDialog = false;
  listOfMapData = [
    {
      key: 1,
      name: 'John Brown sr.',
      age: 60,
      address: 'New York No. 1 Lake Park',
      children: [
        {
          key: 11,
          name: 'John Brown',
          age: 42,
          address: 'New York No. 2 Lake Park'
        },
        {
          key: 12,
          name: 'John Brown jr.',
          age: 30,
          address: 'New York No. 3 Lake Park',
          children: [
            {
              key: 121,
              name: 'Jimmy Brown',
              age: 16,
              address: 'New York No. 3 Lake Park'
            }
          ]
        },
        {
          key: 13,
          name: 'Jim Green sr.',
          age: 72,
          address: 'London No. 1 Lake Park',
          children: [
            {
              key: 131,
              name: 'Jim Green',
              age: 42,
              address: 'London No. 2 Lake Park',
              children: [
                {
                  key: 1311,
                  name: 'Jim Green jr.',
                  age: 25,
                  address: 'London No. 3 Lake Park'
                },
                {
                  key: 1312,
                  name: 'Jimmy Green sr.',
                  age: 18,
                  address: 'London No. 4 Lake Park'
                }
              ]
            }
          ]
        }
      ]
    },
    {
      key: 2,
      name: 'Joe Black',
      age: 32,
      address: 'Sidney No. 1 Lake Park'
    }
  ];

  constructor(
    private http: HttpService,
    private _state: GlobalState,
    private manageService: ManageService,
    private router: Router,
    private message: NzMessageService,
    private modalService: NzModalService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.tableData = [];
    this.tableLoading = true;
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    this.manageService.getSysMenus(userName).subscribe(resp => {
      this.tableLoading = false;
      if (resp.resultCode === '0') {
        this.tableData = CommonService.modifyField(resp.result, 'resourcessButton', 'resourcess');
        this.tableData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
        });
      }
      console.log(this.mapOfExpandedData);

    }, () => this.tableLoading = false);
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.resourcess) {
        data.resourcess.forEach(d => {
          const target: any = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.resourcess) {
        for (let i = node.resourcess.length - 1; i >= 0; i--) {
          stack.push({ ...node.resourcess[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: any }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
  }

  goDetail(item, act) {
    console.log(item);
    if (item.resourceType == 'Root') {
      this.router.navigate(['/manage/applicat-directory', { action: act, resourceId: item.resourceId }])
    } else if (item.resourceType == 'Menu') {
      this.router.navigate(['/manage/applicat-link', { action: act, resourceId: item.resourceId }])
    } else {
      this.router.navigate(['/manage/applicat-btn', { action: act, parentId: item.parentId, resourceId: item.resourceId, desc: item.desc, url: item.action }])
    }
  }

  deleteItem(item) {
    this.manageService.deleteSysMenuApi(item.appExtId, item.resourceId).subscribe(res => {
      this.message.success('删除链接成功');
      this.getList();
    })
  }

  showDeleteConfirm(item): void {
    this.modalService.confirm({
      nzTitle: '确认删除吗?',
      nzContent: '<b style="color: red;"></b>',
      nzOkText: '确认',
      nzOkType: 'danger',
      nzOnOk: () => this.deleteItem(item),
      nzCancelText: '取消',
      nzOnCancel: () => console.log('Cancel')
    });
  }


}
