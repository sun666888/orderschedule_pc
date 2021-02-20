import axios from 'axios'

export default {
    // 分页获取调度员
    // getAllScheduler(pageIndex, pageSize) {
    //     return axios({
    //         url: "/api/schedules/",
    //         method: "get",
    //         params: { pageIndex, pageSize }
    //     }).then();
    // },

    // 新增调度员
  addScheduler(userName, password, name, phone, address, roleIds) {
    return axios({
      url: '/orderschedule/index.php/Home/Schedules/create',
      method: 'post',
      data: { userName, password, name, phone, address, roleIds }
    }).then()
  },

    // 查看单个调度员
  getScheduler(id) {
    return axios({
      url: '/orderschedule/index.php/Home/Schedules/detail',
      method: 'get',
      params: { id }
    }).then()
  },

    // 更新调度员
  updateScheduler(id, jsonPatchDocument) {
    return axios({
      url: '/orderschedule/index.php/Home/Schedules/update?id=' + id,
      method: 'patch',
      data: { jsonPatchDocument }
    })
  },

    // 删除调度员
  deleteScheduler(id) {
    return axios({
      url: '/orderschedule/index.php/Home/Schedules/delete',
      method: 'delete',
      data: { id }
    })
  },

    // 根据调度员姓名或则电话号码搜索
  searchScheduler(nameOrPhone, pageIndex, pageSize) {
    return axios({
      url: '/orderschedule/index.php/Home/Schedules/search',
      method: 'post',
      data: { nameOrPhone, pageIndex, pageSize }
    })
  }

}