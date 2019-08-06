import { Component, OnInit } from '@angular/core';
import {LoadingService, ManageService} from '../../../../core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, UploadFile } from 'ng-zorro-antd';
import { HttpRequest, HttpResponse, HttpClient} from '@angular/common/http';
import {filter} from 'rxjs/operators';

@Component({
  selector: 'app-release-build',
  templateUrl: './release-build.component.html',
  styleUrls: ['./release-build.component.scss'],
})
export class ReleaseBuildComponent implements OnInit {
  public buildForm: FormGroup;
  public roleList = []; // 角色列表
  fileList = [];
  beforeUpload = (file: UploadFile): boolean => {
    this.fileList = this.fileList.concat(file);
    return false;
  }

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private messageService: NzMessageService,
    private router: Router,
    private http: HttpClient,
  ) { }

  ngOnInit() {
    this.initParams();
    this.getRoleList();
  }

  // 初始化参数和表单
  initParams() {
    this.buildForm = this.fb.group({
      title: [{value: null, disabled: false}, [Validators.required]],
      deputyTitle: [null, [Validators.required]],
      beginDate: [null, [Validators.required]],
      endDate: [null, [Validators.required]],
      publisherObj: [null, [Validators.required]],
      type: [null, [Validators.required]],
      content: [null, [Validators.required]],
      top: [null, [Validators.required]],
      Priority: [null, [Validators.required]],
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

  handleUpload(): void {
    const formData = new FormData();
    // tslint:disable-next-line:no-any
    this.fileList.forEach((file: any) => {
      formData.append('files[]', file);
    });
    // this.uploading = true;
    // You can use any AJAX library you like
    const req = new HttpRequest('POST', 'https://jsonplaceholder.typicode.com/posts/', formData, {
      // reportProgress: true
    });
    this.http
      .request(req)
      .pipe(filter(e => e instanceof HttpResponse))
      .subscribe(
        () => {
          // this.uploading = false;
          this.fileList = [];
          this.messageService.success('upload successfully.');
        },
        () => {
          // this.uploading = false;
          this.messageService.error('upload failed.');
        }
      );
  }
}
