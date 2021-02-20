<template>
    <div class="animated fadeIn content_page record-page">
        <div class="content-title">
            <div class="title">录音记录</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-2 search-field yi-left">
                    <div class="label"  style="left:28px">业务：</div>
                    <el-select v-model="businessId" clearable  placeholder="请选择业务" size="small">
                        <el-option
                            v-for="option in businessList"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left:0px" class="label">开始日期：</div>
                    <el-date-picker size="small" v-model="startDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd" >
                    </el-date-picker>
                </div>
                <div class="col-md-3 col-ms-4 search-field">
                    <div style="left: 0px" class="label">结束日期：</div>
                    <el-date-picker size="small" v-model="endDate" type="date" placeholder="选择日期时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <div class="col-md-2 search-field">
                    <div style="left: 0px" class="label">查询号码：</div>
                    <el-input size="small" type="text" placeholder="请输入电话号码" v-model.trim="phone" ></el-input>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">订单ID：</div>
                    <el-input size="small" type="text" placeholder="请输入订单号" v-model.trim="orderId"></el-input>
                </div>
                <div class="col-md-2 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                    <button class="btn btn-primary search-btn" v-on:click.stop="exportCallHistories">导出</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>订单编号</th>
                                <th>通话状态</th>
                                <th>开始时间</th>
                                <th>结束时间</th>
                                <th>拨打号码</th>
                                <th>通话时长</th>
                                <th>工号</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="(item, index) in recordList" :key="index">
                                <td>{{item.orderId}}</td>
                                <td>{{item.callState}}</td>
                                <td>{{item.startTime}}</td>
                                <td>{{item.endTime}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.duration}}</td>
                                <td>{{item.name}}</td>
                                <td>
                                    <a class="i-wrap" @click="listen(item)" style="color: black">
                                        <i class="fa text-success"  v-bind:class="{'fa-microphone': item.callState === '已接通' ? true : false }"></i>
                                    </a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="page" v-show="(recordList.length > 0 && totalRecords > 10)">
                        <el-pagination
                            background
                            @current-change="searchList"
                            :current-page.sync="currentPage"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="totalRecords"
                        >
                        </el-pagination>
                    </div>
                    <div class="info" v-show="recordList.length == 0">
                        请根据条件搜索录音记录
                    </div>
                </div>
            </div>
        </div>
        <transition name="voiceAnimation">
            <div class="voice-bg" v-if="voiceFlag">
                <div class="voice-wrap">
                    <audio :src="voiceSrc" controls autoplay class="voice"></audio>
                    <i class="el-icon-circle-close yi-icon" @click="closeVoice"></i>
                </div>
            </div>`
        </transition>
    </div>
</template>

<script>
import { Pagination, DatePicker, Button, Input, Message, Select} from "element-ui";
import businessSrv from "@/../src/views/services/business.service.js"
import callSrv from '@/../src/views/services/callHistory.service.js'

/* eslint-disable */
export default {
    data() {
        return {
            businessList: [],
            businessId: '',
            startDate: "",
            endDate: "",
            phone: "",
            recordSrc: "",
            currentPage: 1,
            pageSize: 10,
            totalRecords: 1,
            recordList: [],
            voiceFlag: false,
            voiceSrc: "",
            orderId: ""
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.initBusinesses()
        })
    },
    methods: {
        initBusinesses() {
            businessSrv.getAllBusiness().then(resp => {
                this.businessList = resp.data.businesses;
            }, err => {})
        },
        searchList(currentPage = this.currentPage) {
            callSrv.callhistory(this.businessId, this.startDate, this.endDate, this.phone, currentPage, this.pageSize, this.orderId ).then(resp => {
                let data = resp.data.pageInfo;
                this.recordList = data.entities;
                this.totalRecords = data.total;
                this.currentPage = currentPage;
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        exportCallHistories() {
            let a = document.createElement("a");
            a.href = `/orderschedule/index.php/Home/CallHistories/export?businessId=${this.businessId}&startTime=${this.startDate}&endTime=${this.endDate}&phone=${this.phone}`;
            a.click();
        },
        listen(item) {
            this.voiceFlag = true;
            let origin  = window.location.origin;
            if (origin.indexOf('localhost') > -1) {
                this.voiceSrc ="https://shbs10014.shwo10016.cn/orderschedule/index.php/Home/Medias/audio?fileName=" + item.recordFile;
            } else {
                this.voiceSrc = origin + '/orderschedule/index.php/Home/Medias/audio?fileName=' + item.recordFile;
            }
        },
        closeVoice() {
            this.voiceFlag = false;
        }
    }
};
</script>

<style lang="scss" scoped>
.i-wrap {
    padding: 10px;
    cursor: pointer;
    &:hover {
        color: rgba(78 ,189 ,116, .1);
    }
}
.callaudio{
    width: 100%;
}
.info {
    padding-top: 14px;
    text-align: center;
    color: #666;
}
.audio-wrap {
    margin: -10px auto 10px 0;
}
.record-page .content-show .list-search .yi-left{
    margin-left: -28px;
}

.voiceAnimation-enter-active, .voiceAnimation-leave-active {
    transition: all .4s;
}
.voiceAnimation-enter-active .voice-wrap {
    transition: all .4s ease;
}
.voiceAnimation-leave-active, .voice-wrap {
    transition: all .4s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.voiceAnimation-enter, .voiceAnimation-leave-to {
    opacity: 0;
}
.voiceAnimation-enter .voice-wrap, .voiceAnimation-leave-to .voice-wrap {
    transform: translateX(60px);
}
.voice-bg {
    position: fixed;
    top:0;
    left: 0;
    bottom: 0;
    right: 0;
    text-align: center;
    background: rgba(0,0,0,.5);
    transition: opacity .3;
    z-index: 2113;
}
.voice-bg::after {
    content: "";
    display: inline-block;
    height: 100%;
    width: 0;
    vertical-align: middle;
}
.voice-wrap {
    display: inline-block;
    position: relative;
    z-index: 9999;
    width: 480px;
    padding: 12px 12px 6px 12px;
    vertical-align: middle;
    background-color: #fff;
    border-radius: 4px;
    border: 1px solid #ebeef5;
    box-shadow: 0 2px 12px 0 rgba(0,0,0,.1);
    text-align: center;
    overflow: hidden;
    backface-visibility: hidden;
    .voice {
        width: 100%;
        background: #ffffff;
    }
    .yi-icon {
        font-size: 25px;
        color: #999999;
        cursor: pointer;
        &:hover{
            color: rgb(32, 168, 216);
        }
    }
}
</style>
