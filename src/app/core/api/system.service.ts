import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable()
export class SystemService {

  constructor(
    private service: UtilService
  ) {}

  /**
   * 获取系统菜单
   */
  getSysMenus(params) {
    return this.service.get(`system/sysmenus/user/${params}`);
  }

  getCollections(params) {
    return this.service.get(`system/syscollections/user/${params}`);
  }

  addCollection(params) {
    return this.service.post('system/syscollection', params);
  }


}
