import axios from "axios";

export default {
    // 分页获取调度员
    getAllRole() {
        return axios({
            url: "/orderschedule/index.php/Home/Roles/getRoles",
            method: "get",
            params: {}
        }).then();
    }

}