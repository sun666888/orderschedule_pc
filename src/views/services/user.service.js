import axios from 'axios';
export default {

    // 获取单个用户信息
    getUser(userId) {
        return axios({
            url: "/orderschedule/index.php/Home/Users/detail?id=" + userId,
            method: "get"
        }).then()
    },

    // 修改单个用户信息
    updateUser(userId) {
        return axios({
            url: "/orderschedule/index.php/Home/Users/update?id=" + userId,
            method: "patch",
            data: {
                userPatch
            }
        }).then()
    },

    // 获取所有待审核的人员
    // getAllDelivery() {
    //     return axios({
    //         url: "/api/Registers",
    //         method: "get",
    //         params: {}
    //     }).then()
    // },

    // 单个用户审核通过
    // passDelivery(id, pointId) {
    //     return axios({
    //         url: "/api/Registers/Pass",
    //         method: "post",
    //         data: {
    //             id: id,
    //             pointId: pointId
    //         }
    //     }).then()
    // },

    // 删除单个申请派送员
    // deleteRegister(id) {
    //     return axios({
    //         url: "/api/Registers/" + id,
    //         method: "delete",
    //         data: {
    //             id: id,
    //         }
    //     }).then()
    // }

}