import axios from 'axios'

export default {

  // 实时日报表
  realTimeDayExport(curDate) {
    return axios({
      url: '/orderschedule/index.php/Home/V2/realTimeDayExport',
      method: 'post',
      data: { curDate: curDate }
    }).then()
  },

    // 一体化日报表
    unifyExport(curDate) {
        return axios({
            url: '/orderschedule/index.php/Home/V2/unifyExport',
            method: 'post',
            data: { curDate: curDate }
        }).then()
    },

    // 区域实时激活率报表
    areaRealTimeExport(curDate) {
        return axios({
            url: '/orderschedule/index.php/Home/V2/areaRealTimeExport',
            method: 'post',
            data: { curDate: curDate }
        }).then()
    },

    // 落单
    searchConfirmOrder(orderStartTime, orderEndTime, district) {
        return axios({
            url: '/orderschedule/index.php/Home/Export/FallOrderShowExport',
            method: 'post',
            data: { order_start_time: orderStartTime, order_end_time: orderEndTime, district }
        }).then()
    },

  // 区域
  searchRegionOrder(orderStartTime, orderEndTime, district) {
    return axios({
      url: '/orderschedule/index.php/Home/Export/areaIndexShowExport',
      method: 'post',
      data: { order_start_time: orderStartTime, order_end_time: orderEndTime, district }
    }).then()
  },

  // 人员
  searchPersonnelOrder(completeStartTime, completeEndTime, userId) {
    return axios({
      url: '/orderschedule/index.php/Home/Export/totalIndexShowExport',
      method: 'post',
      data: { complete_start_time: completeStartTime, complete_end_time: completeEndTime, userId }
    }).then()
  },

  // 人员各指标分时段展示订单状态
  searchTimeSlotOrder(district, orderStartTime, orderEndTime, userId) {
    return axios({
      url: '/orderschedule/index.php/Home/Export/timeSlotIndexShowExport',
      method: 'post',
      data: { district, order_start_time: orderStartTime, order_end_time: orderEndTime, userId }
    }).then()
  }
}
