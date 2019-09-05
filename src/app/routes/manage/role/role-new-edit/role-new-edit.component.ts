import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ManageService } from '../../../../../app/core/api/manage.service';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { CommonService, LoadingService } from '../../../../../app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from 'src/app/global.state';
import { USER, CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-role-new-edit',
  templateUrl: './role-new-edit.component.html',
  styleUrls: ['./role-new-edit.component.scss']
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
  roleObj = {
    displayName: '',
    externalId: '',
    pExtIds: []
  };
  treeDatas = [];
  flowTreeDatas = [];
  detailItem: any;

  validateForm: FormGroup;
  @ViewChild('treePortal', { static: false }) treePortal;

  constructor(
    private manageService: ManageService,
    private fb: FormBuilder,
    private message: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _state: GlobalState
  ) {
    this.validateForm = this.fb.group({
      displayName: ['', [Validators.required]],
      externalId: ['', [Validators.required]],
    });
    this.pageAction = this.activatedRoute.snapshot.params.action;
    switch (this.pageAction) {
      case 'create':
        this.getMenuTree();
        break;

      case 'edit':
        const externalId = this.activatedRoute.snapshot.params.externalId;
        this.getEditRole(externalId);
        break;

      case 'detail':
        const eId = this.activatedRoute.snapshot.params.externalId;
        this.getDetailRole(eId);
        break;

      default:
        break;
    }
  }

  ngOnInit() {
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

  getEditRole(id) {
    LoadingService.show();
    const p1 = new Promise((resolve, reject) => {
      this.manageService.getRoleById(id).subscribe(res => {
        if (res.resultCode === '0') {
          this.validateForm.patchValue({ displayName: res.result.displayName, externalId: res.result.externalId });
          let base = CommonService.modifyField(CommonService.modifyField(res.result.pExtIds, 'id', 'key'), 'label', 'title');
          this.setIsLeaf(base);
          this.treeDatas = base;
        }
        resolve()
      })
    })
    const p2 = new Promise((resolve, reject) => {
      this.manageService.getFlowTree({ roleId: id, needRole: false }).subscribe(res => {
        if (res.resultCode === '0') {
          const base = res.result;
          this.setIsLeaf(base);
          this.flowTreeDatas = base;
        }
        resolve()
      })
    })
    Promise.all([p1, p2]).then(() => {
      LoadingService.close();
    })
  }

  getDetailRole(id) {
    LoadingService.show();
    this.manageService.getRoleById(id).subscribe(res => {
      LoadingService.close();
      this.detailItem = res.result;
      let base = CommonService.modifyField(CommonService.modifyField(res.result.pExtIds, 'id', 'key'), 'label', 'title');
      this.setIsLeaf(base);
      // this.removeNoChecked(base);
      this.treeDatas = base;
    })
    this.manageService.getFlowTree({ roleId: id, needRole: false }).subscribe(res => {
      const base = res.result;
      this.setIsLeaf(base);
      this.flowTreeDatas = base;
    })
  }

  removeNoChecked(arr) {
    arr.map((element) => {
      if (!element['checked']) {
        element['show'] = false;
      };
      return element;
    })
    console.log(arr)
  }

  getMenuTree() {
    LoadingService.show();
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    const p1 = new Promise((resolve, reject) => {
      this.manageService.getMenuTree(userName).subscribe(res => {
        let base = CommonService.modifyField(CommonService.modifyField(res.result, 'id', 'key'), 'label', 'title');
        this.setIsLeaf(base);
        this.treeDatas = base;
      })
      resolve()
    })
    //  intergrate flow menu authority
    const p2 = new Promise((resolve, reject) => {
      this.manageService.getFlowTree({ needRole: false }).subscribe(res => {
        const base = res.result;
        this.setIsLeaf(base);
        this.flowTreeDatas = base;
      })
      resolve()
    })
    Promise.all([p1, p2]).then(() => {
      LoadingService.close();
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
    value['pExtIds'] = CommonService.modifyField(CommonService.modifyField(treeParam, 'key', 'id'), 'title', 'label');
    LoadingService.show();
    let p1: Promise<any>;
    let p2: Promise<any>;
    if (this.pageAction == 'create') {
      p1 = new Promise((resolve, reject) => {
        this.manageService.addRole(value).subscribe(res => {
          resolve(res)
        })
      })
    } else {
      const id = this.validateForm.value.externalId;
      p1 = new Promise((resolve) => {
        this.manageService.updateRole(id, value).subscribe(res => {
          resolve(res)
        })
      })
    };
    p2 = new Promise((resolve, reject) => {
      this.manageService.saveFlowTree(value.externalId, this.flowTreeDatas).subscribe(res => {
        resolve(res)
      })
    });
    Promise.all([p1, p2]).then(res => {
      console.log(res);
      if (res[0]['resultCode'] === '0' && res[1]['resultCode'] === '0') {
        this.message.create('success', this.pageAction == 'create' ? '新建成功' : '修改成功');
      };
      this.getMenuAgain();
      LoadingService.close();
      this.router.navigate(['/manage/role-list']);
    })
  }

  getMenuAgain() {
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    this.manageService.getSysMenus(userName).subscribe(res => {
      this._state.notifyDataChanged('menu.data', res.result);
    })
  }


}
