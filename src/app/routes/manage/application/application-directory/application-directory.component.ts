import { Component, OnInit } from '@angular/core';
import {LoadingService, ManageService} from '../../../../core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';

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
  }

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private messageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.initParams();
    this.getRoleList();
  }

  // 初始化参数和表单
  initParams() {
    this.buildForm = this.fb.group({
      desc: [{value: null, disabled: false}, [Validators.required]],
      pdesc: [null, [Validators.required]],
      sortNum: [null],
      rExtId: [null, [this.confirmationValidator]],
    });
  }

  // 获取角色列表
  getRoleList() {
    const arr = [];
    this.manageService.getRoleListApi({currentNum: 1, pagePerNum: 100}).subscribe(resp => {
      this.roleList = resp.resources;
      resp.resources.forEach(item => {
        const node = {
          label: item.displayName,
          value: item.externalId,
          checked: false
        };
        arr.push(node);
      });
      this.buildForm.patchValue({
        rExtId: arr
      });
    });
  }

  // 添加目录请求
  submit() {
    const rExtIds = [];
    this.buildForm.value.rExtId.forEach(item => {
      if (item.checked) { rExtIds.push(item.value); }
    });
    const params = Object.assign({rExtIds}, this.buildForm.value, {sourceType: 'Y'});
    LoadingService.show();
    this.manageService.addSysMenuApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('添加目录成功');
        setTimeout(() => {
          this.router.navigateByUrl('manage/applicat-list');
        }, 2000);
      }
    });
  }
}
