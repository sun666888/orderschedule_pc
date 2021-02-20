import axios from 'axios'
export default {
    // 创建配置
  addConfig(phone, userId, remark) {
    return axios({
      url: '/orderschedule/index.php/Home/CrawlerConfig/establish',
      method: 'post',
      data: { phone, userId, remark }
    })
  },

    // 删除配置
  deleteConfig(id) {
    return axios({
      url: '/orderschedule/index.php/Home/CrawlerConfig/delete',
      method: 'delete',
      data: { id }
    })
  },

    // 查询配置
  searchConfigs() {
    return axios({
      url: '/orderschedule/index.php/Home/CrawlerConfig/obtainAll',
      method: 'get',
      params: {}
    })
  },

    // 创建工号关联
  addContrast(UserId, Delivery) {
    return axios({
      url: '/orderschedule/index.php/Home/ExpressContrast/add',
      method: 'post',
      data: { UserId, Delivery }
    })
  },

    // 删除工号关联
  deleteContrast(id) {
    return axios({
      url: '/orderschedule/index.php/Home/ExpressContrast/delete',
      method: 'delete',
      data: { id }
    })
  },

    // 查询所有关联
  searchContrasts() {
    return axios({
      url: '/orderschedule/index.php/Home/ExpressContrast/obtainAll',
      method: 'get',
      params: {}
    })
  },

    // 查看单个关联
  getContrast(id) {
    return axios({
      url: '/orderschedule/index.php/Home/ExpressContrast/detail',
      method: 'get',
      params: { id }
    })
  },

    // 修改单个关联
  editContrast(id, jsonPatchDocument) {
    return axios({
      url: '/orderschedule/index.php/Home/ExpressContrast/update',
      method: 'patch',
      data: { id, jsonPatchDocument }
    })
  }

}