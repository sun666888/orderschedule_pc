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
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)" :disabled="disabledFlag">搜索</button>
                </div>
                <div class="col-md-12 search-field yi_table">
                    <el-amap vid="areaMap" :zoom= "zoom" :center= "mapCenter" class="area-map" :plugin= "plugin">

                        <!-- 覆盖物 -->
                        <el-amap-marker v-for= "marker in markers"
                                        :position= "marker.position"
                                        :vid= "marker.id"
                                        :key= "marker.id">
                                <div :style="slotStyle"></div>
                        </el-amap-marker>

                        <!-- 圆圈 -->
                        <el-amap-circle v-for= "circle in circles"
                                        :center= "circle.center"
                                        :radius= "circle.radius"
                                        :fill-opacity= "circle.fillOpacity"
                                        :events = "circle.events"
                                        :title = "circle.title"
                                        :key= "circle.id">
                        </el-amap-circle>

                        <!-- 多边形 -->
                        <el-amap-polygon v-for="(polygon, index) in polygons"
                                        :vid = "index"
                                        :ref = "`polygon_${index}`"
                                        :path = "polygon.path"
                                        :strokeWeight = "polygon.strokeWeight"
                                        :fillOpacity = "polygon.fillOpacity"
                                        :fillColor = "polygon.fillColor"
                                        :strokeColor = "polygon.strokeColor"
                                        :events = "polygon.events"
                                        :title = "polygon.title"
                                        :key = "index"
                        ></el-amap-polygon>
                    </el-amap>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import {lazyAMapApiLoaderInstance } from 'vue-amap';
import { Pagination, DatePicker, Button, Input, Loading, TimePicker, Table} from "element-ui";
import orderSrv from "@/../src/views/services/order.service.js";
import deliverySrv from "@/../src/views/services/delivery.service.js";
import businessSrv from "@/../src/views/services/business.service.js";
import pointSrv from "@/../src/views/services/point.service.js";
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
            polygons: [],
            circles: [],
                        // 缩放比
            zoom: 10,

            // 地图中心点
            mapCenter: [121.5273285, 31.21515044],

            // 比例尺
            plugin:[{
                pName: 'Scale',
                events: {
                    init(instance) {
                    }
                }
            }],

            // 覆盖物
            markers: [
                // {
                //     id: 101,
                //     position: [121.59996, 31.197646],
                //     content: "易超"
                // },{
                //     id: 102,
                //     position: [121.57666, 31.100001],
                //     content: '佩奇'
                // }
            ],

            slotStyle: {
                position: "relative",
                height: "32px",
                width: "23px",
                background: "url('../../orderschedule/orderschedule_php/static/img/point.png') no-repeat",
                // background: "url('../../static/img/point.png') no-repeat",
                'background-size': "auto 100%",
            },
            disabledFlag: false
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            deliverySrv.getDeliveryes().then(resp => {
                let data = resp.data.users;
                if (data) {
                    vm.deliveryList = data;
                }
            }, err => {
                vm.$message.error(err.error.message);
            });
            pointSrv.getAllpoints().then(resp => {
                let points = resp.data.points;
                vm.pointList = points;
                let circle = {};
                let polygonArr = [];
                points.map(item => {
                    if (item.lat !== null && item.lng !== null && item.address !== null && item.radius !== null){
                        circle = {
                            index: item.id,
                            center: [item.lng, item.lat],
                            radius: item.radius * 1000,
                            fillOpacity: 0.1,
                            title: item.name,
                            events: null
                        }
                        let name = item.name;
                        circle.events = {
                            mouseover: () => {
                                let extra = vm.circles.find(x => x.title === name);
                                if (extra) {
                                    extra.fillOpacity = 0.4;
                                    extra.zIndex = 999;
                                }
                            },
                            mouseout: () => {
                                vm.circles = vm.circles.map(x  => {
                                    x.fillOpacity = 0.1;
                                    x.zIndex = 10;
                                    return x;
                                })
                            }
                        };
                        vm.circles.push(circle);
                    } else {
                        polygonArr.push(item.district);
                    }
                });
                lazyAMapApiLoaderInstance.load().then(() => {
                    vm.drawDistrict(polygonArr);
                });
            });
            // pointSrv.getAllpoints().then(resp => {
            //     let data = resp.data.points;
            //     if (data) {
            //         vm.pointList = data;
            //     }
            // }, err => {
            //     vm.$message.error(err.error.message);
            // });
            businessSrv.getAllBusiness().then(resp => {
                let data = resp.data.businesses;
                vm.businessList = data;
            }, err => {

            })
        })
    },
    methods: {
        drawDistrict(districtArr) {
            let tempDistricts = districtArr;
            let polygons = [];
            for (let t = 0, ts = tempDistricts.length; t < ts; t++) {
                polygons.push(this.backPath(tempDistricts[t]));
            }
            this.polygons = polygons;
        },
        searchList(pageIndex = this.pageIndex) {
            this.disabledFlag = true;
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
            orderSrv.getOrdersLngLatList(searchContent).then(resp => {
                let data = resp.data;
                let result = [];
                data.forEach(item => {
                    result.push({
                        position: [item.lng, item.lat],
                        id: item.id
                    })
                })
                this.markers = result;
                this.disabledFlag = false;
            }, err => {
                this.disabledFlag = false;
                this.$message.error(err.message);
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
        handleCopy(text, event) {
            clip(text, event);
        },
        clipboardSuccess() {
            this.$message.success({
                message: "复制成功",
                duration: 600
            })
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
        },
        backPath(districtName) {
            let self = this;
            let citylimit = new AMap.Autocomplete({
                citylimit: true,
                city: "上海",
                setCityLimit: true
            })
            let district = new AMap.DistrictSearch({
                extensions: 'all',
                level: 'district',
                city: "021",
                setCityLimit: true
            })
            let pathObj = {
                title: districtName,
                strokeWeight: 3,
                path: [],
                fillOpacity: 0.5,
                fillColor: 'transparent',
                strokeColor: '#ff0000',
                events: null
            };
            pathObj.events = {
                mouseover: () => {
                    let extra = this.polygons.find(x => x.title === districtName);
                    if (extra) {
                        extra.fillOpacity = 0.6;
                        extra.fillColor = '#ffffff';
                        extra.strokeColor = "#24A8D8";
                        extra.zIndex = 999;
                    }
                },
                mouseout: () => {
                    this.polygons = this.polygons.map(x  => {
                        x.fillOpacity = 0.5;
                        x.fillColor = 'transparent',
                        x.strokeColor = "#ff0000"
                        x.zIndex = 10;
                        return x;
                    })
                }
            };
            district.search(districtName, function(status, result) {
                let list = result.districtList;
                if (list) {
                    for (let i=0, l= list.length; i<l; i++ ) {
                        if (list[i].citycode == "021") {
                            pathObj.path = list[i].boundaries;
                        }
                    }
                }
            });
            return pathObj;
        }
    }
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
@media screen and (min-width: 1800px) and (max-width: 2000px){
    .area-map {
        height: 500px;
    }
}

@media screen and (min-width: 1400px) and (max-width: 1800px){
    .area-map {
        height: 400px;
    }
}

@media screen and (min-width: 1200px) and (max-width: 1400px){
    .area-map {
        height: 360px;
    }
}
</style>
