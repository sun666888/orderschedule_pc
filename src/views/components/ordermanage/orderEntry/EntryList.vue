<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">录入明细</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left:0px" class="label">开始时间：</div>
                    <el-date-picker size="small" v-model="startTime" type="datetime" placeholder="选择时间" value-format="yyyy-MM-dd" ></el-date-picker>
                </div>
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left: 0px" class="label">结束时间：</div>
                    <el-date-picker size="small" v-model="endTime" type="datetime" placeholder="选择时间" value-format="yyyy-MM-dd"></el-date-picker>
                </div>
                <div class="col-md-3 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                </div>
                <div class="col-md-12 search-field yi_table">
                    <el-table
                        :data="orderList"
                        border
                        style="width: 100%">
                        <el-table-column
                            fixed
                            prop="importTime"
                            label="导入时间">
                        </el-table-column>
                        <el-table-column
                            prop="id"
                            label="导入批次">
                        </el-table-column>
                        <el-table-column
                            prop="businessId"
                            label="业务ID">
                        </el-table-column>
                        <el-table-column
                            prop="guid"
                            label="序列号">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="导入者">
                        </el-table-column>
                        <el-table-column
                            prop="count"
                            label="订单数量">
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
import { Pagination, DatePicker, Button, Input, Loading, TimePicker, Table} from "element-ui";
import eachWeekDate from "@/../src/util/eachWeekDate.js";
import orderSrv from "@/../src/views/services/order.service.js";

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
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let nextDate = eachWeekDate(2);
            vm.startTime = nextDate[0];
            vm.endTime = nextDate[1];   
            orderSrv.searchImportSeq(vm.startTime, vm.endTime, vm.pageIndex, vm.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                vm.orderList = data.entities;
                vm.totalOrders = data.total;
            }, err => {
                vm.$message.error(err.error.message);
            })
        })
    },
    methods: {
        searchList(pageIndex = this.pageIndex) {
            orderSrv.searchImportSeq(this.startTime, this.endTime, pageIndex, this.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                this.orderList = data.entities;
                this.totalOrders = data.total;
                this.pageIndex = pageIndex;
            }, err => {
                vm.$message.error(err.error.message);
            })
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