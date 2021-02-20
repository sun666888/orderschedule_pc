<template>
    <div class="delivery-page animated fadeIn content_page orderform-page">
        <div class="content-title">
            <div class="title">订单报表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">开始日期：</div>
                    <el-date-picker
                        v-model="startTime"
                        type="date"
                        placeholder="请选择日期"
                    ></el-date-picker>
                </div>
                <div class="col-md-3 search-field">
                    <div class="label">结束日期：</div>
                    <el-date-picker
                        v-model="endTime"
                        type="date"
                        placeholder="请选择日期"
                    ></el-date-picker>
                </div>
                <div class="col-md-4 search-field">
                    <button class="btn search-btn btn-info" @click="searchForm">搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>导入日期</th>
                                <th>订单量</th>
                                <th>派单量</th>
                                <th>派单率</th>
                                <th>回单量</th>
                                <th>回单率</th>
                                <th>退单量</th>
                                <th>退单率</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in formList" :key="index">
                            <tr>
                                <td>{{item.importSequence.importTime}}</td>
                                <td>{{item.importSequence.count}}</td>
                                <td>{{item.assignCount}}</td>
                                <td>{{item.assignRate}}</td>
                                <td>{{item.finishCount}}</td>
                                <td>{{item.finishRate}}</td>
                                <td>{{item.rejectCount}}</td>
                                <td>{{item.rejectRate}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import formSrv from "@/../src/views/services/form.service.js";
export default{
    data() {
        return {
            startTime: "",
            endTime: "",
            formList: []
        }
    },
    methods: {
        searchForm() {
            // formSrv.orderForm(this.startTime, this.endTime).then(resp => {
            //     this.formList = resp.data.reports;
            // }, err => {
            //     this.$message.error(err.error.message);
            // })
        },
    }
}
</script>

<style scoped>
.content_page .content-show .list-search .search-field .label {
    left: 0px;
}
.input-field {
    height: 36px;
}
</style>
