import { Component, OnInit } from '@angular/core';
import { LoadingService, ManageService} from '../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {NzMessageService, UploadFile, UploadXHRArgs} from 'ng-zorro-antd';
import {HttpRequest, HttpResponse, HttpClient, HttpEvent, HttpEventType} from '@angular/common/http';
import qs from 'qs';
import {Observable, Observer} from 'rxjs';

@Component({
  selector: 'app-release-build',
  templateUrl: './release-build.component.html',
  styleUrls: ['./release-build.component.scss'],
})
export class ReleaseBuildComponent implements OnInit {
  public buildForm: FormGroup;
  public fileList = [];                       // 上传文件列表
  public uploadUrl = '/system/uploadfile?';   // 上传文件地址
  public config = {
    initialFrameHeight: 300,    // 初始化编辑器高度
    autoHeightEnabled: false,   // 是否自动长高
    imagePathFormat: '/system/uploadfile',
    ActionName: 'uploadimage',
    toolbars: [
      [
        'anchor', // 锚点
        'undo', // 撤销
        'redo', // 重做
        'bold', // 加粗
        'indent', // 首行缩进
        'italic', // 斜体
        'underline', // 下划线
        'strikethrough', // 删除线
        'subscript', // 下标
        'fontborder', // 字符边框
        'superscript', // 上标
        'formatmatch', // 格式刷
        'source', // 源代码
        'blockquote', // 引用
        'pasteplain', // 纯文本粘贴模式
        'selectall', // 全选
        'preview', // 预览
        'horizontal', // 分隔线
        'removeformat', // 清除格式
        'time', // 时间
        'date', // 日期
        'insertrow', // 前插入行
        'insertcol', // 前插入列
        'mergeright', // 右合并单元格
        'mergedown', // 下合并单元格
        'deleterow', // 删除行
        'deletecol', // 删除列
        'splittorows', // 拆分成行
        'splittocols', // 拆分成列
        'splittocells', // 完全拆分单元格
        'deletecaption', // 删除表格标题
        'inserttitle', // 插入标题
        'mergecells', // 合并多个单元格
        'deletetable', // 删除表格
        'cleardoc', // 清空文档
        'insertparagraphbeforetable', // "表格前插入行"
        'insertcode', // 代码语言
        'fontfamily', // 字体
        'fontsize', // 字号
        'paragraph', // 段落格式
        'simpleupload', // 单图上传
        'insertimage', // 多图上传
        'edittable', // 表格属性
        'edittd', // 单元格属性
        'link', // 超链接
        'unlink', // 取消链接
        'spechars', // 特殊字符
        'searchreplace', // 查询替换
        'map', // Baidu地图
        'justifyleft', // 居左对齐
        'justifyright', // 居右对齐
        'justifycenter', // 居中对齐
        'justifyjustify', // 两端对齐
        'forecolor', // 字体颜色
        'backcolor', // 背景色
        'insertorderedlist', // 有序列表
        'insertunorderedlist', // 无序列表
        'fullscreen', // 全屏
        'directionalityltr', // 从左向右输入
        'directionalityrtl', // 从右向左输入
        'rowspacingtop', // 段前距
        'rowspacingbottom', // 段后距
        'pagebreak', // 分页
        'imagenone', // 默认
        'imageleft', // 左浮动
        'imageright', // 右浮动
        'imagecenter', // 居中
        'lineheight', // 行间距
        'edittip ', // 编辑提示
        'customstyle', // 自定义标题
        'autotypeset', // 自动排版
        'touppercase', // 字母大写
        'tolowercase', // 字母小写
        'background', // 背景
        'scrawl', // 涂鸦
        'inserttable', // 插入表格
        'wordimage',
      ]
    ]
  };                         // 编辑器配置
  private paramsId: string;                   // 当前页查询id
  public enclosureJsons = [];                 // 附件
  public imagesJsons = [];                    // 附件
  imgFileList = [];

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private messageService: NzMessageService,
    private router: Router,
    private http: HttpClient,
    private activatedRoute: ActivatedRoute,
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
        data.rangeDate = [new Date(resp.result.beginDate), new Date(resp.result.endDate)];
        this.enclosureJsons = JSON.parse(resp.result.enclosureJson || '[]');
        this.imagesJsons = JSON.parse(resp.result.imagesJson || '[]');
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
      console.log(file, fileList);
      this.fileList = fileList;
    }
    if (status === 'done') {
      if (file.response.resultCode === '0') {
        this.messageService.success(`上传 ${file.name} 成功`);
      } else {
        this.messageService.error(`上传文件失败`);
      }
    } else if (status === 'error') {
      this.messageService.error(`上传文件失败`);
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
    const req = new HttpRequest('POST', item.action + qs.stringify(uploadParams), formData, {
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
    if (status !== 'uploading') {
      console.log(file, fileList);
      this.imgFileList = fileList;
    }
    if (status === 'done') {
      if (file.response.resultCode === '0') {
        this.messageService.success(`上传 ${file.name} 成功`);
      } else {
        this.messageService.error(`上传文件失败`);
      }
    } else if (status === 'error') {
      this.messageService.error(`上传文件失败`);
    }
  }

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

  // 参数处理
  paramsHandle(requestType: string) {
    const enclosureJsons = this.fileList.map(item => item.response.result);
    const params: any = Object.assign({enclosureJsons}, this.buildForm.value);
    params.beginDate = params.rangeDate[0].getTime();
    params.endDate = params.rangeDate[1].getTime();
    params.requestType = requestType;
    if (this.paramsId || this.buildForm.value.type === '2') {
      params.imagesJsons = this.imgFileList.map(item => item.response.result);
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
      }
    }, () => LoadingService.close());
  }

  // 更新编辑
  update(requestType: string) {
    const params = this.paramsHandle(requestType);
    params.id = this.paramsId;
    params.enclosureJsons.concat(this.enclosureJsons);
    params.imagesJsons.concat(this.imagesJsons);
    LoadingService.show();
    this.manageService.editInfoApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('保存成功');
        this.router.navigate(['/manage/info-release']);
      }
    }, () => LoadingService.close());
  }

  // 下载附件
  fileDownload(href: string) {
    location.href = href;
  }

  // 删除file
  deleteFile(fileName: string) {
    this.enclosureJsons = this.enclosureJsons.filter(item => item.enclosureName !== fileName);
  }

  ready(e) {
    console.log(e);
  }
}

