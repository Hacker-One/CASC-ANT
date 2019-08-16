import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';
import { HttpParams } from '@angular/common/http';
import qs from 'qs';

@Injectable({
    providedIn: 'root'
})
export class ManageService {

    constructor(private util: UtilService) { }

    randomUserUrl = 'https://api.randomuser.me/';

    /**
     * 获取系统菜单
     */
    getSysMenus(params) {
        return this.util.get(`system/sysmenus/user/${params}`);
    }


    /**
     * 查询系统角色列表
     * @params currentNum
     * @params pagePerNum
     */
    getRoleListApi(params): Observable<any> {
        return this.util.get('system/sysroles', params);
    }

    getRoleByMenu(id): Observable<any> {
        return this.util.get(`system/sysmenus/role/${id}`);
    }

    /**
     * 添加一级目录
     * @params sortNum: string 排序
     * @params desc: string 名称
     * @params pdesc: string 描述
     * @params rExtId: [] 角色列表获取的自定义id
     */
    addSysMenuApi(params: { desc: string, pdesc: string, sortNum: string, rExtIds: Array<string> }): Observable<any> {
        return this.util.post('system/resource/sysmenu', params);
    }

    /**
     * 获取不含首页的一级目录
     */
    getNoHomeMenusApi() {
        return this.util.get(`system/sysmenus/nohome`);
    }

    /**
     * 已注册url
     */
    alreadyUrlApi() {
        return this.util.get(`applications`);
    }

    /**
     * 新建链接
     */
    addSysLinkApi(params) {
        return this.util.post(`system/resource/syslink`, params);
    }

    /************信息发布*****************/

    /**
     * 信息发布列表
     * @params currentNum int 当前页
     * @params pagePertNum int 每页数量
     * 5/system/news/page
     */
    infoListApi(params): Observable<any> {
        return this.util.get(`system/news/page`, params);
    }

    /**
     * 新建信息发布
     * @params beginDate
     * @params content
     * @params endDate
     * @params publisher
     * @params publisherObj
     * @params status
     * @params title
     * @params topDate
     * @params top
     * @params requestType
     * @params Priority
     * @params deputyTitle
     */
    saveInfoApi(params): Observable<any> {
        return this.util.post(`system/news`, params);
    }

    /**
     * 编辑信息发布
     * @params id
     * @params beginDate
     * @params content
     * @params endDate
     * @params publisher
     * @params publisherObj
     * @params status
     * @params title
     * @params topDate
     * @params top
     * @params requestType
     * @params Priority
     * @params deputyTitle
     */
    editInfoApi(params): Observable<any> {
        return this.util.put(`system/news`, params);
    }

    /**
     * 审核信息
     * @params id: 公告id
     */
    infoReviewApi(id: string): Observable<any> {
        return this.util.put(`system/news/approval`);
    }

    /**
     * 信息发布设置无效
     * @params currentNum int 当前页
     * @params pagePertNum int 每页数量
     */
    infoSetInvalidApi(id: string): Observable<any> {
        return this.util.delete(`system/news/${id}`);
    }

    /**
     * 信息发布详情
     * @params id: 公告id
     */
    infoByIdApi(id: string): Observable<any> {
        return this.util.get(`system/news/${id}`);
    }


    /**
     * 删除上传文件
     * @params fileName
     * @params fileUrl
     */
    deleteFileApi(params): Observable<any> {
        return this.util.delete(`system/deleteFile?` + qs.stringify(params));
    }

    // 下载文件
    downloadApi(fileName: string, fileUrl: string) {
        location.href = `system/download/${fileName}?fileUrl=${fileUrl}`;
    }

    updateSysMenuApi(id: string, params: { desc: string, pdesc: string, sortNum: string, rExtIds: Array<string> }): Observable<any> {
        return this.util.put(`system/resource/sysmenu/${id}`, params);
    }

    updateSysLinkApi(id: string, params: { desc: string, pdesc: string, sortNum: string, rExtIds: Array<string> }): Observable<any> {
        return this.util.put(`system/resource/syslink/${id}`, params);
    }

    deleteSysMenuApi(externalId, resourceId) {
        return this.util.delete(`/apps/${externalId}/resources/${resourceId}`);
    }

    deleteUser(uId) {
        return this.util.delete(`users/${uId}`);
    }

    getDirectoryById(id) {
        return this.util.get(`system/sysmenus/resource/${id}`);
    }

    getMenuNohome() {
        return this.util.get('system/sysmenus/nohome');
    }

    getAccountList(params) {
        return this.util.get('system/sysusers', params);
    }

    updateAccount(userId, params) {
        return this.util.put(`system/sysuser/${userId}`, params);
    }

    getAccountDetail(params) {
        return this.util.get(`system/sysuser/${params}`);
    }

    getRoleList(
        pageIndex: number = 1,
        pageSize: number = 10,
    ): Observable<any> {
        const params = new HttpParams()
            .append('currentNum', `${pageIndex}`)
            .append('pagePerNum', `${pageSize}`);
        return this.util.get('system/sysroles', params);
    }

    getMenuTree(params) {
        return this.util.get(`system/syspermission/${params}`);
    }

    addRole(params) {
        return this.util.post('system/sysrole', params);
    }

    updateRole(id, params) {
        return this.util.put(`system/sysrole/${id}`, params);
    }

    getRoleById(id) {
        return this.util.get(`system/sysrole/${id}`);
    }

    saveUserRole(params) {
        return this.util.post('system/sysuser', params);
    }

    getCollections(params) {
        return this.util.get(`system/syscollections/user/${params}`);
    }

    addCollection(params) {
        return this.util.post('system/syscollection', params);
    }

    getServiceList(params) {
        return this.util.get('system/serviceaddrs', params);
    }

    getColumnList(params) {
        return this.util.get('system/syscolumns', params);
    }

    addColumn(params) {
        return this.util.post('system/syscolumn', params);
    }

    getColumnById(id) {
        return this.util.get(`system/syscolumn/${id}`);
    }

    updateColumn(id, params) {
        return this.util.put(`system/syscolumn/${id}`, params);
    }

    deleteColumn(id) {
        return this.util.delete(`system/syscolumn/${id}`);
    }

    sortColumn(params) {
        return this.util.put('system/syscolumn/ordernum', params);
    }

    getNews(params) {
        return this.util.get('system/news/page', params);
    }

}
