import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

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

    getAccountList() {
        return this.util.get('system/sysusers?currentNum=1&pagePerNum=100');
    }

    getRoleList() {
        return this.util.get('system/sysroles?currentNum=1&pagePerNum=100');
    }

    getMenuTree(params) {
        return this.util.post('system/syspermission', params);
    }
    
    addRole(params) {
        return this.util.post('system/sysrole', params);
    }

    saveUserRole(params) {
        return this.util.post('system/sysuser', params);
    }

}