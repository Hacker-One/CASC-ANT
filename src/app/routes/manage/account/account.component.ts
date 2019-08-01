import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../system/share/http.service';
import { environment } from '../../../../environments/environment';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {
  roleDialog = false;
  detailDialog = false;
  accountDatas = [];
  roleCheckBoxArr = [];
  editAccountItem = { id: '', vo: [] };

  constructor(private http: HttpService) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const url = `${environment.apiURl.getAccountList}`;
    this.http.get(url).subscribe(res => {
      this.accountDatas = res.result.resources;
    })
  }

  checkboxClicked(idx, evt) {
    console.log(evt);
    this.roleCheckBoxArr[idx].selected = event.target['value'];
    console.log(this.roleCheckBoxArr);
  }

  getRoles(editItem) {
    console.log(editItem);
    this.editAccountItem.id = editItem.id;
    const url = `${environment.apiURl.getRoleList}`;
    this.http.get(url).subscribe(res => {
      console.log(res);
      this.roleCheckBoxArr = res.resources;
      this.roleCheckBoxArr.map(item => {
        item['selected'] = false;
        for (let ele of editItem.rolevos) {
          if (item.externalId == ele.externalId) {
            item['selected'] = true
          }
        }
        return item;
      })
    })
  }

  saveUserRole() {
    let arrSelected = [];
    for (let item of this.roleCheckBoxArr) {
      if (item.selected) {
        arrSelected.push({ id: item.externalId, checked: true });
      }
    };
    console.log(arrSelected);

    this.editAccountItem.vo = arrSelected;
    console.log(this.editAccountItem);
    const url = `${environment.apiURl.saveUserRole}/${this.editAccountItem.id}`;
    this.http.put(url, this.editAccountItem).subscribe(res => {
      alert('save success');
      this.getList();
      console.log(res);
    })
  }

}
