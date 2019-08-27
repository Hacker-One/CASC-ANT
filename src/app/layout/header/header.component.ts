import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageService } from '../../core';
import { Router } from '@angular/router';
import { GlobalState } from '../../global.state';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { CONSTANTS, USER } from 'src/app/constants';
import { UploadXHRArgs, NzMessageService } from 'ng-zorro-antd';
import { HttpRequest, HttpClient, HttpEvent, HttpEventType, HttpResponse } from '@angular/common/http';

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
  userName = 'fangshufeng';
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
    });
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
    this.getUserInfo(this.userName);
    this.getTopMenu(this.userName);
  }

  getUserInfo(uId) {
    this.avatarUploadUrl = `/users/${uId}/upload`;
    this.manageService.getUserInfo(uId).subscribe(res => {
      this.userInfo = res;
      this.photoImgUrl = res.photo + '?' + new Date().getTime();
      localStorage.setItem(CONSTANTS.userInfo, JSON.stringify(res));
    })
  }

  getTopMenu(uId) {
    this.manageService.getSysMenus(uId).subscribe(res => {
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
        this.getUserInfo(this.userName);
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
    this.router.navigate([`${element.action}`]);
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
    this.manageService.updateUserInfo(this.userName, this.buildForm.value).subscribe(res => {
      this.message.success('更新成功');
      this.getUserInfo(this.userName);
      this.modalOkLoading = true;
      this.isVisible = false;
    })
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}