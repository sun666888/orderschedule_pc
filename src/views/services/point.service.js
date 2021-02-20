import axios from 'axios'

export default {
    // 所有派送点
  getAllpoints() {
    return axios({
      url: '/orderschedule/index.php/Home/Points/getPoints',
      method: 'get',
      params: {}
    }).then()
  },
  // 所有派送点列表
  // getAllpoints() {
  //     return axios({
  //       url: '/orderschedule/index.php/home/site/getSiteList',
  //       method: 'get',
  //       params: {}
  //     }).then()
  //   },




    // 创建派送点
  addPoint(name, district, lat, lng, address, radius) {
    return axios({
      url: '/orderschedule/index.php/Home/Points/create',
      method: 'post',
      data: { name, district, lat, lng, address, radius }
    }).then()
  },

    // 查看派送点
  // getPoint(id) {
  //   return axios({
  //     url: '/orderschedule/index.php/Home/Points/detail',
  //     method: 'get',
  //     params: { id }
  //   }).then()
  // },
    // 查看派送点
  getPoint(id) {
    return axios({
      url: '/orderschedule/index.php/home/site/getSiteInfo',
      method: 'post',
      data: { id }
    }).then()
  },



  //   // 删除派送点
  // deletePoint(id) {
  //   return axios({
  //     url: '/orderschedule/index.php/Home/Points/delete',
  //     method: 'delete',
  //     data: { id }
  //   }).then()
  // },
  // 删除派送点
  deletePoint(id) {
    return axios({
      url: '/orderschedule/index.php/home/site/deleteSite',
      method: 'delete',
      data: { id }
    }).then()
  },



  //   // 更新派送点
  // updatePoint(Id, jsonPatchDocument) {
  //   return axios({
  //     url: '/orderschedule/index.php/Home/Points/update?id=' + Id,
  //     method: 'patch',
  //     data: { jsonPatchDocument }
  //   }).then()
  // },
    // 更新派送点修改
  // updatePoint(Id, jsonPatchDocument) {
  //   return axios({
  //     url: '/orderschedule/index.php/home/site/updateSite?id=' + Id,
  //     method: 'patch',
  //     data: { jsonPatchDocument }
  //   }).then()
  // },

    // 验证站点正确性
  validatePoint(name) {
    return axios({
      url: '/orderschedule/index.php/Home/Points/validate',
      method: 'post',
      data: { name }
    }).then()
  },

    // 导出站点todo
    // exportPoints(businessId) {
    //     return axios({
    //         url: "/api/points/export/business/" + businessId,
    //         method: "get",
    //         params: {},
    //         responseType: 'blob'
    //     }).then()
    // },

    // 选择日期获取当天的站点对应的派送员
  chooseUsers(businessId, visitTime) {
    return axios({
      url: '/orderschedule/index.php/Home/Points/todayWork',
      method: 'post',
      data: { businessId, visitTime }
    })
  },



  // 结束编辑新建
  endEditor(form, array){
    return axios({
      url: '/orderschedule/index.php/home/site/getSiteCoordinates',
      method: 'post',
      data: { form, array }
    }).then()
  }

}