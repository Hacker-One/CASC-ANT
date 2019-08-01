import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../../system/share/http.service';
import { environment } from '../../../../environments/environment';
import { Router } from '@angular/router';
import { GlobalState } from '../../../../app/global.state';

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  tableDatas = [];

  constructor(private http: HttpService, private _state: GlobalState) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    const url = `${environment.apiURl.getSysMenus}/fangshufeng`;
    this.http.get(url).subscribe(res => {
      this._state.notifyDataChanged('menu.data', res.result);
      res.result.map((item) => {
        if (!item.hasOwnProperty('resourcess')) {
          return item['resourcess'] = [];
        }
        return item;
      });
      res.result.forEach((element, index) => {
        if (element['resourcess'].length > 0) {
          element['expandKey'] = `epGroup${index}`;
          element['hierarchy'] = 'parent';
          element['expandFlag'] = false;
          this.tableDatas.push(element);
          element.resourcess.forEach(item => {
            item['expandKey'] = `epGroup${index}`;
            item['hierarchy'] = 'children';
            item['expandFlag'] = false;
            item['resourcess'] = [];
            this.tableDatas.push(item);
          });
        } else {
          element['expandKey'] = '';
          this.tableDatas.push(element);
        }
      });
      console.log(this.tableDatas);
    })
  }

  hideLine(ele) {
    if (ele.expandKey !== '') {
      if (ele.hierarchy == 'children' && ele.expandFlag == false) {
        return true;
      }
    }
    return false;
  }

  rowClick(ele) {
    console.log(ele);

    let currentExpandKey = ele.expandKey;
    if (ele.expandKey !== '') {
      if (ele.hierarchy == 'parent') {
        this.tableDatas.forEach(item => {
          if (item.hasOwnProperty('hierarchy') && currentExpandKey == item.expandKey) {
            item.expandFlag = !item.expandFlag;
          }
        })
      }
    }
  }


}
