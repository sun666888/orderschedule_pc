<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">多边形站点列表</div>
        </div>
        <div class="content-show" key="1">
            <div class="row list-search">
                <div class="col-md-5 search-field search-field_controls">
                    <button class="btn search-btn btn-info" @click="addPoint">新增站点</button>
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
                                <!-- <th>详细地址</th> -->
                                <th>操作</th>
                            </tr>
                        </thead>
                        <tbody v-for="(item, index) in pointList" :key="index">
                            <tr>
                                <td>{{item.id}}</td>
                                <td>{{item.name}}</td>
                                <td>{{item.district}}</td>
                                <!-- <td>{{item.address}}</td> -->
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
            deleteDialog: false,
            pointList: [],
            area: "",
            pointId: '',
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
        addPoint() {
            this.$router.push({
                path: '/areamanage/polygonMap',
            });
        },
        // 修改
        updatePoint(id) {
            this.$router.push({
                path: '/areamanage/polygonMap',
                query: {
                    id: id
                }
            });
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
