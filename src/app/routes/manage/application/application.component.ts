import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../share/http.service';
import { GlobalState } from '../../../global.state';
import { ManageService } from '../../../core/api/manage.service';

export interface TreeNodeInterface {
  desc: string;
  id: string;
  action: string;
  appExtId: string;
  content: string;
  status: string;
  resourceId: string;
  resourcess?: TreeNodeInterface[];
}

@Component({
  selector: 'app-application',
  templateUrl: './application.component.html',
  styleUrls: ['./application.component.scss']
})
export class ApplicationComponent implements OnInit {

  tableData = [];
  mapOfExpandedData: { [key: string]: TreeNodeInterface[] } = {};


  constructor(
    private http: HttpService,
    private _state: GlobalState,
    private manageService: ManageService
  ) { }

  ngOnInit() {
    this.getList();
  }

  getList() {
    this.tableData = [];
    this.manageService.getSysMenus('fangshufeng').subscribe(resp => {
      // this._state.notifyDataChanged('menu.data', res.result);
      // res.result.map((item) => {
      //   if (!item.hasOwnProperty('resourcess')) {
      //     return item['resourcess'] = [];
      //   }
      //   return item;
      // });
      // res.result.forEach((element, index) => {
      //   if (element['resourcess'].length > 0) {
      //     element['expandKey'] = `epGroup${index}`;
      //     element['hierarchy'] = 'parent';
      //     element['expandFlag'] = false;
      //     this.tableData.push(element);
      //     element.resourcess.forEach(item => {
      //       item['expandKey'] = `epGroup${index}`;
      //       item['hierarchy'] = 'children';
      //       item['expandFlag'] = false;
      //       item['resourcess'] = [];
      //       this.tableData.push(item);
      //     });
      //   } else {
      //     element['expandKey'] = '';
      //     this.tableData.push(element);
      //   }
      // });
      if (resp.resultCode === '0') {
        this.tableData = resp.result;
        this.tableData.forEach(item => {
          this.mapOfExpandedData[item.id] = this.convertTreeToList(item);
          console.log(this.mapOfExpandedData);
        });
      }
    });
  }

  collapse(array: TreeNodeInterface[], data: TreeNodeInterface, $event: boolean): void {
    if ($event === false) {
      if (data.resourcess) {
        data.resourcess.forEach(d => {
          const target: any = array.find(a => a.id === d.id)!;
          target.expand = false;
          this.collapse(array, target, false);
        });
      } else {
        return;
      }
    }
  }

  convertTreeToList(root: object): TreeNodeInterface[] {
    const stack: any[] = [];
    const array: any[] = [];
    const hashMap = {};
    stack.push({ ...root, level: 0, expand: false });

    while (stack.length !== 0) {
      const node = stack.pop();
      this.visitNode(node, hashMap, array);
      if (node.resourcess) {
        for (let i = node.resourcess.length - 1; i >= 0; i--) {
          stack.push({ ...node.resourcess[i], level: node.level + 1, expand: false, parent: node });
        }
      }
    }

    return array;
  }

  visitNode(node: TreeNodeInterface, hashMap: { [key: string]: any }, array: TreeNodeInterface[]): void {
    if (!hashMap[node.id]) {
      hashMap[node.id] = true;
      array.push(node);
    }
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
        this.tableData.forEach(item => {
          if (item.hasOwnProperty('hierarchy') && currentExpandKey == item.expandKey) {
            item.expandFlag = !item.expandFlag;
          }
        })
      }
    }
  }


}
