import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ManageService {

    constructor(private util: UtilService) { }

    /**
     * 获取系统菜单
     */
    getSysMenus(params) {
        return this.util.get(`system/sysmenus/user/${params}`);
    }

    /**
     * 添加一级目录
     * @params sortNum: string 排序
     * @params desc: string 名称
     * @params pdesc: string 描述
     * @params rExtId: [] 角色列表获取的自定义id
     */
    addSysMenuApi(params): Observable<any> {
      return this.util.post('system/resource/sysmenu', params);
    }

    /**
     * 查询系统角色列表
     * @params currentNum
     * @params pagePerNum
     */
    getRoleListApi(params): Observable<any> {
      return this.util.get('system/sysroles', params);
    }

    saveDirectory(params) {
        return this.util.post('system/sysmenus/user', params);
    }

    saveLink(params) {
        return this.util.post('system/resource/syslink', params);
    }

    getMenuNohome() {
        return this.util.get('system/sysmenus/nohome');
    }

    getAccountList(params) {
        return this.util.get('system/sysusers', params);
    }

    getRoleList(
        pageIndex: number = 1,
        pageSize: number = 10,
    ): Observable<any> {
        let params = new HttpParams()
            .append('currentNum', `${pageIndex}`)
            .append('pagePerNum', `${pageSize}`)
        return this.util.get('system/sysroles', params);
    }

    getMenuTree(params) {
        return this.util.get(`system/syspermission/${params}`);
    }

    addRole(params) {
        return this.util.post('system/sysrole', params);
    }

    saveUserRole(params) {
        return this.util.post('system/sysuser', params);
    }

    randomUserUrl = 'https://api.randomuser.me/';

    getUsers(
        pageIndex: number = 1,
        pageSize: number = 10,
        sortField: string,
        sortOrder: string,
        genders: string[]
    ): Observable<{}> {
        let params = new HttpParams()
            .append('page', `${pageIndex}`)
            .append('results', `${pageSize}`)
            .append('sortField', sortField)
            .append('sortOrder', sortOrder);
        genders.forEach(gender => {
            params = params.append('gender', gender);
        });
        return this.util.get(`${this.randomUserUrl}`,
            params
        )
    }

}
