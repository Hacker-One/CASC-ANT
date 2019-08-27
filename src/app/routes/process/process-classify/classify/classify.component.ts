import { Component, OnInit } from '@angular/core';
import { NzFormatEmitEvent } from 'ng-zorro-antd';
import { ClassifyService, CommonService, LoadingService } from '../../../../core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-classify',
  templateUrl: './classify.component.html',
  styleUrls: ['./classify.component.scss'],
  providers: [ ClassifyService ]
})
export class ClassifyComponent implements OnInit {
  public classifyForm: FormGroup;
  array = [1, 2, 3, 4];
  effect = 'scrollx';
  public treeList = [];
  public currentTreeList: any;      // 当前点击的树列表
  public currentParentList: any;    // 当前点击的父级树列表
  public formType: string;          // form显示类型

  constructor(
    private service: ClassifyService,
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.initParams();
    this.initTree();
  }

  // 初始化参数，表单
  initParams() {
    this.classifyForm = this.fb.group({
      id: [{value: null, disabled: false}, [Validators.required]],
      name: [null, [Validators.required]],
      status: [null, [Validators.required]],
      parentId: [null, [Validators.required]],
      createBy: [null, [Validators.required]],
      updateBy: [null, [Validators.required]],
    });
  }

  // 初始化文档树数据
  initTree() {
    this.treeList = [];
    this.service.classifyListApi().subscribe(resp => {
      if (resp.resultCode === '0' && resp.result) {
        this.treeList = CommonService.modifyField(resp.result, 'id', 'key');
      } else {
        if (this.treeList.length === 0) {
          this.classifyForm.get('parentId').clearValidators();
        } else {
          this.classifyForm.get('parentId').setValidators(Validators.required);
        }
      }
    });
  }

  // 点击获取tree当前数据
  getTreeList(event: NzFormatEmitEvent): void {
    console.log(event);
    this.currentTreeList = event.node.origin;
    if (event.node.parentNode) {
      this.currentParentList = event.node.parentNode.origin;
    } else {
      this.currentParentList = {};
    }
    this.classifyForm.patchValue({
      parentId: event.node.origin.key
    });
  }

  // 树添加列表
  treeBuild() {
    this.formType = 'build';
    this.classifyForm.get('id').enable();
    this.classifyForm.removeControl('updateBy');
    this.classifyForm.addControl('createBy', this.fb.control(null, [Validators.required]));
  }

  // 树修改
  treeModify() {
    this.formType = 'update';
    this.classifyForm.get('id').disable();
    this.classifyForm.removeControl('createBy');
    this.classifyForm.addControl('updateBy', this.fb.control(null, [Validators.required]));
    if (typeof this.currentTreeList === 'object' && this.currentTreeList.hasOwnProperty('key')) {
      this.classifyForm.patchValue({
        id: this.currentTreeList.key,
        name: this.currentTreeList.name,
        status: this.currentTreeList.status,
        parentId: this.currentParentList.key
      });
    }
  }

  // 新建
  submitOperator() {
    LoadingService.show();
    const params = CommonService.modifyField(this.classifyForm.value, 'key', 'id');
    this.service.addTreeNodeApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('添加节点成功');
        this.initTree();
        this.classifyForm.reset();
        this.formType = '';
      }
    });
  }

  // 更新
  updateOperator() {
    LoadingService.show();
    const params = Object.assign({}, {id: this.currentTreeList.key});
    this.service.updateTreeNodeApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('修改节点成功');
        this.initTree();
        this.classifyForm.reset();
        this.formType = '';
      }
    });
  }

  // 删除树节点操作
  deleteTreeOperator() {
    this.modalService.confirm({
      nzTitle: `确定要删除 ${this.currentTreeList.name} 节点么?`,
      nzOnOk: () => this.deleteTreeService()
    });
  }

  // 删除树节点服务
  deleteTreeService() {
    LoadingService.show();
    console.log(this.currentTreeList);
    this.service.deleteTreeNodeApi(this.currentTreeList.key).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('删除节点成功');
        this.initTree();
      }
    });
  }

}
