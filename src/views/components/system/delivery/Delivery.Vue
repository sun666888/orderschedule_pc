<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">员工审核</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-3 search-field">
                    <div class="label">姓名：</div>
                    <input type="text" class="form-control input-field" placeholder="请输入姓名" v-model="username" />
                </div>
                <div class="col-md-2 search-field">
                    <button class="btn btn-success search-btn" v-on:click.stop="searchDelivery">搜索</button>
                </div> 
            </div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm" v-if="deliveryList && deliveryList.length > 0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>姓名</th>
                                <th>登录名</th>
                                <th>电话号码</th>
                                <th>密码</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in deliveryList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.userName}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.password}}</td>
                                <td>
                                    <a @click="passed(item.id)" >通过</a>
                                    <a @click="deleteDelivery(item.id)" >删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="notlist-info" v-else>暂时没有待审核的员工啦...</div>
                </div>
            </div>
        </div>

        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="30%" center>
            <div class="text-center">
                <span>删除后无法找回，确定要删除此用户吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDeleteUser">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog title="通过" :modal-append-to-body="false" :visible.sync="passDialog" width="30%" center>
            <div class="text-center">
                <span>通过后，该员工将可以登录调度系统。</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmPassed">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog } from 'element-ui';
import deliverySrv from "@/../src/views/services/delivery.service.js";

/* eslint-disable */
export default {
    name: "delivery", 
    data() {
        return {
            passDialog: false, 
            deleteDialog: false,
            deliveryList: [],
            username: "",
            deleteId: '',
            passedId: "",
            pageIndex: 1,
            pageSize: 100
        }
    },
    components: {
        'el-dialog': Dialog
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.initDelivery();
        })
    },
    methods: {
        initDelivery() {
            deliverySrv.getRegisters(this.pageIndex, this.pageSize).then(resp => {
                this.deliveryList = resp.data.pageInfo.entities;
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        passed(id) {
            this.passDialog = true;
            this.passedId = id;
        },
        confirmPassed() {
            let passedId = this.passedId;
            deliverySrv.passRegister(passedId).then(resp => {
                this.$message.success("审核通过~");
                this.initDelivery();
                this.passDialog = false;
            }, err => {
                this.$message.error(err.error.message);
            });
        },
        deleteDelivery(id) {
            this.deleteId = id;
            this.deleteDialog = true;
        },
        confirmDeleteUser() {
            deliverySrv.deleteDelivery(this.deleteId).then(resp => {
                this.deleteDialog = false;
                this.$message.success("用户已删除");
                this.initDelivery();
            }, err => {
                this.$message.error(err.msg);
            });
        },
        searchDelivery() {
            this.$message.success("开发中~~~");
        }
    },
}
</script>

<style lang="scss" scoped>
.content_page {
    .content-show {
        .list-search {
            .search-field {
                .label {
                    position: absolute;
                    left: 20px;
                    top: 8px;
                    text-align: right;
                }
            }
        }
    }
}
.yi_width {
    width: 320px;
}
.notlist-info {
    color: #f56c6c;
}
</style>
