import { Component, OnInit } from '@angular/core';
import {CommonService, LoadingService, ManageService} from '../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService, UploadFile, UploadXHRArgs, NzModalService} from 'ng-zorro-antd';
import { HttpRequest, HttpResponse, HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import qs from 'qs';
import { Observable, Observer, from } from 'rxjs';

@Component({
  selector: 'app-release-build',
  templateUrl: './release-build.component.html',
  styleUrls: ['./release-build.component.scss'],
})
export class ReleaseBuildComponent implements OnInit {
  public buildForm: FormGroup;
  public imgUploadUrl = '/system/uploadfile?type=2&';    // 上传文件地址
  public fileUploadUrl = '/system/uploadfile?type=1&';   // 上传文件地址
  public config = CommonService.editConfig;             // 编辑器配置
  public paramsId: string;                              // 当前页查询id
  public imgFileList = [];                              // 图片文件列表
  public annexFileList = [];                            // 附件文件列表
  public showUploadList = {
    showPreviewIcon: true,
    showRemoveIcon: true,
    hidePreviewIconInNonImage: true
  };
  previewImage: string | undefined = '';
  previewVisible = false;

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private messageService: NzMessageService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.initParams();
  }

  // 初始化参数和表单
  initParams() {
    this.paramsId = this.activatedRoute.snapshot.queryParamMap.get('id');
    this.buildForm = this.fb.group({
      title: [{value: null, disabled: false}, [Validators.required]],
      deputyTitle: [null, [Validators.required]],     // 副标题
      rangeDate: [null, [Validators.required]],       // 有效期
      publisherObj: [null, [Validators.required]],    // 发布对象
      type: [null, [Validators.required]],            // 发布类型
      content: [null, [Validators.required]],         // 内容
      top: [null, [Validators.required]],             // 置顶天数
      priority: [null, [Validators.required]],        // 重要度
    });
    if (this.paramsId) {
      this.detailService();
    }
  }

  // 详情查询服务
  detailService() {
    this.manageService.infoByIdApi(this.paramsId).subscribe(resp => {
      if (resp.resultCode === '0') {
        const data = resp.result;
        data.rangeDate = [new Date(data.beginDate), new Date(data.endDate)];
        if (data.enclosures) {
          this.annexFileList = data.enclosures.map(item => {
            return {
              url: `/system/download/${item.enclosureName}?fileUrl=${item.enclosureUrl}`,
              name: item.enclosureName,
              id: item.id,
              type: item.type,
              enclosureName: item.enclosureName,
              enclosureUrl: item.enclosureUrl,
            };
          });
        }
        if (data.images) {
          this.imgFileList = data.images.map(item => {
            return {
              url: `/system/download/${item.enclosureName}?fileUrl=${item.enclosureUrl}`,
              name: item.enclosureName,
              id: item.id,
              type: item.type,
              enclosureName: item.enclosureName,
              enclosureUrl: item.enclosureUrl,
            };
          });
        }
        this.buildForm.patchValue({
          title: data.title,
          deputyTitle: data.deputyTitle,
          rangeDate: data.rangeDate,
          publisherObj: data.publisherObj,
          type: data.type,
          content: data.content,
          top: data.top,
          priority: data.priority,
        });
      }
    });
  }

  // 上传文件
  handleChange({ file, fileList }): void {
    const status = file.status;
    if (status !== 'uploading') {
      console.log(fileList);
    }
    if (status === 'done') {
      if (file.response.resultCode === '0') {
        this.messageService.success(`上传 ${file.name} 成功`);
        this.annexFileList.forEach(item => {
          if (item.response) {
            item.id = item.response.result.id;
            item.enclosureName = item.response.result.enclosureName;
            item.enclosureUrl = item.response.result.enclosureUrl;
            item.type = item.response.result.type;
          }
        });
      } else {
        this.annexFileList = fileList.filter(item => item.id);
        this.messageService.error('服务器异常，上传失败');
      }
    } else if (status === 'error') {
      this.annexFileList = fileList.filter(item => item.id);
    }
  }

  // 自定义上传
  customReq = (item: UploadXHRArgs) => {
    const formData = new FormData();
    formData.append('file', item.file as any);
    const fileInfo = (item.file.name as string).split('.');
    const uploadParams = {
      fileName: fileInfo[0],
      modelName: fileInfo[1],
    };
    const req = new HttpRequest('POST', item.action + qs.stringify(uploadParams), item.file, {
      reportProgress : true,
      withCredentials: true
    });
    return this.http.request(req).subscribe((event: HttpEvent<{}>) => {
      if (event.type === HttpEventType.UploadProgress) {
        if (event.total > 0) {
          (event as any).percent = event.loaded / event.total * 100;
        }
        // 处理上传进度条，必须指定 `percent` 属性来表示进度
        item.onProgress(event, item.file);
      } else if (event instanceof HttpResponse) {
        item.onSuccess(event.body, item.file, event);
      }
    }, (err) => {
      item.onError(err, item.file);
    });
  }

  // 上传文件
  imgHandleChange({ file, fileList }): void {
    const status = file.status;
    if (status === 'done') {
      if (file.response.resultCode === '0') {
        this.messageService.success(`上传 ${file.name} 成功`);
        this.imgFileList.forEach(item => {
          if (item.response) {
            item.id = item.response.result.id;
            item.enclosureName = item.response.result.enclosureName;
            item.enclosureUrl = item.response.result.enclosureUrl;
            item.type = item.response.result.type;
          }
        });
      } else {
        this.imgFileList = fileList.filter(item => item.id);
      }
    } else if (status === 'error') {
      this.imgFileList = fileList.filter(item => item.id);
    }
  }

  // 限制上传图片
  imgBeforeUpload = (file: UploadFile) => {
    return new Observable((observer: Observer<boolean>) => {
      const isJPG = file.type.includes('image');
      if (!isJPG) {
        this.messageService.error('仅支持上传图片!');
        observer.complete();
        return;
      }
      observer.next(isJPG);
      observer.complete();
    });
  }

  // 图片预览
  handlePreview = (file: UploadFile) => {
    this.previewImage = file.url;
    this.previewVisible = true;
  }

  // 图片文件删除
  removeImgFile = (file: UploadFile) => {
    this.modalService.confirm({
      nzTitle: '确定要删除吗？',
      nzOnOk: () => this.deleteFile(file)
    });
  }

  // 参数处理
  paramsHandle(requestType: string) {
    const params: any = Object.assign({enclosures: this.annexFileList}, this.buildForm.value);
    params.beginDate = params.rangeDate[0].getTime();
    params.endDate = params.rangeDate[1].getTime();
    params.requestType = requestType;
    params.contentImages = JSON.parse(localStorage.getItem('releaseEditImgInfo'));
    if (this.paramsId || this.buildForm.value.type === '2') {
      params.images = this.imgFileList;
    }
    return params;
  }

  // 添加目录请求
  submit(requestType: string) {
    const params = this.paramsHandle(requestType);
    LoadingService.show();
    this.manageService.saveInfoApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('保存成功');
        this.router.navigate(['/manage/info-release']);
        localStorage.removeItem('releaseEditImgInfo');
      } else {
        delete params.contentImages;
      }
    }, () => {
      delete params.contentImages;
      LoadingService.close();
    });
  }

  // 更新编辑
  update(requestType: string) {
    const params = this.paramsHandle(requestType);
    params.id = this.paramsId;
    LoadingService.show();
    this.manageService.editInfoApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('保存成功');
        this.router.navigate(['/manage/info-release']);
        localStorage.removeItem('releaseEditImgInfo');
      } else {
        delete params.contentImages;
      }
    }, () => {
      delete params.contentImages;
      LoadingService.close();
    });
  }

  // 删除file
  deleteFile(data) {
    const params = {
      fileName: data.enclosureName,
      fileUrl: data.enclosureUrl,
      id: data.id,
    };
    this.manageService.deleteFileApi(params).subscribe(resp => {
      if (resp.resultCode === '0') {
        this.messageService.success('删除成功');
        if (data.type === '2') {
          this.imgFileList = this.imgFileList.filter(item => item.id !== data.id);
        } else if (data.type === '1') {
          this.annexFileList = this.annexFileList.filter(item => item.id !== data.id);
        }
      }
    });
  }
}

