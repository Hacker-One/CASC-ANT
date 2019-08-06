import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {FormGroup, Validators, FormBuilder} from '@angular/forms';
import { ManageService, LoadingService } from '../../../../core';
import { NzMessageService } from 'ng-zorro-antd';

@Component({
  selector: 'app-application-link',
  templateUrl: './application-link.component.html',
  styleUrls: ['./application-link.component.scss']
})
export class ApplicationLinkComponent implements OnInit {
  public buildForm: FormGroup;
  public menuSelectList = [];

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router,
    private messageService: NzMessageService,
  ) { }

  ngOnInit() {
    this.initParams();
    this.getMenuNoHome();
    this.getRegistUrl();
  }

  // 初始化参数和表单
  initParams() {
    this.buildForm = this.fb.group({
      parentId: [{value: null, disabled: false}, [Validators.required]],
      desc: [null, [Validators.required]],
      sortNum: [null],
      sourceType: [null, [Validators.required]],
      action: [null, [Validators.required]],
      isView: [null, [Validators.required]],
    });
    this.buildForm.patchValue({
      sourceType: 'N'
    });
  }

  // 获取目录下拉
  getMenuNoHome() {
    this.menuSelectList = [];
    this.manageService.getNoHomeMenusApi().subscribe(resp => {
      if (resp.resultCode === '0') {
        this.menuSelectList = resp.result;
      }
    });
  }

  // 已注册url下拉
  getRegistUrl() {
    this.manageService.alreadyUrlApi().subscribe(resp => {
      console.log(resp);
      this.menuSelectList = resp.resources;
    });
  }

  submit() {
    console.log(this.buildForm.value);
    LoadingService.show();
    this.manageService.addSysLinkApi(this.buildForm.value).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('添加链接成功');
        setTimeout(() => {
          this.router.navigateByUrl('manage/applicat-list');
        }, 2000);
      }
    });
  }

}
