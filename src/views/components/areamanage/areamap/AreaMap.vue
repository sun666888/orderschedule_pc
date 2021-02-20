<template>
    <div class="content_page animated fadeIn">
        <div class="content-title" key="0">
            <div class="title">站点地图</div>
        </div>
        <div class="content-show" key="1">
            <div class="map">
                <el-amap vid="areaMap" :zoom= "zoom" :center= "mapCenter" class="area-map" :plugin= "plugin">

                    <!-- 覆盖物 -->
                    <el-amap-marker v-for= "marker in markers"
                                    :position= "marker.position"
                                    :vid= "marker.id"
                                    :key= "marker.id">
                        <div :style="slotStyle">
                        <span :style="slotStyle2">{{marker.content}}</span>
                    </div>
                    </el-amap-marker>

                    <!-- 圆圈 -->
                    <el-amap-circle v-for= "circle in circles"
                                    :center= "circle.center"
                                    :radius= "circle.radius"
                                    :fill-opacity= "circle.fillOpacity"
                                    :events = "circle.events"
                                    :title = "circle.title"
                                    :key= "circle.id">
                    </el-amap-circle>

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
    </div> 
</template> 

<script>
import {lazyAMapApiLoaderInstance } from 'vue-amap'
import pointSrv from '@/../src/views/services/point.service.js'
import deliverySrv from '@/../src/views/services/delivery.service.js'

export default{
  name: 'AreaMap',               // 组件名
  data() {
    return {
            // 缩放比
      zoom: 10,
            // 地图中心点
      mapCenter: [121.5273285, 31.21515044],
            // 比例尺
      plugin: [{
        pName: 'Scale',
        events: {
          init(instance) {
          }
        }
      }],
            // 覆盖物
      markers: [
        {
          id: 101,
          position: [121.59996, 31.197646],
          content: '易超'
        }
      ],

      slotStyle: {
        position: 'relative',
        height: '32px',
        width: '23px',
        background: "url('../../orderschedule/orderschedule_php/static/img/point.png') no-repeat",
        'background-size': 'auto 100%'
      },
      slotStyle2: {
        position: 'absolute',
        left: '23px',
        top: 0,
        padding: '1px',
        'white-space': 'nowrap',
        'font-size': '12px',
        cursor: 'inherit',
        'background-color': 'rgba(255, 255, 255)',
        border: '1px solid rgb(255, 0, 0)',
        font: '12px arial, sans-serif',
        'z-index': 99
      },

            // 站点圆
      circles: [],

            // 行政区多边形
      polygons: []

    }
  },

  beforeRouteEnter (to, from, next) {
    next((vm) => {
      pointSrv.getAllpoints().then(resp => {
        let points = resp.data.points
        let circle = {}
        let polygonArr = []
        points.map(item => {
          if (item.lat !== null && item.lng !== null && item.address !== null && item.radius !== null) {
            circle = {
              index: item.id,
              center: [item.lng, item.lat],
              radius: item.radius * 1000,
              fillOpacity: 0.1,
              title: item.name,
              events: null
            }
            let name = item.name
            circle.events = {
              mouseover: () => {
                let extra = vm.circles.find(x => x.title === name)
                if (extra) {
                  extra.fillOpacity = 0.4
                  extra.zIndex = 999
                }
              },
              mouseout: () => {
                vm.circles = vm.circles.map(x => {
                  x.fillOpacity = 0.1
                  x.zIndex = 10
                  return x
                })
              }
            }
            vm.circles.push(circle)
          } else {
            polygonArr.push(item.district)
          }
        })
        lazyAMapApiLoaderInstance.load().then(() => {
          vm.drawDistrict(polygonArr)
        })
      })

      deliverySrv.getDeliveryes(1, 100).then(resp => {
        let deliveryArr = []
        let data = resp.data.users
        if (data) {
          data.map(x => {
            if (x.lng && x.lat) {
              deliveryArr.push({
                id: x.id,
                position: [x.lng, x.lat],
                content: x.name
              })
            }
          })
        }
        // console.log(deliveryArr)
        vm.markers = deliveryArr
      }, err => {
        this.$message.error(err.error.message)
      })
    })
  },
  methods: {
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
}
</script>

<style scoped>
.area-map {
    width: 100%;
    height: 400px;
}

@media screen and (min-width: 1800px) and (max-width: 2000px){
    .area-map {
        height: 700px;
    }
}

@media screen and (min-width: 1400px) and (max-width: 1800px){
    .area-map {
        height: 600px;
    }
}

@media screen and (min-width: 1200px) and (max-width: 1400px){
    .area-map {
        height: 500px;
    }
}

.amap-markers .amap-marker-content {
    color: red;
}

</style>
