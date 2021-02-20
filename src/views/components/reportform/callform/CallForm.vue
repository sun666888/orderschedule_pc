<template>
    <div class="delivery-page animated fadeIn content_page callform -page">
        <div class="content-title">
            <div class="title">外呼报表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-2 search-field">
                    <div class="label">业务：</div>
                    <el-select v-model="businessId" clearable  placeholder="请选择业务" size="small">
                        <el-option
                            v-for="option in businessList"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="col-md-2 search-field">
                    <div class="label">日期：</div>
                    <el-date-picker
                        v-model="selecteDate"
                        type="date"
                        placeholder="请选择日期"
                    ></el-date-picker>
                </div>
                <div class="col-md-1 search-field">
                    <button class="btn search-btn btn-info" @click="searchForm" size='mini'>搜索</button>
                </div>
            </div>
            <div class="row">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>日期</th>
                                <th>工号</th>
                                <th>姓名</th>
                                <th>拨打量</th>
                                <th>接通量</th>
                                <th>接通率</th>
                                <th>工时</th>
                                <th>小拨</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in deliveryList" :key="index">
                            <tr>
                                <td>{{item.date}}</td>
                                <td>{{item.jobNumber}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.callAmount}}</td>
                                <td>{{item.connectAmount}}</td>
                                <td>{{item.connectRate}}</td>
                                <td>{{item.jobHours}}</td>
                                <td>{{item.smallCall}}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import businessSrv from "@/../src/views/services/business.service.js";
    import formSrv from "@/../src/views/services/form.service.js";
    export default{
        data() {
            return {
                delivery: '',
                workState: [],
                businessId:'',
                businessList: [],
                selecteDate: "",
                deliveryList: [
                    {
                        date: "2018-10-29",
                        jobNumber: "00001",
                        name: "杨雅",
                        callAmount: "198",
                        connectAmount: "99",
                        connectRate: "50%",
                        jobHours: "20",
                        callEffect: "23%",
                        smallCall: "10"
                    }
                ]
            }
        },
        mounted() {
            this.initBusinesses();
        },
        methods: {
            initBusinesses() {
                businessSrv.getAllBusiness().then(resp => {
                    this.businessList = resp.data.businesses;
                }, err => {})
            },
            searchForm() {
                // formSrv.callForm(this.businessId, this.selecteDate).then(resp => {
                //     console.log(resp);
                // }, err => {
                //     //
                // })
            }
        }
    }
</script>

<style scoped>
.content_page .content-show .list-search .search-field {
    padding-left: 48px;
}
.content_page .content-show .list-search .search-field .label {
    left: 0px;
}
.input-field {
    height: 36px;
}
</style>
