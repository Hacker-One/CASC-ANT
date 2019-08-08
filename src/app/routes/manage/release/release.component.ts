import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../share/http.service';
import { GlobalState } from '../../../global.state';
import {CommonService, ManageService} from '../../../core';
import { Router } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';

export interface TableObject {
  title: string;
  deputyTitle: string;
  publisherObj: string;
  type: string;
  publisher: string;
  beginDate: string;
  endDate: string;
  approvalStatus: string;
  id: string;
}

export interface TreeNodeInterface {
  currentNum: number;
  pagePerNum: number;
  totalNum: number;
  result: TableObject[];
  resultCode?: string;
}

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss'],
})
export class ReleaseComponent implements OnInit {
  public tableLoading = false;    // table loading
  public tableData: TreeNodeInterface = CommonService.pagination;       // table data


  constructor(
    private http: HttpService,
    private _state: GlobalState,
    private manageService: ManageService,
    private router: Router,
    private messageService: NzMessageService,
    private modalService: NzModalService,
  ) { }

  ngOnInit() {
    this.getList();
  }

  // 获取列表数据请求
  getList(page?) {
    if (page) { this.tableData.currentNum = page; }
    this.tableData.result = [];
    this.tableLoading = true;
    this.manageService.infoListApi({currentNum: this.tableData.currentNum, pagePerNum: this.tableData.pagePerNum}).subscribe(resp => {
      this.tableLoading = false;
      if (resp.resultCode === '0') {
        this.tableData = resp;
      }
    }, () => this.tableLoading = false);
  }

  // 设置无效
  setInvalid(id: string) {
    this.modalService.confirm({
      nzTitle: '确定设置无效么？',
      nzOnOk: () => this.invalidService(id)
    });
  }

  // 无效请求服务
  invalidService(id: string) {
    this.manageService.infoSetInvalidApi(id).subscribe(resp => {
      if (resp.resultCode === '0') {
        this.messageService.success('设置无效成功');
        this.getList();
      }
    });
  }

}
