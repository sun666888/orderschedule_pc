<template>
    <div class="col-md-12 search-field yi_table">
        <el-table
            :data="orderList"
            border
            style="width: 100%">
            <el-table-column
                fixed
                prop="audit_date"
                label="审核不通过日期"
                width="110">
                <!-- <template slot-scope="scope">
                    <span>{{ scope.row.orderId }}</span>
                    <i class="fa fa-clipboard yi-clipboard" v-clipboard:copy="scope.row.orderId" v-clipboard:success="clipboardSuccess"  ></i>
                </template> -->
            </el-table-column>
            <el-table-column
                fixed
                prop="order_id"
                label="订单编号"
                width="90">
            </el-table-column>
            <el-table-column
                prop="phone"
                label="号码"
                width="120">
            </el-table-column>
             <el-table-column
                fixed
                prop="planname"
                label="套餐名称"
                width="110">
            </el-table-column>
            <el-table-column
                prop="recheck"
                label="复审结果"
                width="120">
            </el-table-column>
            <el-table-column
                prop="remarks"
                label="备注"
                width="120">
            </el-table-column>
            <el-table-column
                prop="delivery"
                label="派送人"
                width="120">
                <!-- <template slot-scope="scope">
                    <span v-if="scope.row.user">{{scope.row.user.name}}</span>
                </template> -->
            </el-table-column>
            <el-table-column
                prop="state"
                label="订单状态"
                width="100">
            </el-table-column>
            <el-table-column
                fixed="right"
                label="操作"
                width="120">
                <template slot-scope="scope">
                    <el-button type="text" size="medium" @click="handleCall(scope.row.id, scope.row.phone, scope.row.businessId)">查看</el-button><br />
                    <el-button type="text" size="medium" @click="handleCall(scope.row.id, scope.row.phone, scope.row.businessId)">修改</el-button><br />
                </template>
            </el-table-column>
        </el-table>

        <div class="page yi_page">
            <el-pagination
                background
                @current-change="searchList"
                :current-page.sync="pageIndex"
                :page-size="pageSize"
                layout="total, prev, pager, next"
                :total="totalOrders"
            >
            </el-pagination>
        </div>
    </div>
</template>

<script>
import { Button, Table} from 'element-ui'
import orderSrv from '@/../src/views/services/order.service.js'

export default {
    data() {
        return {
            orderList: [],
            pageIndex: 1,
            pageSize: 5,
            totalOrders: 0
        }
    },
    mounted(){
        
    },
    methods:{
        searchList(pageIndex = this.pageIndex) {
            let searchContent ={
                pageIndex: pageIndex,
                pageSize: this.pageSize
            }
            // orderSrv.upplementaryOrder(searchContent).then(resp => {
            //     let data = resp.data.auditdetails;
            //     this.totalOrders = data.total;
            //     this.orderList = data.entities;
            //     this.pageIndex = pageIndex;
            // }, err => {
            //     vm.$message.error(err.message);
            // })
        }
    },


    beforeRouteEnter (to, from, next) {
        next(vm => {
            let pageIndex= vm.pageIndex
            let pageSize=vm.pageSize
            orderSrv.upplementaryOrder(pageIndex,pageSize).then(resp => {
                // console.log(resp.data.auditdetails.entities[0].state)
                let formObj=resp.data.auditdetails.entities
                // console.log(formObj)
                for (let key in formObj) {
                    if(formObj[key].state==0){
                        formObj[key].state="未补登"
                    }else{
                        formObj[key].state="补登"
                    }
                // formData.append(key, formObj[key]);
            };
            console.log(formObj)
                let data = resp.data.auditdetails;
                vm.orderList = data.entities;
                vm.totalOrders = data.total;
            }, err => {
                vm.$message.error(err.error.message);
            });
        })
    },






    // beforeRouteEnter (to, from, next) {
    //     next(vm => {
    //         let searchContent = {
    //             pageIndex: vm.pageIndex,
    //             pageSize: vm.pageSize,
    //             audit_date: vm.audit_date,
    //             order_id: vm.order_id,
    //             phone: vm.phone,
    //             planname: vm.planname,
    //             recheck: vm.recheck,
    //             remarks: vm.remarks,
    //             delivery: vm.delivery,
    //             state: vm.state
    //         };
    //         orderSrv.supplementaryOrder(searchContent).then(resp => {
    //             console.log(resp)
    //             let data = resp.data.pageInfo;
    //             vm.orderList = data.entities;
    //             // vm.totalOrders = data.total;
    //         }, err => {
    //             vm.$message.error(err.error.message);
    //         });
    //         // businessSrv.getAllBusiness().then(resp => {
    //         //     let data = resp.data.businesses;
    //         //     vm.businessList = data;
    //         // }, err => {

    //         // })
    //     })
    // },
}
</script>

<style lang="scss" scoped>

</style>
