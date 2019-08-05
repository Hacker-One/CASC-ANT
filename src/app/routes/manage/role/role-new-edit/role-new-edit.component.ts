import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ManageService } from '../../../../../app/core/api/manage.service';
import { NzFormatEmitEvent, NzMessageService } from 'ng-zorro-antd';
import { CommonService, LoadingService } from '../../../../../app/core';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-role-new-edit',
  templateUrl: './role-new-edit.component.html',
  styleUrls: ['./role-new-edit.component.scss']
})
export class RoleNewEditComponent implements OnInit {
  nodes = [
    {
      title: '0-0',
      key: '0-0',
      expanded: true,
      children: [
        {
          title: '0-0-0',
          key: '0-0-0',
          checked: true,
          children: [
            { title: '0-0-0-0', key: '0-0-0-0', isLeaf: true, checked: true },
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
          title: '0-0-2',
          key: '0-0-2',
          isLeaf: true
        }
      ]
    },
    {
      title: '0-1',
      key: '0-1',
      checked: true,
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
  pageAction = 'create';
  selectArr = [];
  roleObj = {
    displayName: '',
    externalId: '',
    pExtIds: []
  };
  treeDatas = [];

  nzEvent(event: NzFormatEmitEvent): void {
    console.log(event);
    console.log(this.treeDatas);
  }

  validateForm: FormGroup;
  @ViewChild('tree', { static: false }) tree;

  constructor(private manageService: ManageService, private fb: FormBuilder, private message: NzMessageService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.validateForm = this.fb.group({
      displayName: ['', [Validators.required]],
      externalId: ['', [Validators.required]],
    });
    this.pageAction = this.activatedRoute.snapshot.params.action;
    if (this.pageAction == 'create') {
      this.getMenuTree();
    } else {
      const externalId = this.activatedRoute.snapshot.params.externalId;
      this.getEditRole(externalId);
    }
  }

  ngOnInit() {
  }

  getEditRole(id) {
    this.manageService.getRoleById(id).subscribe(res => {
      console.log(res);
      this.validateForm.patchValue({ displayName: res.displayName, externalId: res.externalId });
      let base = CommonService.modifyField(CommonService.modifyField(res.pExtIds, 'id', 'key'), 'label', 'title');
      this.setIsLeaf(base);
      this.treeDatas = base;
    })
  }

  getMenuTree() {
    const userName = 'fangshufeng';
    this.manageService.getMenuTree(userName).subscribe(res => {
      let base = CommonService.modifyField(CommonService.modifyField(res.result, 'id', 'key'), 'label', 'title');
      this.setIsLeaf(base);
      this.treeDatas = base;
      console.log(this.treeDatas)
    })
  }

  setIsLeaf(arr) {
    arr.map((element) => {
      if (!element.hasOwnProperty('children')) {
        element['isLeaf'] = true;
      } else {
        this.setIsLeaf(element.children);
      }
      return element;
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
    // for (const key in this.validateForm.controls) {
    //   this.validateForm.controls[key].markAsDirty();
    //   this.validateForm.controls[key].updateValueAndValidity();
    // }
    // console.log(value);
    // value['pExtIds'] = this.treeDatas;
    // LoadingService.show();
    // if (this.pageAction == 'create') {
    //   this.manageService.addRole(value).subscribe(res => {
    //     this.message.create('success', '新建成功');
    //     LoadingService.close();
    //     this.router.navigate(['/manage/role-list']);
    //   })
    // } else {
    //   const id = this.validateForm.value.externalId;
    //   this.manageService.updateRole(id, value).subscribe(res => {
    //     this.message.create('success', '更新成功');
    //     LoadingService.close();
    //     this.router.navigate(['/manage/role-list']);
    //   })
    // }
    console.log(this.nodes);
  }


}
