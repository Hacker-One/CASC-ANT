import { Component, OnInit } from '@angular/core';
import { LoadingService, ManageService } from '../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalState } from 'src/app/global.state';

@Component({
  selector: 'app-column-new-edit',
  templateUrl: './column-new-edit.component.html',
  styleUrls: ['./column-new-edit.component.scss']
})
export class ColumnNewEditComponent implements OnInit {
  public buildForm: FormGroup;
  public roleList = [];
  lengthSelectSource = [
    { id: 'oneOfCol', desc: '1行1列，占整行宽度' },
    { id: 'twoOfCol', desc: '1行2列，占行宽1/2' },
    { id: 'threeOfCol', desc: '1行3列，占行宽1/3' },
    { id: 'fourOfCol', desc: '1行4列，占行宽1/4' },
  ];
  serviceSelectSource = [];
  confirmationValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { required: true };
    } else if (control.value.every(item => item.checked === false)) {
      return { error: true };
    }
    return {};
  };
  pageAction = '';

  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private messageService: NzMessageService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private _state: GlobalState
  ) {
    this.pageAction = this.activatedRoute.snapshot.params.action;
    this.getServiceResource();
    switch (this.pageAction) {
      case 'create':
        this.getRoleList();
        break;

      case 'edit':
        const id = this.activatedRoute.snapshot.params.id;
        this.getEditCol(id);
        break;

      default:
        break;
    }
  }

  ngOnInit() {
    this.buildForm = this.fb.group({
      title: [{ value: null, disabled: false }, [Validators.required]],
      type: [null, [Validators.required]],
      length: [null, [Validators.required]],
      serviceAddrId: [null, [Validators.required]],
      fontColor: [null, [Validators.required]],
      borderColor: [null, [Validators.required]],
      orderNum: [null],
      roleExtIds: [null, [this.confirmationValidator]]
    })
  }

  getRoleList() {
    let arr = [];
    this.manageService.getRoleListApi({ currentNum: 1, pagePerNum: 100 }).subscribe(resp => {
      if (resp.resultCode === '0') {
        this.roleList = resp.result.resources;
        resp.result.resources.forEach(item => {
          const node = {
            label: item.displayName,
            value: item.externalId,
            checked: false
          };
          arr.push(node);
        });
        this.buildForm.patchValue({
          roleExtIds: arr
        })
      }
    })
  }

  getEditCol(id) {
    LoadingService.show();
    this.manageService.getColumnById(id).subscribe(res => {
      LoadingService.close();
      if (res.resultCode === '0') {
        this.roleList = res.result.roles || [];
        this.buildForm.patchValue({
          title: res.result.title,
          type: res.result.type,
          length: res.result.length,
          serviceAddrId: res.result.serviceAddrId,
          fontColor: res.result.fontColor,
          borderColor: res.result.borderColor,
          orderNum: res.result.orderNum,
          roleExtIds: res.result.roles || []
        })
      }
    })
  }

  submit() {
    let params = Object.assign(this.buildForm.value, {});
    console.log(params);

    LoadingService.show();
    if (this.pageAction == 'create') {
      this.manageService.addColumn(params).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.messageService.success('添加栏目成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/column-list');
          }, 2000);
        }
      });
    } else {
      const id = this.activatedRoute.snapshot.params.id;
      this.manageService.updateColumn(id, params).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.messageService.success('修改栏目成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/column-list');
          }, 2000);
        }
      })
    }
  }

  getServiceResource() {
    let params = { currentNum: 1, pagePerNum: 1000 }
    this.manageService.getServiceList(params).subscribe((res: any) => {
      this.serviceSelectSource = res.result;
    })
  }

}