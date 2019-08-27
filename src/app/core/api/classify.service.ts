import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable()
export class ClassifyService {

  constructor(private service: UtilService) {}

  /**
   * 分类树
   */
  classifyListApi(status = true) {
    return this.service.get(`flowmgt/category/tree?ignoreStatus=${status}`);
  }

  /**
   * 添加分类树
   * @params id: key
   * @params name: 名称
   * @params status: 状态
   * @params parentId: 父节点
   * @params createBy: 创建人
   */
  addTreeNodeApi(params) {
    return this.service.post('flowmgt/category/add', params);
  }

  /**
   * 更新分类树
   * @params id: key
   * @params name: 名称
   * @params status: 状态
   * @params parentId: 父节点
   * @params updateBy: 修改人
   */
  updateTreeNodeApi(params) {
    return this.service.post('flowmgt/category/update', params);
  }

  /**
   * 删除分类树
   * @params id: key
   * @params name: 名称
   * @params status: 状态
   * @params parentId: 父节点
   * @params updateBy: 修改人
   */
  deleteTreeNodeApi(id: string) {
    return this.service.delete(`flowmgt/category/delete?id=${id}`);
  }

}
