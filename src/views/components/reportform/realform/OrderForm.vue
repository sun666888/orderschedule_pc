<template>
    <div class="animated fadeIn content_page scheduling_page">
        <div class="content-title">
            <div class="title">人员各指标分时段展示报表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-2 search-field">
                    <div style="left: 0" class="label">区域：</div>
                    <el-select v-model="district" filterable clearable placeholder="请先选择区域" size="medium" class="yi_area" >
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
                <div class="col-md-2 search-field">
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
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始时间：</div>
                    <el-date-picker size="medium" type="datetime" v-model="orderStartTime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">结束时间：</div>
                    <el-date-picker size="medium" type="datetime" v-model="orderEndTime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-2 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                    <button class="btn btn-info search-btn" v-on:click.stop="exportOrder">导出</button>
                </div>
                <div class="col-md-12 search-field yi_table">
                    <el-table
                        ref="multipleTable"
                        :data="orderList"
                        height="450"
                        v-loading="loading"
                        border
                        style="width: 100%">
                        <el-table-column
                            label="调度系统订单未完成情况展示"
                            width="630px"
                            fixed>
                            <el-table-column
                                prop="districtName"
                                label="地区"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="userName"
                                label="配送员"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="changeAgreeCount"
                                label="改约量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="expressCount"
                                label="派送量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="expressingCount"
                                label="派送中流量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="unfinishedCount"
                                label="未完成总量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="todayVisitCount"
                                label="其中：今日上门量"
                                width="90">
                            </el-table-column>
                        </el-table-column>

                        <el-table-column
                            label="当日调度系统完结情况">
                            <el-table-column
                                prop="todayChangeAgreeCount"
                                label="今日改约量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="todayTransferCount"
                                label="今日转物流量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="todayBackCount"
                                label="今日退单量"
                                width="90">
                            </el-table-column>
                        </el-table-column>

                        <el-table-column
                            label="当日合计">
                            <el-table-column
                                prop="todaySuccessCount"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="todayRechargeCount"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="rechargeRate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="todaySecondaryMarketCount"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="todayIsvvipCount"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>

                        <el-table-column
                            label="9点前"
                            >
                            <el-table-column
                                prop="time_slot_nine_before_today_success_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_before_today_recharge_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_before_today_recharge_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_before_today_secondary_market_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_before_today_isvvip_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>

                        <el-table-column
                            label="9点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_09_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_09_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_09_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_09_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_09_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>

                        <el-table-column
                            label="10点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_10_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_10_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_10_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_10_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_10_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>

                        <el-table-column
                            label="11点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_11_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_11_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_11_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_11_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_11_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="12点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_12_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_12_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_12_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_12_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_12_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="13点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_13_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_13_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_13_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_13_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_13_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="14点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_14_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_14_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_14_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_14_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_14_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="15点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_15_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_15_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_15_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_15_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_15_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="16点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_16_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_16_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_16_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_16_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_16_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="17点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_17_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_17_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_17_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_17_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_17_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="18点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_18_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_18_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_18_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_18_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_18_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="19点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_19_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_19_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_19_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_19_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_19_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="20点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_20_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_20_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_20_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_20_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_20_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="21点"
                            >
                            <el-table-column
                                prop="time_slot_today_success_21_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_21_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_recharge_21_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_secondary_market_21_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_today_isvvip_21_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                        <el-table-column
                            label="21点后"
                            >
                            <el-table-column
                                prop="time_slot_nine_after_today_success_count"
                                label="今日成功量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_after_today_recharge_count"
                                label="今日充值量"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_after_today_recharge_rate"
                                label="今日充值率"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_after_today_secondary_market_count"
                                label="今日二次营销"
                                width="90">
                            </el-table-column>
                            <el-table-column
                                prop="time_slot_nine_after_today_isvvip_count"
                                label="今日超级会员"
                                width="90">
                            </el-table-column>
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import realformSrv from '@/../src/views/services/realform.service.js'
import deliverySrv from '@/../src/views/services/delivery.service.js'
export default {
  name: 'order-form',
  data() {
    return {
      district: '',
      orderStartTime: '',
      orderEndTime: '',
      orderList: [],
      userId: '',
      deliveryList: [],
      loading: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      realformSrv.searchTimeSlotOrder(vm.district, vm.orderStartTime, vm.orderEndTime, vm.userId).then(resp => {
        vm.loading = false
        let data = resp.timeSlotExport
        // console.log(resp)
        if (data.final) {
          vm.orderList = data.final
        } else {
          vm.orderList = []
        }
      }, err => {
        vm.loading = false
        vm.$message.error(err.error.message)
      })

      // 人员
      deliverySrv.getDeliveryes().then(resp => {
        let data = resp.data.users
        if (data) {
          vm.deliveryList = data
        }
      }, err => {
        vm.$message.error(err.error.message)
      })
    })
  },
  methods: {
    searchList() {
      this.loading = true
      realformSrv.searchTimeSlotOrder(this.district, this.orderStartTime, this.orderEndTime, this.userId).then(resp => {
        this.loading = false
        let data = resp.timeSlotExport
        // console.log(resp)
        if (data.final) {
          this.orderList = data.final
        } else {
          this.orderList = []
        }
      }, err => {
        this.loading = false
        this.$message.error(err.error.message)
      })
    },

    // 导出
    exportOrder() {
      let searchContent = {
        userId: this.userId,
        order_start_time: this.orderStartTime,
        order_end_time: this.orderEndTime,
        district: this.district
      }
      let url = `/orderschedule/index.php/Home/Export/ExportTimeSlotIndex?${Object.entries(searchContent).map(x => x.join('=')).join('&')}`
      this.download(url)
    },
    download(url) {
      let a = document.createElement('a')
      a.href = url
      a.click()
    }
  }
}
</script>

<style lang="scss" scoped>
    .content_page .content-show .list-search .yi_table {
        padding-left: 0px;
        .el-button {
            outline: none;
        }
    }
</style>
