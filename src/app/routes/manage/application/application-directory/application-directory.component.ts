import { Component, OnInit } from '@angular/core';
import { ManageService } from '../../../../core';
import { Router } from '@angular/router';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-application-directory',
  templateUrl: './application-directory.component.html',
  styleUrls: ['./application-directory.component.scss'],
})
export class ApplicationDirectoryComponent implements OnInit {
  public buildForm: FormGroup;
  directoryObj = {
    desc: '',
    pdesc: '',
    sortNum: null,
    rExtIds: []
  }
  roleCheckBoxArr: Array<any> = [];
  constructor(
    private fb: FormBuilder,
    private manageService: ManageService,
    private router: Router
  ) { }

  ngOnInit() {
    // this.getRoles();
    this.initParams();
    this.getRoleList();
  }

  // 初始化参数和表单
  initParams() {
    this.buildForm = this.fb.group({
      desc: [{value: null, disabled: false}, [Validators.required]],
      pdesc: [null, [Validators.required]],
      sortNum: [null, [Validators.required]],
      roleCheckBoxArr: [[], [Validators.required]],
      rExtId: [[], [Validators.required]],
    });
  }

  getRoleList() {
    this.manageService.getRoleListApi({currentNum: 1, pagePerNum: 100}).subscribe(resp => {
      console.log(resp.resources);
      // this.roleCheckBoxArr =
      resp.resources.forEach(item => {
        const node = {
          label: item.displayName,
          value: item.id,
          checked: false
        };
        this.roleCheckBoxArr.push(node);
      });
      console.log(this.roleCheckBoxArr);
      this.buildForm.patchValue({
        rExtId: this.roleCheckBoxArr
      });
    });
  }

  log(value) {
    console.log(value);
  }

  // getRoles() {
  //   const url = `${environment.apiURl.getRoleList}`;
  //   this.http.get(url).subscribe(res => {
  //     console.log(res);
  //     this.roleCheckBoxArr = res.resources;
  //     this.roleCheckBoxArr.map(item => {
  //       return item['selected'] = false;
  //     })
  //   })
  // }

  // checkboxClicked(idx, evt) {
  //   console.log(evt);
  //   this.roleCheckBoxArr[idx].selected = event.target['value'];
  //   console.log(this.roleCheckBoxArr);
  // }

  // save() {
  //   for (let item of this.roleCheckBoxArr) {
  //     if (item.selected) {
  //       this.directoryObj.rExtIds.push(item.externalId);
  //     }
  //   };
  //   console.log(this.directoryObj);

  //   const url = `${environment.apiURl.saveDirectory}`;
  //   this.http.post(url, this.directoryObj).subscribe(res => {
  //     console.log(res);
  //     alert('save success');
  //     this.router.navigate(['/manage/applicat-list']);
  //   })
  // }


}
