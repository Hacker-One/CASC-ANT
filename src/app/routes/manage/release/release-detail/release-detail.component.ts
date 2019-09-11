import { Component, OnInit } from '@angular/core';
import { ManageService } from '../../../../core/api';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import {LoadingService} from '../../../../core/services';

@Component({
  selector: 'app-release-detail',
  templateUrl: './release-detail.component.html',
  styleUrls: ['./release-detail.component.scss']
})
export class ReleaseDetailComponent implements OnInit {
  auditForm: FormGroup;
  public config = {
    initialFrameHeight: 500,    // 初始化编辑器高度
    toolbars: [['source']]
  };
  public paramsId: string;
  public annexFileList = [];
  public detailData: any = {
    content: ''
  };
  public taskId: string;
  public detail: string;

  constructor(
    private manageService: ManageService,
    private activatedRoute: ActivatedRoute,
    private fb: FormBuilder,
    private messageService: NzMessageService,
    private router: Router
  ) { }

  ngOnInit() {
    this.paramsId = this.activatedRoute.snapshot.paramMap.get('id');
    this.taskId = this.activatedRoute.snapshot.queryParamMap.get('taskId');
    this.detail = this.activatedRoute.snapshot.queryParamMap.get('detail');
    this.detailService();
    this.auditForm = this.fb.group({
      opinion: [null, [Validators.required]],
    });
  }

  // 详情查询服务
  detailService() {
    this.manageService.infoByIdApi(this.paramsId).subscribe(resp => {
      if (resp.resultCode === '0') {
        this.detailData = resp.result;
        this.auditForm.patchValue({
          opinion: resp.result.opinion
        });
        if (resp.result.enclosures) {
          this.annexFileList = resp.result.enclosures.map(item => {
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
      }
    });
  }

  linkAttachment(item) {
    window.open(item.url, '_blank');
  }

  // 审核
  auditService(status) {
    const params: any = {
      id: this.paramsId,
      taskId: this.taskId,
      approvalStatus: status,
      approvalViewJsons: [
        {
          opinion: this.auditForm.value.opinion,
          approvalDate: Date.now(),
          approvalUser: ''
        }
      ]
    };
    LoadingService.show();
    this.manageService.infoReviewApi(params).subscribe(resp => {
      LoadingService.close();
      if (resp.resultCode === '0') {
        this.messageService.success('审核成功');
        this.router.navigate(['/home-right']);
      }
    }, () => LoadingService.close());
  }
}
