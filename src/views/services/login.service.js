import axios from 'axios';
export default {

    // 登陆
    login(loginName, password) {
        return axios({
            url: "/orderschedule/index.php/Home/Accounts/signin",
            method: "post",
            data: { loginName, password }
        }).then();
    },



    // 登出
    loginOut() {
        return axios({
            url: "/orderschedule/index.php/Home/Accounts/logout",
            method: "post",
            data: {}
        }).then();
    },

    // 修改密码
    updatePassword(originPassword, newPassword, rePassword) {
        return axios({
            url: "/orderschedule/index.php/Home/Accounts/changePassword",
            method: "post",
            data: { originPassword, newPassword, rePassword }
        }).then();
    }
}