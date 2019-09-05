import { Directive, ElementRef, Input } from '@angular/core';
import { GlobalState } from 'src/app/global.state';
import { CONSTANTS } from 'src/app/constants';

@Directive({
  selector: '[appAuthority]'
})
export class AuthorityDirective {
  @Input('appAuthority') authrityId: string;
  authrityArr = [];

  constructor(private el: ElementRef, private _state: GlobalState) {
    this._state.subscribe('menu.data', (menuData) => {
      this.setAuthrityBtnArr(menuData);
      this.action();
    })
  }

  ngAfterViewInit(){
    let arr = localStorage.getItem(CONSTANTS.authorityBtnList);
    this.authrityArr = JSON.parse(arr);
    this.action();
  }

  // 按钮路由链接集合
  setAuthrityBtnArr(menuList) {
    this.authrityArr = [];
    for (let elementL1 of menuList) {
      if (elementL1.hasOwnProperty('resourcess')) {
        for (let elementL2 of elementL1.resourcess) {
          if (elementL2.hasOwnProperty('resourcessButton')) {
            for (let item of elementL2.resourcessButton) {
              this.authrityArr.push(item.resourceId);
            }
          }
        }
      }
    }
    localStorage.setItem(CONSTANTS.authorityBtnList, JSON.stringify(this.authrityArr));
  }

  action() {
    const val = this.authrityArr.indexOf(this.authrityId) > -1;
    this.el.nativeElement.style.display = val ? 'bolok' : 'none';
  }

}
