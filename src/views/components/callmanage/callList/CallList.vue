<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">外呼列表</div>
        </div>
        <div class="content-show">
            <div class="call-wrap">
                <el-input type="text" placeholder="请输入呼叫手机号码" v-model.trim="callPhone" size="medium" class="yi-phone"></el-input>
                <button class="btn btn-info " @click="handleCallPhone">呼叫</button>
            </div>
            <div class="collapse-wrap">
                <el-collapse accordion>
                    <el-collapse-item @click.native="prevClick">
                        <template slot="title">
                        预拨情况<i class="header-icon el-icon-info"></i>
                        </template> 
                        <div>
                            待分配订单量：<span style="color: #409eff">{{callDetail.total}}</span> ,
                            呼叫队列剩余订单量：<span style="color:#67c23a">{{callDetail.seq}}</span> ,
                            繁忙另约订单量: <span style="color: #e6a23c">{{callDetail.busy}}</span> ,
                            未接通订单量：<span style="color: #909399">{{callDetail.notConnect}}</span> ,
                            呼叫3次未接通订单量： <span style="color: #f56c6c">{{callDetail.three}}</span></div>
                    </el-collapse-item>
                </el-collapse>
            </div>
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">业务：</div>
                    <el-select v-model="businessId" clearable placeholder="请选择业务" size="medium" >
                        <el-option
                            v-for="item in businessList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">订单号：</div>
                    <el-input type="text" placeholder="请输入订单编号或ID" v-model.trim="orderId" size="medium"></el-input>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">订单状态：</div>
                    <el-select v-model="state" clearable placeholder="请选择订单状态" size="medium" multiple>
                        <el-option label="未分配" value="未分配"></el-option>
                        <el-option label="繁忙另约" value="繁忙另约"></el-option>
                        <el-option label="拒访" value="拒访"></el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">呼叫状态：</div>
                    <el-select v-model="callState" clearable placeholder="请选择标记" size="medium" class="yi_area  " >
                        <el-option label="未拨打" value="未拨打" ></el-option>
                        <el-option label="已提取" value="已提取" ></el-option>
                        <el-option label="未接通" value="未接通" ></el-option>
                        <el-option label="已接通" value="已接通" ></el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">呼叫次数：</div>
                    <el-select v-model="callTotal" clearable placeholder="请选择标记" size="medium" class="yi_area" >
                        <el-option label="0" value="0"></el-option>
                        <el-option label="1" value="1" ></el-option>
                        <el-option label="2" value="2" ></el-option>
                        <el-option label="3" value="3" ></el-option>
                        <el-option label="4" value="4" ></el-option>
                        <el-option label="5" value="5" ></el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">行政区：</div>
                    <el-select v-model="district" clearable placeholder="请选择行政区" size="medium" class="yi_area" >
                        <el-option label="浦东新区" value="浦东新区"></el-option>
                        <el-option label="宝山区" value="宝山区"></el-option>
                        <el-option label="杨浦区" value="杨浦区"></el-option>
                        <el-option label="黄浦区" value="黄浦区"></el-option>
                        <el-option label="静安区" value="静安区"></el-option>
                        <el-option label="虹口区" value="虹口区"></el-option>
                        <el-option label="徐汇区" value="徐汇区"></el-option>
                        <el-option label="长宁区" value="长宁区"></el-option>
                        <el-option label="普陀区" value="普陀区"></el-option>
                        <el-option label="嘉定区" value="嘉定区"></el-option>
                        <el-option label="崇明区" value="崇明区"></el-option>
                        <el-option label="闵行区" value="闵行区"></el-option>
                        <el-option label="奉贤区" value="奉贤区"></el-option>
                        <el-option label="松江区" value="松江区"></el-option>
                        <el-option label="青浦区" value="青浦区"></el-option>
                        <el-option label="金山区" value="金山区"></el-option>
                    </el-select>
                </div>
                <div class="col-md-4 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                    <button class="btn btn-info search-btn" v-on:click.stop="backRoll">回滚</button>
                    <button class="btn btn-success search-btn" v-on:click.stop="backRollCalled">已接通回滚</button>
                </div>
                <div class="col-md-12 search-field yi_table">
                    <el-table
                        :data="orderList"
                        border
                        style="width: 100%">
                        <el-table-column
                            fixed
                            label="订单编号"
                            width="110">
                            <template slot-scope="scope">
                                <span>{{ scope.row.orderId }}</span>
                                <i class="fa fa-clipboard yi-clipboard" v-clipboard:copy="scope.row.orderId" v-clipboard:success="clipboardSuccess"  ></i>
                            </template>
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
                            label="需要外呼"
                            width="80">
                            <template slot-scope="scope">
                                <span>{{ scope.row.block == false ? '是' : '否' }}</span>
                            </template>
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
                                <span v-if="scope.row.point">{{scope.row.point.name}}</span>
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
                            prop="importSequenceId"
                            label="导入批次"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="importTime"
                            label="导入时间"
                            width="90">
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
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="120">
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" @click="handleCall(scope.row.id, scope.row.phone, scope.row.businessId)">查看</el-button><br />
                            </template>
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
import { Pagination, DatePicker, Button, Input, Loading, TimePicker, Table} from 'element-ui';
import orderSrv from '@/../src/views/services/order.service.js';
import deliverySrv from '@/../src/views/services/delivery.service.js';
import pointSrv from '@/../src/views/services/point.service.js';
import businessSrv from '@/../src/views/services/business.service.js';
import clip from '@/util/clipboard'
import clipboard from '@/directive/clipboard/index.js'

/* eslint-disable */
export default {
    name: "callList",
    directives: {
        clipboard
    },
    data() {
        return {
            orderList: [],
            totalOrders: 0,
            orderId: "",
            callState: "",
            state: ["未分配"],
            callTotal: "",
            pageIndex: 1,
            pageSize: 5,
            callDetail: {
                total: 0,
                busy: 0,
                notConnect: 0,
                seq: 0,
            },
            callPhone: "",
            businessId: "",
            businessList: [],
            district: ""
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let searchContent = {
                businessId: vm.businessId,
                state: vm.state,
                orderId: vm.orderId,
                callState: vm.callState,
                notConnectCount: vm.callTotal,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                district: vm.district
            };
            orderSrv.searchOrder(searchContent).then(resp => {
                let data = resp.data.pageInfo;
                vm.orderList = data.entities;
                vm.totalOrders = data.total;
            }, err => {
                vm.$message.error(err.error.message);
            });
            businessSrv.getAllBusiness().then(resp => {
                let data = resp.data.businesses;
                vm.businessList = data;
            }, err => {

            })
        })
    },
    methods: {
        searchList(pageIndex = this.pageIndex) {
            let searchContent ={
                businessId: this.businessId,
                orderId: this.orderId,
                state: this.state,
                callState: this.callState,
                notConnectCount: this.callTotal,
                endTime: this.endTime,
                pageIndex: pageIndex,
                pageSize: this.pageSize,
                district: this.district
            }
            orderSrv.searchOrder(searchContent).then(resp => {
                let data = resp.data.pageInfo;
                this.totalOrders = data.total;
                this.orderList = data.entities;
                this.pageIndex = pageIndex;
            }, err => {
                vm.$message.error(err.message);
            })
        },
        handleCall(id, phone, businessId) {
            this.$router.push({
                path:"/callmanage/callDetail",
                query: {
                    orderId: id,
                    businessId: businessId,
                    predial: 'no'
                }
            })
        },
        backRoll() {
            orderSrv.rollBack().then(resp => {
                this.$message.success('回滚成功')
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        prevClick() {
            orderSrv.callNumber().then(resp => {
                this.callDetail = resp.data;
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        handleCopy(text, event) {
            clip(text, event);
        },
        clipboardSuccess() {
            this.$message.success({
                message: "复制成功",
                duration: 600
            })
        },
        handleCallPhone() {
            let id = 10000000;
            let phone = this.callPhone;
            let regexp = /^1[0-9]{10}$/;
            if (!regexp.test(phone)) {
                this.$message.error("请填写正确的号码");
                return;
            }
            let script = document.createElement('script');
            script.src = "http://localhost:10666?orders=callOut&phone="+ phone  +"&id=" + id;
            document.body.insertBefore(script, document.body.firstChild);
            document.body.removeChild(script);
        },
        backRollCalled() {
            orderSrv.rollBackCalled().then(resp => {
                this.$message.success("已接通未分配订单回滚成功")
            }, err => {
                this.$message.error(err.error.message);
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
    .call-wrap {
        width: 300px;
        margin-bottom: 20px;
    }
    .yi-phone {
        width: 200px;
    }
</style>
