import { Component, OnInit } from '@angular/core';
import { LoadingService, ManageService } from '../../../../core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, FormBuilder, Validators, ValidationErrors } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { GlobalState } from 'src/app/global.state';
import { Observable, Observer } from 'rxjs';

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
      serviceId: [null, [Validators.required],[this.startWithHttpValidator]],
      evaluationOrder: [null, [Validators.required]],
      description: [null, [Validators.required]],
    })
  }

  startSymbolValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value.substr(0, 1) !== '^') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, startSymbolUnvalid: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000)
    })

  startWithHttpValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value.substr(0, 4) !== 'http') {
          observer.next({ error: true, startWithHttpUnvalid: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000)
    })

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
          description: res.result.description,
        })
      }
    })
  }

  submit() {
    let params = Object.assign(this.buildForm.value, {});
    params['serviceId'] = `^${this.buildForm.value.serviceId}.*`
    console.log(params);

    LoadingService.show();
    if (this.pageAction == 'create') {
      this.manageService.addLibrary(params).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.messageService.success('添加成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/library-list');
          }, 2000);
        }
      });
    } else {
      const id = this.activatedRoute.snapshot.params.id;
      this.manageService.updateColumn(id, params).subscribe(resp => {
        LoadingService.close();
        if (resp.resultCode === '0') {
          this.messageService.success('修改成功');
          setTimeout(() => {
            this.router.navigateByUrl('manage/column-list');
          }, 2000);
        }
      })
    }
  }

}
