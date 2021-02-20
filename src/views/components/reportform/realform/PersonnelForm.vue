<template>
    <div class="animated fadeIn content_page scheduling_page">
        <div class="content-title">
            <div class="title">人员指标实时报表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
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
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始时间：</div>
                    <el-date-picker size="medium" type="datetime" v-model="completeStartTime" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">结束时间：</div>
                    <el-date-picker size="medium" type="datetime" v-model="completeEndTime" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>

                <div class="col-md-3 search-field search-field_controls">
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
                            prop="userName"
                            label="最后操作配送员"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="expressCount"
                            label="派单量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="activityCount"
                            label="激活量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="activityRate"
                            label="激活率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="localCount"
                            label="本地激活量"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="recharge50Count"
                            label="充值量（≥50元）"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="recharge50Rate"
                            label="充值率（≥50元）"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="recharge100Count"
                            label="充值量（≥100元）"
                            width="125">
                        </el-table-column>
                        <el-table-column
                            prop="recharge100Rate"
                            label="充值率（≥100元）"
                            width="125">
                        </el-table-column>
                        <el-table-column
                            prop="validTencentCount"
                            label="腾讯王卡激活量"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="validIsvvipCount"
                            label="超级会员量"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="isvvipRate"
                            label="超级会员办理率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="secondaryMarketCount"
                            label="二次营销量（亲情卡）"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="secondaryMarketRate"
                            label="亲情卡二次营销率"
                            width="130">
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
  name: 'personnel-form',
  data() {
    return {
      completeStartTime: '',
      completeEndTime: '',
      orderList: [],
      userId: '',
      deliveryList: [],
      loading: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      realformSrv.searchPersonnelOrder(vm.completeStartTime, vm.completeEndTime, vm.userId).then(resp => {
        let data = resp.totalIndexExport
        vm.loading = false
        // console.log(resp)
        let orderTotal = {
          userName: data.userName,
          expressCount: data.expressTotal,
          activityCount: data.activityTotal,
          localCount: data.localTotal,
          activityRate: data.activityRate,
          recharge50Count: data.recharge50Total,
          recharge50Rate: data.recharge50Rate,
          recharge100Count: data.recharge100Total,
          recharge100Rate: data.recharge100Rate,
          secondaryMarketCount: data.secondaryMarketTotal,
          secondaryMarketRate: data.secondaryMarketRate,
          validTencentCount: data.validTencentTotal,
          isvvipRate: data.validIsvvipRate,
          validIsvvipCount: data.validIsvvipTotal
        }
        if (data.final) {
          data.final.push(orderTotal)
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
      // if (this.monthCompleteTime && this.dayCompleteTime) {
      //   this.$message.error('月份和日期不能同时选择~，请移除一个')
      //   return false
      // }
      // if (this.monthCompleteTime) {
      //   let date = new Date(this.monthCompleteTime)
      //   let Month = date.getMonth() + 1
      //   if (Month < 10) {
      //     Month = '0' + Month
      //   }
      //   this.monthCompleteTime = date.getFullYear() + '-' + Month
      // }
      this.loading = true
      realformSrv.searchPersonnelOrder(this.completeStartTime, this.completeEndTime, this.userId).then(resp => {
        let data = resp.totalIndexExport
        this.loading = false
        // console.log(resp)
        let orderTotal = {
          userName: data.userName,
          expressCount: data.expressTotal,
          activityCount: data.activityTotal,
          localCount: data.localTotal,
          activityRate: data.activityRate,
          recharge50Count: data.recharge50Total,
          recharge50Rate: data.recharge50Rate,
          recharge100Count: data.recharge100Total,
          recharge100Rate: data.recharge100Rate,
          secondaryMarketCount: data.secondaryMarketTotal,
          secondaryMarketRate: data.secondaryMarketRate,
          validTencentCount: data.validTencentTotal,
          isvvipRate: data.validIsvvipRate,
          validIsvvipCount: data.validIsvvipTotal
        }
        if (data.final) {
          data.final.push(orderTotal)
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
        complete_start_time: this.completeStartTime,
        complete_end_time: this.completeEndTime
      }
      let url = `/orderschedule/index.php/Home/Export/ExportTotalIndex?${Object.entries(searchContent).map(x => x.join('=')).join('&')}`
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
