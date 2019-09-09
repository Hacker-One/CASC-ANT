import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ManageService } from '../../../../../app/core/api/manage.service';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { CommonService, LoadingService, ConfigService } from '../../../../../app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from 'src/app/global.state';
import { USER, CONSTANTS, APPEXTIDMAPPING } from 'src/app/constants';

@Component({
  selector: 'app-role-new-edit',
  templateUrl: './role-new-edit.component.html',
  styleUrls: ['./role-new-edit.component.scss'],
  providers: [ConfigService]
})
export class RoleNewEditComponent implements OnInit {
  nodes = [
    {
      title: '0-0',
      key: '0-0',
      expanded: true,
      hihi: false,
      icon: 'anticon anticon-meh-o',
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true, icon: 'anticon anticon-meh-o', },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      checked: false,
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true, checked: false, },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true, checked: false, },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true, checked: false, }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];
  pageAction = '';
  selectArr = [];
  appExtId = '';
  appExtIdArr = []
  roleObj = {
    displayName: '',
    externalId: '',
    pExtIds: []
  };
  treeDatas = [];
  flowTreeDatas = [];
  detailItem: any;

  validateForm: FormGroup;
  // @ViewChild('treePortal', { static: false }) treePortal;

  constructor(
    private manageService: ManageService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _state: GlobalState,
    private configService: ConfigService,
  ) {
    this.validateForm = this.fb.group({
      appExtId: ['', [Validators.required]],
      displayName: ['', [Validators.required]],
      externalId: ['', [Validators.required]],
    });
    this.pageAction = this.activatedRoute.snapshot.params.action;
    switch (this.pageAction) {
      case 'create':
        this.appListService();
        break;

      case 'edit':
        const appExtId = this.activatedRoute.snapshot.params.appExtId;
        const externalId = this.activatedRoute.snapshot.params.externalId;
        this.editAsyncFunc(appExtId, externalId);
        break;

      case 'detail':
        const aId = this.activatedRoute.snapshot.params.appExtId;
        const eId = this.activatedRoute.snapshot.params.externalId;
        this.getDetailRole(aId, eId);
        break;

      default:
        break;
    }
  }

  ngOnInit() {
  }

  appExtIdChanged(id) {
    this.appExtId = id;
    switch (id) {
      case APPEXTIDMAPPING.portal:
        this.getPortalTree();
        break;
      case APPEXTIDMAPPING.flow:
        this.getFlowTree();
        break;

      default:
        break;
    }
  }

  // 获取域名列表service
  async appListService() {
    this.appExtIdArr = [];
    return new Promise(resolve => {
      this.configService.appListApi().subscribe(resp => {
        this.appExtIdArr = resp.resources;
      })
      resolve()
    })
  }

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    switch (event.node.origin.checked) {
      case true:
        this.setParentsChecked(event.node);
        this.setChildrenChecked(true, event.node);
        break;

      case false:
        this.setChildrenChecked(false, event.node);
        break;

      default:
        break;
    }
  }

  setParentsChecked(node) {
    if (node.parentNode) {
      node.getParentNode().isChecked = true;
      this.setParentsChecked(node.getParentNode());
    }
  }

  setChildrenChecked(checkedFlag, node) {
    if (node.getChildren().length > 0) {
      for (let element of node.getChildren()) {
        element.isChecked = checkedFlag;
        this.setChildrenChecked(checkedFlag, element);
      }
    }
  }

  async editAsyncFunc(appExtId, externalId) {
    LoadingService.show();
    await this.appListService();
    this.getEditRole(appExtId, externalId);
  }

  getEditRole(appExtId, externalId) {
    LoadingService.show();
    let keyY = '';
    for (let key in APPEXTIDMAPPING) {
      if (APPEXTIDMAPPING[key] == appExtId) {
        keyY = key
      }
    }
    switch (keyY) {
      case 'portal':
        this.manageService.getRoleById(externalId).subscribe(res => {
          if (res.resultCode === '0') {
            LoadingService.close();
            this.validateForm.patchValue({ displayName: res.result.displayName, externalId: res.result.externalId, appExtId: res.result.appExtId });
            let base = CommonService.modifyField(CommonService.modifyField(res.result.pExtIds, 'id', 'key'), 'label', 'title');
            this.setIsLeaf(base);
            this.treeDatas = base;
          }
        })
        break;
      case 'flow':
        this.manageService.getFlowRoleById(appExtId, externalId).subscribe(res => {
          if (res.resultCode === '0') {
            LoadingService.close();
            this.validateForm.patchValue({ displayName: res.result.displayName, externalId: res.result.externalId, appExtId: res.result.appExtId });
            let base = res.result.tree;
            this.setIsLeaf(base);
            this.treeDatas = base;
          }
        })
        break;
      default:
        break;
    }
    // const p1 = new Promise((resolve, reject) => {
    //   this.manageService.getRoleById(id).subscribe(res => {
    //     if (res.resultCode === '0') {
    //       this.validateForm.patchValue({ displayName: res.result.displayName, externalId: res.result.externalId });
    //       let base = CommonService.modifyField(CommonService.modifyField(res.result.pExtIds, 'id', 'key'), 'label', 'title');
    //       this.setIsLeaf(base);
    //       this.treeDatas = base;
    //     }
    //     resolve()
    //   })
    // })
    // const p2 = new Promise((resolve, reject) => {
    //   this.manageService.getFlowTree({ roleId: id, needRole: false }).subscribe(res => {
    //     if (res.resultCode === '0') {
    //       const base = res.result;
    //       this.setIsLeaf(base);
    //       this.flowTreeDatas = base;
    //     }
    //     resolve()
    //   })
    // })
    // Promise.all([p1, p2]).then(() => {
    //   LoadingService.close();
    // })
  }

  getDetailRole(appExtId, externalId) {
    LoadingService.show();
    let keyY = '';
    for (let key in APPEXTIDMAPPING) {
      if (APPEXTIDMAPPING[key] == appExtId) {
        keyY = key
      }
    }
    switch (keyY) {
      case 'portal':
        this.manageService.getRoleById(externalId).subscribe(res => {
          if (res.resultCode === '0') {
            LoadingService.close();
            this.detailItem = res.result;
            this.validateForm.patchValue({ displayName: res.result.displayName, externalId: res.result.externalId, appExtId: res.result.appExtId });
            let base = CommonService.modifyField(CommonService.modifyField(res.result.pExtIds, 'id', 'key'), 'label', 'title');
            this.removeNoChecked(base);
            this.removeEmptyChildren(base);
            // treeDatas first level can not be empty
            let nodes = [];
            for (let element of base) {
              if (element) {
                nodes.push(element)
              }
            };
            this.setIsLeaf(nodes);
            console.log(nodes);
            this.treeDatas = nodes;
          }
        })
        break;
      case 'flow':
        this.manageService.getFlowRoleById(appExtId, externalId).subscribe(res => {
          if (res.resultCode === '0') {
            LoadingService.close();
            this.detailItem = res.result;
            this.validateForm.patchValue({ displayName: res.result.displayName, externalId: res.result.externalId, appExtId: res.result.appExtId });
            let base = res.result.tree;
            this.removeNoChecked(base);
            this.removeEmptyChildren(base);
            // treeDatas first level can not be empty
            let nodes = [];
            for (let element of base) {
              if (element) {
                nodes.push(element)
              }
            };
            this.setIsLeaf(nodes);
            console.log(nodes);
            this.treeDatas = nodes;
          }
        })
        break;
      default:
        break;
    }

    // LoadingService.show();
    // const p1 = new Promise(resolve => {
    //   this.manageService.getRoleById(aId).subscribe(res => {
    //     LoadingService.close();
    //     this.detailItem = res.result;
    //     let base = CommonService.modifyField(CommonService.modifyField(res.result.pExtIds, 'id', 'key'), 'label', 'title');
    //     this.removeNoChecked(base);
    //     this.removeEmptyChildren(base);
    //     // treeDatas first level can not be empty
    //     let nodes = [];
    //     for (let element of base) {
    //       if (element) {
    //         nodes.push(element)
    //       }
    //     };
    //     this.setIsLeaf(nodes);
    //     console.log(nodes);
    //     this.treeDatas = nodes;
    //     resolve()
    //   })
    // })
    // const p2 = new Promise(resolve => {
    //   this.manageService.getFlowTree({ roleId: eId, needRole: false }).subscribe(res => {
    //     const base = res.result;
    //     this.removeNoChecked(base);
    //     this.removeEmptyChildren(base);
    //     this.setIsLeaf(base);
    //     this.flowTreeDatas = base;
    //     resolve()
    //   })
    // })
    // Promise.all([p1, p2]).then(() => {
    //   LoadingService.close();
    // })
  }

  removeNoChecked(arr) {
    arr.forEach((element, index) => {
      if (!element.checked) {
        delete arr[index]
      }
      else {
        if (element.hasOwnProperty('children')) {
          this.removeNoChecked(element.children)
        }
      }
    })
  }

  removeEmptyChildren(arr) {
    arr.map(element => {
      if (element.hasOwnProperty('children')) {
        if (CommonService.isEmptyArr(element.children)) {
          delete element.children
        }
        if (element.children) {
          this.removeEmptyChildren(element.children)
        }
      }
      return element
    })
  }

  getPortalTree() {
    if (this.pageAction === 'edit') {
      return
    };
    LoadingService.show();
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    const p1 = new Promise((resolve, reject) => {
      this.manageService.getMenuTree(userName).subscribe(res => {
        let base = CommonService.modifyField(CommonService.modifyField(res.result, 'id', 'key'), 'label', 'title');
        this.setIsLeaf(base);
        this.treeDatas = base;
      })
      LoadingService.close();
      resolve()
    })
  }

  getFlowTree() {
    LoadingService.show();
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    const p2 = new Promise((resolve, reject) => {
      this.manageService.getFlowTree({ needRole: false }).subscribe(res => {
        const base = res.result;
        this.setIsLeaf(base);
        this.treeDatas = base;
      })
      LoadingService.close();
      resolve()
    })
  }

  setIsLeaf(arr) {
    arr.map((element) => {
      if (!element.hasOwnProperty('children')) {
        element['isLeaf'] = true;
      } else {
        this.setIsLeaf(element.children);
      }
      return element;
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    let treeParam = this.treeDatas;

    LoadingService.show();
    let keyY = '';
    for (let key in APPEXTIDMAPPING) {
      if (APPEXTIDMAPPING[key] == this.appExtId) {
        keyY = key
      }
    }
    switch (keyY) {
      case 'portal':
        value['pExtIds'] = CommonService.modifyField(CommonService.modifyField(treeParam, 'key', 'id'), 'title', 'label');
        if (this.pageAction == 'create') {
          this.manageService.addRole(value).subscribe(res => {
            if (res['resultCode'] === '0') {
              this.message.create('success', this.pageAction == 'create' ? '新建成功' : '修改成功');
              this.serverResponsed();
            }
          })
        } else {
          const id = this.validateForm.value.externalId;
          this.manageService.updateRole(id, value).subscribe(res => {
            if (res['resultCode'] === '0') {
              this.message.create('success', this.pageAction == 'create' ? '新建成功' : '修改成功');
              this.serverResponsed();
            }
          })
        }
        break;

      case 'flow':
        value['tree'] = treeParam;
        this.manageService.saveFlowTree(value.appExtId, value.externalId, value).subscribe(res => {
          if (res['resultCode'] === '0') {
            this.message.create('success', this.pageAction == 'create' ? '新建成功' : '修改成功');
            this.serverResponsed();
          };
        })
        break;

      default:
        break;
    }
  }

  serverResponsed() {
    this.getMenuAgain();
    LoadingService.close();
    this.router.navigate(['/manage/role-list']);
  }

  getMenuAgain() {
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    this.manageService.getSysMenus(userName).subscribe(res => {
      this._state.notifyDataChanged('menu.data', res.result);
    })
  }


}
