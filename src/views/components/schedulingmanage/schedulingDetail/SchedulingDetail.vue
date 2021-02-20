<template>
    <div class="animated fadeIn content_page scheduling">
        <div class="content-title">
            <div class="title">调度订单</div>
            <router-link class="btn btn-info back" :to="{
                path: '/schedulingmanage/schedulingList'
            }">
            返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row">
                <el-form ref="form" :model="form" label-width="80px" class="yi_border col-lg-6 yi_padding">
                    <el-form-item label="订单编号">
                        <el-input v-model="form.orderId" disabled class="yi_address"></el-input>
                        <el-button v-clipboard:copy="form.orderId" v-clipboard:success="clipboardSuccess">复制</el-button>
                    </el-form-item>
                    <el-form-item label="下单时间">
                        <el-input v-model="form.orderTime" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="业务类型">
                        <el-input v-model="businessType" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="套餐名称">
                        <el-input v-model="form.planName" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="下单号码">
                        <el-input v-model="form.orderPhone" disabled></el-input>
                    </el-form-item>
                    <el-form-item label="收件人">
                        <el-input v-model="form.consignee" ></el-input>
                    </el-form-item>
                    <el-form-item label="号码">
                        <el-input v-model="form.phone" class="yi_address"></el-input>
                        <i class="fa fa-volume-control-phone fa-yi-call" aria-hidden="true" @click="handleCall"></i>
                    </el-form-item>
                    <el-form-item label="派送地址">
                        <el-input v-model="form.address" disabled class="yi_address" ></el-input>
                        <el-button @click="handleChangeAddress(form.address, form.district)">修改</el-button>
                    </el-form-item>
                    <el-form-item label="外呼结果">
                        <el-select v-model="form.lastCallState" placeholder="请选择外呼结果" clearable>
                            <el-option label="未接通" value="未接通"></el-option>
                            <el-option label="已接通" value="已接通"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="订单状态" >
                        <el-select v-model="form.state" placeholder="请选择订单状态" clearable @change="chooseState">
                            <el-option label="未分配" value="未分配"></el-option>
                            <el-option label="派送" value="派送"></el-option>
                            <el-option label="派送中" value="派送中"></el-option>
                            <el-option label="成功" value="成功"></el-option>
                            <el-option label="改约" value="改约"></el-option>
                            <el-option label="转物流" value="转物流"></el-option>
                            <el-option label="退单" value="退单"></el-option>
                            <!-- <el-option label="繁忙另约" value="繁忙另约"></el-option> -->
                            <!-- <el-option label="转区域" value="转区域"></el-option> -->
                            <el-option label="已激活" value="已激活"></el-option>
                            <el-option label="拒访" value="拒访"></el-option>
                            <el-option label="黑名单" value="黑名单"></el-option>
                            <el-option label="活动订单（未通知不可提交此状态）" value="活动订单（未通知不可提交此状态）"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="退单原因" v-if="form.state == '退单'">
                        <el-select v-model="form.scheduleCancelReason" placeholder="请选择退单原因" clearable>
                            <el-option label="一证五户" value="一证五户"></el-option>
                            <el-option label="对套餐资费不满意" value="对套餐资费不满意"></el-option>
                            <el-option label="已有其它卡了" value="已有其它卡了"></el-option>
                            <el-option label="非本人办理申请退单/下错单" value="非本人办理申请退单/下错单"></el-option>
                            <el-option label="帮朋友办理的，现在不需要了" value="帮朋友办理的，现在不需要了"></el-option>
                            <el-option label="不想换号" value="不想换号"></el-option>
                            <el-option label="用户拒绝提供原因" value="用户拒绝提供原因"></el-option>
                            <el-option label="用户对联通印象不好" value="用户对联通印象不好"></el-option>
                            <el-option label="离开上海了，不方便使用" value="离开上海了，不方便使用"></el-option>
                            <el-option label="不会操作太麻烦了" value="不会操作太麻烦了"></el-option>
                            <el-option label="证件不符" value="证件不符"></el-option>
                            <el-option label="证件丢失" value="证件丢失"></el-option>
                            <el-option label="办宽带送的卡" value="办宽带送的卡"></el-option>
                            <el-option label="客户未满16周岁" value="客户未满16周岁"></el-option>
                            <el-option label="已和客服说过退单" value="已和客服说过退单"></el-option>
                            <el-option label="新用户中心退单" value="新用户中心退单"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="预约外呼" v-else-if="form.state == '繁忙另约'" >
                        <el-date-picker
                            v-model="form.nextCallTime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="请选择预约时间"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <el-form-item label="派送日期">
                        <el-date-picker
                            v-model="form.visitTime"
                            format="yyyy-MM-dd HH:mm"
                            value-format="yyyy-MM-dd HH:mm"
                            type="datetime"
                            placeholder="请选择日期"
                            @change = "choosePointUser"
                            >
                        </el-date-picker>
                    </el-form-item>
                    <!-- <el-form-item label="非当天上门原因" v-if="form.district == '奉贤区' || form.visitTime && form.orderTime && form.visitTime.substring(0, 10) != form.orderTime.substring(0,10)">
                        <el-select v-model="form.scheduleAnotherDayReason" clearable>
                            <el-option label="不是当天的订单" value="不是当天的订单"></el-option>
                            <el-option label="18:30分以后外呼的订单" value="18:30分以后外呼的订单"></el-option>
                            <el-option label="当日未带证件" value="当日未带证件"></el-option>
                            <el-option label="当日不在收获地址" value="当日不在收获地址"></el-option>
                            <el-option label="17点之后未接通" value="17点之后未接通"></el-option>
                            <el-option label="快递改约" value="快递改约"></el-option>
                            <el-option label="超出5单不予配送" value="超出5单不予配送"></el-option>
                            <el-option label="审核未备注时间点" value="审核未备注时间点"></el-option>
                            <el-option label="（奉贤）用户3天内上门" value="（奉贤）用户3天内上门"></el-option>
                            <el-option label="（奉贤）用户非3天内上门" value="（奉贤）用户非3天内上门"></el-option>
                        </el-select>
                    </el-form-item> -->
                    <el-form-item label="站点">
                        <el-select v-model="form.pointId" placeholder="请选择站点"  disabled>
                            <el-option v-for="point in pointList"
                                        :key="point.id"
                                        :label="point.name"
                                        :value="point.id"></el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="派送员">
                        <el-select v-model="form.userId" filterable clearable  placeholder="请选择派送员" @change="chooseUser" >
                            <el-option
                                v-for="item in deliveryList"
                                :key= "item.id"
                                :label= "item.name"
                                :value= "item.id">
                                <span style="float: left">{{ item.name }}</span>
                                <span style="float: right; color: #8492a6; font-size: 13px">{{ item.id }}</span>
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="备注">
                        <el-input type="textarea" v-model="form.scheduleRemark"></el-input>
                    </el-form-item>
                    <transition name="infoanimation">
                        <div class="errorInfo" v-if="errorInfo">
                            <i class="el-alert__icon el-icon-error"></i>
                            错误的提交: {{ information }}
                            <i class="el-alert__closebtn el-icon-close" @click="errorInfo = false"></i>
                        </div>
                    </transition>
                    <el-form-item>
                        <el-button type="success" class="btn btn-success" @click="verifyAddress">验证地址</el-button>
                        <el-button type="primary" @click="onSubmit">提交订单</el-button>
                    </el-form-item>
                </el-form>
                <div class="col-lg-5 yi_border mapall_wrap col-md-12">
                    <div class="map">
                        <el-amap vid="areaMap" :zoom="zoom" :center="mapCenter" class="area-map" :plugin="plugin" >
                            <!-- 覆盖物 -->
                            <el-amap-marker v-for= "marker in markers"
                                            :position= "marker.position"
                                            :vid= "marker.id"
                                            :key= "marker.id">
                                <div :style="slotStyle">
                                    <span :style="slotStyle2">{{marker.content}}</span>
                                </div>
                            </el-amap-marker>

                            <!-- 圆圈 -->
                            <el-amap-circle v-for= "circle in circles"
                                            :center= "circle.center"
                                            :radius= "circle.radius"
                                            :fill-opacity= "circle.fillOpacity"
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
                                            :key = "index"
                            ></el-amap-polygon>

                            <!-- 订单位置 -->
                            <el-amap-marker vid= "orderdot1" :position= "orderMarker.position" v-if="orderMarker.position.length == 2"></el-amap-marker>
                        </el-amap>
                    </div>
                </div>
            </div>
        </div>

        <!-- 提示 -->
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button @click="centerDialogVisible = false">取 消</el-button>
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改地址 -->
        <el-dialog
            title="修改地址"
            :visible.sync="addressDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="addressForm" :model= "addressForm" :rules="addressRules"  label-width="80px" class="col-md-12">
                <el-form-item label="城市" prop="city">
                    <el-input v-model= "addressForm.city" disabled></el-input>
                </el-form-item>
                <el-form-item label="区" prop="area">
                    <el-select v-model= "addressForm.area" placeholder="请选择区">
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
                </el-form-item>
                <el-form-item label="详细地址" prop="detailaddress">
                    <el-input v-model= "addressForm.detailaddress"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click= "confirmAddress('addressForm')">确 定</el-button>
            </span>
        </el-dialog>

    </div>
</template>

<script>
import { lazyAMapApiLoaderInstance } from 'vue-amap' 
import { DatePicker, Button, Input, MessageBox, Notification } from 'element-ui'
import orderSrv from '@/../src/views/services/order.service.js'
import deliverySrv from '@/../src/views/services/delivery.service.js'
import pointSrv from '@/../src/views/services/point.service.js'
import getCurrentDate from '@/../src/util/getCurrentDate.js'
import _ from 'lodash'
import jsonp from 'jsonp'
import clip from '@/util/clipboard'
import clipboard from '@/directive/clipboard/index.js'

// JSON patch
import {observe, generate} from 'fast-json-patch'

/* eslint-disable */
export default {
    name: 'schedulingDetail',
    directives: {
        clipboard
    },
    data() {
        return {
            orderId: "",
            businessId: "",
            startDate: "",
            endDate: "",
            number: "",
            centerDialogVisible: false,
            detailList: [],
            pointList: [],
            form: {},
            formLabelWidth: '120px',
            orderPatch: {},
            deliveryList: [],
            addressDialog: false,
            addressForm: {
                city: "上海市",
                area: "",
                detailaddress: ""
            },
            addressRules: {
                city: [ { required: true, message: "请输入城市"} ],
                area: [ { required: true, message: "请选择区", trigger: "change"}],
                detailaddress: [ { required: true, message: "请填写详细地址"} ]
            },
            todayPointUsers: [],

            // 缩放比
            zoom: 11,

            // 地图中心
            mapCenter: [121.5273285, 31.21515044],

            // 比例尺
            plugin:[{
                pName: 'Scale',
                events: {
                    init(instance) {
                    }
                }
            }],

            slotStyle: {
                position: "relative",
                height: "32px",
                width: "23px",
                background: "url('/orderschedule/orderschedule_php/static/img/point.png') no-repeat",
                'background-size': "auto 100%",
            },
            slotStyle2: {
                position: "absolute",
                left: '23px',
                top: 0,
                padding: "1px",
                'white-space': "nowrap",
                'font-size': "12px",
                cursor: 'inherit',
                'background-color': "rgba(255, 255, 255)",
                border: '1px solid rgb(255, 0, 0)',
                font: '12px arial, sans-serif',
                'z-index': 99
            },

            // 行政区多边形
            polygons: [],

            // 覆盖物
            markers: [],

            // 站点圆
            circles: [],

            // 订单地址
            orderMarker: {
                position: []
            },

            businessType: "",
            errorInfo: false
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            let orderId = vm.$route.query.orderId;
            let businessId = vm.$route.query.businessId;
            vm.orderId = orderId;
            vm.businessId = businessId;
            let orderPosition = [];
            orderSrv.getOrder(orderId).then(resp => {
                let order = resp.data.order;
                vm.form = order;
                vm.orderPatch =  observe(vm.form);
                vm.businessType = order.business.name;
                if (vm.form.visitTime) {
                    vm.choosePointUser();
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
                    if (item.lat !== null && item.lng !== null && item.address !== null && item.radius !== null) {
                        circle = {
                            index: item.id,
                            center: [item.lng, item.lat],
                            radius: item.radius * 1000,
                            fillOpacity: 0.1
                        }
                        vm.circles.push(circle);
                    } else {
                        polygonArr.push(item.district);
                    }
                })
                lazyAMapApiLoaderInstance.load().then(() => {
                    if (vm.form.lng && vm.form.lat) {
                        vm.orderMarker.position = [vm.form.lng, vm.form.lat];
                    }
                    vm.drawDistrict(polygonArr);
                });
            });
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
                strokeWeight: 3,
                path: [],
                fillOpacity: 0.5,
                fillColor: 'transparent',
                strokeColor: '#ff0000'
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
        },
        verifyAddress() {
            let self = this;
            let id = this.form.id;
            let businessId = this.businessId;
            let district = this.form.district;
            let address = this.form.address;
            let visitTime = this.form.visitTime;
            let phone = this.form.phone;
            if(!visitTime) {
                this.$message.info('请先选择派送日期');
                return;
            }
            let subVisitTime = visitTime.substring(0,10);
            // 高德sdk
            let geocoder = new AMap.Geocoder({
                city: "上海",
                citycode: "021",
                radius: 1000,
                extensions: "all"
            });
            let lng = "";
            let lat = "";
            geocoder.getLocation(address, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.geocodes) {
                        lng = result.geocodes[0].location.lng;
                        lat = result.geocodes[0].location.lat;
                        self.orderMarker.position = [lng, lat];
                        self.form.lng = lng;
                        self.form.lat = lat;
                        self.mapCenter = [lng, lat];
                        orderSrv.assignOrder(id,businessId, phone, district, address, subVisitTime, lng, lat).then(resp => {
                            let data = resp.data;
                            if(data.point && data.user) {
                                self.form.pointId = data.point.id;
                                self.form.userId = data.user.id;
                                self.form.orderType = "可派单";
                                self.$message.success("分配站点和派送员成功~");
                            }
                        }, err => {
                            self.$message.error(err.error.message);
                            // 指派单
                            self.form.orderType = "指派单";
                        })
                    }
                } else {
                    self.$message.error("地址没找到");
                }
            })
        },
        onSubmit() {
            let orderId = this.orderId;
            let tempform = this.form;
            let assign = false;
            switch (tempform.state) {
                case '派送':
                    // if (tempform.orderTime) {
                    //     if (tempform.visitTime.substring(0, 10) != tempform.orderTime.substring(0, 10)) {
                    //         if (!tempform.scheduleAnotherDayReason) {
                    //             this.information = '请选择未当天上门原因';
                    //             this.errorInfo = true;
                    //             return ;
                    //         }
                    //     }
                    // }
                    if(tempform.userId && tempform.pointId) {
                    } else {
                        this.information = '请选择派送员和站点信息';
                        this.errorInfo = true;
                        return ;
                    }
                    assign = true;
                    break;
                case '繁忙另约':
                    if (!tempform.nextCallTime) {
                        this.information = '请填写繁忙另约的时间';
                        this.errorInfo = true;
                        return ;
                    }
                    break;
                case '退单':
                    if (!tempform.scheduleCancelReason) {
                        this.information = '请选择退单原因';
                        this.errorInfo = true;
                        return ;
                    }
                    break;
                default:
                    break;
            }
            let orderPatch = generate(this.orderPatch);
            orderSrv.patchOrder(orderId, assign, orderPatch).then(resp => {
                this.$message.success("订单提交成功!");
                this.$router.push({path: "/schedulingmanage/schedulingList"});
            }, err => {
                this.$message.error(err.error.message);
            });
        },
        handleChangeAddress(address, district) {
            this.addressForm.area = district;
            this.addressForm.detailaddress = address.substring(address.indexOf("区") + 1)
            this.addressDialog = true;
        },
        confirmAddress(addressForm) {
            let self = this;
            this.$refs[addressForm].validate( (valid) => {
                if (valid) {
                    let city = this[addressForm].city;
                    let area = this[addressForm].area;
                    let detailaddress = this[addressForm].detailaddress;
                    if (detailaddress.indexOf(area) > -1 || detailaddress.indexOf(city) > -1) {
                        this.$message.error("详细地址中请删除市和区的名称");
                        return;
                    }
                    let completeAddress = city + area  + detailaddress;

                    // 高德sdk
                    let geocoder = new AMap.Geocoder({
                        radius: 1000,
                        extensions: "all"
                    });
                    let newLng = "";
                    let newLat = "";
                    geocoder.getLocation(completeAddress, function(status, result) {
                        if (status === 'complete' && result.info === 'OK') {
                            if (result && result.geocodes) {
                                // result.geocodes 是一个数组,取用第一个值
                                newLng = result.geocodes[0].location.lng;
                                newLat = result.geocodes[0].location.lat;
                                self.orderMarker.position = [newLng, newLat];
                                self.addressDialog = false;
                                self.form.district = self[addressForm].area;
                                self.form.address = completeAddress;
                                self.form.lng =  newLng.toString();
                                self.form.lat = newLat.toString();

                                console.log(newLng)
                                console.log(newLat);
                            }
                        }
                    })
                } else {
                    return false;
                }
            });
        },
        choosePointUser() {
            let businessId = this.$route.query.businessId;
            let visitTime = this.form.visitTime;
            // if (!visitTime) {
            //     this.form.scheduleAnotherDayReason = '';
            //     return;
            // }
            let subVisitTime = visitTime.substring(0,10);
            pointSrv.chooseUsers(1, subVisitTime).then(resp => {
                console.log(resp)
                let data = resp.data.work;
                this.todayPointUsers = _.cloneDeep(data);
                let todayUsers = [];
                let todayPoints = [];
                data.map(x => {
                    todayPoints.push(x.point);
                    x.users.map(y => {
                        todayUsers.push(y);
                    })
                })
                this.pointList = todayPoints;
                this.deliveryList = todayUsers;
                this.markers = [];
                // 筛选当天派送员
                todayUsers.map(x => {
                    this.markers.push({
                        id: x.id,
                        position: [x.lng, x.lat],
                        content: x.name
                    })
                })

                console.log(JSON.stringify(this.markers));
            }, err => {
                this.pointList = [];
                this.form.pointId = "";
                this.deliveryList = [];
                this.form.userId = "";
                this.markers = [];
                this.$message.error(err.error.message);
            })
        },
        chooseUser() {
            let chooseUserId = this.form.userId;
            if(!chooseUserId) {
                this.form.pointId = ''
            }
            let todayPointUsers = this.todayPointUsers;
            let findOne = null;
            todayPointUsers.map(x => {
                findOne = x.users.find(y => y.id == chooseUserId);
                if (findOne) {
                    this.form.pointId = findOne.point.id;
                }
            })
        },
        chooseState() {
            let state = this.form.state;
            this.form.scheduleCancelReason = '';
            this.form.nextCallTime = '';
            let arr = ['转物流', "退单", "转区域","已激活","拒访" ,"黑名单"];
            if (arr.indexOf(state) > -1) {
                this.form.userId = '';
                this.form.pointId = '';
                this.form.visitTime = '';
            }
            switch (state) {
                case '派送':
                    this.nextdisable = true;
                break;
                default:
                    this.nextdisable = false;
            }
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
        handleCall() {
            let phone = this.form.phone;
            let reg = /^1[0-9]{10}$/g;
            if (!reg.test(phone)) {
                this.$message.error('手机号格式错误 ');
                return;
            }
            let id = this.$route.query.orderId;
            orderSrv.checkmanualCall(phone).then(resp => {
                let data = resp.data;
                this.call(phone, id);
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        call(phone, id) {
            let script = document.createElement('script');
            script.src = "http://localhost:10666?orders=callOut&phone="+ phone  +"&id=" + id;
            document.body.insertBefore(script, document.body.firstChild);
            document.body.removeChild(script);
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
.map {
    width: 100%;
    height: 100%;
    min-height: 496px;
}
.amap-markers .amap-marker-content {
    color: red;
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
.fa-yi-call{
    font-size: 20px;
    cursor: pointer;
    color: rgb(32, 168, 216);
}
</style>
