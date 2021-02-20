<template>
    <div class="delivery-page animated fadeIn content_page">
        <div class="content-title">
            <div class="title">派送员信息</div>
            <router-link class="btn btn-info back" :to="'/deliverymanage/deliveryList'">
                返回
            </router-link>
        </div>
        <div class="content-show">
            <div class="row list-search">
                <el-form ref="form" :model="form" label-width="80px" :inline="true">
                    <el-form-item label="姓名" size="medium">
                        <el-input v-model="form.name" disabled class="yi_input"></el-input>
                    </el-form-item>
                    <el-form-item label="地址" size="medium">
                        <el-input v-model="form.address" class="yi_input" @input="changeAddress"></el-input>
                    </el-form-item>
                    <el-form-item label="经度lng" size="medium">
                        <el-input v-model="form.lng" disabled class="yi_input"></el-input>
                    </el-form-item>
                    <el-form-item label="纬度lat" size="medium">
                        <el-input v-model="form.lat" disabled class="yi_input"></el-input>
                    </el-form-item>
                    <el-form-item label="站点" size="medium">
                        <el-select v-model="form.pointId" placeholder="请选择站点" class="yi_input" >
                            <el-option v-for="item in pointOptions"
                                       :key="item.id"
                                       :label="item.name"
                                       :value="item.id">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="业务" size="medium">
                        <el-select v-model="userBusinesses" placeholder="请分配业务" class="yi_input" multiple>
                            <el-option v-for="option in businessOptions"
                                    :key="option.id"
                                    :value="option.id"
                                    :label="option.name">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="职位" size="medium">
                        <el-select v-model="form.position" placeholder="请选择职位" class="yi_input" >
                            <el-option v-for="item in jobs"
                                       :key="item"
                                       :label="item"
                                       :value="item">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="单量上限" size="medium">
                        <el-input type="number" v-model.number="form.limited" class="yi_input" min='0'></el-input>
                    </el-form-item>
                    <el-form-item size="medium" class="yi_button">
                        <el-button type="primary" @click="confirmUpdate">确认</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>
    </div>
</template>

<script>
    import deliverySrv from "@/../src/views/services/delivery.service.js";
    import pointSrv from "@/../src/views/services/point.service.js";
    import businessSrv from "@/../src/views/services/business.service.js";
    import { observe, generate} from "fast-json-patch";

    export default{
        data() {
            return {
                deliveryId: '',
                delivery: '',
                address: "",
                point: '',
                form: {
                    name: "",
                    address: "",
                    point: "",
                    userBusinesses: []
                },
                userBusinesses: [],
                pointOptions: [],
                businessOptions: [],
                jsonPatch: null,
                jobs: ['专职', '兼职', '新工', '帮扶']
            }
        },
        beforeRouteEnter(to, from, next) {
            next(vm => {
                vm.deliveryId = vm.$route.query.Id;
                deliverySrv.getDelivery(vm.deliveryId).then(resp => {
                    vm.form = resp.data.user;
                    vm.form.userBusinesses = resp.data.user.userBusinesses.map(x => {
                        return {
                            businessId: x.businessId
                        }
                    });
                    vm.userBusinesses = resp.data.user.userBusinesses.map(x => {
                        if(x) {
                            return x.businessId
                        }
                    });

                    // 站点信息删除之后，派送员对应的站点也会清空
                    if (vm.form.pointId && vm.form.point) {
                        vm.form.pointId = resp.data.user.pointId;
                    } else {
                        vm.form.pointId = "";
                    };

                    vm.jsonPatch = observe(vm.form)
                }, err => {
                    vm.$message.error(err.error.message);
                });
                pointSrv.getAllpoints().then(resp => {
                    vm.pointOptions = resp.data.points;
                }, err => {
                    vm.$message.error(err.error.message);
                });
                businessSrv.getAllBusiness().then(resp => {
                    vm.businessOptions = resp.data.businesses;
                }, err => {
                    vm.$message.error(err.error.message);
                })
            })
        },
        methods: {
            confirmUpdate() {
                let tempJsonPatch =  this.jsonPatch;

                var mixed = this.form.userBusinesses.filter(x => this.userBusinesses.some(y => y == x.businessId));
                var diff = this.userBusinesses.filter(x => !this.form.userBusinesses.some(y => y.businessId == x)).map(x => {
                    return {
                        businessId: x
                    }
                });
                this.form.userBusinesses = [];
                mixed.map(x => {
                    this.form.userBusinesses.push(x)
                });
                diff.map(x => {
                    this.form.userBusinesses.push(x)
                })
                let jsonPatchDocument = generate(tempJsonPatch);

                deliverySrv.updateDelivery(this.deliveryId, jsonPatchDocument).then(resp => {
                    this.$message.success("更新成功~");
                    this.$router.push({path: "/deliverymanage/deliveryList"});
                }, err => {
                    this.$message.error(err.error.message);
                })
            },
            changeAddress() {
                let self = this;
                let address = this.form.address;
                // 高德sdk
                let geocoder = new AMap.Geocoder({
                    city: "上海",
                    citycode: "021",
                    radius: 1000,
                    extensions: "all"
                });
                let lng = "";
                let lat = "";
                geocoder.getLocation(address, function(status, result) {
                    if (status === 'complete' && result.info === 'OK') {
                        if (result && result.geocodes) {
                            lng = result.geocodes[0].location.lng;
                            lat = result.geocodes[0].location.lat;
                            self.form.lng = lng;
                            self.form.lat = lat;
                        }
                    } else {
                        self.$message.error("地址没找到");
                    }
                })
            }

        }
    }
</script>

<style scoped>
    .yi_input {
        width: 300px;
    }
    .yi_button {
        display: block;
        margin-left: 80px;
    }
</style>
