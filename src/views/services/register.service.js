import axios from 'axios';
export default {

    // 查询所有待审核用户
    // getAllRegisters() {
    //     return axios({
    //         url: "/api/Registers",
    //         method: "get",
    //         params: {}
    //     }).then()
    // },

    // 搜索用户
    // getAllUser() {
    //     return axios({
    //         url: "/api/Users/search",
    //         method: "post",
    //         data: {}
    //     }).then();
    // },

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

}