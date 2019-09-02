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

  searchForm: FormGroup;

  roleCheckBoxArr = [];
  editAccountItem = { id: '', vo: [] };

  constructor(private manageService: ManageService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      name: [''],
      id: [''],
      phoneNumber: [''],
    });
  }

  ngOnInit() {
    this.searchData();
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

  confirmValidator = (control: FormControl): { [s: string]: boolean } => {
    if (!control.value) {
      return { error: true, required: true };
    } else if (control.value !== this.searchForm.controls.password.value) {
      return { confirm: true, error: true };
    }
    return {};
  };

  searchData(reset: boolean = false): void {
    this.listOfData = [];
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    let params = { currentNum: this.pageIndex, pagePerNum: this.pageSize };
    this.manageService.getAccountList(params, this.searchForm.value).subscribe((res: any) => {
      this.loading = false;
      if (res.resultCode === '0') {
        this.total = res.result.totalResults;
        this.listOfData = res.result.resources;
      }
    })
  }

  toDetail(item, act) {
    this.router.navigate(['/manage/account-detail', { action: act, userId: item.id }])
  }

}
