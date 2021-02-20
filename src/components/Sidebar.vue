<template>
    <div class="sidebar">
        <nav class="sidebar-nav">
            <ul class="nav">
                <!-- 业务管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/businessmanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-object-group fa-lg"></i>业务管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/businessmanage/business'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>业务列表</router-link>
                        </li>
                    </ul>
                </router-link>

                <!-- 订单录入 --> 
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/ordermanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-tasks fa-lg"></i>订单管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/ordermanage/orderEntry'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>订单录入</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/ordermanage/entryList'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>录入明细</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/ordermanage/successOrderEntry'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>成功单录入</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <router-link :to="'/ordermanage/supplementaryImport'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>补登明细表导入</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/ordermanage/uploadOrder'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>补登明细列表</router-link>
                        </li> -->
                    </ul>
                </router-link>

                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/callmanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-headphones fa-lg"></i>外呼管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/callmanage/callList'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>外呼列表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/callmanage/callStatistics'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>外呼统计</router-link>
                        </li>
                    </ul>
                </router-link>

                <!-- 调度管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/schedulingmanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-user fa-lg"></i>调度管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/schedulingmanage/schedulingList'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>调度列表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/schedulingmanage/schedulingMap'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>订单地图</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <router-link :to="'/schedulingmanage/schedulingExport'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>批量导出</router-link> 
                        </li> -->
                    </ul>
                </router-link>

                <!-- 站点管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/areamanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-map-marker fa-lg "></i>站点管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/areamanage/area'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>站点列表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/areamanage/areaMap'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>站点地图</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/areamanage/polygonMapList'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>多边形站点地图</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <router-link :to="'/areamanage/polygonMap'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>多边形站点地图</router-link>
                        </li> -->
                    </ul>
                </router-link>

                <!-- 派送员管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/deliverymanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-users fa-lg "></i>派送员管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/deliverymanage/deliveryList'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>派送员列表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/deliverymanage/schedule'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>排班</router-link>
                        </li>
                        <!-- <li class="nav-item">
                            <router-link :to="'/deliverymanage/delayOrder'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>超时单</router-link>
                        </li> -->
                    </ul>
                </router-link>

                <!-- 调度员管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/schedulermanage'}" disabled v-if="isScheduleManage">
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-user-plus fa-lg "></i>调度员管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/schedulermanage/schedulerList'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>调度员列表</router-link>
                        </li>
                    </ul>
                </router-link>

                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/reportform'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-wpforms fa-lg "></i>报表管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/reportform/orderform'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>订单报表</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/reportform/callform'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>外呼报表</router-link>
                        </li>
                        <li class="nav-item  nav-dropdown">
                            <div class="nav-link nav-dropdown-toggle nav-padding" @click="handleClick">
                                <i class="icon-star"></i>固化报表</div>
                            <ul class="nav-dropdown-items">
                                <li class="nav-item">
                                    <router-link :to="'/reportform/curingform/regionalSolidifyForm'" class="link-padding nav-link" exact>
                                    <i class="icon-star"></i>区域指标报表</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="'/reportform/curingform/personnelSolidifyForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>人员指标报表</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item  nav-dropdown">
                            <div class="nav-link nav-dropdown-toggle nav-padding" @click="handleClick">
                                <i class="icon-star"></i>实时报表</div>
                            <ul class="nav-dropdown-items">
                                <li class="nav-item">
                                    <router-link :to="'/reportform/realform/regionalForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>区域指标报表</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="'/reportform/realform/personnelForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>人员各项指标</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="'/reportform/realform/orderForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>订单状态情况</router-link>
                                </li>
                                <li class="nav-item">
                                    <router-link :to="'/reportform/realform/confirmForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>落单情况</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item  nav-dropdown">
                            <div class="nav-link nav-dropdown-toggle nav-padding" @click="handleClick">
                                <i class="icon-star"></i>实时日报表</div>
                            <ul class="nav-dropdown-items">
                                <li class="nav-item">
                                    <router-link :to="'/reportform/realtimeform/realTimeDayForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>实时日报表</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item  nav-dropdown">
                            <div class="nav-link nav-dropdown-toggle nav-padding" @click="handleClick">
                                <i class="icon-star"></i>一体化日报表</div>
                            <ul class="nav-dropdown-items">
                                <li class="nav-item">
                                    <router-link :to="'/reportform/unifyform/unifyForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>一体化日报表</router-link>
                                </li>
                            </ul>
                        </li>
                        <li class="nav-item  nav-dropdown">
                            <div class="nav-link nav-dropdown-toggle nav-padding" @click="handleClick">
                                <i class="icon-star"></i>区域实时激活率报表</div>
                            <ul class="nav-dropdown-items">
                                <li class="nav-item">
                                    <router-link :to="'/reportform/areaRealTimeform/areaRealTimeForm'" class="link-padding nav-link" exact>
                                        <i class="icon-star"></i>区域实时激活率报表</router-link>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </router-link>

                <!-- 录音管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/recordmanage'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-volume-down fa-lg "></i>录音管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/recordmanage/record'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>录音列表</router-link>
                        </li>
                    </ul>
                </router-link>

                <!-- 系统管理 -->
                <router-link tag="li" class="nav-item nav-dropdown" :to="{ path: '/system'}" disabled >
                    <div class="nav-link nav-dropdown-toggle" @click="handleClick">
                        <i class="fa fa-cog fa-lg"></i>系统管理</div>
                    <ul class="nav-dropdown-items">
                        <li class="nav-item">
                            <router-link :to="'/system/delivery'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>员工审核</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/system/pilot'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>试点配置</router-link>
                        </li>
                        <li class="nav-item">
                            <router-link :to="'/system/contrast'" class="nav-padding nav-link" exact>
                              <i class="icon-star"></i>关联工号</router-link>
                        </li>
                    </ul>
                </router-link>
            </ul>
        </nav>
    </div>
</template>
<script>
export default {
  name: 'sidebar',
  data() {
    return {
    }
  },
  computed: {
    isScheduleManage: function () {
      let role = window.localStorage.getItem('role')
      return role == 'admin' || role.indexOf('scheduleManage') > -1
    }
  },
  methods: {
    handleClick(e) {
      e.preventDefault()
      e.target.parentElement.classList.toggle('open')
    }
  }
}
</script>

<style lang="css">
.nav-link {
    cursor: pointer;
}
.nav-padding {
    padding-left: 30px!important;
}
.link-padding {
    padding-left: 60px!important;
}
</style>
