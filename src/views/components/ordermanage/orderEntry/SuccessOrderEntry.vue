<template>
    <div class="animated fadeIn content_page scheduling">
        <div class="content-title">
            <div class="title">成功单录入</div>
        </div>
        <div class="content-show">
            <div class="row">
                <el-form ref="form" :model="form" label-width="80px" class="yi_border col-lg-6 yi_padding">
                    <el-form-item label="订单编号">
                        <el-input v-model.trim="form.orderId"  class="yi_address"></el-input>
                    </el-form-item>
                    <el-form-item label="套餐名称">
                        <el-input v-model.trim="form.planName" ></el-input>
                    </el-form-item>
                    <el-form-item label="下单时间">
                        <el-input v-model="form.orderTime" ></el-input>
                    </el-form-item>
                    <el-form-item label="下单号码">
                        <el-input v-model.trim="form.orderPhone" ></el-input>
                    </el-form-item>
                    <el-form-item label="收件人">
                        <el-input v-model.trim="form.consignee" ></el-input>
                    </el-form-item>
                    <el-form-item label="号码">
                        <el-input v-model.trim="form.phone"  ></el-input>
                    </el-form-item>
                    <el-form-item label="派送地址">
                        <el-input v-model.trim="form.address"  class="yi_address" @blur="changeAddress()" ></el-input>
                    </el-form-item>
                    <el-form-item label="派送日期">
                        <el-date-picker
                            v-model="form.visitTime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="请选择日期">
                        </el-date-picker>   
                    </el-form-item> 
                    <el-form-item label="派送员">
                        <el-select v-model="form.userId" filterable clearable  placeholder="请选择派送员" @change="chooseUser" >
                            <el-option
                                v-for="item in deliveryList"
                                :key="item.id"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                        </el-select>                              
                    </el-form-item>
                    <el-form-item>
                        <el-button type="primary" @click="onSubmit">提交订单</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
import {lazyAMapApiLoaderInstance } from 'vue-amap';
import { DatePicker, Button, Input, MessageBox} from "element-ui";
import orderSrv from "@/../src/views/services/order.service.js";   
import deliverySrv from "@/../src/views/services/delivery.service.js";
import businessSrv from "@/../src/views/services/business.service.js";
import moment from "moment";

//JSON patch
import  {observe, generate} from "fast-json-patch";

/* eslint-disable */
export default {
    name: 'schedulingDetail',
    data() {
        return {
            form: {},
            formLabelWidth: '120px',
            deliveryList: [],
            pointId: "",
            district: "",
            lng: "",
            lat: "",
            businesses: ""
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            deliverySrv.getDeliveryes().then(resp =>{
                let data = resp.data.users;
                vm.deliveryList = data;
            })
            businessSrv.getAllBusiness().then(resp => {
                let data = resp.data.businesses;
                data.map(x => {
                    if (x.name == "码上购") {
                        vm.businessId = x.id;
                    }
                })
            }, err => {
                this.$message.error(err.error.message);
            })
        })
    },
    methods: {
        onSubmit() {
            console.log(this.businessId);
            let tempform = this.form;
            let time = moment().format("YYYY-MM-DD HH:mm:ss");
            if(tempform.orderId && tempform.planName && tempform.orderTime && tempform.orderPhone && tempform.consignee && tempform.phone && tempform.address && tempform.visitTime && tempform.userId) {
                let sumitForm = {
                    orderId: tempform.orderId,
                    planName: tempform.planName,
                    orderPhone: tempform.orderPhone,
                    consignee: tempform.consignee,
                    orderTime: tempform.orderTime,
                    orderType: "可派单",
                    address: tempform.address,
                    lat: this.lat,
                    lng: this.lng,
                    district: this.district,
                    scheduleRemark: "",
                    expressRemark: "成功单导入",
                    state: "成功",
                    userId: this.form.userId,
                    businessId: this.businessId,
                    block: true,
                    phone: tempform.phone,
                    visitTime: time,
                    assignTime: time,
                    acceptTime: time,
                    completeTime: time,
                    pointId: this.pointId,
                    scheduleCancelReason: "", 
                    expressCancelReason: "", 
                    scheduleAnotherDayReason: "", 
                    expressAnotherDayReason: "", 
                    secondaryCard: ""
                }
                orderSrv.createOrder(sumitForm.orderId, sumitForm.planName, sumitForm.orderPhone,sumitForm.consignee, sumitForm.orderTime, sumitForm.orderType, sumitForm.address, sumitForm.lat, sumitForm.lng, sumitForm.district, sumitForm.scheduleRemark, sumitForm.expressRemark, sumitForm.state, sumitForm.userId, sumitForm.pointId, sumitForm.businessId,sumitForm.block, sumitForm.phone,sumitForm.visitTime,sumitForm.assignTime,sumitForm.acceptTime,sumitForm.completeTime, sumitForm.scheduleCancelReason, sumitForm.expressCancelReason, sumitForm.scheduleAnotherDayReason, sumitForm.expressAnotherDayReason, sumitForm.secondaryCard).then(resp => {
                    this.$message.success("添加成功");
                }, err => {
                    this.$message.error(err.error.message);
                })
            } else {
                this.$message.error("请填写所有的信息");
            }
        },
        chooseUser() {
            let chooseUserId = this.form.userId;
            let pointId = "";
            this.deliveryList.map(x => {
                if (x.id == chooseUserId) {
                    pointId = x.pointId;
                }
            })
            this.pointId = pointId;
        },
        changeAddress() {
            // 高德sdk
            let self = this;
            let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            let newLng = "", newLat = "", lat = "", lng = "";
            geocoder.getLocation(self.form.address, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.geocodes) {
                        newLng = result.geocodes[0].location.lng;
                        newLat = result.geocodes[0].location.lat;
                        self.district = result.geocodes[0].addressComponent.district;                       
                        self.lng =  newLng.toString();
                        self.lat = newLat.toString();
                        console.log(self.district, self.lng, self.lat);
                    }
                }
            })
        }
    }
};
</script>

<style lang="scss" scoped>
.yi_border {
    border: 1px solid #ebebeb;
    border-radius: 3px;
    padding: 16px 0;
    transition: .2s;
    box-shadow: 0 0 8px 0 rgba(232, 237, 250, .6),
            0 2px 4px 0 rgba(232, 237, 250, .5);
}
.yi_padding {
    padding-right: 24px;
}
.el-form-item__content .el-input__inner {
    width: 240px;
}
.el-form-item--mini.el-form-item, .el-form-item--small.el-form-item  {
    margin-bottom: 8px;
}
.el-form-item .el-form-item__content .yi_address,  .el-form-item--small .el-form-item__content .yi_address {
    width: 80%;
}
.yi_border {
    margin-left: 24px;
}
.errorInfo {
    position: relative;
    background-color: #fef0f0;
    color: #f56c6c;
    text-align: center;
    padding: 8px;
    margin-bottom: 8px;
}
.infoanimation-enter-active{
    transition: all .3s ease;
}
.infoanimation-leave-active{
    transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.infoanimation-enter, .infoanimation-leave-to {
    transform: translateX(40px);
    opacity: 0;
}
</style>