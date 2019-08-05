import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ManageService } from '../../../../app/core/api/manage.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit {
  param = {};
  pageIndex = 1;
  pageSize = 10;
  total = 1;
  listOfData = [];
  loading = true;

  validateForm: FormGroup;

  authorityDialog = false;

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
    this.manageService.getRoleList(this.pageIndex, this.pageSize).subscribe((res: any) => {
      this.loading = false;
      this.total = res.totalResults;
      this.listOfData = res.resources;
    })
  }

  showModal(): void {
    this.authorityDialog = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.authorityDialog = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.authorityDialog = false;
  }

  goDetail(item) {
    console.log(item);
    this.router.navigate(['/manage/role-new-edit', { action: 'edit', externalId: item.externalId }])
  }


}
