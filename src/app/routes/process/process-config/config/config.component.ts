import { Component, OnInit } from '@angular/core';
import {CommonService, ConfigService, LoadingService, ClassifyService} from '../../../../core';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

@Component({
  selector: 'app-config',
  templateUrl: './config.component.html',
  styleUrls: ['./config.component.scss'],
  providers: [ConfigService, ClassifyService]
})
export class ConfigComponent implements OnInit {
  public configParams = {
    currentNum: 1,
    pagePerNum: 20,
    name: null,
    flowCategoryId: null,
    status: null,
    flowCategoryName: null
  };
  public configData = CommonService.pagination;
  public tableLoading = false;
  private treeArray = [];

  constructor(
    private configService: ConfigService,
    private classifyService: ClassifyService,
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.classifyListService();
  }

  // 获取列表配置信息
  configDataService(page?) {
    if (page) { this.configData.currentNum = page; }
    this.configData.result = [];
    this.tableLoading = true;
    this.configService.configListApi(this.configParams).subscribe(resp => {
      this.tableLoading = false;
      if (resp.resultCode === '0') {
        this.configData = resp;
        this.configData.result.forEach(item => {
          const data = this.treeArray.filter(ite => ite.key === item.flowCategoryId);
          if (data.length > 0) {
            item.flowCategoryName = data[0].title;
          }
        });
      }
    }, () => this.tableLoading = false);
  }

  // 删除确认
  deleteConfig(id: string) {
    this.modalService.confirm({
      nzTitle: '确定要删除么？',
      nzOnOk: () => this.deleteService(id)
    });
  }

  // 删除列表
  deleteService(id: string) {
    LoadingService.show();
    this.configService.processDeleteApi(id).subscribe(resp => {
      LoadingService.show();
      this.configDataService();
      if (resp.resultCode === '0') {
        this.messageService.success('删除成功');
      }
    }, () => this.configDataService());
  }

  // 树数据查询
  classifyListService() {
    this.classifyService.classifyListApi().subscribe(resp => {
      if (resp.resultCode === '0' && resp.result) {
        this.handleTree(resp.result);
        this.configDataService();
      }
    });
  }

  // 合并树为一维数组
  handleTree(data) {
    data.forEach(item => {
      this.treeArray.push(item);
      if (item.children) {
        this.handleTree(item.children);
      }
    });
  }
}
