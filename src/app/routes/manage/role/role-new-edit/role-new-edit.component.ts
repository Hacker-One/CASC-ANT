import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { HttpService } from 'src/app/routes/share/http.service';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { Observable, Observer } from 'rxjs';
import { ManageService } from '../../../../../app/core/api/manage.service';
import { NzFormatEmitEvent } from 'ng-zorro-antd';

@Component({
  selector: 'app-role-new-edit',
  templateUrl: './role-new-edit.component.html',
  styleUrls: ['./role-new-edit.component.scss']
})
export class RoleNewEditComponent implements OnInit {
  selectArr = [];
  roleObj = {
    displayName: '',
    externalId: '',
    pExtIds: []
  };
  treeDatas = [];
  // defaultCheckedKeys = ['0-0-0'];
  // defaultSelectedKeys = ['0-0-0'];
  // defaultExpandedKeys = ['0-0', '0-0-0', '0-0-1'];

  nodes = [
    {
      title: '0-0',
      key: '0-0',
      expanded: true,
      checked: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true },
            { title: '0-0-0-1', key: '0-0-0-1', isLeaf: true },
            { title: '0-0-0-2', key: '0-0-0-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-1',
          key: '0-0-1',
          children: [
            { title: '0-0-1-0', key: '0-0-1-0', isLeaf: true },
            { title: '0-0-1-1', key: '0-0-1-1', isLeaf: true },
            { title: '0-0-1-2', key: '0-0-1-2', isLeaf: true }
          ]
        },
        {
          title: '0-0-2', key: '0-0-2', isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      children: [
        { title: '0-1-0-0', key: '0-1-0-0', isLeaf: true },
        { title: '0-1-0-1', key: '0-1-0-1', isLeaf: true },
        { title: '0-1-0-2', key: '0-1-0-2', isLeaf: true }
      ]
    },
    {
      title: '0-2',
      key: '0-2',
      isLeaf: true
    }
  ];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    console.log(this.tree.getTreeNodes());
  }

  validateForm: FormGroup;
  @ViewChild('tree', { static: false }) tree;
  // hooks: UserSafeHooks

  constructor(private manageService: ManageService, private fb: FormBuilder) {
    this.validateForm = this.fb.group({
      displayName: ['', [Validators.required]],
      externalId: ['', [Validators.required]],
      // pExtIds: [[], [Validators.required]]
    });
  }

  ngOnInit() {
    this.getMenuTree();
  }

  // ngAfterViewInit(): void {
  //   this.tree.getTreeNodes();
  // }

  getMenuTree() {
    const userName = 'fangshufeng';
    this.manageService.getMenuTree(userName).subscribe(res => {
      this.treeDatas = res.result;
    })
  }

  resetForm(e: MouseEvent): void {
    e.preventDefault();
    this.validateForm.reset();
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsPristine();
      this.validateForm.controls[key].updateValueAndValidity();
    }
  }

  submitForm(value: any): void {
    for (const key in this.validateForm.controls) {
      this.validateForm.controls[key].markAsDirty();
      this.validateForm.controls[key].updateValueAndValidity();
    }
    console.log(value);
  }



  // findTreeModel(): void {
  //   console.log(this.hooks.findWholeModel());
  //   const treeArr = this.hooks.findWholeModel();
  //   treeArr.map((element) => {
  //     this.removeNeedless(element);
  //   })
  //   console.log(treeArr);
  //   this.roleObj.pExtIds = treeArr;
  // }

  // removeNeedless(arrItem) {
  //   delete arrItem['_indeterminate'];
  //   delete arrItem['_level'];
  //   delete arrItem['expanded'];
  //   if (arrItem['children'] && arrItem['children'].length) {
  //     arrItem['children'].map((element) => {
  //       this.removeNeedless(element);
  //     })
  //   }
  //   return arrItem;
  // }

  // save() {
  //   this.findTreeModel();
  //   const url = `${environment.apiURl.addRole}`;
  //   this.http.post(url, this.roleObj).subscribe(res => {
  //     console.log(res);
  //     alert('save success');
  //   })
  // }

}
