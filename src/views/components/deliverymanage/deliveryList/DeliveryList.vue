<template>
    <div class="delivery-page animated fadeIn content_page">
        <div class="content-title">
            <div class="title">派送员列表</div>
        </div>
        <div class="content-show">
            <div class="row">
                <div class="col-lg-12" style="margin-bottom: 24px">
                    <el-select v-model="pointId" filterable clearable  placeholder="请先选择站点" size="medium" @change="handleSearch" style="width: 576px;" >
                        <el-option
                            v-for="item in pointOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                    <el-select v-model="deliveryId" filterable clearable  placeholder="请选择派送员" size="medium" @change="handleSearch">
                        <el-option
                            v-for="item in deliveryOptions"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                        </el-option>
                    </el-select>
                </div>
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>姓名</th>
                                <th>电话号码</th>
                                <th>密码</th>
                                <th>密码错误次数</th>
                                <th>站点</th>
                                <th>业务</th>
                                <th>地址</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in deliveryList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.password}}</td>
                                <td>{{item.retry}}</td>
                                <td>{{formatPoint(item.pointId)}}</td>
                                <td>{{formatBusiness(item.userBusinesses)}}</td>
                                <td>{{item.address}}</td>
                                <td>
                                    <router-link :to="{path: '/deliverymanage/updateDelivery', query: {Id: item.id}}">
                                        修改
                                    </router-link>
                                    <a @click="deleteDelivery(item.id)">删除</a>
                                    <a @click="resetDelivery(item.id)">重置密码</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="page" v-if="( deliveryList && deliveryList.length > 0 && total > 3)">
                        <el-pagination
                            background
                            @current-change="searchList"
                            :current-page.sync="pageIndex"
                            :page-size="pageSize"
                            layout="total, prev, pager, next"
                            :total="total">
                        </el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="30%" center>
            <div class="text-center">
                <span>删除后无法找回，确定要删除此用户吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDeleteDelivery">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import pointSrv from "@/../src/views/services/point.service.js";
    import deliverySrv from "@/../src/views/services/delivery.service.js";
    export default{
        data() {
            return {
                delivery: '',
                point: '',
                pointOptions: [],
                deliveryOptions: [],
                deliveryList: [],
                total: 10,
                pageIndex: 1,
                pageSize: 6,
                deliveryId: "",
                deleteDialog: false,
                pointId: ''
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                deliverySrv.searchDelivery(vm.pointId, vm.userId, vm.pageIndex, vm.pageSize).then(resp => {
                    let data = resp.data.pageInfo;
                    if (data.entities) {
                        vm.deliveryList = data.entities;
                        vm.total = data.total;
                    }
                })
                deliverySrv.getDeliveryes().then(resp => {
                    let data = resp.data.users;
                    if (data) {
                        vm.deliveryOptions = data;
                    }
                });
                pointSrv.getAllpoints().then(resp => {
                    vm.pointOptions = resp.data.points;
                })
            })
        },
        methods: {
            formatBusiness(businesses) {
                let buArr = [];
                businesses.map(item => {
                    buArr.push(item.business.name)
                });
                return buArr.join();
            },
            formatPoint(id) {
                let point = "";
                this.pointOptions.map(pd => {
                    if (pd.id == id) {
                        point = pd.name;
                    }
                })
                return point;
            },
            searchList(pageIndex = this.pageIndex) {
                deliverySrv.searchDelivery(this.pointId, this.deliveryId, pageIndex, this.pageSize).then(resp => {
                    let data = resp.data.pageInfo;
                    this.deliveryList = data.entities;
                    this.total = data.total;
                    this.pageIndex = pageIndex;
                })
            },
            deleteDelivery(id) {
                this.deliveryId = id;
                this.deleteDialog = true;
            },
            resetDelivery(id) {
                deliverySrv.resetDelivery(id).then(resp => {
                    this.$message.success("派送员密码重置成功~");
                    this.searchList(this.pageIndex);
                }, err => {
                    this.$message.error(err.error.message);
                })
            },
            confirmDeleteDelivery() {
                deliverySrv.deleteDelivery(this.deliveryId).then(resp => {
                    this.$message.success("派送员删除成功~");
                    this.deleteDialog = false;
                    this.searchList(this.pageIndex);
                }, err => {
                    this.$message.error(err.error.message);
                })
            },
            handleSearch() {
                this.searchList(1);
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
