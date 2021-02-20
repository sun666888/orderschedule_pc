<template>
    <div class="delivery-page animated fadeIn content_page">
        <div class="content-title">
            <div class="title">调度员列表</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="col-md-12 search-field">
                    <div style="left: 15px" class="label" >调度员：</div>
                    <el-input size="small" type="text" placeholder="请输入调度员姓名或者电话号码" v-model.trim="namePhone" style="width:240px;margin-left:15px;"></el-input>
                    <button class="btn btn-success search-btn" v-on:click.stop="handleSearch">搜索</button>
                    <button class="btn search-btn btn-info" @click="addScheduler">新增调度员</button>
                    <span class="set-info">（提示：新增调度员需要联系外呼程序管理员配置线路）</span>
                </div>
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>姓名</th>
                                <th>电话号码</th>
                                <th>用户名</th>
                                <th>密码</th>
                                <th>角色</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in schedulerList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.phone}}</td>
                                <td>{{item.userName}}</td>
                                <td>{{item.password}}</td>
                                <td>
                                    <span v-for="xtem in item.userRoles" :key="xtem.id">
                                        {{formartRole(xtem.roleId)}},
                                    </span>
                                </td>
                                <td>
                                    <a @click="updateScheduler(item.id)">修改</a>
                                    <a @click="deleteScheduler(item.id)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="page" v-if="( schedulerList && schedulerList.length > 0 && total > 3)">
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

        <el-dialog
            :title="statusMap[status]"
            :visible.sync="schedulerDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="addForm" :model= "addForm" label-width="80px" class="col-md-11" :rules="ruleForm">
                <el-form-item label="用户名" prop="userName">
                    <el-input v-model="addForm.userName" placeholder="请输入用户名"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input v-model="addForm.password" placeholder="请输入密码"></el-input>
                </el-form-item>
                <el-form-item label="姓名" prop="name">
                    <el-input v-model="addForm.name" placeholder="请输入姓名"></el-input>
                </el-form-item>
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="addForm.phone" placeholder="请输入手机号"></el-input>
                </el-form-item>
                <el-form-item label="地址" prop="name">
                    <el-input v-model="addForm.address" placeholder="请输入地址"></el-input>
                </el-form-item>
                <el-form-item label="角色" prop="userRoles">
                    <el-select v-model="userRoles" placeholder="请分配角色" class="yi_input" multiple>
                        <el-option v-for="option in roleList" 
                                :key="option.id"
                                :value="option.id"
                                :label="option.roleName">
                        </el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmAddScheduler()" v-if="status == 'create'">确 定</el-button>
                <el-button type="primary" @click="confirmUpdateScheduler()" v-else>确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import pointSrv from "@/../src/views/services/point.service.js";
    import deliverySrv from "@/../src/views/services/delivery.service.js";
    import schedulerSrv from "@/../src/views/services/scheduler.service.js";
    import roleSrv from "@/../src/views/services/role.service.js";
    import  {observe, generate} from "fast-json-patch";

    export default{
        data() {
            return {
                delivery: '',
                point: '',
                pointOptions: [],
                schedulerList: [],
                roleList: [],
                total: 10,
                pageIndex: 1,
                pageSize: 6,
                schedulerId: 0,
                deleteDialog: false,
                addForm: {
                    userName: "",
                    password: "",
                    name: "",
                    phone: "",
                    address: "",
                    userRoles: []
                },
                userRoles: [],
                ruleForm: {
                    userName: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 2, max: 20, message: '长度在 2 到 20 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ],
                    name: [
                        { required: true, message: '请输入用户名', trigger: 'blur' }
                    ],
                    phone: [
                        { required: true, message: '请输入手机号', trigger: 'blur' },
                        { min: 11, max: 11, message: "长度必须是11位", trigger: 'blur'}
                    ],
                    address: [
                        { required: true, message: '请输入地址', trigger: 'blur' }
                    ],
                    userRoles: [
                        { type: 'array', required: true, message: '请分配角色', trigger: 'change' }
                    ]
                },
                schedulerDialog: false,
                statusMap: {
                    update: '修改调度员',
                    create: '新增调度员'
                },
                status: "",
                jsonPatch: [],
                namePhone: ""
            }
        },
        watch: {
            'userRoles': function() {
                this.addForm.userRoles = this.userRoles.map(x => {
                    return {
                        roleId: x
                    }
                })
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                let p = new Promise(function(resolve, reject) {
                    roleSrv.getAllRole().then(resp => {
                        let data = resp.data.roles;
                        vm.roleList = data;  
                        let tempdata = [];
                        tempdata = data.filter(x => {
                            if (x.roleName == 'rollback') {
                                x.roleName = "回滚"
                                return x;
                            }
                            if (x.roleName == "schedule") {
                                x.roleName = "调度员"
                                return x;
                            }
                            if (x.roleName == "scheduleManage") {
                                x.roleName = "调度管理员"
                                return x;
                            }
                            if (x.roleName == "import") {
                                x.roleName = "订单导入"
                                return x;
                            }
                        })
                        vm.roleList = tempdata;
                        resolve('ok');
                    })
                })
                p.then(function(val) {
                    schedulerSrv.searchScheduler(vm.namePhone, vm.pageIndex, vm.pageSize).then(resp => {
                        let data = resp.data.schedules;
                        if (data.entities) {
                            vm.schedulerList = data.entities.filter(x => {
                                return x !== null;
                            })
                            vm.total = data.total;
                        }
                    })
                })
            })
        },
        methods: {
            searchList(pageIndex = this.pageIndex) {
                schedulerSrv.searchScheduler(this.namePhone, this.pageIndex, this.pageSize).then(resp => {
                    let data = resp.data.schedules;
                    if (data.entities) {
                        this.schedulerList = data.entities.filter(x => {
                            return x !== null;
                        })
                        this.total = data.total;
                        this.pageIndex = pageIndex;
                    }
                })
            },
            deleteScheduler(id) {
                this.schedulerId = id;
                this.deleteDialog = true;
            },
            confirmDeleteDelivery() {
                schedulerSrv.deleteScheduler(this.schedulerId).then(resp => {
                    this.searchList(this.pageIndex);
                    this.deleteDialog = false;
                    this.$message.success("调度员删除成功");
                }, err => {
                    this.$message.error(err.error.message);
                })
            },
            formartRole(roleId) {
                let roleName = undefined;
                this.roleList.forEach(x => {
                    if (x.id == roleId) {
                        roleName = x.roleName
                        return;
                    }
                })
                return roleName;
            },
            resetTemp() {
                this.userRoles = [];
                this.addForm = {
                    id: undefined,
                    userName: "",
                    password: "",
                    name: "",
                    phone: "",
                    address: "",
                    userRoles: []
                }
            },
            addScheduler() {
                this.resetTemp();
                this.status = 'create',
                this.schedulerDialog = true;
                this.$nextTick(() => {
                    this.$refs["addForm"].clearValidate();
                })
            },
            confirmAddScheduler() {
                let form = this.addForm;
                this.$refs["addForm"].validate((valid) => {
                    if (valid) {
                        schedulerSrv.addScheduler(form.userName, form.password, form.name, form.phone, form.address, this.userRoles).then(resp => {
                            this.schedulerDialog = false;
                            this.$refs["addForm"].resetFields();
                            this.$message.success("新增调度员成功，请联系外呼管理员分配线路")
                            this.searchList(1);
                        }, err => {
                            this.$message.error(err.error.message);
                        })
                    } else {
                        return false;
                    }
                })
            },
            updateScheduler(id) {
                this.status = 'update';
                this.schedulerDialog = true;
                schedulerSrv.getScheduler(id).then(resp => {
                    console.log(resp)
                    let data = resp.data.schedule;
                    this.addForm = Object.assign({}, data);
                    // let tempRoles = [];
                    // this.addForm.userRoles.forEach(x => {
                    //     tempRoles.push(x.roleId);
                    // });
                    // this.addForm.userRoles = tempRoles;
                    this.addForm.userRoles = this.addForm.userRoles.map(x => {
                        return {
                            roleId: x.roleId
                        }
                    });
                    this.userRoles = this.addForm.userRoles.map(x => {
                        if (x.roleId) {
                            return x.roleId
                        }
                    })
                    this.jsonPatch = observe(this.addForm);
                    this.$nextTick(() => {
                        this.$refs["addForm"].clearValidate();
                    })
                })
            },
            confirmUpdateScheduler() {
                let id = this.addForm.id;
                let jsonPatch = [];
                var mixed = this.addForm.userRoles.filter(x => this.userRoles.some(y => y == x.roleId));
                var diff = this.userRoles.filter(x => !this.addForm.userRoles.some(y =>y.roleId == x)).map(x => {
                    return {
                        roleId: x
                    }
                })
                this.addForm.userRoles = [];
                mixed.map(x => {
                    this.addForm.userRoles.push(x);
                })
                diff.map(x => {
                    this.addForm.userRoles.push(x);
                })
                this.$refs["addForm"].validate( (valid) => {
                    if (valid) {
                        jsonPatch = generate(this.jsonPatch);
                        schedulerSrv.updateScheduler(id, jsonPatch).then(resp => {
                            this.schedulerDialog = false;
                            this.$message.success("修改成功");
                            this.searchList(this.pageIndex);
                        }, err => {
                            this.$message.error(err.error.message);                            
                        })
                    } else {
                        return false;
                    }
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
.yi_input {
    width: 100%;
}
.set-info {
    color: #666;
}
</style>
