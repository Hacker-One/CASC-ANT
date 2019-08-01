import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserSafeHooks } from '../../../../app/components/tree/tree';
import { HttpService } from '../../../system/share/http.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.scss']
})
export class RoleComponent implements OnInit, AfterViewInit {
  authorityDialog = false;
  roleDatas = [];
  data3: any = [{
    label: '一级 1',
    id: '1.1.1',
    children: [{
      label: '二级 1-1',
      id: '2.1.1',
      children: [{
        id: '3.1.1',
        label: '三级 1-1-1',
        checked: true,
        expanded: true,
      }, {
        id: '3.1.2',
        label: '三级 1-1-2',
        checked: true,
        expanded: true,
      }]
    }]
  }, {
    label: '一级 2',
    id: '1.2.1',
    children: [{
      id: '2.2.1',
      label: '二级 2-1',
    }]
  }, {
    id: '1.3.1',
    label: '一级 3',
  }];
  @ViewChild('tree') tree: ElementRef
  hooks: UserSafeHooks
  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const url = `${environment.apiURl.getRoleList}`;
    this.http.get(url).subscribe(res => {
      this.roleDatas = res.resources;
    })
  }

  ngAfterViewInit(): void {
    if (!this.tree) return
    this.hooks = (<any>this.tree).userSafeHooks()
  }

  updateItemChecked() {
    this.hooks.updateItemChecked('1.3.1')
    console.log(this.data3);

  }
  findAllChecked(): void {
    console.log(this.hooks.findWholeModel());
    const treeArr = this.hooks.findWholeModel();
    treeArr.map((element) => {
      this.removeNeedless(element);
    })
    console.log(treeArr);
  }

  removeNeedless(arrItem) {
    delete arrItem['_indeterminate'];
    delete arrItem['_level'];
    delete arrItem['expanded'];
    if (arrItem['children'] && arrItem['children'].length) {
      arrItem['children'].map((element) => {
        this.removeNeedless(element);
      })
    }
    return arrItem;
  }

}
