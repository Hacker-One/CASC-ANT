import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ManageService } from '../../../../../app/core/api/manage.service';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { CommonService, LoadingService } from '../../../../../app/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalState } from 'src/app/global.state';

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
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
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
  detailItem = {};

  validateForm: FormGroup;
  @ViewChild('tree', { static: false }) tree;

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
    // console.log(this.treeDatas);
    console.log(this.nodes)
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
    this.manageService.getRoleById(id).subscribe(res => {
      LoadingService.close();
      this.validateForm.patchValue({ displayName: res.displayName, externalId: res.externalId });
      let base = CommonService.modifyField(CommonService.modifyField(res.pExtIds, 'id', 'key'), 'label', 'title');
      this.setIsLeaf(base);
      this.treeDatas = base;
    })
  }

  getDetailRole(id) {
    LoadingService.show();
    this.manageService.getRoleById(id).subscribe(res => {
      LoadingService.close();
      this.detailItem = res;
      let base = CommonService.modifyField(CommonService.modifyField(res.pExtIds, 'id', 'key'), 'label', 'title');
      this.setIsLeaf(base);
      this.removeNoChecked(base);
      this.treeDatas = base;
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
    const userName = 'fangshufeng';
    this.manageService.getMenuTree(userName).subscribe(res => {
      LoadingService.close();
      let base = CommonService.modifyField(CommonService.modifyField(res.result, 'id', 'key'), 'label', 'title');
      this.setIsLeaf(base);
      this.treeDatas = base;
      console.log(this.treeDatas)
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
    console.log(value);
    let treeParam = this.treeDatas;
    value['pExtIds'] = CommonService.modifyField(CommonService.modifyField(treeParam, 'key', 'id'), 'title', 'label');
    LoadingService.show();
    if (this.pageAction == 'create') {
      this.manageService.addRole(value).subscribe(res => {
        this.message.create('success', '新建成功');
        LoadingService.close();
        this.router.navigate(['/manage/role-list']);
      })
    } else {
      const id = this.validateForm.value.externalId;
      this.manageService.updateRole(id, value).subscribe(res => {
        this.message.create('success', '更新成功');
        LoadingService.close();
        this.getMenuAgain();
        this.router.navigate(['/manage/role-list']);
      })
    }
  }

  getMenuAgain() {
    const userName = 'fangshufeng';
    this.manageService.getSysMenus(userName).subscribe(res => {
      this._state.notifyDataChanged('menu.data', res.result);
    })
  }


}
