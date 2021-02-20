<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">外呼统计</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="small" v-model="startTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd" ></el-date-picker>
                </div>
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="small" v-model="endTime" type="datetime" placeholder="选择日期时间" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">调度员: </div>
                    <el-input type="text" placeholder="请输入调度员" v-model.trim="username" size="small"></el-input>
                </div> 
                <div class="col-md-3 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                    <!-- <button class="btn btn-info search-btn" v-on:click.stop="exportCallExcel">导出</button> -->
                </div>
                <div class="col-md-12 search-field yi_table"> 
                    <el-table
                        :data="orderList"
                        border
                        style="width: 100%">
                        <el-table-column
                            fixed
                            prop="orderId"
                            label="订单编号"
                            width="150">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="planName"
                            label="套餐名称"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="orderPhone"
                            label="订购号码"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            fixed
                            prop="orderTime"
                            label="下单时间"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="user"
                            label="派送员"
                            width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.userId">{{matchDelivery(scope.row.userId)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="orderType"
                            label="订单类型"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="state"
                            label="订单状态"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="lastCallState"
                            label="通话状态"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="notConnectCount"
                            label="外呼次数"
                            width="80">
                        </el-table-column>
                        <el-table-column
                            prop="consignee"
                            label="收件人"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="phone"
                            label="号码"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="收货地址"
                            width="300">
                        </el-table-column>
                        <el-table-column
                            prop="point"
                            label="站点"
                            width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.pointId">{{matchPoint(scope.row.pointId)}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="lastCallTime"
                            label="最新呼叫时间"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="nextCallTime"
                            label="繁忙另约时间"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="visitTime"
                            label="派送时间"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="importer"
                            label="导入者"
                            width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.importSequence">{{scope.row.importSequence.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="importTime"
                            label="订单导入时间"
                            width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.importSequence">{{scope.row.importSequence.importTime}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="scheduleRemark"
                            label="备注"
                            width="120">
                        </el-table-column>
                    </el-table>
                </div>
                <div class="page yi_page">
                    <el-pagination
                        background
                        @current-change="searchList"
                        :current-page.sync="pageIndex"
                        :page-size="pageSize"
                        layout="total, prev, pager, next"
                        :total="totalOrders"
                    >
                    </el-pagination>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Loading, TimePicker, Table} from 'element-ui'
import callHistorySrv from '@/../src/views/services/callHistory.service.js'
import eachWeekDate from '@/../src/util/eachWeekDate.js'
import deliverySrv from '@/../src/views/services/delivery.service.js'
import pointSrv from '@/../src/views/services/point.service.js'

/* eslint-disable */
export default {
    data() {
        return {
            orderList: [],
            totalOrders: 0,
            pageIndex: 1,
            pageSize: 5,
            startTime: "",
            endTime: "",
            username: "",
            deliveryList: [],
            pointList: []
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let username = window.localStorage.getItem("user");
            vm.username = username;
            let nextDate = eachWeekDate(2);
            vm.startTime = nextDate[0];
            vm.endTime = nextDate[1];
            callHistorySrv.eachCaller(vm.username, vm.startTime,vm.pageIndex, vm.pageSize, vm.endTime).then(resp => {
                let data = resp.data.pageInfo;
                vm.orderList = data.entities;
                vm.totalOrders = data.total;
            }, err => {
                vm.$message.error(err.error.message);
            });

            deliverySrv.getDeliveryes().then(resp => {
                let data = resp.data.users;
                if (data) {
                    vm.deliveryList = data;
                }
            }, err => {
                vm.$message.error(err.error.message);
            });

            pointSrv.getAllpoints().then(resp => {
                let data = resp.data.points;
                if (data) {
                    vm.pointList = data;
                }
            }, err => {
                vm.$message.error(err.error.message);
            })

        })
    },
    methods: {
        searchList(pageIndex = this.pageIndex) {
            callHistorySrv.eachCaller(this.username, this.startTime, pageIndex, this.pageSize, this.endTime).then(resp => {
                let data = resp.data.pageInfo;
                this.orderList = data.entities;
                this.totalOrders = data.total;
                this.pageIndex = pageIndex;
            }, err => {
                vm.$message.error(err.error.message);
            });
        },
        matchDelivery(userId) {
            let deliveryname = "";
            this.deliveryList.map(x => {
                if (x.id == userId) {
                    deliveryname = x.name;
                }
            })
            return deliveryname;
        },
        matchPoint(pointId) {
            let pointname = "";
            this.pointList.map(x => {
                if (x.id == pointId) {
                    pointname = x.name;
                }
            })
            return pointname;
        },
        exportCallExcel() {

        }

    },
};
</script>

<style lang="scss" scoped>
    .content_page .content-show .list-search .yi_table {
        padding-left: 0px;
    }
    .yi_page {
        margin-left: auto;
        margin-right: auto;
    }
    .collapse-wrap {
        margin-bottom: 20px;
    }
</style>
