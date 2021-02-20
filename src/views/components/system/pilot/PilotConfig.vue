<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">试点配置</div>
        </div>
        <div class="content-show" key="1">
            <div class="col-md-5 search-field search-field_controls">
                <button class="btn search-btn btn-info" @click="addPoint">新增试点</button>
            </div>
            <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    prop="phone"
                    label="码上购落单手机号"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="派送员"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{scope.row.user}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    label="区域">
                    <template slot-scope="scope">
                        <span>{{scope.row.point}}</span>
                    </template>
                </el-table-column>
                <!-- <el-table-column
                    label="派送员"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{formataUser(scope.row.userId)}}</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    label="站点">
                    <template slot-scope="scope">
                        <span>{{formataPoint(scope.row.pointId)}}</span>
                    </template>
                </el-table-column> -->
                <!-- <el-table-column
                    label="是否匹配站点">
                    <template slot-scope="scope">
                        <span>{{formataMatch(scope.row.needMatchPoint)}}</span>
                    </template>
                </el-table-column> -->
                <el-table-column
                    label="备注">
                    <template slot-scope="scope">
                        <span>{{scope.row.remark}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                fixed="right"
                label="操作"
                width="100">
                <template slot-scope="scope">
                    <el-button @click="deleteConfig(scope.row.id)" type="text" size="small">删除</el-button>
                    <el-button @click="updateConfig(scope.row.id)" type="text" size="small">修改</el-button>
                </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除该试点吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDeleteConfig">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="新增试点"
            :visible.sync="addDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="form" :model= "form" label-width="80px" class="col-md-10" :rules="ruleForm">
                <el-form-item label="手机号码" prop="phone">
                    <el-input v-model="form.phone" placeholder="请输入落单的手机号"></el-input>
                </el-form-item>
                <el-form-item label="派送员" prop="userId" v-show="form.matchPoint == false">
                    <el-select v-model="form.userId" multiple placeholder="请选择">
                        <el-option
                        v-for="item in userList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>

                </el-form-item>
                <el-form-item label="备注" prop="remark" >
                    <el-input type="textarea" v-model.trim= "form.remark" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addConfig()">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 修改 -->
        <el-dialog
            title="修改试点"
            :visible.sync="updateDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="form" :model= "form" label-width="80px" class="col-md-10" >
                <el-form-item label="手机号" prop="phone">
                    <el-input v-model="update.Phone" placeholder="请输入落单的手机号" :disabled="true"></el-input>
                </el-form-item>
                <el-form-item label="派送员" prop="userId" v-show="form.matchPoint == false">
                    <el-select v-model="update.Userid" multiple placeholder="请选择">
                        <el-option
                        v-for="item in userList"
                        :key="item.id"
                        :label="item.name"
                        :value="item.id">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="备注" prop="remark" >
                    <el-input type="textarea" v-model.trim= "update.Remark" placeholder="请输入内容"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmupdateconfig()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog } from 'element-ui';
import deliverySrv from "@/../src/views/services/delivery.service.js";
import pointSrv from "@/../src/views/services/point.service.js";
import configSrv from "@/../src/views/services/config.service.js";

export default {
    name: "PilotConfig",
    data() {
        return {
            deleteDialog: false,
            userList: [],
            pointList: [],
            deleteConfigId: '',
            tableData: [],
            addDialog: false,
            form: {
                matchPoint: false
            },
            ruleForm: {
                phone: [
                    { required: true, message: '请输入正确手机号码', trigger: 'change' },
                    { min: 11, max: 11, message: '长度必须是11位', trigger: 'change' }
                ]
            },
            confirmFlag: false,
            updateDialog: false,
            uid:'',
            update:{
                Phone: '',
                Userid: [],
                Remark: ''
            }
        }
    },
    components: {
        'el-dialog': Dialog
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {   
           deliverySrv.getDeliveryes().then(resp => {
                // console.log(resp.data)
                let data = resp.data;
                if(data.users) {
                    vm.userList = data.users;
                }
                vm.flag = !vm.flag;
            })  
            pointSrv.getAllpoints().then(resp => {
                let data = resp.data.points;
                if (data) {
                    vm.pointList = data;
                }
            }, err => {
                vm.$message.error(err.error.message);
            })    

            vm.initConfigs();
        })
    },
    methods: {
        initConfigs() {
            configSrv.searchConfigs().then(resp => {
                let data = resp.data.crawlerConfigs;
                this.tableData = data;
            })
        },
        formataUser(userId) {
            let username = ""
            this.userList.map(x => {
                if (x.id === userId) {
                    username = x.name;
                }
            })
            return username;
        },
        formataPoint(pointId) {
            let pointname = ""
            if (!pointId) {
                return;
            }
            this.pointList.map(x => {
                if (x.id === pointId) {
                    pointname = x.name;
                }
            })
            return pointname;            
        },
        addPoint() {
            this.addDialog = true;
        },
        addConfig() {
            let form = this.form;
            let userId = null;
            let remark =null;
            // console.log(form.userId)
            userId = form.userId.join(',')
            this.$refs["form"].validate((valid) => {
                if (valid) {
                    configSrv.addConfig(form.phone, userId, form.remark).then(resp => {
                        // console.log(resp)
                        this.addDialog = false;
                        this.initConfigs();
                        this.form.phone = '';
                        this.form.userId = [];
                        this.$message.success('试点配置成功');
                    }, err => {
                        this.$message.error(err.error.message);
                    })
                } else {
                    return false;
                }
            })
        },
        deleteConfig(Id) {
            this.deleteConfigId = Id;
            this.deleteDialog = true;
        },
        confirmDeleteConfig() {
            configSrv.deleteConfig(this.deleteConfigId).then(resp => {
                this.initConfigs();
                this.deleteDialog = false;
                this.$message.success("试点配置已删除");
            }, err => {
                this.$message.error(err.msg);
            });
        },
        formataMatch(boo) {
            return boo == false ? "否":"是"
        },
        // 点击修改
        updateConfig(id) {
            this.updateDialog = true
            this.uid = id;
            deliverySrv.updateConfig(id).then(resp => {
                let data = resp.data
                this.update=resp.data
                let [showIds, tempIds] = [[],[]]
                if(data.Userid) {
                    let tempIds = resp.data.Userid.split(',')
                    tempIds.forEach(x =>{
                        showIds.push(Number(x))
                    })
                }
                this.update.Userid = showIds
            })
        },
        // 确定修改
        confirmupdateconfig () {
            let id  = this.uid
            let userId = this.update.Userid.join(',')
            deliverySrv.confirmupdateconfig(id,userId,this.update.Remark).then(resp => {
                console.log(resp)
                this.$message.success("修改成功");
                this.updateDialog = false;
                this.initConfigs()
                }, err => {
                    this.$message.error(err.error.message);
                })
        }
    }
}
</script>

<style lang="scss" scoped>
</style>
