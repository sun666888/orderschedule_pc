<template>
    <div class="animated fadeIn content_page scheduling_page">
        <div class="content-title">
            <div class="title">调度列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">业务：</div>
                    <el-select v-model="businessId" filterable clearable  placeholder="请先选择业务" size="medium" >
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
                    <div style="left: 0px" class="label">电话号码：</div>
                    <el-input type="text" placeholder="请输入电话号码" v-model.trim="phone" size="medium"></el-input>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="medium" v-model="startCallTime" type="datetime" placeholder="选择外呼开始时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="medium" v-model="endCallTime" type="datetime" placeholder="选择外呼结束时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">派送员：</div>
                    <el-select v-model="userId" filterable clearable  placeholder="请选择派送员" size="medium" >
                        <el-option
                            v-for="item in deliveryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-md-6 search-field yi-multiple">
                    <div style="left: 0px" class="label">订单状态：</div>
                    <el-select v-model="state" clearable placeholder="请选择订单状态" size="medium" multiple >
                        <el-option label="未分配" value="未分配"></el-option>
                        <el-option label="派送" value="派送"></el-option>
                        <el-option label="派送中" value="派送中"></el-option>
                        <!--<el-option label="改派中" value="改派中"></el-option>-->
                        <el-option label="改约" value="改约"></el-option>
                        <el-option label="成功" value="成功"></el-option>
                        <el-option label="未联系到用户" value="未联系到用户"></el-option>
                        <el-option label="转物流" value="转物流"></el-option>
                        <el-option label="退单" value="退单"></el-option>
                        <!--<el-option label="繁忙另约" value="繁忙另约"></el-option>-->
                        <el-option label="转区域" value="转区域"></el-option>
                        <el-option label="已激活" value="已激活"></el-option>
                        <el-option label="拒访" value="拒访"></el-option>
                        <el-option label="失效" value="失效"></el-option>
                        <el-option label="活动订单（未通知不可提交此状态）" value="活动订单（未通知不可提交此状态）"></el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">呼叫状态：</div>
                    <el-select v-model="callState" clearable placeholder="请选择标记" size="medium" class="yi_area  " >
                        <el-option label="未接通" value="未接通" ></el-option>
                        <el-option label="未拨打" value="未拨打" ></el-option>
                        <el-option label="已接通" value="已接通" ></el-option>
                    </el-select>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">站点：</div>
                    <el-select v-model="pointId" clearable placeholder="请选择站点" size="medium" class="yi_area" >
                        <el-option
                            v-for="item in pointList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            >
                        </el-option>
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
                <!-- <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">导入批次：</div>
                    <el-input type="text" placeholder="请输入批次" v-model.trim="importSequenceId" size="medium"></el-input>
                </div> -->
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">上门时间：</div>
                    <el-date-picker size="medium" v-model="visitTime" type="date" placeholder="选择上门日期" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">导入开始：</div>
                    <el-date-picker size="medium" v-model="importSequenceStartTime" type="datetime" placeholder="选择导入开始时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">导入结束：</div>
                    <el-date-picker size="medium" v-model="importSequenceEndTime" type="datetime" placeholder="选择导入结束时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left: 0px" class="label">下单开始：</div>
                    <el-date-picker size="medium" v-model="startOrderTime" type="datetime" placeholder="下单开始时间" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">下单结束：</div>
                    <el-date-picker size="medium" v-model="endOrderTime" type="datetime" placeholder="下单结束时间" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                </div>
                <div class="col-md-3 search-field"> 
                    <div style="left:0px" class="label">完结开始：</div>
                    <el-date-picker size="medium" v-model="startCompleteTime" type="datetime" placeholder="完结开始时间" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">完结结束：</div>
                    <el-date-picker size="medium" v-model="endCompleteTime" type="datetime" placeholder="完结结束时间" value-format="yyyy-MM-dd HH:mm"></el-date-picker>
                </div>
                <div class="col-md-9 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                    <button class="btn btn-success search-btn" v-on:click.stop="changeDelivery">单个派送员全部改派</button>
                    <button class="btn btn-success search-btn" v-on:click.stop="batchChangeDelivery">批量改派<span v-show="this.checkedList.length > 0">( {{ this.checkedList.length}} )</span></button>
                    <button class="btn btn-info search-btn" v-on:click.stop="exportOrder">导出</button>
                </div>
                <div class="col-md-12 search-field yi_table">
                    <el-table
                        ref="multipleTable"
                        :data="orderList"
                        border
                        :row-key="getRowKeys"
                        @selection-change="handleSelectionChange"
                        style="width: 100%">
                        <el-table-column
                            type="selection"
                            width="55"
                            :selectable= "checkSelectable"
                            :reserve-selection = "true"
                            >
                        </el-table-column>
                        <el-table-column
                            fixed
                            label="订单编号"
                            width="110">
                            <template slot-scope="scope">
                                <span v-if="scope.row.orderId">{{ scope.row.orderId }}</span>
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
                            width="110"
                            :sortable= "true">
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
                            prop="lastCallTime"
                            label="最新呼叫时间"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="lastCallUser"
                            label="最新外呼员工"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            label="需要外呼"
                            width="80">
                            <template slot-scope="scope">
                                <span>{{ scope.row.block == false ? '是' : '否' }}</span>
                            </template>
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
                                <span v-if="scope.row.point">{{scope.row.point.name}}</span>
                            </template>
                        </el-table-column>
                        <el-table-column
                            prop="nextCallTime"
                            label="繁忙另约时间"
                            width="100">
                        </el-table-column>
                        <el-table-column
                            prop="visitTime"
                            label="上门时间"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="completeTime"
                            label="完结时间"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="importSequenceId"
                            label="导入批次"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="importTime"
                            label="导入时间"
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
                            prop="scheduleRemark"
                            label="调度员备注"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="expressRemark"
                            label="派送员备注"
                            width="120"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="payType"
                            label="支付方式"
                            width="120"
                        >
                        </el-table-column>
                        <el-table-column
                            prop="payNum"
                            label="支付金额"
                            width="120"
                        >
                        </el-table-column>
                        <el-table-column
                            fixed="right"
                            label="操作"
                            width="140">
                            <template slot-scope="scope">
                                <el-button type="text" size="medium" @click="handleClick(scope.row.id, scope.row.businessId)" style="margin-left: 0">编辑</el-button>
                                <el-button type="text" size="medium" @click="handleRecycle(scope.row.id, scope.row.orderId)">回收</el-button>
                                <el-button type="text" size="medium" @click="handleRecords(scope.row.id, scope.row.orderId)">记录</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>

                <div class="page list-pagination">
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

        <transition name="leftIn">
            <div class="history-wrap" v-if="historyShow" @click="hideHistory">
                <div class="history" @click.stop="stopClose">
                    <div class="history-loading" v-show="historyLoading">
                        <i class="el-icon-loading"></i>
                    </div>
                    <h3>{{historyOrderId}}订单记录</h3>
                    <ul class="history-ul" v-if="historyList && historyList.length > 0">
                        <li class="history-li"  v-for="(history, index) in historyList" :key="index" >
                            <div class="history-li-head">
                                <span class="history-li-time">{{history.time}}</span>
                                <span class="history-li-user">{{turnChi(history.editor)}}</span>
                            </div>
                            <div class="history-li-detail">
                                <div v-for="(detail, ind) in history.changes" :key="ind">{{detail}}</div>
                            </div>
                            <hr class="history-line" >
                        </li>
                    </ul>
                    <div class="history-info" v-else>暂无任何操作记录</div>
                </div>
            </div>
        </transition>

        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="回收提示"
            :visible.sync="recycleDialog"
            :modal-append-to-body="false"
            width="30%"
            center>
            <span>确定将 {{recycleOrder}} 订单回收吗？</span>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmRecycle">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="改派(单个用户)"
            :visible.sync="callDialogVisible2"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="form" :model= "deliveryForm" label-width="80px" class="col-md-8">
                <el-form-item label="改派人员">
                    <el-select v-model= "deliveryForm.sourceUserId" filterable clearable palceholder="请选择改派人员">
                        <el-option v-for= "item in deliveryList"
                                    :label= "item.name"
                                    :value= "item.id"
                                    :key= "item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="目标人员">
                    <el-select v-model= "deliveryForm.targetUserId" filterable clearable placeholder="请选择目标人员" size="medium" >
                        <el-option v-for= "item in deliveryList"
                                    :label= "item.name"
                                    :value= "item.id"
                                    :key= "item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmChangeDelivery">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="改派(批量改派)"
            :visible.sync="callDialogVisible3"
            :modal-append-to-body="false"
            width="40%"
            center>
            <div v-show=" checkedList && checkedList.length > 0" class="yi-tags">
                <p style="margin-bottom:4px;">待改派订单：</p>
                <el-tag
                    v-for="tag in checkedList"
                    :key="tag.orderId"
                    closable
                    @close="handleClose(tag)"
                    style="margin-right:4px;margin-bottom:4px;">
                    {{tag.orderId}}
                </el-tag>
            </div>
            <el-form ref="form" :model= "deliveryForm3" label-width="80px" class="col-md-8">
                <el-form-item label="目标人员">
                    <el-select v-model= "deliveryForm3.targetUserId" filterable clearable placeholder="请选择目标人员" size="medium" >
                        <el-option v-for= "item in deliveryList"
                                    :label= "item.name"
                                    :value= "item.id"
                                    :key= "item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmChangeDelivery3">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Loading, TimePicker, Table} from 'element-ui'
import orderSrv from '@/../src/views/services/order.service.js'
import deliverySrv from '@/../src/views/services/delivery.service.js'
import businessSrv from '@/../src/views/services/business.service.js'
import pointSrv from '@/../src/views/services/point.service.js'
import clip from '@/util/clipboard'
import clipboard from '@/directive/clipboard/index.js'

/* eslint-disable */
export default {
    name: "schedulingList",
    directives: { 
        clipboard
    },
    data() {
        return {
            orderList: [],
            totalOrders: 0,
            deliveryList: [],
            pointList: [],
            orderId: "",
            phone: "",
            userId: "",
            state: [],
            callState: "",
            startCallTime: '',
            endCallTime: '',
            pointId: "",
            district: "",
            visitTime: "",
            startOrderTime: "",
            endOrderTime: "",
            startCompleteTime: "",
            endCompleteTime:"",

            importSequenceId: "",
            importSequenceStartTime: "",
            importSequenceEndTime: "",

            pageIndex: 1,
            pageSize: 5,
            centerDialogVisible: false,
            callDialogVisible2: false,

            deliveryForm: {
                sourceUserId: "",
                targetUserId: ""
            },
            recycleDialog: false,
            recycleOrderId: "",
            recycleOrder: "",
            callTotal: "",
            historyShow: false,
            historyOrderId: "",
            historyList: [],
            historyLoading: true,
            checkedList: [],
            callDialogVisible3: false,
            deliveryForm3: {
                targetUserId: ""
            },
            businessId: "",
            businessList: [],

            getRowKeys(row) {
                return row.id
            },
            sssId: []
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let searchContent = {
                businessId: vm.businessId,
                orderId: vm.orderId,
                phone: vm.phone,
                userId: vm.userId,
                pointId: vm.pointId,
                state: vm.state,
                callState: vm.callState,
                startCallTime: vm.startCallTime,
                endCallTime: vm.endCallTime,
                notConnectCount: vm.callTotal,
                pageIndex: vm.pageIndex,
                pageSize: vm.pageSize,
                importSequenceId: vm.importSequenceId,
                importSequenceStartTime: vm.importSequenceStartTime,
                importSequenceEndTime: vm.importSequenceEndTime,
                district: vm.district,
                visitTime: vm.visitTime
            };
            orderSrv.searchOrder(searchContent).then(resp => {
                let data = resp.data.pageInfo;
                console.log(data.entities)
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
                phone: this.phone,
                userId: this.userId,
                pointId: this.pointId,
                state: this.state,
                callState: this.callState,
                startCallTime: this.startCallTime,
                endCallTime: this.endCallTime,
                notConnectCount: this.callTotal,
                pageIndex: pageIndex,
                pageSize: this.pageSize,
                importSequenceId: this.importSequenceId,
                importSequenceStartTime: this.importSequenceStartTime,
                importSequenceEndTime: this.importSequenceEndTime,
                district: this.district,
                visitTime: this.visitTime,
                startOrderTime: this.startOrderTime,
                endOrderTime: this.endOrderTime,
                startCompleteTime: this.startCompleteTime,
                endCompleteTime: this.endCompleteTime
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
        handleClick(orderId, businessId) {
            this.$router.push({
                path: '/schedulingmanage/schedulingDetail',
                query: {
                    orderId: orderId,
                    businessId: businessId
                }
            });
        },
        changeDelivery() {
            this.callDialogVisible2 = true;
        },
        confirmChangeDelivery() {
            let deliveryForm = this.deliveryForm;
            let sourceUserId = deliveryForm.sourceUserId;
            let targetUserId = deliveryForm.targetUserId;
            if (sourceUserId && targetUserId) {
                orderSrv.changeDelivery(sourceUserId, targetUserId).then(resp => {
                    this.$message.success("改派成功~");
                    this.deliveryForm.sourceUserId = "";
                    this.deliveryForm.targetUserId = "";
                    this.callDialogVisible2 = false;
                    this.searchList();
                }, err => {
                    this.$message.error(err.error.message);
                })
            } else  {
                this.$message.error("请选择派送人员和目标人员");
            }
        },
        handleRecycle(id, orderId) {
            this.recycleOrderId = id;
            this.recycleOrder = orderId;
            this.recycleDialog = true;
        },
        confirmRecycle() {
            let orderId = this.recycleOrderId;
            orderSrv.recycleSingleOrder(orderId).then(resp => {
                this.recycleDialog = false;
                this.$message.success("回收成功");
                this.searchList(this.pageIndex);
            }, err => {
                this.$message.error(err.error.message);
            });
        },
        exportOrder() {
            let searchContent ={
                businessId: this.businessId,
                orderId: this.orderId,
                phone: this.phone,
                userId: this.userId,
                pointId: this.pointId,
                state: this.state,
                callState: this.callState,
                startCallTime: this.startCallTime,
                endCallTime: this.endCallTime,
                importSequenceId: this.importSequenceId,
                notConnectCount: this.callTotal,
                importSequenceStartTime: this.importSequenceStartTime,
                importSequenceEndTime: this.importSequenceEndTime,
                district: this.district,
                visitTime: this.visitTime,
                startOrderTime: this.startOrderTime,
                endOrderTime: this.endOrderTime,
                startCompleteTime: this.startCompleteTime,
                endCompleteTime: this.endCompleteTime
            }
            var url = `/orderschedule/index.php/Home/Orders/export?${Object.entries(searchContent).map(x => x.join("=")).join("&")}`;
            this.download(url); 
        },
        download(url) { 
            let a = document.createElement("a");
            a.href = url;
            a.click();
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
        handleRecords(id, orderId) {
            this.historyShow = true;
            // order records
            let orderChanges = [];
            orderSrv.orderHistory(id).then(resp => {
                let data = resp.data.histories;
                orderChanges = data.filter(x => x.changes.length > 0);
                this.historyLoading = false;
                this.historyList = orderChanges;
                this.historyOrderId = orderId;
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        hideHistory() {
            this.historyShow = false;
            this.historyList = [];
            this.historyLoading = true;
        },
        stopClose() {
        },
        turnChi(english) {
            if (english.indexOf("schedule") > -1) {
                english =  english.replace("schedule", "调度员")
            }
            if (english.indexOf("express" > -1)) {
                english = english.replace("express", "派送员");
            }
            if (english.indexOf("admin") > -1) {
                english =  english.replace("admin", "管理员")
            }
            return english;
        },
        batchChangeDelivery() {
            if (this.checkedList.length == 0) {
                this.$message.error("请先选择需要改派的订单");
                return;
            }
            this.callDialogVisible3 = true;
        },
        confirmChangeDelivery3() {
            let targetUserId = this.deliveryForm3.targetUserId;
            if (targetUserId == '') {
                this.$message.error('请选择改派的目标派送员');
                return;
            }
            let orderIds = [];
            this.checkedList.forEach(x => {
                orderIds.push(parseInt(x.id));
            })
            orderSrv.batchChange(orderIds,targetUserId ).then(resp => {
                this.$message.success("全部改派成功")
                this.callDialogVisible3 = false;
                this.checkedList = [];
                this.$nextTick(() => {
                    this.$refs.multipleTable.clearSelection();
                })
                this.searchList();
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        handleClose(tag) {
            let findOne = this.checkedList.find(x => x.orderId == tag.orderId );
            if (findOne) {
                this.$nextTick(() => {
                    this.$refs.multipleTable.toggleRowSelection(findOne, false);
                })
            }
        },
        checkSelectable(row, index) {
            if(row.state == "派送" || row.state == "改约") {
                return true;
            }
            return false;
        },
        handleSelectionChange(rows) {
            this.checkedList = [];
            if (rows) {
                rows.forEach(x => {
                    if (x) {
                        this.checkedList.push(x);
                    }
                })
            }
        }

    },
};
</script>

<style lang="scss" scoped>
    .content_page .content-show .list-search .yi_table {
        padding-left: 0px;
        .el-button {
            outline: none;
        }
    }
    .yi-tags {
        border: 1px solid #ebebeb;
        padding: 10px;
        border-radius: 8px;
        margin-bottom: 10px;
    }
    .yi-multiple .el-select {
        width: 100%;
    }
    .history-wrap {
        display: flex;
        flex-direction: row-reverse;
        position: fixed;
        right: 0;
        top: 55px;
        background: rgba(0, 0, 0, .4);
        width: 100%;
        height: calc(100vh - 55px);
        z-index: 99;
        font-size: 13px;
        .history {
            width: 300px;
            height: 100%;
            background: rgba(255, 255, 255, 1);
            box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
            border: 1px solid #ebeef5;
            overflow: auto;
            .history-loading {
                font-size: 30px;
                position: absolute;
                top: 100px;
                right: 135px;
            }
            .history-ul {
                list-style: none;
                padding: 0 8px;
                .history-li {
                    margin-bottom: 8px;
                    .history-li-head {
                        display: flex;
                        justify-content: space-between;
                    }
                    .history-line {
                        margin: 4px 0;
                    }
                }
            }
            .history-info {
                text-align: center;
            }
            h3 {
                font-size: 16px;
                height: 36px;
                line-height: 36px;
                text-align: center;
            }
        }
    }
    .leftIn-enter-active, .leftIn-leave-active {
        transition: opacity .5s;
    }
    .leftIn-enter-active .history, .leftIn-leave-active .history {
        transition: transform 0.5s;
    }
    .leftIn-enter, .leftIn-leave-to {
        opacity: 0;
    }
    .leftIn-enter .history, .leftIn-leave-to .history {
        transform: translateX(-300px);
    }
    .list-pagination {
        margin-left: auto;
        margin-right: auto;
    }

</style>
