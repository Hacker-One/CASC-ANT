import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalState } from '../../../app/global.state';

@Component({
  selector: 'app-path-nav',
  templateUrl: './path-nav.component.html',
  styleUrls: ['./path-nav.component.scss'],
  // providers: [Location]
})
export class PathNavComponent implements OnInit {
  menuData = [];
  pathArr = [];
  currentUrl: String = '';
  isShow = false;
  constructor(private router: Router, private _state: GlobalState, ) {
    this.currentUrl = location.pathname;
    this._state.subscribe('menu.data', (menuData) => {
      this.menuData = menuData;
      this.setPathArr(this.currentUrl, this.menuData);
      // console.log(menuData);
    })
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        // console.log(event);
        // console.log(this.menuData);
        this.currentUrl = event.url;
        if (this.menuData.length > 0) {
          this.setPathArr(this.currentUrl, this.menuData);
        }
      }
    })
  }

  setPathArr(url, menuArr) {
    if (!url||url=='/') { url = '/home-right' };
    if (url === '/home-right') {
      this.isShow = false;
    } else {
      this.isShow = true;
    }
    for (let elementLV1 of menuArr) {
      if (url.indexOf(elementLV1.action) > -1) {
        this.pathArr = [];
        this.pathArr.push({ name: elementLV1.desc, url: elementLV1.action });
        break;
      } else {
        if (elementLV1.hasOwnProperty('resourcess')) {
          for (let elementLV2 of elementLV1.resourcess) {
            if (url.indexOf(elementLV2.action) > -1) {
              this.pathArr = [];
              this.pathArr.push({ name: elementLV1.desc, url: elementLV1.action }, { name: elementLV2.desc, url: elementLV2.action });
              break;
            } else {
              if (elementLV2.hasOwnProperty('resourcessButton')) {
                for (let elementLV3 of elementLV2.resourcessButton) {
                  if (url.indexOf(elementLV3.action) > -1) {
                    this.pathArr = [];
                    this.pathArr.push({ name: elementLV1.desc, url: elementLV1.action }, { name: elementLV2.desc, url: elementLV2.action }, { name: elementLV3.desc, url: elementLV3.action });
                    break;
                  }
                }
              }
            }
          }
        }
      }
    }
    // console.log(this.pathArr);

  }

  handle(path: string): void {
    if (path) {
      this.router.navigate([path]);
    }
  }

}
