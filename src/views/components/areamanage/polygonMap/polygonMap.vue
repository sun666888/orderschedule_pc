<template>
  <div class="content_page animated fadeIn">
    <div class="content-title" key="0">
      <div class="title">多边形站点地图</div>
    </div>
    <el-form ref="form" :model="form" label-width="80px" class="col-md-10" :rules="rules">
      <el-form-item label="站点名称" prop="name">
        <el-input v-model.trim="form.name" class="yi_width" @input="checkPoint" debounce="300"></el-input>
        <span class="error-show" v-show="errorShow">
          <i class="fa" :class="[ errIcon ? 'fa-close' : 'fa-check']"></i>
        </span>
      </el-form-item>
      <el-form-item label="站点区域" prop="district">
        <el-select v-model="form.district" placeholder="请选择活动区域" @change="handleChange">
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
      <!-- <el-form-item label="站点地址" prop="address">
        <el-input v-model.trim="form.address" placeholder="如果是以行政区划分站点，那么以下的信息不要填写"></el-input>
      </el-form-item>-->
    </el-form>
    <div class="design-map">
      <el-button @click="editorStart">开始编辑</el-button>
      <el-button @click="editorEnd">结束编辑</el-button>
      <el-amap vid="designMap" ref="map" :zoom="zoom" class="area-map" :plugin="plugin" :center="mapCenter">
          <!-- 多边形 -->
          <el-amap-polygon v-for="(polygon, index) in polygons"
                          :vid = "index"
                          :ref = "`polygon_${index}`"
                          :path = "polygon.path"
                          :strokeWeight = "polygon.strokeWeight"
                          :fillOpacity = "polygon.fillOpacity"
                          :fillColor = "polygon.fillColor"
                          :strokeColor = "polygon.strokeColor"
                          :events = "polygon.events"
                          :title = "polygon.title"
                          :key = "index"
          ></el-amap-polygon>
      </el-amap>
    </div>
  </div>
</template>

<script>
import pointSrv from "@/../src/views/services/point.service.js";
import { lazyAMapApiLoaderInstance } from "vue-amap";

/* eslint-disable */
export default {
  name: "Area", // 组件名
  data() {
    return {
      deleteDialog: false,
      pointList: [],
      area: "",
      pointId: "",
      zoom: 10,
      // circles: [],
      polygons: [],
      plugin: [
        {
          pName: "Scale",
          events: {
            init(instance) {}
          }
        }
      ],
      mapCenter: [121.5273285, 31.21515044],
      form: {
        name: "",
        district: ""
      },
      rules: {
        name: [{ required: true, message: "请输入站点名称", trigger: "blur" }],
        district: [{ required: true, message: "请输入行政区", trigger: "blur" }]
      },
      errorShow: false,
      errIcon: true,
      isrepeat: false,
      polygon: {},
      map: {},
      polyEditor: {}
    };
  },
  beforeRouteEnter(to, from, next) {
    next(vm => {
      let id = vm.$route.query.id;
      pointSrv.getPoint(id).then(resp => {
        console.log(resp)
        let point = resp.data.point;
        this.form = point;
        this.pointPatch = observe(this.form);
      })
      pointSrv.getAllpoints().then(resp => {
        let points = resp.data.points
        let circle = {}
        let polygonArr = []
        points.map(item => {
            polygonArr.push(item.district);
            // ['yangpuqu', 'baoshangqu']
          // }
        })
        lazyAMapApiLoaderInstance.load().then(() => {
          vm.drawDistrict(polygonArr);
          vm.initPolygon();
        })
      });
    })
  },
  // mounted() {
  //   lazyAMapApiLoaderInstance.load().then(() => {
  //     this.initPolygon();
  //   });
  // },
  methods: {
    // 开始编辑
    editorStart() {
      let district = this.form.district
      let name = this.form.name
      console.log(district)
      if (name == ''){
        this.$message.info('请填写站点名称');
        return;
      } else if(district == ''){
        this.$message.info('请选择区域');
        return;
      } else {
        console.log(district)
        let self = this
        let geocoder = new AMap.Geocoder({
          radius: 1000,
          extensions: "all"
        });
        let newLng = "";
        let newLat = "";
        geocoder.getLocation(district,function(status, result){
          if (status === 'complete' && result.info === 'OK') {
            if (result && result.geocodes) {
              newLng = result.geocodes[0].location.lng;
              newLat = result.geocodes[0].location.lat;
              console.log(newLng)
              console.log(newLat)
              self.mapCenter = [newLng, newLat]
            }
          }
        });
      }
      // this.initPolygon();
      this.polyEditor.open();
    },
    // 结束编辑
    editorEnd() {
      console.log(this.polygon.getPath())
      let originPath = this.polygon.getPath();
      let form = this.form
      console.log(originPath)
      this.polyEditor.close()
      pointSrv.endEditor(form, originPath).then(resp => {
        console.log(resp)
        this.$message.success('新增区域成功');
        this.$router.push('/areamanage/polygonMapList');
      },  err => {
          this.$message.error(error.message);
      });
    },
    initPolygon() {
      console.log("选区. lng lat 生成四个经纬度");
      var map = this.$refs.map.$$getInstance();
      this.map = map;
      var path = [
        [121.514496, 31.220904],
        [121.548775, 31.247504],
        [121.513252, 31.257924],
        [121.500227, 31.239692]

        // [121.756882, 31.068109],
        // [121.476522, 31.340936],
        // [121.264697, 31.358226],
        // [121.303846,30.877697]
      ];
      this.polygon = new AMap.Polygon({
        path: path,
        strokeColor: "#FF33FF",
        strokeWeight: 6,
        strokeOpacity: 0.2,
        fillOpacity: 0.4,
        fillColor: "#1791fc",
        zIndex: 50
      });
      this.map.add(this.polygon);
      this.map.setFitView([this.polygon]);
      this.polyEditor = new AMap.PolyEditor(this.map, this.polygon);

      this.polyEditor.on("addnode", function(event) {
        console.log("触发事件：addnode");
      });
    },
    handleChange() {
      this.zoom = 12;
    },
    checkPoint() {
      let pointname = this.form.name;
      this.errorShow = true;
      this.errIcon = false;
      pointSrv.validatePoint(pointname).then(
        resp => {
          this.errIcon = false;
          this.isrepeat = false;
        },
        err => {
          if (err.code == 400) {
            this.errIcon = true;
            this.isrepeat = true;
          }
        }
      );
    },
    drawDistrict(districtArr) {
      let tempDistricts = districtArr
      let polygons = []
      for (let t = 0, ts = tempDistricts.length; t < ts; t++) {
        polygons.push(this.backPath(tempDistricts[t]))
      }
      this.polygons = polygons
    },
    backPath(districtName) {
      let self = this
      let citylimit = new AMap.Autocomplete({
        citylimit: true,
        city: '上海',
        setCityLimit: true
      })
      let district = new AMap.DistrictSearch({
        extensions: 'all',
        level: 'district',
        city: '021',
        setCityLimit: true
      })
      let pathObj = {
        title: districtName,
        strokeWeight: 3,
        path: [],
        fillOpacity: 0.5,
        fillColor: 'transparent',
        strokeColor: '#ff0000',
        events: null
      }
      pathObj.events = {
        mouseover: () => {
          let extra = this.polygons.find(x => x.title === districtName)
          if (extra) {
            extra.fillOpacity = 0.6
            extra.fillColor = '#ffffff'
            extra.strokeColor = '#24A8D8'
            extra.zIndex = 999
          }
        },
        mouseout: () => {
          this.polygons = this.polygons.map(x => {
            x.fillOpacity = 0.5
            x.fillColor = 'transparent'
            x.strokeColor = '#ff0000'
            x.zIndex = 10
            return x
          })
        }
      }
      district.search(districtName, function(status, result) {
        let list = result.districtList
        if (list) {
          for (let i = 0, l = list.length; i < l; i++) {
            if (list[i].citycode == '021') {
              pathObj.path = list[i].boundaries
            }
          }
        }
      })
      console.log(pathObj)
      return pathObj
    }
  }
};
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
  .yi_width {
    width: 80%;
  }
}
.area-map {
  width: 100%;
  height: 600px;
}

@media screen and (min-width: 1800px) and (max-width: 2000px) {
  .area-map {
    height: 700px;
  }
}

@media screen and (min-width: 1400px) and (max-width: 1800px) {
  .area-map {
    height: 600px;
  }
}

@media screen and (min-width: 1200px) and (max-width: 1400px) {
  .area-map {
    height: 500px;
  }
}
</style>
