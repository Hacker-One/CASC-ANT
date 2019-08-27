import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ManageService } from '../../../../core/api';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { CommonService, LoadingService } from 'src/app/core';
import { GlobalState } from 'src/app/global.state';
import { USER, CONSTANTS } from 'src/app/constants';

@Component({
  selector: 'app-account-detail',
  templateUrl: './account-detail.component.html',
  styleUrls: ['./account-detail.component.scss']
})
export class AccountDetailComponent implements OnInit {
  pageAction = '';
  buildForm: FormGroup;
  roleList = [];
  detailItem: any;
  checked = true;

  constructor(
    private manageService: ManageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private message: NzMessageService,
    private _state: GlobalState
  ) {
    const userId = this.activatedRoute.snapshot.params.userId;
    this.pageAction = this.activatedRoute.snapshot.params.action;
    this.getEditDetail(userId);
  }

  ngOnInit() {
    this.buildForm = this.fb.group({
      id: [{ value: null, disabled: false }],
      name: [{ value: null, disabled: false }],
      email: [{ value: null, disabled: false }],
      vo: [{ value: null, disabled: false }]
    })
  }

  getEditDetail(id) {
    if (this.pageAction == 'edit') {
      this.manageService.getAccountDetail(id).subscribe(res => {
        this.getRoleList(res);
        this.buildForm.get('id').disable();
        this.buildForm.patchValue({
          id: res.id,
          name: res.name,
          email: res.email
        })
      })
    } else {
      this.manageService.getAccountDetail(id).subscribe(res => {
        this.detailItem = res;
      })
    }
  }

  getRoleList(detailDatas) {
    const arr = [];
    this.manageService.getRoleListApi({ currentNum: 1, pagePerNum: 100 }).subscribe(resp => {
      this.roleList = resp.resources;
      this.roleList.map(element => {
        element['checked'] = false;
        if (detailDatas.hasOwnProperty('rolevos')) {
          for (let emt of detailDatas['rolevos']) {
            if (element.id == emt.id) {
              element['checked'] = true;
            }
          }
        }
        return element;
      })
      this.roleList.forEach(item => {
        const node = {
          label: item.displayName,
          value: item.externalId,
          checked: item.checked
        };
        arr.push(node);
      });
      this.buildForm.patchValue({
        vo: arr
      })
    })
  }

  submit() {
    const userId = this.buildForm.value.id;
    const param = CommonService.modifyField({ vo: this.buildForm.value.vo }, 'value', 'id');
    LoadingService.show();
    this.manageService.updateAccount(userId, param).subscribe(res => {
      LoadingService.close();
      this.message.create('success', '更新成功');
      this.getMenuAgain();
      this.router.navigate(['/manage/account-list']);
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
