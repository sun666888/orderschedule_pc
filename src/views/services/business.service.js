import axios from 'axios'
export default {
    // 新增业务
  addBusiness(name, description) {
    return axios({
        url: '/orderschedule/index.php/Home/Businesses/establish',
        method: 'post',
        data: { name, description }
      }).then()
  },

    // 所有业务
  getAllBusiness() {
    return axios({
        url: '/orderschedule/index.php/Home/Businesses/obtainAll',
        method: 'get',
        params: {}
      }).then()
  },

    // 验证业务
  validateBusiness(name) {
    return axios({
        url: '/orderschedule/index.php/Home/Businesses/validate',
        method: 'post',
        data: { name }
      })
  }

    // 删除业务
    // deleteBusiness(businessId) {
    //     return axios({
    //         url: "/api/businesses/" + businessId,
    //         method: "delete",
    //         data: {}
    //     }).then();
    // },

    // 获取业务
    // getBusiness(businessId) {
    //     return axios({
    //         url: "/api/businesses/" + businessId,
    //         method: "get",
    //         params: {}
    //     }).then();
    // },

    // 更新业务
    // updateBusiness(businessId, jsonPatchDocument) {
    //     return axios({
    //         url: "/api/businesses/" + businessId,
    //         method: "patch",
    //         data: {
    //             jsonPatchDocument
    //         }
    //     }).then();
    // }

}