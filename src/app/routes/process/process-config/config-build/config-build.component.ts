import { Component, OnInit } from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormArray} from '@angular/forms';
import {ConfigService, ClassifyService, CommonService, LoadingService} from '../../../../core';
import { NzMessageService } from 'ng-zorro-antd';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-config-build',
  templateUrl: './config-build.component.html',
  styleUrls: ['./config-build.component.scss'],
  providers: [ConfigService, ClassifyService]
})
export class ConfigBuildComponent implements OnInit {
  public buildForm: FormGroup;
  public appArray = [];         // 流程下拉列表
  public processArray = [];     // 流程下拉列表
  public processIds = [];       // 流程id下拉列表
  public treeList = [];
  private paramsId: string;
  private editMark: boolean;    // 限制编辑时数据覆盖事件(参数信息)

  get variableParams() {
    return this.buildForm.get('originFlowVariable') as FormArray;
  }

  constructor(
    private fb: FormBuilder,
    private configService: ConfigService,
    private classifyService: ClassifyService,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
  ) { }

  // 流程列表对象处理
  static handleProcessList(data) {
    const arr = [];
    for (const key in data) {
      if (data[key]) {
        const obj = {
          name: key,
          list: data[key],
        };
        arr.push(obj);
      }
    }
    return arr;
  }

  // 流程列表参数信息处理
  static handleParams(data) {
    const arr = [];
    for (const key in data) {
      if (data[key]) {
        const obj = {
          name: key,
          type: data[key]['type'],
          value: data[key]['value'],
        };
        arr.push(obj);
      }
    }
    return arr;
  }

  ngOnInit() {
    this.initParams();
    this.appListService();
    this.processListService();
    this.classifyListService();
  }

  // 初始化信息
  initParams() {
    this.buildForm = this.fb.group({
      name: [null, [Validators.required]],
      appInfo: [null, [Validators.required]],
      formName: [null, [Validators.required]],
      formKey: [null, [Validators.required]],
      originFlowObj: [null, [Validators.required]], // 流程对象
      originFlowKey: [null, [Validators.required]], // 流程名称
      originFlowId: [{value: null, disabled: true}],  // 流程id
      flowCategoryId: [null], // 流程分类
      flowCategoryShowID: [{value: null, disabled: true}], // 流程分类id
      originFlowVariable: this.fb.array([], [Validators.required]), // 参数信息
      createBy: [null, [Validators.required]], // 创建人
      url: [null, [Validators.required]],   // 链接
      status: [null, [Validators.required]],   // 状态
    });
    this.paramsId = this.activatedRoute.snapshot.queryParamMap.get('id');
  }

  // 获取域名列表service
  appListService() {
    this.appArray = [];
    this.configService.appListApi().subscribe(resp => {
      this.appArray = resp.resources;
    });
  }

  // 获取流程名称列表service
  processListService() {
    this.processArray = [];
    this.configService.processListApi().subscribe(resp => {
      if (resp.resultCode === '0') {
        this.processArray = ConfigBuildComponent.handleProcessList(resp.result);
        if (this.paramsId) {
          this.detailService();
        }
      }
    });
  }

  // 流程名称change
  processSelectChange(type, event) {
    if (!event) {return false; }
    switch (type) {
      case 'name':
        this.buildForm.patchValue({
          originFlowKey: event.name
        });
        this.processIds = event.list;
        this.buildForm.get('originFlowId').reset();
        this.buildForm.get('originFlowId').enable();
        break;
      case 'id':
        if (!this.editMark) {
          this.paramInfoByProcess();
        }
        break;
      case 'tree':
        this.buildForm.patchValue({
          flowCategoryShowID: event
        });
        break;
    }
  }

  // 流程分类列表
  classifyListService() {
    this.classifyService.classifyListApi().subscribe(resp => {
      if (resp.resultCode === '0' && resp.result) {
        this.treeList = CommonService.modifyField(
          CommonService.modifyField(resp.result, 'id', 'key'), 'name', 'title');
      }
    });
  }

  // 根据流程key或id获取参数信息
  paramInfoByProcess() {
    const param: any = {
      key: this.buildForm.value.originFlowKey,
    };
    if (this.buildForm.value.originFlowId) {
      param.id = this.buildForm.value.originFlowId;
    }
    while (this.variableParams.length !== 0) {
      this.variableParams.removeAt(0);
    }
    this.configService.processParamsInfoApi(param).subscribe(resp => {
      if (resp.resultCode === '0' && resp.result) {
        ConfigBuildComponent.handleProcessList(resp.result).forEach(item => {
          item.type = null;
          item.value = item.list['value'] || null;
          this.variableParams.push(this.fb.group(item));
        });
      }
    });
  }

  // 表单参数处理
  formParams(): any {
    const params: any = Object.assign(this.buildForm.value);
    params.appName = params.appInfo.desc;
    params.appId = params.appInfo.externalId;
    const originFlowVariables: any = {};
    params.originFlowVariable.forEach(item => {
      originFlowVariables[item.name] = {
        type: item.type || null,
        value: item.value || null
      };
    });
    params.originFlowVariables = JSON.stringify(originFlowVariables);
    return params;
  }

  // 提交表单
  submitForm() {
    LoadingService.show();
    this.configService.configAddApi(this.formParams()).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('创建成功');
        this.router.navigate(['/config']);
      }
    });
  }

  // 详情查询服务
  detailService() {
    LoadingService.show();
    this.configService.processQueryApi(this.paramsId).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        const data = resp.result;
        const originFlowObjs = this.processArray.filter(item => item.name === data.originFlowKey)[0];
        this.processIds = [...originFlowObjs.list];
        this.editMark = true;
        this.processSelectChange('name', originFlowObjs);
        let originFlowVariables: any;
        if (data.originFlowVariables) {
          originFlowVariables = JSON.parse(data.originFlowVariables);
        }
        this.buildForm.patchValue({
          name: data.name,
          appInfo: this.appArray.filter(item => item.externalId === data.appId),
          formName: data.formName,
          formKey: data.formKey,
          originFlowObj: originFlowObjs,
          originFlowId: data.originFlowId,
          flowCategoryId: data.flowCategoryId,
          flowCategoryShowID: data.flowCategoryId,
          createBy: data.createBy,
          url: data.url,
          status: data.status,
        });
        this.editMark = false;
        while (this.variableParams.length !== 0) {
          this.variableParams.removeAt(0);
        }
        ConfigBuildComponent.handleParams(originFlowVariables).forEach(item => {
          this.variableParams.push(this.fb.group(item));
        });

      }
    });
  }

  // 编辑表单
  updateForm() {
    const params = this.formParams();
    params.id = this.paramsId;
    LoadingService.show();
    this.configService.configUpdateApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
       this.messageService.success('编辑成功');
       this.router.navigate(['/config']);
      }
    });
  }

}
