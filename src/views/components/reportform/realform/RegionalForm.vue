<template>
    <div class="animated fadeIn content_page scheduling_page">
        <div class="content-title">
            <div class="title">区域指标实时报表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
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
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">开始时间：</div>
                    <el-date-picker size="medium" type="datetime" v-model="order_start_time" placeholder="选择开始时间" value-format="yyyy-MM-dd HH:mm">
                    </el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">结束时间：</div>
                    <el-date-picker size="medium" type="datetime" v-model="order_end_time" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm">
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
                        v-loading="loading"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="districtName"
                            label="地区"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="count"
                            label="总订单量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="successCount"
                            label="总成功量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="localCount"
                            label="本地成功量"
                            width="90">
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
                            prop="secondaryMarketCount"
                            label="亲情卡二次营销"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="secondaryMarketRate"
                            label="亲情卡二次营销率"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="validActivityCount"
                            label="腾讯王卡激活量"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="validIsvvipCount"
                            label="超级会员办理"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="isvvipRate"
                            label="超级会员率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="changeCount"
                            label="改信息量"
                            width="90">
                        </el-table-column>
                    </el-table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import realformSrv from '@/../src/views/services/realform.service.js'
export default {
  name: 'regional-form',
  data() {
    return {
      district: '',
      order_start_time: '',
      order_end_time: '',
      orderList: [],
      loading: true
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      realformSrv.searchRegionOrder(vm.order_start_time, vm.order_end_time, vm.district).then(resp => {
        vm.loading = false
        let data = resp.areaIndexExport
        // console.log(resp)
        let orderTotal = {
          districtName: '总计',
          count: data.total,
          successCount: data.successTotal,
          localCount: data.localTotal,
          recharge50Count: data.recharge50Total,
          recharge50Rate: data.recharge50Rate,
          recharge100Count: data.recharge100Total,
          recharge100Rate: data.recharge100Rate,
          secondaryMarketCount: data.secondaryMarketTotal,
          secondaryMarketRate: data.secondaryMarketRate,
          validActivityCount: data.activityTotal,
          validIsvvipCount: data.isvvipTotal,
          isvvipRate: data.isvvipRate,
          changeCount: data.changeTotal
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
    })
  },
  methods: {
    searchList() {
      this.loading = true
      realformSrv.searchRegionOrder(this.order_start_time, this.order_end_time, this.district).then(resp => {
        let data = resp.areaIndexExport
        this.loading = false
        // console.log(resp)
        let orderTotal = {
          districtName: '总计',
          count: data.total,
          successCount: data.successTotal,
          localCount: data.localTotal,
          recharge50Count: data.recharge50Total,
          recharge50Rate: data.recharge50Rate,
          recharge100Count: data.recharge100Total,
          recharge100Rate: data.recharge100Rate,
          secondaryMarketCount: data.secondaryMarketTotal,
          secondaryMarketRate: data.secondaryMarketRate,
          validActivityCount: data.activityTotal,
          validIsvvipCount: data.isvvipTotal,
          isvvipRate: data.isvvipRate,
          changeCount: data.changeTotal
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
        order_start_time: this.order_start_time,
        order_end_time: this.order_end_time,
        district: this.district
      }
      let url = `/orderschedule/index.php/Home/Export/ExportAreaIndex?${Object.entries(searchContent).map(x => x.join('=')).join('&')}`
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
