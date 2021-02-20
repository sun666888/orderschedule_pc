<template>
    <div class="animated fadeIn content_page scheduling_page">
        <div class="content-title">
            <div class="title">一体化日报表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <!--<div class="col-md-3 search-field">-->
                    <!--<div style="left: 0" class="label">区域：</div>-->
                    <!--<el-select v-model="district" filterable clearable placeholder="请先选择区域" size="medium" class="yi_area" >-->
                        <!--<el-option label="浦东新区" value="浦东新区"></el-option>-->
                        <!--<el-option label="宝山区" value="宝山区"></el-option>-->
                        <!--<el-option label="杨浦区" value="杨浦区"></el-option>-->
                        <!--<el-option label="黄浦区" value="黄浦区"></el-option>-->
                        <!--<el-option label="静安区" value="静安区"></el-option>-->
                        <!--<el-option label="虹口区" value="虹口区"></el-option>-->
                        <!--<el-option label="徐汇区" value="徐汇区"></el-option>-->
                        <!--<el-option label="长宁区" value="长宁区"></el-option>-->
                        <!--<el-option label="普陀区" value="普陀区"></el-option>-->
                        <!--<el-option label="嘉定区" value="嘉定区"></el-option>-->
                        <!--<el-option label="崇明区" value="崇明区"></el-option>-->
                        <!--<el-option label="闵行区" value="闵行区"></el-option>-->
                        <!--<el-option label="奉贤区" value="奉贤区"></el-option>-->
                        <!--<el-option label="松江区" value="松江区"></el-option>-->
                        <!--<el-option label="青浦区" value="青浦区"></el-option>-->
                        <!--<el-option label="金山区" value="金山区"></el-option>-->
                    <!--</el-select>-->
                <!--</div>-->
                <div class="col-md-3 search-field">
                    <div style="left:0px" class="label">时间：</div>
                    <el-date-picker size="medium" type="date" v-model="curDate" placeholder="选择时间" value-format="yyyy-MM-dd">
                    </el-date-picker>
                </div>
                <!--<div class="col-md-3 search-field">-->
                    <!--<div style="left:0px" class="label">结束时间：</div>-->
                    <!--<el-date-picker size="medium" type="datetime" v-model="order_end_time" placeholder="选择结束时间" value-format="yyyy-MM-dd HH:mm">-->
                    <!--</el-date-picker>-->
                <!--</div>-->
                <div class="col-md-3 search-field search-field_controls">
                    <button class="btn btn-primary search-btn" v-on:click.stop="searchList(1)">搜索</button>
                    <button class="btn btn-info search-btn" v-on:click.stop="exportOrder">导出</button>
                </div>
                <div class="col-md-12 search-field yi_table">
                    <el-table
                        ref="multipleTable"
                        :data="orderList"
                        v-loading="loading"
                        height="600"
                        border
                        style="width: 100%">
                        <el-table-column
                            prop="district"
                            label="区域"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="zaizhi"
                            label="在职情况"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="配送经理"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="zhengtijihuo"
                            label="整体激活量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="zonghezhuanhualv"
                            label="综合转化率"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="localpaidan"
                            label="派单量"
                            width="125">
                        </el-table-column>
                        <el-table-column
                            prop="localjihuo"
                            label="激活量"
                            width="125">
                        </el-table-column>
                        <el-table-column
                            prop="localjihuolv"
                            label="激活率"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="localshouchong"
                            label="首充量"
                            width="130">
                        </el-table-column>
                        <el-table-column
                            prop="localshouchonglv"
                            label="首充率"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="localchongzhi100"
                            label="充值100元"
                            width="120">
                        </el-table-column>
                        <el-table-column
                            prop="localchongzhi100lv"
                            label="充值100元率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="localtuidanlv"
                            label="退单率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="asyncpaidan"
                            label="派单量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="asyncjihuo"
                            label="激活量"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="asyncjihuolv"
                            label="激活率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="asyncshouchonglv"
                            label="首充率"
                            width="90">
                        </el-table-column>
                        <el-table-column
                            prop="asynczhuanhualv"
                            label="转化率"
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
  name: 'unify-form',
  data() {
    return {
      curDate: '',
      orderList: [],
      loading: false
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
        vm.orderList = []
    })
  },
  methods: {
    searchList() {
      if (this.curDate == '' || this.curDate == null) {
          this.$message.error('请选择日期');
          return false
      }
      this.loading = true
      realformSrv.unifyExport(this.curDate).then(resp => {
        let data = resp.data
        this.loading = false
        // console.log(resp)
        // let orderTotal = {
        //   districtName: '总计',
        //   count: data.total,
        //   successCount: data.successTotal,
        //   localCount: data.localTotal,
        //   recharge50Count: data.recharge50Total,
        //   recharge50Rate: data.recharge50Rate,
        //   recharge100Count: data.recharge100Total,
        //   recharge100Rate: data.recharge100Rate,
        //   secondaryMarketCount: data.secondaryMarketTotal,
        //   secondaryMarketRate: data.secondaryMarketRate,
        //   validActivityCount: data.activityTotal,
        //   validIsvvipCount: data.isvvipTotal,
        //   isvvipRate: data.isvvipRate,
        //   changeCount: data.changeTotal
        // }
        if (data) {
          // data.final.push(orderTotal)
          this.orderList = data
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
        curDate: this.curDate
      }
      let url = `/orderschedule/index.php/Home/V2/exportUnify?${Object.entries(searchContent).map(x => x.join('=')).join('&')}`
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
