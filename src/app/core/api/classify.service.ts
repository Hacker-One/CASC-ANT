import { Injectable } from '@angular/core';
import { UtilService } from './util.service';

@Injectable()
export class ClassifyService {

  constructor(private service: UtilService) {}

  /**
   * 分类树
   * @params needRole 是否显示角色没有权限的数据(true/false)
   * @params ignoreStatus 是否忽略数据的状态(true/false)
   */
  classifyListApi(status = true) {
    return this.service.get(`flowmgt/category/tree?ignoreStatus=${status}`);
  }

  /**
   * 根据userId分类树
   * @params userId 当前用户id
   */
  treeByUserApi(userId: string) {
    return this.service.get(`flowmgt/role/treebyuser?userId=${userId}`);
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
