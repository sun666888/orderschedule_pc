<template>
    <div class="animated fadeIn content_page">
        <div class="content-title">
            <div class="title">订单录入</div>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <div class="search-field col-md-6">
                    <div class="label" style="left:0px;top: 4px;">业务名称：</div>
                    <el-select v-model="businessId" placeholder="请选择业务" filterable  @change="chooseBusiness" style="width: 360px">
                        <el-option
                            v-for="option in businessList"
                            :key="option.id"
                            :label="option.name"
                            :value="option.id"
                        ></el-option>
                    </el-select>
                </div>
                <div class="search-field col-md-12">
                    <div class="label" style="left:0px;top: 16px;">下载模板：</div>
                    <div class="download-file">
                        <a href="/orderschedule/index.php/Home/Orders/template" class="download" download>点击下载</a>
                    </div>
                </div>
                <div class="col-md-12 search-field yi_margintop">
                    <div class="label" style="left:0px;top: 4px;" >过滤条件：</div>
                    <el-checkbox-group v-model="filterOrder">
                        <el-checkbox label="黑名单" key= "block"></el-checkbox>
                        <el-checkbox label="已呼号码" key= "callednumber"></el-checkbox>
                    </el-checkbox-group>
                </div>
                <div class="col-md-12 search-field">
                    <div class="label" style="left:0px;top: 24px;">选择文件：</div>
                    <div class="upload-wrap">
                        <el-upload
                            class="upload-demo"
                            drag
                            action="https://jsonplaceholder.typicode.com/posts/"
                            ref="upload"
                            :before-upload = "beforeExcelUpload"
                            :on-remove="handleRemove"
                            :on-change = "handleFileChange"
                            :limit = 1
                            :on-exceed="handleLimit"
                            :file-list="fileList"
                            :auto-upload="false">
                            <i class="el-icon-upload"></i>
                            <div class="el-upload__text">将excel文件拖到此处，或<em>点击上传</em></div>
                            <div class="el-upload__tip" slot="tip">只能上传excel文件</div>
                        </el-upload>
                    </div>
                </div>
                <div class="col-md-12 search-field">
                    <el-button type="primary" class="col-md-2" @click="confirmCreate">确认</el-button>
                </div>
            </div>
        </div>
        <el-dialog title="提示" :modal-append-to-body="false" :visible.sync="centerDialogVisible" width="20%" center>
            <div class="text-center">
                <span>确定要取消吗?</span>
            </div>
            <span slot="footer" class="dialog-footer">
                <el-button type="primary" @click="centerDialogVisible = false">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
import { Button, Input, Loading} from 'element-ui'
import orderSrv from '@/../src/views/services/order.service.js'
import businessSrv from '@/../src/views/services/business.service.js'

/* eslint-disable */
export default {
    data() {
        return { 
            centerDialogVisible: false,
            fileList: [],
            formfile: {},
            businessId: "",
            businessList: [],
            filterOrder: [],
            tempHref: ''
        };
    },
    beforeRouteEnter (to, from, next) {
        next(vm => {
            businessSrv.getAllBusiness().then(resp => {
                let data = resp.data.businesses;
                vm.businessList = data;
            }, err => {
                vm.$message.error(err.message);
            })
        })
    },
    methods: {
        chooseBusiness(businessId) {
            this.businessId = businessId;
        },
        beforeExcelUpload(file){
            const testmsg=file.name.substring(file.name.lastIndexOf('.')+1);
            const extention = testmsg === 'xlsx' || testmsg === "xls";
            if (!extention) {
                this.$confirm('上传文件只能是excel格式,请移除并重新选择', '提示', {
                        confirmButtonText: '确定',
                        callback: action => {
                            this.$message({
                            type: 'warning',
                            message: `action: ${ action }`
                        });
                    }
                });
            }
            return extention;
        },
        handleFileChange(file) {
            this.formfile = "";
            let fileType = this.beforeExcelUpload(file);                  // 判断上传格式和大小
            if (fileType) {                                                // 文件格式和大小都符合要求
                this.formfile = file;
            }
        },
        handleRemove(file, fileList) {
            this.formfile.raw = '';
            this.$message.success("已成功移除了" + file.name + "文件");
        },
        handleLimit(file, fileList) {                                                   // 超出文件个数的钩子
            this.$message.warning('只能上传单个excel文件！');
        },
        confirmCreate() {
            let loading = {};
            let formData = new FormData();
            let filterOrder = this.filterOrder;
            let blockFlag = false;
            let callednumberFlag  = false;
            filterOrder.map(item => {
                if (item == "黑名单") {
                    blockFlag = true;
                } else if (item == "已呼号码") {
                    callednumberFlag = true;
                }
            });
            let formObj = {
                businessId: this.businessId,
                block: blockFlag,
                distinct: callednumberFlag
            };
            for (let key in formObj) {
                formData.append(key, formObj[key]);
            };
            formData.append("file", this.formfile.raw);                              // 单文件formdata
            if ( !!this.formfile.raw && !!this.businessId ) {
                loading = this.$loading({
                    lock: true,
                    text: 'Loading',
                    spinner: 'el-icon-loading',
                    background: 'rgba(0, 0, 0, 0.5)'
                });
                orderSrv.uploadExcel(formData).then(resp => {
                    loading.close();
                    this.$message.success("订单录入成功!");
                    this.$router.push("/schedulingmanage/schedulingList");
                }, err => {
                    loading.close();
                    this.$message.error("上传失败，请重试!");
                })
            } else {
                this.$message.error("请选择业务并且上传订单EXCEL文件");
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.upload-wrap {
    margin-top: 20px;
    margin-bottom: 20px;
    padding-left: 0px;
}
.yi_margintop {
    margin-top: 12px;
}
.download-file {
    height: 32px;
    line-height: 54px;
}

</style>
