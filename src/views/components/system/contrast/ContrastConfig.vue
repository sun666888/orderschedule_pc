<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">关联工号</div>
        </div>
        <div class="content-show" key="1">
            <div class="col-md-5 search-field search-field_controls">
                <button class="btn search-btn btn-info" @click="add">创建关联</button>
            </div>
            <el-table
                :data="tableData"
                stripe
                border
                style="width: 100%">
                <el-table-column
                    label="派送员"
                    width="180">
                    <template slot-scope="scope">
                        <span>{{formataUser(scope.row.userId)}}</span>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="delivery"
                    label="关联2.0系统工号"
                    width="180">
                </el-table-column>
                <el-table-column
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="editContrast(scope.row.id)" type="text" size="small">编辑</el-button>
                        <el-button @click="deleteContrast(scope.row.id)" type="text" size="small">删除</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="20%" center>
            <div class="text-center">
                <span>确定要删除该关联吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmDeleteConfig">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="新增关联"
            :visible.sync="addDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="form" :model= "form" label-width="80px" class="col-md-10">
                <el-form-item label="派送员">
                    <el-select v-model= "form.userId" placeholder="选择派送员" clearable>
                        <el-option
                            v-for="item in lastDeliveryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工号" prop="userId" >
                    <el-input type="text" placeholder="请输入2.0系统对应工号(电话号码)" v-model.trim= "form.delivery" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="addConfig()">确 定</el-button>
            </span>
        </el-dialog>

        <el-dialog
            title="修改关联"
            :visible.sync="editDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="editform" :model= "editform" label-width="80px" class="col-md-10">
                <el-form-item label="派送员">
                    <el-select v-model= "editform.userId" placeholder="选择派送员" clearable>
                        <el-option
                            v-for="item in lastDeliveryList"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id"
                            :disabled="item.disabled"
                        ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="工号">
                    <el-input type="text" placeholder="请输入2.0系统对应工号" v-model.trim= "editform.delivery" size="medium"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmEdit()">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Pagination, Dialog } from 'element-ui';
import deliverySrv from "@/../src/views/services/delivery.service.js";
import pointSrv from "@/../src/views/services/point.service.js";
import configSrv from "@/../src/views/services/config.service.js";
import  {observe, generate} from "fast-json-patch";

export default {
    name: "ContrastConfig",
    data() {
        return {
            deleteDialog: false,
            pointList: [],
            deliveryList: [],
            lastDeliveryList: [],
            deleteContrastId: '',
            tableData: [],
            addDialog: false,
            editDialog: false,
            form: { },
            editform: { },
            editId: "",
            flag: false,
            formPatch: {}
        }
    },
    components: {
        'el-dialog': Dialog
    },
    watch: {
        flag: function() {
            this.initContrasts();
        }
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            deliverySrv.getDeliveryes().then(resp => {
                console.log(resp.data)
                let data = resp.data;
                if(data.users) {
                    vm.deliveryList = data.users;
                }
                vm.flag = !vm.flag;
            })
        })
    },
    methods: {
        initContrasts() {
            configSrv.searchContrasts().then(resp => {
                let data = resp.data.expressContrasts;
                this.tableData = data;
                let deliveryList = this.deliveryList;
                let tempList = [];
                if (deliveryList.length > 0 ) {
                    deliveryList.map(x => {
                        let findOne = data.find(y => y.userId == x.id);
                        if (findOne) {
                            x["disabled"] = true;
                        } else {
                            x["disabled"] = false;
                        }
                        tempList.push(x);
                    })
                    console.log(tempList);
                    this.lastDeliveryList = tempList;
                }
            })
        },
        formataUser(userId) {
            let username = ""
            this.deliveryList.map(x => {
                if (x.id === userId) {
                    username = x.name;
                }
            })
            return username;
        },
        add() {
            this.addDialog = true;
        },
        addConfig() {
            let form = this.form;
            if (form.userId && form.delivery) {
                configSrv.addContrast(form.userId, form.delivery).then(resp => {
                    this.$message.success("派送员关联成功");
                    this.addDialog = false;
                    this.form.userId = '';
                    this.form.delivery = '';
                    this.initContrasts();
                }, err => {
                    this.$message.error(err.error.message);
                })
            }
        },
        deleteContrast(Id) {
            this.deleteContrastId = Id;
            this.deleteDialog = true;
        },
        confirmDeleteConfig() {
            configSrv.deleteContrast(this.deleteContrastId).then(resp => {
                this.initContrasts();
                this.deleteDialog = false;
                this.$message.success("派送员关联已删除");
            }, err => {
                this.$message.error(err.msg);
            });
        },
        editContrast(id) {
            this.editId = id;
            configSrv.getContrast(id).then(resp => {
                let data = resp.data.expressContrast;
                this.editform =  data;
                this.editDialog = true;
                this.formPatch = observe(this.editform);
            }, err => {
                this.$message.error(err.error.message);
            })
        },
        confirmEdit() {
            let id = this.editId;
            let formPatch =  generate(this.formPatch);
            if (this.editform.userId && this.editform.delivery) {
                configSrv.editContrast(id, formPatch).then(resp => {
                    this.initContrasts();
                    this.$message.success("修改成功");
                    this.editDialog = false;
                }, err => {
                    this.$message.error(err.error.message);
                })
            }
        }
    }

}
</script>

<style lang="scss" scoped>
</style>
