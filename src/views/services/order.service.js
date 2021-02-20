import axios from 'axios'

export default {

    // 订单录入
  uploadExcel(formdata) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/upload',
      method: 'post',
      data: formdata,
      headers: { 'Content-Type': 'multipart/form-data' }
    }).then()
  },

    // 成功单录入
  createOrder(orderId, planName, orderPhone, consignee, orderTime, orderType, address, lat, lng, district, scheduleRemark, expressRemark, state, userId, pointId, businessId, block, phone, visitTime, assignTime, acceptTime, completeTime, scheduleCancelReason, expressCancelReason, scheduleAnotherDayReason, expressAnotherDayReason, secondaryCard) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/establish',
      method: 'post',
      data: { orderId, planName, orderPhone, consignee, orderTime, orderType, address, lat, lng, district, scheduleRemark, expressRemark, state, userId, pointId, businessId, block, phone, visitTime, assignTime, acceptTime, completeTime, scheduleCancelReason, expressCancelReason, scheduleAnotherDayReason, expressAnotherDayReason, secondaryCard }
    }).then()
  },

    // 录入明细
  searchImportSeq(startTime, endTime, pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/ImportSeq/ImportSeq',
      method: 'post',
      data: { startTime, endTime, pageIndex, pageSize }
    }).then()
  },

    // 分页查询订单(调度)
  getScheduleOrders(pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/ordersAll',
      method: 'get',
      params: {
        type: '调度业务',
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }).then()
  },

    // 分页查询订单(营销)
  getMarketOrders(pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/ordersAll',
      method: 'get',
      params: {
        type: '营销业务',
        pageIndex: pageIndex,
        pageSize: pageSize
      }
    }).then()
  },

    // 条件搜索订单
  searchOrder(searchContent) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/search',
      method: 'post',
      data: searchContent
    }).then()
  },

    // 查询单个订单
  getOrder(orderId) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/ordersOne?id=' + orderId,
      method: 'get',
      params: {}
    }).then()
  },

    // 分配站点和派送员(验证)
  assignOrder(id, businessId, phone, district, address, visitTime, lng, lat) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/assign',
      method: 'post',
      data: { id, businessId, phone, district, address, visitTime, lng, lat }
    })
  },

    // 更新订单
  patchOrder(orderId, assign, jsonPatchDocument) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/update?id=' + orderId,
      method: 'patch',
      data: { assign, jsonPatchDocument }
    }).then()
  },

    // 改派订单 （派送员改派到另一个派送员）
  changeDelivery(sourceUserId, targetUserId) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/changeExpress',
      method: 'post',
      data: {
        sourceUserId,
        targetUserId
      }
    }).then()
  },

    // 批量改派
  batchChange(orderIds, targetUserId) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/batchChangeExpress',
      method: 'post',
      data: {
        orderIds,
        targetUserId
      }
    }).then()
  },

    // 回收单个订单
  recycleSingleOrder(orderId) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/recover',
      method: 'post',
      data: { orderId }
    }).then()
  },

    // 删除单个订单
  deleteOrder(orderId) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/delete',
      method: 'delete',
      data: { orderId }
    }).then()
  },

    // 导出excel
  exportExcel(orderId, phone, userId, pointId, state, callState, startTime, endTime, notConnectCount) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/export',
      method: 'get',
      params: { orderId, phone, userId, pointId, state, callState, startTime, endTime, notConnectCount }
    }).then()
  },

    // 超时单
  getDelayOrder(pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/delay',
      method: 'get',
      params: { pageIndex, pageSize }
    })
  },

    // 外呼回滚
  rollBack() {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/rollback',
      method: 'get',
      params: {}
    })
  },

    // 已接通 未分配的订单回滚
  rollBackCalled() {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/connectedRollback',
      method: 'get',
      params: {}
    })
  },

    // 当前预拨的明细
  callNumber() {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/callStatus',
      method: 'get',
      params: {}
    })
  },

    // 订单历史纪录
  orderHistory(orderId) {
    return axios({
      url: '/orderschedule/index.php/Home/OrderHistory/detail',
      method: 'get',
      params: { orderId }
    })
  },

    // 判断该号码是否符合手拨条件，如果已经加入到呼叫队列，那么不能在采用手动拨打
  checkmanualCall(phone) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/manualCallCheck',
      method: 'post',
      data: { phone }
    })
  },

    // 调度地图相关api
  getOrdersLngLatList(searchContent) {
    return axios({
      url: '/orderschedule/index.php/Home/Orders/getOrdersLngAndLatList',
      method: 'post',
      data: searchContent
    })
  },

  // 补登明细表导入
  uploadOrder(formdata) {
  return axios({
    url: '/orderschedule/index.php/Home/AuditDetails/upload',
    method: 'post',
    data: formdata,
    headers: { 'Content-Type': 'multipart/form-data' }
  }).then()
  },
  // 补登列表
    upplementaryOrder(pageIndex,pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/AuditDetails/search',
      method: 'post',
      data: {pageIndex,pageSize}
    }).then()
  },

}