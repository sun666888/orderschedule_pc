import axios from 'axios'

export default {
    // 获取待审核派送员
  getRegisters(pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/registers',
      method: 'get',
      params: { pageIndex, pageSize }
    }).then()
  },

    // 审核派送员
  passRegister(userId) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/review',
      method: 'post',
      data: { userId }
    }).then()
  },

    // 分页派送员
  getAllDelivery(pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/express',
      method: 'get',
      params: { pageIndex, pageSize }
    }).then()
  },

    // 所有派送员
  getDeliveryes() {
    return axios({
      url: '/orderschedule/index.php/Home/Users/expresses',
      method: 'get',
      params: {}
    }).then()
  },

    // 单个派送员
  getDelivery(id) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/detail',
      method: 'get',
      params: { id }
    }).then()
  },

    // 更新派送员
  updateDelivery(id, jsonPatchDocument) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/update?id=' + id,
      method: 'patch',
      data: { jsonPatchDocument }
    }).then()
  },

    // 删除派送员
  deleteDelivery(id) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/delete',
      method: 'delete',
      data: { id }
    }).then()
  },

  // 重置密码
  resetDelivery(id) {
    return axios({
        url: '/orderschedule/index.php/Home/Users/retry',
        method: 'get',
        params: {id}
    }).then()
},

    // 排班
  schedulingEachWeek(assignModels) {
    return axios({
      url: '/orderschedule/index.php/Home/Points/assignWork',
      method: 'post',
      data: { assignModels }
    }).then()
  },

    // 查看一周班表
  lookEachWeek() {
    return axios({
      url: '/orderschedule/index.php/Home/Points/userPoints',
      method: 'get',
      params: {}
    }).then()
  },

    // 根据站点派送员搜索
  searchDelivery(pointId, userId, pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Users/search',
      method: 'post',
      data: { pointId, userId, pageIndex, pageSize }
    }).then()
  },

    // 点击修改
    updateConfig(Id) {
      return axios({
        url: '/orderschedule/index.php/Home/CrawlerConfig/obtainOne',
        method: 'post',
        data:{Id:Id}
      }).then()
    },

    // 确定修改
    confirmupdateconfig(Id,UserId,Remark) {
      return axios({
        url: '/orderschedule/index.php/Home/CrawlerConfig/update',
        method: 'post',
        data:{Id,UserId,Remark}
      }).then()
    }
}