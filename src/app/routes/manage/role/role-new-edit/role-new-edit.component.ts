import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { UserSafeHooks } from '../../../../../app/components/tree/tree';
import { environment } from '../../../../../environments/environment';
import { HttpService } from '../../../../system/share/http.service';

@Component({
  selector: 'app-role-new-edit',
  templateUrl: './role-new-edit.component.html',
  styleUrls: ['./role-new-edit.component.scss']
})
export class RoleNewEditComponent implements OnInit, AfterViewInit {
  selectArr = [];
  roleObj = {
    displayName: '',
    externalId: '',
    pExtIds: []
  };
  treeDatas = [];

  @ViewChild('tree') tree: ElementRef
  hooks: UserSafeHooks
  constructor(private http: HttpService) { }

  ngOnInit() {
    // this.getMenuNoHome();
    this.getMenuTree();
  }

  ngAfterViewInit(): void {
    if (!this.tree) return
    this.hooks = (<any>this.tree).userSafeHooks()
  }

  getMenuNoHome() {
    const url = `${environment.apiURl.getMenuNohome}`;
    this.http.get(url).subscribe(res => {
      this.selectArr = res.result;
      this.selectArr.map(item => {
        return item['selected'] = false;
      })
    })
  }

  getMenuTree() {
    const url = `${environment.apiURl.getMenuTree}/fangshufeng`;
    this.http.get(url).subscribe(res => {
      this.treeDatas = res.result;
    })
  }

  findTreeModel(): void {
    console.log(this.hooks.findWholeModel());
    const treeArr = this.hooks.findWholeModel();
    treeArr.map((element) => {
      this.removeNeedless(element);
    })
    console.log(treeArr);
    this.roleObj.pExtIds = treeArr;
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

  save() {
    this.findTreeModel();
    const url = `${environment.apiURl.addRole}`;
    this.http.post(url, this.roleObj).subscribe(res => {
      console.log(res);
      alert('save success');
    })
  }

}
