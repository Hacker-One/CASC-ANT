import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class ManageService {

    constructor(private util: UtilService) { }

    getSysMenus(params) {
        return this.util.get(`system/sysmenus/user/${params}`);
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