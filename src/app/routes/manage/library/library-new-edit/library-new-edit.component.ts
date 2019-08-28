import { Component, OnInit } from '@angular/core';
import { LoadingService, ManageService } from '../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalState } from 'src/app/global.state';

@Component({
  selector: 'app-library-new-edit',
  templateUrl: './library-new-edit.component.html',
  styleUrls: ['./library-new-edit.component.scss']
})
export class LibraryNewEditComponent implements OnInit {
  public buildForm: FormGroup;
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
    switch (this.pageAction) {
      case 'create':

        break;

      case 'edit':
        const id = this.activatedRoute.snapshot.params.id;
        this.getEditLibrary(id);
        break;

      default:
        break;
    }
  }

  ngOnInit() {
    this.buildForm = this.fb.group({
      externalId: [null, [Validators.required]],
      displayName: [null, [Validators.required]],
      serviceId: [null, [Validators.required]],
      evaluationOrder: [null, [Validators.required]],
    })
  }


  getEditLibrary(id) {
    LoadingService.show();
    this.manageService.getColumnById(id).subscribe(res => {
      LoadingService.close();
      if (res.resultCode === '0') {
        this.buildForm.patchValue({
          externalId: res.result.externalId,
          displayName: res.result.displayName,
          serviceId: res.result.serviceId,
          evaluationOrder: res.result.evaluationOrder,
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
          this.messageService.success('添加应用成功');
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
          this.messageService.success('修改应用成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/column-list');
          }, 2000);
        }
      })
    }
  }

}
