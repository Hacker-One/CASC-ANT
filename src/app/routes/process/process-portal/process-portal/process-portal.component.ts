import {Component, OnInit} from '@angular/core';
import {ClassifyService, CommonService, LoadingService} from '../../../../core';
import {NzFormatEmitEvent, NzMessageService} from 'ng-zorro-antd';

@Component({
  selector: 'app-process-portal',
  templateUrl: './process-portal.component.html',
  styleUrls: ['./process-portal.component.scss'],
  providers: [ClassifyService]
})
export class ProcessPortalComponent implements OnInit {
  public treeList = [];
  public portalList = [];

  constructor(
    private service: ClassifyService,
  ) {
  }

  ngOnInit() {
    this.initTree();
  }

  // 初始化文档树数据
  initTree() {
    this.treeList = [];
    this.service.treeByUserApi('fangshufeng').subscribe(resp => {
      if (resp.resultCode === '0' && resp.result) {
        this.treeList = CommonService.modifyField(resp.result, 'id', 'key');
        this.treeList = this.cycleTree(this.treeList);
        console.log(this.treeList);
      }
    });
  }

  // 循环树形结构
  cycleTree(data) {
    for (const item in data) {
      if (data[item].children) {
        data[item].portalList = data[item].children.filter(ite => ite.isFlow);
        data[item].children = data[item].children.filter(ite => !ite.isFlow);
        this.cycleTree(data[item].children);
      } else {
        data[item].portalList = [];
      }
    }
    return data;
  }

  // 点击获取tree当前数据
  getTreeList(event: NzFormatEmitEvent): void {
    this.portalList = event.node.origin.portalList;
  }
}
