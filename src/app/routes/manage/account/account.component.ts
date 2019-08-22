import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ManageService } from '../../../core/api/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  param = {};
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;

  validateForm: FormGroup;

  // roleDialog = false;
  // detailDialog = false;
  // accountDatas = [];
  roleCheckBoxArr = [];
  editAccountItem = { id: '', vo: [] };

  constructor(private manageService: ManageService, private fb: FormBuilder, private router: Router) {
    this.validateForm = this.fb.group({
      userName: ['', [Validators.required], [this.userNameAsyncValidator]],
      // email: ['', [Validators.email, Validators.required]],
      // password: ['', [Validators.required]],
      // confirm: ['', [this.confirmValidator]],
      // comment: ['', [Validators.required]]
    });
  }

  ngOnInit() {
    this.searchData();
  }

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  validateConfirmPassword(): void {
    setTimeout(() => this.validateForm.controls.confirm.updateValueAndValidity());
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
    } else if (control.value !== this.validateForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    let params = { currentNum: this.pageIndex, pagePerNum: this.pageSize };
    this.manageService.getAccountList(params).subscribe((res: any) => {
      this.loading = false;
      this.total = res.result.totalResults;
      this.listOfData = res.result.resources;
    })
  }

  toDetail(item, act) {
    this.router.navigate(['/manage/account-detail', { action: act, userId: item.id }])
  }

}
