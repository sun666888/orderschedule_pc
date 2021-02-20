<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">工作安排</div>
        </div>
        <div class="content-show">
            <div class="row list-search" v-if="scheduleList && scheduleList.length > 0" >
                <div class=" search-field yi_border" v-for="(item, index) in scheduleList" :key="index"  >
                    <div class="date">日期：{{item.workTime}}</div>
                    <el-transfer
                        filterable
                        :filter-method="filterMethod"
                        :titles="['所有派送员', '当日派送员']"
                        :button-texts="['移除', '添加']"
                        v-model="scheduleList[index].userPoints"
                        :data="deliveryList"
                        :props="{
                            key: 'id',
                            label: 'name',
                        }"
                        >
                    </el-transfer>
                </div>
                <div class="col-md-12 search-field yi_center">
                    <el-button type="primary" class="col-md-2" @click="confirmCreate">确认</el-button>
                </div>
            </div>
        </div>

    </div>
</template>

<script>
import { Button } from "element-ui";
import userSrv from "@/../src/views/services/user.service.js";
import backWeek from "@/../src/util/eachWeekDate.js"
import deliverySrv from "@/../src/views/services/delivery.service.js";
import _ from "lodash"

/* eslint-disable */
  export default {
    data() {
      return {
        deliveryList: [],
        businessId: "",
        scheduleList: [],
        userPoints: [],
        tempScheduleList: [],

        updateScheduleList: []
      };
    },
    beforeRouteEnter (to, from, next) {
        next(vm  => {
            let noScheduling = vm.calculateWeek();
            let eachWeek = backWeek(7);

            deliverySrv.lookEachWeek().then(resp => {
                let backData = resp.data.assignModels;
                vm.updateScheduleList = backData;
                let data = _.cloneDeep(backData);
                if (data.length == 0) {
                    vm.scheduleList = noScheduling;
                    vm.tempScheduleList = vm.scheduleList.map(x => x);
                } else {
                    var array = [];
                    eachWeek.map(x => {
                        var obj = data.find(y => y.workTime == x)
                        if(obj) {
                            array.push(obj)
                        } else {
                            array.push({
                                workTime: x,
                                userPoints: []
                            })
                        }
                    });

                    vm.scheduleList = array;
                    for (let i=0, l=array.length; i<l; i++) {
                        vm.scheduleList[i].userPoints = array[i].userPoints.map(x => {
                            if (x) {
                                return x.userId;
                            }
                        })
                    }
                }
            }, err => {
                vm.$message.error("请刷新页面重试~");
            })

            deliverySrv.getDeliveryes().then(resp => {
                let data = resp.data.users;
                vm.deliveryList = data;
            })
        })
    },
    methods: {
        calculateWeek() {
            let currentWeek = backWeek(7);
            let noScheduling = [];
            noScheduling = currentWeek.map(item => {
                return {
                    workTime: item,
                    userPoints: []
                }
            });
            return noScheduling;
        },
        formmatWork(id) {
            let tempDeliveryList = this.deliveryList;
            let tempObj = {};
            tempDeliveryList.map(item => {
                if (item.id == id) {
                    tempObj["pointId"] = item.pointId;
                    tempObj["userId"] = item.id;
                    tempObj["id"] = null;
                }
            })
            return tempObj;
        },

        formmatWork2(ownId, allId) {
            let arr = [];
            allId.map(x => {
                let findOne = ownId.find(y => y.userId == x);
                if (findOne) {
                    arr.push({
                        id: findOne.id,
                        userId: findOne.userId,
                        pointId: findOne.pointId
                    })
                } else {
                    // x对应的pointId
                    arr.push({
                        userId: x,
                        pointId: this.getPointId(x)        
                    })
                }
            })
            return arr;

        },
        getPointId(userId) {
            let temPoint = "";
            this.deliveryList.map(x => {
                if (x.id == userId) {
                    temPoint = x.pointId
                }
            })
            return temPoint;
        },
        confirmCreate(){
            let updateScheduleList = this.updateScheduleList;
            let scheduleList = this.scheduleList;           // 正确值
            let lastArr = [];

            scheduleList.map(each  => {
                let findDate = updateScheduleList.find(x => x.workTime == each.workTime);
                if (findDate) {
                    lastArr.push({
                        workTime: findDate.workTime,
                        userPoints: this.formmatWork2(findDate.userPoints, each.userPoints)
                    })
                }
            })    

            let submitArr = [];
            let eachObj = {};
            if (updateScheduleList.length > 0) {
                // 修改排班
                this.scheduleList.map((eachDate, index) => {
                    let findOne =  lastArr.find(x => x.workTime == eachDate.workTime);
                    if (findOne) {
                        submitArr.push({
                            workTime: findOne.workTime,
                            userPoints: this.formmat1(findOne.userPoints)
                        })
                    } else {
                        submitArr.push({
                            workTime: eachDate.workTime,
                            userPoints: this.formmat2(eachDate.userPoints)
                        })
                    }
                })
            } else {
                // 首次排班           
                this.tempScheduleList.map(item => {
                    eachObj = {
                        workTime: "",
                        userPoints: []
                    }
                    eachObj["workTime"] = item["workTime"]
                    if (item.userPoints.length !== 0) {
                        item.userPoints.map(atem => {
                            eachObj.userPoints.push(this.formmatWork(atem))
                        })
                    }
                    submitArr.push(eachObj);
                });
            }
            deliverySrv.schedulingEachWeek(submitArr).then(resp => {
                this.$message.success("排班成功~");
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        formmat1(tempArr) {
            let arr = [];
            tempArr.map(x => {
                if (x) {
                    arr.push({
                        id: x.id,
                        userId: x.userId,
                        pointId: x.pointId
                    })
                }
            })
            return arr;
        },
        formmat2(tempArr) {
            let arr = [];
            let tempDeliveryList = _.cloneDeep(this.deliveryList);
            tempDeliveryList.map(y => {
                let findOne = tempArr.find(x => x == y.id);
                if (findOne) {
                    arr.push({
                        userId: y.id,
                        pointId: y.pointId
                    })
                } 
            })
            return arr;
        },
        filterMethod(query, item) {
            return item.name.indexOf(query) > -1;
        }
    }
  };
</script>

<style lang="scss" scoped>
    .content_page .content-show .list-search .search-field {
        padding-left: 0;
    }
    .el-transfer {
        margin-bottom: 20px;
        padding: 20px;
    }
    .dateWrap {
        width: 200px;
    }
    .yi_border {
        margin-left: auto;
        margin-right: auto;
        border: 1px solid #ebebeb;
        box-shadow: 0 0 8px 0 rgba(232, 237, 250, 0.6), 0 2px 4px 0 rgba(232, 237, 250, 0.5);
    }
    .date {
        padding-top: 20px;
        padding-left: 20px;
        text-align: left;
    }
    .color {
        color: rebeccapurple;
    }
    .info {
        color: red;
        margin-bottom: 20px;
    }
    .yi_inputWidth {
        width: 320px;
    }
    .yi_center {
        text-align: center;
    }
</style>