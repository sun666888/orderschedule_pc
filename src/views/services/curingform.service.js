import axios from 'axios'

export default {
  // 区域固化
  searchRegionSolidifyOrder(orderStartTime, orderEndTime, district) {
    return axios({
      url: '/orderschedule/index.php/Home/Export/areaIndexShowSolidifyExport',
      method: 'post',
      data: { order_start_time: orderStartTime, order_end_time: orderEndTime, district }
    }).then()
  },

  // 人员固化
  searchPersonnelSolidifyOrder(completeStartTime, completeEndTime, userId) {
    return axios({
      url: '/orderschedule/index.php/Home/Export/totalIndexShowSolidifyExport',
      method: 'post',
      data: { complete_start_time: completeStartTime, complete_end_time: completeEndTime, userId }
    }).then()
  }
}