import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ManageService, LoadingService } from '../../../../core';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalState } from 'src/app/global.state';
import { USER, CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-application-link',
  templateUrl: './application-link.component.html',
  styleUrls: ['./application-link.component.scss']
})
export class ApplicationLinkComponent implements OnInit {
  public buildForm: FormGroup;
  public menuSelectList = [];
  public applicationLibArr = [];
  public roleList = []; // 角色列表
  pageAction = '';
  detailItem: any;

  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.every(item => item.checked === false)) {
      return { error: true };
    }
    return {};
  }
  actionValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.indexOf('www.') === -1) {
      return { error: true };
    }
    return {};
  }

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
    private _state: GlobalState
  ) {
    this.pageAction = this.activatedRoute.snapshot.params.action;
    switch (this.pageAction) {
      case 'create':
        this.getMenuNoHome();
        break;

      case 'edit':
        const resourceId = this.activatedRoute.snapshot.params.resourceId;
        this.editAsyncFunc(resourceId);
        break;

      case 'detail':
        const rId = this.activatedRoute.snapshot.params.resourceId;
        this.editAsyncFunc(rId);
        break;

      default:
        break;
    }
  }

  ngOnInit() {
    this.initParams();
  }

  async editAsyncFunc(resourceId) {
    await this.getMenuNoHome();
    await this.getEditLink(resourceId);
    const selectItem = this.menuSelectList.filter(item => {
      return item.id === this.buildForm.value.parentId;
    });
    this.mapRoleSelectedInMenusRoles(selectItem[0].resourceId);
  }

  // 初始化参数和表单
  initParams() {
    this.buildForm = this.fb.group({
      parentId: [{ value: null, disabled: false }, [Validators.required]],
      desc: [null, [Validators.required]],
      sortNum: [null],
      sourceType: [null, [Validators.required]],
      action: [null, [Validators.required]],
      isView: [null, [Validators.required]],
      roleVOs: [null, [this.confirmationValidator]]
    });
    this.buildForm.patchValue({
      sourceType: 'N'
    });
  }

  async getEditLink(resourceId) {
    LoadingService.show();
    return new Promise((resolve, reject) => {
      this.manageService.getDirectoryById(resourceId).subscribe(res => {
        resolve();
        LoadingService.close();
        this.detailItem = res.result;
        this.buildForm.patchValue({
          parentId: res.result.parentId,
          desc: res.result.desc,
          sortNum: res.result.sortNum,
          sourceType: res.result.sourceType,
          action: res.result.action,
          isView: res.result.isView,
          roleVOs: []
        });
        // this.buildForm.get('parentId').disable();
      });
    });
  }

  sourceTypeChanged(evt) {
    if (evt === 'Y') {
      this.getRegistUrl();
    }
  }

  menuChanged(id) {
    console.log(id);
    const selectItem = this.menuSelectList.filter(item => {
      return item.id === id;
    });
    console.log(selectItem);
    this.getRoleListByMenu(selectItem[0].resourceId);
  }

  // 获取角色列表
  getRoleListByMenu(resourceId) {
    if (this.pageAction !== 'create') { return false; }
    const arr = [];
    LoadingService.show();
    this.manageService.getRoleByMenu(resourceId).subscribe(resp => {
      LoadingService.close();
      this.roleList = resp.result.filter(item => {
        return item.checked;
      });
      this.roleList.forEach(item => {
        const node = {
          label: item.displayName,
          value: item.externalId,
          checked: item.checked
        };
        arr.push(node);
      });
      this.buildForm.patchValue({
        roleVOs: arr
      });
    });
  }

  mapRoleSelectedInMenusRoles(resourceId) {
    const arr = [];
    LoadingService.show();
    this.manageService.getRoleByMenu(resourceId).subscribe(resp => {
      LoadingService.close();
      this.roleList = resp.result.filter(item => {
        return item.checked;  // 筛选目录对应的角色
      });
      const editedItemRoles = this.detailItem['roles'].filter(item => {
        return item.checked;
      });
      this.roleList.forEach(item => {
        let checked = false;
        for (const tm of editedItemRoles) {
          if (item.id === tm.id) {
            checked = true;
          }
        }
        const node = {
          label: item.displayName,
          value: item.externalId,
          checked
        };
        arr.push(node);
      });
      this.buildForm.patchValue({
        roleVOs: arr
      });
    });
  }

  // 获取目录下拉
  async getMenuNoHome() {
    this.menuSelectList = [];
    return new Promise((resolve, reject) => {
      this.manageService.getNoHomeMenusApi().subscribe(resp => {
        if (resp.resultCode === '0') {
          resolve();
          this.menuSelectList = resp.result;
        }
      });
    });
  }

  // 已注册url下拉
  getRegistUrl() {
    this.manageService.alreadyUrlApi().subscribe(resp => {
      console.log(resp);
      this.applicationLibArr = resp.resources;
    });
  }

  submit() {
    console.log(this.buildForm.value);
    LoadingService.show();
    if (this.pageAction == 'create') {
      this.manageService.addSysLinkApi(this.buildForm.value).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.getMenuAgain();
          this.messageService.success('添加链接成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/applicat-list');
          }, 2000);
        }
      });
    } else {
      const resourceId = this.activatedRoute.snapshot.params.resourceId;
      this.manageService.updateSysLinkApi(resourceId, this.buildForm.value).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.getMenuAgain();
          this.messageService.success('修改链接成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/applicat-list');
          }, 2000);
        }
      });
    }
  }

  getMenuAgain() {
    const user: USER = JSON.parse(localStorage.getItem(CONSTANTS.userInfo));
    const userName = user.id;
    this.manageService.getSysMenus(userName).subscribe(res => {
      this._state.notifyDataChanged('menu.data', res.result);
    })
  }

}
