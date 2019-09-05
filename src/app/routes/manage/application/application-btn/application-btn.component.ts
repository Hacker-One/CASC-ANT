import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, Validators, FormBuilder, FormControl } from '@angular/forms';
import { ManageService, LoadingService } from '../../../../core';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalState } from 'src/app/global.state';
import { USER, CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-application-btn',
  templateUrl: './application-btn.component.html',
  styleUrls: ['./application-btn.component.scss']
})
export class ApplicationBtnComponent implements OnInit {
  public buildForm: FormGroup;
  public menuSelectList = [];
  public applicationLibArr = [];
  public roleList = []; // 角色列表
  pageAction = '';

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService: NzMessageService,
    private _state: GlobalState
  ) {
  }

  ngOnInit() {
    this.buildForm = this.fb.group({
      parentId: [this.activatedRoute.snapshot.params.parentId, [Validators.required]],
      desc: [null, [Validators.required]],
      resourceId: [null, [Validators.required]],
      action: [null, [Validators.required]],
      sourceType: [1, [Validators.required]],
      isView: [1, [Validators.required]],
      sortNum: [1, [Validators.required]],
    });
    this.pageAction = this.activatedRoute.snapshot.params.action;
    switch (this.pageAction) {
      case 'edit':
        this.buildForm.patchValue({
          parentId: this.activatedRoute.snapshot.params.parentId,
          desc: this.activatedRoute.snapshot.params.desc,
          resourceId: this.activatedRoute.snapshot.params.resourceId,
          action: this.activatedRoute.snapshot.params.url,
          sourceType: 'Y',
          isView: 1,
          sortNum: 1,
        })
        break;

      default:
        break;
    }
  }

  // getEditLink(resourceId) {
  //   this.manageService.getSysButtonById(resourceId).subscribe(res => {
  //     this.buildForm.patchValue({
  //       parentId: res.result.parentId,
  //       desc: res.result.desc,
  //       resourceId: res.result.resourceId,
  //       action: res.result.action,
  //       sourceType: res.result.sourceType,
  //       isView: res.result.isView,
  //       sortNum: res.result.sortNum,
  //     })
  //   })
  // }

  submit() {
    console.log(this.buildForm.value);
    LoadingService.show();
    if (this.pageAction == 'create') {
      this.manageService.addSysButton(this.buildForm.value).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.messageService.success('添加成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/applicat-list');
          }, 2000);
        }
      });
    } else {
      const resourceId = this.activatedRoute.snapshot.params.resourceId;
      this.manageService.updateSysButton(resourceId, this.buildForm.value).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.messageService.success('修改成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/applicat-list');
          }, 2000);
        }
      });
    }
  }

}
