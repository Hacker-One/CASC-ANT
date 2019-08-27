/**
 * 流程配置api页面
 */
import { Injectable } from '@angular/core';
import { UtilService } from './util.service';
import { Observable } from 'rxjs';

@Injectable()
export class ConfigService {
  constructor(
    private service: UtilService
  ) {}

  /**
   * 流程配置列表
   * @params currentNum
   * @params pagePerNum
   * @params id?
   * @params name?
   * @params flowCategoryId?
   * @params sort?
   * @params status?
   * @params flowCategoryName?
   */
  configListApi(params): Observable<any> {
    return this.service.post('flowmgt/flow/list', params);
  }

  /**
   * 流程配置新增
   * @params name  应用名称
   * @params formName?  表单名称
   * @params formKey?   表单key
   * @params originFlowKey?  流程名称key（select）
   * @params originFlowId?  流程id
   * @params flowCategoryId?  流程分类id(select)
   * @params originFlowVariables? 流程参数
   * @params createBy?  创建人
   * @params url?  链接
   * @params sort?  排序
   * @params appName?  域名
   * @params appId?  域id
   * @params status  状态
   */

  configAddApi(params): Observable<any> {
    return this.service.post('flowmgt/flow/add', params);
  }

  /**
   * 流程配置更新
   * @params id
   * @params name  应用名称
   * @params formName?  表单名称
   * @params formKey?   表单key
   * @params originFlowKey?  流程名称key（select）
   * @params originFlowId?  流程id
   * @params flowCategoryId?  流程分类id(select)
   * @params originFlowVariables? 流程参数
   * @params createBy?  创建人
   * @params url?  链接
   * @params sort?  排序
   * @params appName?  域名
   * @params appId?  域id
   * @params status  状态
   */
  configUpdateApi(params): Observable<any> {
    return this.service.post('flowmgt/flow/update', params);
  }

  /**
   * 获取应用列表
   */
  appListApi(): Observable<any> {
    return this.service.get('/applications');
  }

  /**
   * 获取流程列表
   */
  processListApi(): Observable<any> {
    return this.service.get('/flowmgt/camunda/processes');
  }

  /**
   * 获取流程参数信息
   * @desc 根据流程key或id读取流程分类
   * @params key || id
   */
  processParamsInfoApi(params): Observable<any> {
    return this.service.get('/flowmgt/camunda/startvariables', params);
  }

  /**
   * 获取查询详情
   */
  processQueryApi(id: string): Observable<any> {
    return this.service.get('/flowmgt/flow/query?id=' + id);
  }

  /**
   * 获取查询详情
   */
  processDeleteApi(id: string): Observable<any> {
    return this.service.delete('/flowmgt/flow/delete?id=' + id);
  }
}
