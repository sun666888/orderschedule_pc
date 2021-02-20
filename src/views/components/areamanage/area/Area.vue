<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">站点列表</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-5 search-field search-field_controls">
                    <button class="btn search-btn btn-info" @click="addPoint">新增站点</button>
                    <!-- <button class="btn search-btn btn-success" @click="exportPoints">导出站点</button> -->
                </div>
            </div>
            <div class="row ">
                <div class="col-lg-12">
                    <table class="table table-bordered table-striped table-sm" v-if="pointList && pointList.length > 0">
                        <thead>
                            <tr>
                                <th>站点ID</th>
                                <th>站点名称</th>
                                <th>站点区域</th>
                                <th>详细地址</th>
                                <th>经度</th>
                                <th>纬度</th>
                                <th>范围(km)</th>
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in pointList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.district}}</td>
                                <td>{{item.address}}</td>
                                <td>{{item.lng}}</td>
                                <td>{{item.lat}}</td>
                                <td>{{item.radius}}</td>
                                <td>
                                    <a @click="updatePoint(item.id)">修改</a>
                                    <a @click="deletePoint(item.id)">删除</a>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <el-dialog title="删除" :modal-append-to-body="false" :visible.sync="deleteDialog" width="30%" center>
            <div class="text-center">
                <span>删除后无法找回，确定要删除此站点吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="confirmdeletePoint">确 定</el-button>
            </span>
        </el-dialog>

        <!-- 新增站点 / 修改站点 -->
        <el-dialog
            :title="DialogConfig[curDialog].title"
            :visible.sync="pointDialog"
            :modal-append-to-body="false"
            @closed="closeForm"
            width="40%"
            center>
            <el-form ref="form" :model= "form" label-width="80px" class="col-md-10" :rules="rules">
                <el-form-item label="站点名称" prop="name">
                    <el-input v-model.trim= "form.name" class="yi_width" @input="checkPoint" debounce="300" ></el-input>
                    <span class="error-show" v-show="errorShow"><i class="fa" :class="[ errIcon ? 'fa-close' : 'fa-check']"></i></span>
                </el-form-item>
                <el-form-item label="站点区域" prop="district">
                    <el-select v-model= "form.district" placeholder="请选择活动区域">
                        <el-option label="浦东新区" value="浦东新区"></el-option>
                        <el-option label="宝山区" value="宝山区"></el-option>
                        <el-option label="杨浦区" value="杨浦区"></el-option>
                        <el-option label="黄浦区" value="黄浦区"></el-option>
                        <el-option label="静安区" value="静安区"></el-option>
                        <el-option label="虹口区" value="虹口区"></el-option>
                        <el-option label="徐汇区" value="徐汇区"></el-option>
                        <el-option label="长宁区" value="长宁区"></el-option>
                        <el-option label="普陀区" value="普陀区"></el-option>
                        <el-option label="嘉定区" value="嘉定区"></el-option>
                        <el-option label="崇明区" value="崇明区"></el-option>
                        <el-option label="闵行区" value="闵行区"></el-option>
                        <el-option label="奉贤区" value="奉贤区"></el-option>   
                        <el-option label="松江区" value="松江区"></el-option>  
                        <el-option label="青浦区" value="青浦区"></el-option> 
                        <el-option label="金山区" value="金山区"></el-option> 
                    </el-select>
                </el-form-item>
                <el-form-item label="站点地址" prop="address" >
                    <el-input v-model.trim= "form.address" @blur="getLngLat" placeholder="如果是以行政区划分站点，那么以下的信息不要填写" ></el-input>
                </el-form-item>
                <el-form-item label="经度" prop="lng">
                    <el-input v-model.number= "form.lng" ></el-input>
                </el-form-item>
                <el-form-item label="纬度" prop="lat">
                    <el-input v-model.number= "form.lat"></el-input>
                </el-form-item>
                <el-form-item label="范围(km)" prop="radius">
                    <el-input v-model.number= "form.radius" autocomplete="off"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="bothConfirm('form')" :disabled="isrepeat">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Dialog } from 'element-ui';
import pointSrv from "@/../src/views/services/point.service.js";
import { observe, generate} from "fast-json-patch"

/* eslint-disable */
export default {
    name: "Area",               // 组件名
    data() {
        return {            
            DialogConfig: {
                addDialog: {
                    title: "新增站点"
                },
                updateDialog: {
                    title: "修改站点"
                }
            },
            curDialog: "addDialog",
            passwordDialog: false,
            lockDialog: false,
            unLockDialog: false,
            deleteDialog: false,
            pointList: [],
            area: "",
            pointId: '',
            lockUserId: '',
            unlockUserId: '',
            pointDialog: false,
            form: {
                name: "",
                district: "",
                address: "",
                lng: "",
                lat: "",
                radius: ""
            },
            resetForm: {
                name: "",
                district: "",
                address: "",
                lng: "",
                lat: "",
                radius: ""                
            },
            rules: {
                name: [
                    { required: true, message: "请输入站点名称", trigger: 'blur'}
                ],
                district: [
                    { required: true, message: "请输入行政区", trigger: 'blur'}
                ]
            },
            pointPatch: {},
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
            vm.initPoint();
        })
    },
    methods: {
        initPoint() {
            pointSrv.getAllpoints().then(resp => {
                this.pointList = resp.data.points;
            });
        },
        checkPoint() {
            let pointname = this.form.name;
            this.errorShow = true;
            this.errIcon = false;
            pointSrv.validatePoint(pointname).then(resp => {
                this.errIcon = false;
                this.isrepeat = false;
            }, err => {
                if (err.code == 400) {
                    this.errIcon = true;
                    this.isrepeat = true;   
                }
            })
        },
        addPoint() {
            this.pointDialog = true;
            this.curDialog = "addDialog";
        },
        updatePoint(id) {
            this.curDialog = "updateDialog";
            this.pointDialog = true;
            this.pointId = id;
            pointSrv.getPoint(id).then(resp => {
                let point = resp.data.point;
                this.form = point;
                this.pointPatch = observe(this.form);
            });
        },
        bothConfirm(form) {
            let self = this;
            if (self.curDialog == 'addDialog') {
                self.$refs[form].validate( (valid) => {
                    if (valid) {
                        pointSrv.addPoint(self[form].name, self[form].district, self[form].lat, self[form].lng, self[form].address, self[form].radius ).then(resp => {
                            self.$message.success("新增成功");
                            self.pointDialog = false;
                            self.initPoint();
                            self.$refs[form].resetFields();
                        });
                    } else {
                        return false;
                    }
                })
            } else {
                self.$refs[form].validate( (valid) => {
                    if (valid) {
                        pointSrv.updatePoint(self.pointId, generate(self.pointPatch)).then(resp => {
                            self.$message.success("更新成功");
                            self.pointDialog = false;
                            self.initPoint();
                            self.$refs[form].resetFields();
                        }, err => {
                            self.$message.error(err.error.message);
                        })
                    } else {
                        return false;
                    }
                })
            }
        },
        deletePoint(Id) {
            this.pointId = Id;
            this.deleteDialog = true;
        },
        confirmdeletePoint() {
            pointSrv.deletePoint(this.pointId).then(resp => {
                this.deleteDialog = false;
                this.$message.success("站点已删除");
                this.initPoint();
            }, err => {
                this.$message.error(err.msg);
            });
        },
        closeForm() {
            // resetForm
            this.form = Object.assign({}, this.resetForm);            
        },
        getLngLat() {
            let address = this.form.address;
            let self = this;
            // 高德sdk
            let geocoder = new AMap.Geocoder({
                radius: 1000,
                extensions: "all"
            });
            let newLng = "";
            let newLat = "";
            geocoder.getLocation(address, function(status, result) {
                if (status === 'complete' && result.info === 'OK') {
                    if (result && result.geocodes) {
                        // result.geocodes 是一个数组,取用第一个值
                        newLng = result.geocodes[0].location.lng;
                        newLat = result.geocodes[0].location.lat;
                        self.form.lng = newLng;
                        self.form.lat = newLat;
                    }
                } else if (status === "error") {
                    self.form.lng = '';
                    self.form.lat = '';
                }
            })

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
    .yi_width{
        width: 80%;
    }
}

</style>
