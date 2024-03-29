import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageService, LoadingService } from '../../core';
import { Router } from '@angular/router';
import { GlobalState } from '../../global.state';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CONSTANTS, USER } from 'src/app/constants';
import { UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public buildForm: FormGroup;
  public menuList: any = [];
  isVisible = false;
  modalOkLoading = false;
  userInfo: USER;
  photoImgUrl = '';
  avatarUploadUrl = '';
  userId = 'fangshufeng';
  config = {};

  constructor(
    private manageService: ManageService,
    private router: Router,
    private _state: GlobalState,
    private fb: FormBuilder,
    private http: HttpClient,
    private message: NzMessageService
  ) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuList = menuData;
      this.setAuthrityBtnArr(menuData || []);
    });
  }

  // 按钮resourceId集合
  setAuthrityBtnArr(menuList) {
    const authrityArr = [];
    for (let elementL1 of menuList) {
      if (elementL1.hasOwnProperty('resourcess')) {
        for (let elementL2 of elementL1.resourcess) {
          if (elementL2.hasOwnProperty('resourcessButton')) {
            for (let item of elementL2.resourcessButton) {
              authrityArr.push(item.resourceId);
            }
          }
        }
      }
    }
    localStorage.setItem(CONSTANTS.authorityBtnList, JSON.stringify(authrityArr));
  }

  phoneValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!(/^1[3456789]\d{9}$/.test(control.value))) {
      return { error: true }
    }
    return {}
  }

  ngOnInit() {
    this.buildForm = this.fb.group({
      name: [{ value: null, disable: true }, [Validators.required]],
      email: [null, [Validators.email, Validators.required]],
      phoneNumber: [null, [Validators.required, this.phoneValidator]],
      photo: [null],
    });
    this.initDatas();
  }

  async initDatas() {
    if (environment.production) {
      await this.getUserId();
    }
    this.getUserInfo(this.userId);
    this.getTopMenu(this.userId);
  }

  getUserId() {
    return new Promise(resolve => {
      this.manageService.getAuthUserInfo().subscribe(res => {
        this.userId = res.id;
        resolve()
      })
    })
  }

  getUserInfo(uId) {
    this.avatarUploadUrl = `/users/${uId}/upload`;
    this.manageService.getUserInfo(uId).subscribe(res => {
      this.userInfo = res;
      this.photoImgUrl = res.photo + '?' + new Date().getTime();
      this._state.notifyDataChanged('user.data', this.userInfo);
      localStorage.setItem(CONSTANTS.userInfo, JSON.stringify(res));
    })
  }

  getTopMenu(uId) {
    LoadingService.show();
    this.manageService.getSysMenus(uId).subscribe(res => {
      LoadingService.close();
      this.menuList = res.result;
      this._state.notifyDataChanged('menu.data', this.menuList);
    });
  }

  customReq = (item: UploadXHRArgs) => {
    // Create a FormData here to store files and other parameters.
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    formData.append('file', item.file as any);
    const req = new HttpRequest('POST', item.action, item.file, {
      reportProgress: true,
      withCredentials: true
    });
    // Always returns a `Subscription` object. nz-upload would automatically unsubscribe it at correct time.
    return this.http.request(req).subscribe(
      // tslint:disable-next-line no-any
      (event: HttpEvent<any>) => {
        console.log(event);

        if (event.type === HttpEventType.UploadProgress) {
          if (event.total! > 0) {
            // tslint:disable-next-line:no-any
            (event as any).percent = (event.loaded / event.total!) * 100;
          }
          item.onProgress!(event, item.file!);
        } else if (event instanceof HttpResponse) {
          item.onSuccess!(event.body, item.file!, event);
        }
      },
      err => {
        console.log(err);
        item.onError!(err, item.file!);
      }
    );
  };

  // 上传文件
  imgHandleChange({ file, fileList }): void {
    const status = file.status;
    if (status === 'done') {
      if (file.response.photo) {
        this.message.success(`上传 ${file.name} 成功`);
        console.log(file.response);
        this.getUserInfo(this.userId);
      } else {

      }
    } else if (status === 'error') {

    }
  }

  goPage(element) {
    console.log(element);
    if (element.resourceType === 'Root' && element.resourceId !== '8shome') {
      return
    };
    if (element.action.indexOf('http') > -1) {
      window.open(element.action)
    } else {
      this.router.navigate([`${element.action}`]);
    }
  }

  showModal(): void {
    this.isVisible = true;
    this.setUserInfoForm();
  }

  setUserInfoForm() {
    const idx = this.userInfo.photo.lastIndexOf('qloudauth');
    const photoVal = this.userInfo.photo.substr(idx + 9, this.userInfo.photo.length);
    console.log(photoVal);
    this.buildForm.patchValue({
      name: this.userInfo.name,
      email: this.userInfo.email,
      phoneNumber: this.userInfo.phoneNumber,
      photo: photoVal
    })
  }

  submit() {
    console.log('Button ok clicked!');
    this.modalOkLoading = true;
    this.manageService.updateUserInfo(this.userId, this.buildForm.value).subscribe(res => {
      this.message.success('更新成功');
      this.getUserInfo(this.userId);
      this.modalOkLoading = true;
      this.isVisible = false;
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}