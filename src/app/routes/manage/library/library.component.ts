import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ManageService } from '../../../../app/core/api/manage.service';
import { Router } from '@angular/router';
import { AUTHORITYBTNMAPPING } from 'src/app/constants';

@Component({
  selector: 'app-library',
  templateUrl: './library.component.html',
  styleUrls: ['./library.component.scss']
})
export class LibraryComponent implements OnInit {
  authority = AUTHORITYBTNMAPPING;
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;

  searchForm: FormGroup;

  constructor(private manageService: ManageService, private fb: FormBuilder, private router: Router) {
    this.searchForm = this.fb.group({
      displayName: [''],
      externalId: [''],
    })
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

  searchData(reset: boolean = false): void {
    if (reset) {
      this.pageIndex = 1;
    }
    this.loading = true;
    const params = { currentNum: this.pageIndex, pagePerNum: this.pageSize };
    this.manageService.getLibraryList(params, this.searchForm.value).subscribe((res: any) => {
      this.loading = false;
      this.total = res.totalResults;
      this.listOfData = res.result;
    })
  }

  goDetail(item, act) {
    console.log(item);
    this.router.navigate(['/manage/role-new-edit', { action: act, externalId: item.externalId }])
  }

}
