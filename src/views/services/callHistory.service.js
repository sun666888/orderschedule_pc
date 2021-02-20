import axios from 'axios';
export default {
    // 录音查询
    callhistory(businessId, startTime, endTime, phone, pageIndex, pageSize, orderId) {
        return axios({
            url: "/orderschedule/index.php/Home/CallHistories/search",
            method: "post",
            data: { businessId, startTime, endTime, phone, pageIndex, pageSize, orderId }
        })
    },

    listenSrc(fileSrc) {
        return axios({
            url: "/orderschedule/index.php/Home/Medias/audio?fileName=" + fileSrc,
            method: "get",
            params: {}
        })
    },

    // 个人呼叫订单记录
    eachCaller(name, startTime, pageIndex, pageSize, endTime) {
        return axios({
            url: "/orderschedule/index.php/Home/Orders/searchByCall",
            method: "post",
            data: { name, startTime, pageIndex, pageSize, endTime }
        })
    }
}