<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">业务列表</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-1 search-field search-field_controls">
                    <button class="btn search-btn btn-info" @click="handleBusinessDialog">新增</button>
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm" v-if="businessList && businessList.length > 0">
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>业务名称</th>
                                <th>业务类型</th>
                                <th>业务描述</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in businessList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.type}}</td>
                                <td>{{item.description}}</td>
                            </tr>
                        </tbody>
                    </table>
                    
                    <div class="notbusinessInfo" v-else>暂时还没有业务啦</div>
                </div>
            </div>
        </div>
        <!-- 新增业务 -->
        <el-dialog
            :title="DialogConfig[curDialog].title"
            :visible.sync="businessDialog"
            :modal-append-to-body="false"
            width="40%"
            center>
            <el-form ref="form" :model="form" :rules="rule" label-width="80px" class="col-md-12">
                <el-form-item label="业务名称" prop="name">
                    <el-input v-model.trim="form.name" class="yi_width" @input= "checkName" debounce="300"></el-input> 
                    <span class="error-show" v-show="errorShow"><i class="fa" :class="[ errIcon ? 'fa-close' : 'fa-check' ]"></i></span>
                </el-form-item>
                <el-form-item label="业务类型">
                    <el-select v-model="form.type" >
                        <el-option lable="调度业务" value="调度业务"></el-option>
                        <el-option label="营销业务" value="营销业务" ></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="业务描述">
                    <el-input type="textarea" v-model="form.description"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="handleBoth('form')" :disabled="isrepeat" >确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Dialog } from 'element-ui';
import businessSrv from "@/../src/views/services/business.service.js";
import  {observe, generate} from "fast-json-patch";
import { valid } from 'semver';

/* eslint-disable */
export default {
    name: "business",               // 组件名
    data() {
        return {
            DialogConfig: {
                addDialog: {
                    title: "新增业务"
                }
            },
            curDialog: "addDialog",
            businessDialog: false,
            form: {
                name: "",
                type: "",
                description: "",
            },
            rule: {
                name: [{required: true, message: "请输入业务名称"}],
                type: [{required: true, message: "请选择业务类型"}]
            },
            businessList: [],
            type: "",
            businessId: "",
            deleteDialog: false,
            businessname: "",
            businessPatch: {},
            errorShow: false,
            errIcon: true,
            isrepeat: false
        }
    },
    components: {
        'el-dialog': Dialog
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            vm.initBusiness();
        })
    },
    methods: {
        checkName() {
            let businessname = this.form.name;
            this.errorShow = true;
            this.errIcon = false;
            businessSrv.validateBusiness(businessname).then(resp => {
                this.errIcon = false;
                this.isrepeat = false;
            }, err => {
                if (err.code == 400) {
                    this.errIcon = true;
                    this.isrepeat = true;
                }   
            });
        },
        initBusiness() {
            let self = this;
            businessSrv.getAllBusiness().then(resp => {
                let data = resp.data.businesses;
                self.businessList = data;
            }, err => {
                self.$message.error(error.msg);
            });
        },
        handleBusinessDialog() {
            this.curDialog = "addDialog";
            this.businessDialog = true;
        },
        updateBusiness(item) {
            this.curDialog = "updateDialog";
            this.businessId = item.id;
            this.businessDialog = true;
            this.form = item;
            this.businessPatch = observe(this.form);
        },
        handleBoth(formName) {
            let self = this;
            let name = self[formName].name;
            let description = self[formName].description;
            if (self.curDialog == 'addDialog') {
                self.$refs[formName].validate( (valid) => {
                    if (valid) {
                        businessSrv.addBusiness(name, description).then(resp => {
                            self.$message.success('新增成功');
                            self.businessDialog = false;
                            self.form[name] = "";
                            self.form[description] = "";
                            self.initBusiness();
                        });
                    } else {
                        return false;
                    }
                })
            } else {
                businessSrv.updateBusiness(self.businessId, generate(self.businessPatch)).then(resp => {
                    self.$message.success("更新成功");
                    self.businessDialog = false;
                    self.initBusiness();
                }, err => {
                    self.$message.error(err.error.message);
                })
            }

        }
    }
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

.notbusinessInfo {
    color: red;
}
.error-show {
    margin-left: 12px;
    font-size: 16px;
}
.yi_width {
    width: 80%;
}
.fa-check {
    color: #63c2de;
}

</style>