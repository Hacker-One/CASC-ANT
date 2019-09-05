import { Component, OnInit } from '@angular/core';
import { LoadingService, ManageService } from '../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalState } from 'src/app/global.state';
import { USER, CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-application-directory',
  templateUrl: './application-directory.component.html',
  styleUrls: ['./application-directory.component.scss'],
})
export class ApplicationDirectoryComponent implements OnInit {
  public buildForm: FormGroup;
  public roleList = []; // 角色列表
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.every(item => item.checked === false)) {
      return { error: true };
    }
    return {};
  };
  pageAction = '';

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _state: GlobalState
  ) {
    this.pageAction = this.activatedRoute.snapshot.params.action;
    switch (this.pageAction) {
      case 'create':
        this.getRoleList();
        break;

      case 'edit':
        const resourceId = this.activatedRoute.snapshot.params.resourceId;
        this.getEditDir(resourceId);
        break;

      case 'detail':
        const rId = this.activatedRoute.snapshot.params.resourceId;
        this.getDetailDir(rId);
        break;

      default:
        break;
    }
  }

  ngOnInit() {
    this.initParams();
  }

  // 初始化参数和表单
  initParams() {
    this.buildForm = this.fb.group({
      desc: [{ value: null, disabled: false }, [Validators.required]],
      pdesc: [null, [Validators.required]],
      sortNum: [null],
      roleVOs: [null, [this.confirmationValidator]]
    });
  }

  // 获取角色列表
  getRoleList() {
    let arr = [];
    this.manageService.getRoleListApi({ currentNum: 1, pagePerNum: 100 }).subscribe(resp => {
      this.roleList = resp.result.resources;
      resp.result.resources.forEach(item => {
        const node = {
          label: item.displayName,
          value: item.externalId,
          checked: false
        };
        arr.push(node);
      });
      this.buildForm.patchValue({
        roleVOs: arr
      });
    });
  }

  getEditDir(resourceId) {
    let arr = [];
    LoadingService.show();
    this.manageService.getDirectoryById(resourceId).subscribe(res => {
      LoadingService.close();
      this.roleList = res.result.roles;
      res.result.roles.forEach(item => {
        const node = {
          label: item.displayName,
          value: item.externalId,
          checked: item.checked
        };
        arr.push(node);
      });
      this.buildForm.patchValue({
        desc: res.result.desc,
        pdesc: res.result.pdesc,
        sortNum: res.result.sortNum,
        roleVOs: arr
      })
    })
  }

  getDetailDir(resourceId) {
    let arr = [];
    LoadingService.show();
    this.manageService.getDirectoryById(resourceId).subscribe(res => {
      LoadingService.close();
      res.result.roles.forEach(item => {
        if (item.checked) {
          const node = {
            label: item.displayName,
            value: item.externalId,
            checked: item.checked
          }
          arr.push(node);
        }
      });
      this.roleList = arr;
      this.buildForm.patchValue({
        desc: res.result.desc,
        pdesc: res.result.pdesc,
        sortNum: res.result.sortNum,
        roleVOs: arr
      })
    })
  }

  // 添加目录请求
  submit() {
    const params = Object.assign(this.buildForm.value, { sourceType: 'Y' });
    LoadingService.show();
    if (this.pageAction == 'create') {
      this.manageService.addSysMenuApi(params).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.getMenuAgain();
          this.messageService.success('添加目录成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/applicat-list');
          }, 2000);
        }
      });
    } else {
      const resourceId = this.activatedRoute.snapshot.params.resourceId;
      this.manageService.updateSysMenuApi(resourceId, params).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.getMenuAgain();
          this.messageService.success('修改目录成功');
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
