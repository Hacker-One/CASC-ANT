import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  // 修改对象中地段的值
  public static modifyField(data, oldVal: string, newVal: string) {
    const REGEXP = new RegExp(oldVal, 'g');
    return JSON.parse(JSON.stringify(data).replace(REGEXP, newVal));
  }
}
