import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { GlobalState } from '../../../../../app/global.state';

@Component({
  selector: 'app-path-nav',
  templateUrl: './path-nav.component.html',
  styleUrls: ['./path-nav.component.scss']
})
export class PathNavComponent implements OnInit {
  menuData = [];
  pathArr = [];
  currentUrl: String = '';
  constructor(private router: Router, private _state: GlobalState) {
    this._state.subscribe('menu.data', (menuData) => {
      this.menuData = menuData;
      this.setPathArr(this.currentUrl, this.menuData);
      console.log(menuData);
    })
  }

  ngOnInit() {
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        console.log(event);
        console.log(this.menuData);
        this.currentUrl = event.url;
        if (this.menuData.length > 0) {
          this.setPathArr(this.currentUrl, this.menuData);
        }
      }
    })
  }

  setPathArr(url, menuArr) {
    if (!url) { url = '/home-right' };
    this.pathArr = [];
    for (let elementLV1 of menuArr) {
      if (elementLV1.action == url) {
        this.pathArr.push({ name: elementLV1.desc, url: elementLV1.action });
        break;
      } else {
        if (elementLV1.hasOwnProperty('resourcess')) {
          for (let elementLV2 of elementLV1.resourcess) {
            if (elementLV2.action == url) {
              this.pathArr.push({ name: elementLV1.desc, url: elementLV1.action }, { name: elementLV2.desc, url: elementLV2.action });
              break;
            } else {
              if (elementLV2.hasOwnProperty('resourcessButton')) {
                for (let elementLV3 of elementLV2.resourcessButton) {
                  if (elementLV3.action == url) {
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
    console.log(this.pathArr);

  }

  handle(path: string): void {
    if (path) {
      this.router.navigate([path]);
    }
  }

}
