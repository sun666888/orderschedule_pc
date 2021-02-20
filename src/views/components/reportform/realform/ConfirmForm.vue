<template>
    <div class="animated fadeIn content_page scheduling_page">
        <div class="content-title">
            <div class="title">落单情况</div>
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
                            label="区域"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="nine_before_count"
                            label="9点前"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_09_count"
                            label="9点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_10_count"
                            label="10点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_11_count"
                            label="11点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_12_count"
                            label="12点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_13_count"
                            label="13点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_14_count"
                            label="14点"
                            width="90">
                        </el-table-column>

                        <el-table-column
                            prop="total_15_count"
                            label="15点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_16_count"
                            label="16点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_17_count"
                            label="17点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_18_count"
                            label="18点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_19_count"
                            label="19点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_20_count"
                            label="20点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total_21_count"
                            label="21点"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="nine_after_count"
                            label="21点后"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="total"
                            label="今日合计"
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
  name: 'confirm-form',
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
      realformSrv.searchConfirmOrder(vm.order_start_time, vm.order_end_time, vm.district).then(resp => {
        let data = resp.exportData
        vm.loading = false
        let orderTotal = {
          districtName: '合计',
          total: data.total,
          nine_before_count: data.nine_before_total,
          nine_after_count: data.nine_after_total,
          total_09_count: data.total_09_total,
          total_10_count: data.total_10_total,
          total_11_count: data.total_11_total,
          total_12_count: data.total_12_total,
          total_13_count: data.total_13_total,
          total_14_count: data.total_14_total,
          total_15_count: data.total_15_total,
          total_16_count: data.total_16_total,
          total_17_count: data.total_17_total,
          total_18_count: data.total_18_total,
          total_19_count: data.total_19_total,
          total_20_count: data.total_20_total,
          total_21_count: data.total_21_total
        }
        // console.log(orderTotal)
        data.final.push(orderTotal)
        vm.orderList = data.final
      }, err => {
        vm.loading = false
        vm.$message.error(err.error.message)
      })
    })
  },
  methods: {
    searchList() {
      this.loading = true
      realformSrv.searchConfirmOrder(this.order_start_time, this.order_end_time, this.district).then(resp => {
        let data = resp.exportData
        this.loading = false
        // console.log(resp)
        let orderTotal = {
          districtName: '合计',
          total: data.total,
          nine_before_count: data.nine_before_total,
          nine_after_count: data.nine_after_total,
          total_09_count: data.total_09_total,
          total_10_count: data.total_10_total,
          total_11_count: data.total_11_total,
          total_12_count: data.total_12_total,
          total_13_count: data.total_13_total,
          total_14_count: data.total_14_total,
          total_15_count: data.total_15_total,
          total_16_count: data.total_16_total,
          total_17_count: data.total_17_total,
          total_18_count: data.total_18_total,
          total_19_count: data.total_19_total,
          total_20_count: data.total_20_total,
          total_21_count: data.total_21_total
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
      let url = `/orderschedule/index.php/Home/Export/ExportFallOrder?${Object.entries(searchContent).map(x => x.join('=')).join('&')}`
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
