import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../share/http.service';
import { GlobalState } from '../../../global.state';
import { CommonService, ManageService } from '../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { NzMessageService, NzModalService } from 'ng-zorro-antd';
import { FormGroup, FormBuilder } from '@angular/forms';
import { AUTHORITYBTNMAPPING } from 'src/app/constants';

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
  public authority = AUTHORITYBTNMAPPING;
  public tableLoading = false;    // table loading
  public tableData: TreeNodeInterface = CommonService.pagination;       // table data
  searchForm: FormGroup;

  constructor(
    private manageService: ManageService,
    private router: Router,
    private messageService: NzMessageService,
    private modalService: NzModalService,
    private fb: FormBuilder,
    private activatedRoute: ActivatedRoute
  ) {

  }

  ngOnInit() {
    const type = this.activatedRoute.snapshot.queryParamMap.get('type');
    this.searchForm = this.fb.group({
      title: [''],
      type: [type],
    });
    this.getList();
  }

  submitForm(value: any): void {
    for (const key in this.searchForm.controls) {
      this.searchForm.controls[key].markAsDirty();
      this.searchForm.controls[key].updateValueAndValidity();
    }
    this.getList();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.searchForm.reset();
    for (const key in this.searchForm.controls) {
      this.searchForm.controls[key].markAsPristine();
      this.searchForm.controls[key].updateValueAndValidity();
    }
  }

  // 获取列表数据请求
  getList(page?) {
    if (page) { this.tableData.currentNum = page; }
    this.tableData.result = [];
    this.tableLoading = true;
    this.manageService.infoListApi({ currentNum: this.tableData.currentNum, pagePerNum: this.tableData.pagePerNum }, this.searchForm.value).subscribe(resp => {
      this.tableLoading = false;
      if (resp.resultCode === '0') {
        this.tableData = resp;
      }
    }, () => this.tableLoading = false);
  }

  goDetail(item, act) {
    console.log(item);
    this.router.navigate(['/manage/release-build', { action: act, id: item.id }])
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
