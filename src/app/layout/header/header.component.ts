import { Component, OnInit, OnDestroy } from '@angular/core';
import { ManageService } from '../../core';
import { Router } from '@angular/router';
import { GlobalState } from '../../global.state';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
  public menuList: any = [];
  isVisible = false;

  constructor(
    private manageService: ManageService,
    private router: Router,
    private _state: GlobalState
  ) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuList = menuData;
    });
  }

  ngOnInit() {
    this.getTopMenu();
  }

  getTopMenu() {
    this.manageService.getSysMenus('fangshufeng').subscribe(res => {
      this.menuList = res.result;
      this._state.notifyDataChanged('menu.data', this.menuList);
    });
  }

  goPage(element) {
    console.log(element);
    if (element.resourceType === 'Root' && element.resourceId !== '8shome') {
      return
    };
    this.router.navigate([`${element.action}`]);
  }

  showModal(): void {
    this.isVisible = true;
  }

  handleOk(): void {
    console.log('Button ok clicked!');
    this.isVisible = false;
  }

  handleCancel(): void {
    console.log('Button cancel clicked!');
    this.isVisible = false;
  }

}