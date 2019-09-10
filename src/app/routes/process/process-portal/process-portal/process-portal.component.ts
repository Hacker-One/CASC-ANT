import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {ClassifyService, CommonService, LoadingService} from '../../../../core';
import {NzFormatEmitEvent, NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-process-portal',
  templateUrl: './process-portal.component.html',
  styleUrls: ['./process-portal.component.scss'],
  providers: [ClassifyService]
})
export class ProcessPortalComponent implements OnInit {
  public classifyForm: FormGroup;
  public treeList = [];
  public portalList = [
    '加班申请', '请假管理', '财务报销', '其他流程', 'XXXX流程', 'XXXX流程', 'XXXX流程', 'XXXX流程', 'XXXX流程',
  ];
  public currentTreeList: any;    // 当前点击的树列表

  constructor(
    private service: ClassifyService,
    private message: NzMessageService
  ) {
  }

  ngOnInit() {
    this.initTree();
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
  }
}
