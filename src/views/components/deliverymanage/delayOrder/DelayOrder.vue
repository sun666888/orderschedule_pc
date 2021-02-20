<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">超时单列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-4 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">超时单</button>
                </div>
                <div class="col-md-12 search-field yi_table" v-if="orderList && orderList.length > 0">
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
                            prop="user"                 
                            label="派送员"
                            width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.user">{{scope.row.user.name}}</span>
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
                            prop="callState"
                            label="通话状态"
                            width="120">
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
                            prop="workId"
                            label="工号"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="point"
                            label="站点"
                            width="120">
                            <template slot-scope="scope">
                                <span v-if="scope.row.point">{{scope.row.point.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="lastCallTime"
                            label="最新呼叫时间"
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
                <div class="info">暂时没有出现超时单...</div>
            </div>
        </div>

    </div>
</template>

<script>
import { Pagination, Button, Table} from 'element-ui'
import orderSrv from '@/../src/views/services/order.service.js'

/* eslint-disable */
export default {
    data() {
        return {
            pageIndex: 1,
            pageSize: 5,
            orderList: []
        }; 
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            orderSrv.getDelayOrder(vm.pageIndex, vm.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                if (data.entities.length > 0) {
                    vm.orderList = data.entities;
                    vm.totalOrders = data.total;
                }
            }, err => {
                vm.$message.error(err.error.message);
            });
        })
    },
    methods: {
        searchList(pageIndex = this.pageIndex) {
            orderSrv.getDelayOrder(pageIndex, this.pageSize).then(resp => {
                let data = resp.data.pageInfo;
                this.totalOrders = data.total;
                this.orderList = data.entities;
                this.pageIndex = pageIndex;
            }, err => {
                this.$message.error(err.error.message);
            })
        },

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
    .yi_area {
        width: 320px;
    }
</style>        