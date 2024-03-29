import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ManageService } from '../../../../app/core/api/manage.service';
import { Router } from '@angular/router';
import { AUTHORITYBTNMAPPING } from 'src/app/constants';
import { ConfigService } from 'src/app/core';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss'],
  providers: [ConfigService]
})
export class RoleComponent implements OnInit {
  authority = AUTHORITYBTNMAPPING;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = false;
  appExtIdArr = [];

  searchForm: FormGroup;

  constructor(private manageService: ManageService, private fb: FormBuilder, private router: Router, private configService: ConfigService) {
    this.searchForm = this.fb.group({
      displayName: [''],
      externalId: [''],
      appExtId: ['', [Validators.required]],
    })
  }

  ngOnInit() {
    this.appListService();
    // this.searchData();
  }

  submitForm(value: any): void {
    for (const key in this.searchForm.controls) {
      this.searchForm.controls[key].markAsDirty();
      this.searchForm.controls[key].updateValueAndValidity();
    }
    this.searchData();
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.searchForm.reset();
    for (const key in this.searchForm.controls) {
      this.searchForm.controls[key].markAsPristine();
      this.searchForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.searchForm.controls.confirm.updateValueAndValidity());
  }

  userNameAsyncValidator = (control: FormControl) =>
    new Observable((observer: Observer<ValidationErrors | null>) => {
      setTimeout(() => {
        if (control.value === 'JasonWood') {
          // you have to return `{error: true}` to mark it as an error event
          observer.next({ error: true, duplicated: true });
        } else {
          observer.next(null);
        }
        observer.complete();
      }, 1000);
    });

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.searchForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    const params = { currentNum: this.pageIndex, pagePerNum: this.pageSize };
    this.manageService.getRoleList(params, this.searchForm.value).subscribe((res: any) => {
      this.loading = false;
      if (res.resultCode === '0') {
        this.total = res.result.totalResults;
        this.listOfData = res.result.resources;
      }
    })
  }

  // 获取域名列表service
  appListService() {
    this.appExtIdArr = [];
    this.configService.appListApi().subscribe(resp => {
      this.appExtIdArr = resp.resources;
    });
  }

  goDetail(item, act) {
    console.log(item);
    this.router.navigate(['/manage/role-new-edit', { action: act, externalId: item.externalId, appExtId: item.appExtId }])
  }


}
