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

  goPage(tem, item) {
    console.log(item);
    if (item.parentId === 'Root') {
      localStorage.setItem('primaryDirectory', item.pdesc);
    } else if (item.resourcess) {

    }
    this.router.navigate([`${tem.action}`]);
  }
}
