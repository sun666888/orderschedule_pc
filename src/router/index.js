/* eslint-disable */
import Vue from "vue";
import Router from "vue-router";

// Containers
import Full from "@/containers/Full";

Vue.use(Router);

export default new Router({
    mode: "hash", // Demo is living in GitHub.io, so required!
    linkActiveClass: "open active",
    scrollBehavior: () => ({ y: 0 }),
    routes: [{
            path: "/",
            redirect: "/pages/login",
            name: "主页",
            component: Full,
            children: [
                // 系统管理
                {
                    path: "system",
                    redirect: "/system/user",
                    name: "系统管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "delivery",
                            name: "员工审核",
                            component: () =>
                                import ('../views/components/system/delivery/Delivery')
                        },
                        {
                            path: 'pilot',
                            name: "试点配置",
                            component: () =>
                                import ('../views/components/system/pilot/PilotConfig')
                        },
                        {
                            path: 'contrast',
                            name: "关联工号",
                            component: () =>
                                import ('../views/components/system/contrast/ContrastConfig')
                        }
                    ]
                },
                {
                    path: "ordermanage",
                    redirect: "/ordermanage/orderEntry",
                    name: "订单管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                        path: "orderEntry",
                        name: "订单录入",
                        component: () =>
                            import ('../views/components/ordermanage/orderEntry/OrderEntry')
                    }, {
                        path: "entryList",
                        name: "录入明细",
                        component: () =>
                            import ('../views/components/ordermanage/orderEntry/EntryList')
                    }, {
                        path: "successOrderEntry",
                        name: "成功单录入",
                        component: () =>
                            import ('../views/components/ordermanage/orderEntry/SuccessOrderEntry')
                    }
                    // , {
                    //     path: "supplementaryImport",
                    //     name: "补登明细表导入",
                    //     component: () =>
                    //         import ('../views/components/ordermanage/orderEntry/SupplementaryImport')
                    // }, {
                    //     path: "uploadOrder",
                    //     name: "补登明细列表",
                    //     component: () =>
                    //         import ('../views/components/ordermanage/orderEntry/UploadOrder')
                    // }
                ]
                },
                {
                    path: "schedulingmanage",
                    redirect: "/schedulingmanage/schedulingList",
                    name: "调度管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "schedulingList",
                            name: "调度列表",
                            component: () =>
                                import ('../views/components/schedulingmanage/schedulingList/SchedulingList'),
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: "schedulingDetail",
                            name: "调度详情",
                            component: () =>
                                import ('../views/components/schedulingmanage/schedulingDetail/SchedulingDetail')
                        },
                        {
                            path: "schedulingMap",
                            name: "调度地图",
                            component: () =>
                                import ('../views/components/schedulingmanage/schedulingMap/SchedulingMap')
                        },
                        {
                            path: "schedulingExport",
                            name: "批量导出",
                            component: () =>
                                import ('../views/components/schedulingmanage/schedulingExport/SchedulingExport') 
                        }
                    ]
                },
                {
                    path: "callmanage",
                    redirect: "/callmanage/callList",
                    name: "外呼管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "callList",
                            name: "外呼列表",
                            component: () =>
                                import ('../views/components/callmanage/callList/CallList'),
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: "callStatistics",
                            name: "外呼统计",
                            component: () =>
                                import ('../views/components/callmanage/callList/CallStatistics')
                        },
                        {
                            path: "callDetail",
                            name: "外呼详情",
                            component: () =>
                                import ('../views/components/callmanage/callDetail/CallDetail')
                        }
                    ]
                },

                {
                    path: "deliverymanage",
                    redirect: "/deliverymanage/deliveryList",
                    name: "派送员管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "deliveryList",
                            name: "派送员列表",
                            component: () =>
                                import ('../views/components/deliverymanage/deliveryList/DeliveryList'),
                            meta: {
                                keepAlive: true
                            }
                        },
                        {
                            path: "updateDelivery",
                            name: "修改派送员",
                            component: () =>
                                import ('../views/components/deliverymanage/deliveryList/UpdateDelivery')
                        },
                        {
                            path: "schedule",
                            name: "排班",
                            component: () =>
                                import ('../views/components/deliverymanage/schedule/Scheduling')
                        },
                        {
                            path: "delayOrder",
                            name: "超时单",
                            component: () =>
                                import ('../views/components/deliverymanage/delayOrder/DelayOrder'),
                            meta: {
                                keepAlive: true
                            }
                        }
                    ]
                },

                {
                    path: "schedulermanage",
                    redirect: "/schedulermanage/schedulerList",
                    name: "调度员管理",
                    component: {
                        render(c) {
                            return c("router-view")
                        }
                    },
                    children: [{
                        path: "schedulerList",
                        name: "调度员列表",
                        component: () =>
                            import ('../views/components/schedulermanage/schedulerList/SchedulerList'),
                        meta: {
                            keepAlive: true
                        }
                    }]
                },
                {
                    path: "reportform",
                    redirect: "/reportform/orderform",
                    name: "报表管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                        path: "orderform",
                        name: "订单报表",
                        component: () =>
                            import ('../views/components/reportform/orderform/OrderForm')
                    }, {
                        path: "callform",
                        name: "外呼报表",
                        component: () =>
                            import ('../views/components/reportform/callform/CallForm')
                    }, {
                        path: "curingform",
                        name: "固化报表",
                        component: {
                            render(c) {
                                return c("router-view");
                            }
                        },
                        children: [{
                            path: "regionalSolidifyForm",
                            name: "区域指标固化报表",
                            component: () =>
                                import('../views/components/reportform/curingform/RegionalForm')
                        }, {
                            path: "personnelSolidifyForm",
                            name: "人员指标固化报表",
                            component: () =>
                                import('../views/components/reportform/curingform/PersonnelForm')
                        }]
                    }, {
                        path: "realform",
                        name: "实时报表",
                        component: {
                            render(c) {
                                return c("router-view");
                            }
                        },
                        children: [{
                            path: "regionalForm",
                            name: "区域指标实时报表",
                            component: () =>
                                import('../views/components/reportform/realform/RegionalForm')
                        }, {
                            path: "personnelForm",
                            name: "人员指标实时报表",
                            component: () =>
                                import('../views/components/reportform/realform/PersonnelForm')
                        }, {
                            path: "orderForm",
                            name: "订单状态情况",
                            component: () =>
                                import('../views/components/reportform/realform/OrderForm')
                        }, {
                            path: "confirmForm",
                            name: "落单情况",
                            component: () =>
                                import('../views/components/reportform/realform/ConfirmForm')
                        }]
                    },{
                            path: "realtimeform",
                            name: "实时日报表",
                            component: {
                                render(c) {
                                    return c("router-view");
                                }
                            },
                            children: [{
                                path: "realTimeDayForm",
                                name: "实时日报表",
                                component: () =>
                                    import('../views/components/reportform/realtimeform/RealTimeDayForm')
                            }]
                        },{
                            path: "unifyform",
                            name: "一体化日报表",
                            component: {
                                render(c) {
                                    return c("router-view");
                                }
                            },
                            children: [{
                                path: "unifyForm",
                                name: "一体化日报表",
                                component: () =>
                                    import('../views/components/reportform/unifyform/UnifyForm')
                            }]
                        },{
                            path: "areaRealTimeform",
                            name: "区域实时激活率报表",
                            component: {
                                render(c) {
                                    return c("router-view");
                                }
                            },
                            children: [{
                                path: "areaRealTimeform",
                                name: "区域实时激活率报表",
                                component: () =>
                                    import('../views/components/reportform/areaRealTimeform/areaRealTimeForm')
                            }]
                        }]
                },

                {
                    path: "recordmanage",
                    redirect: "/recordmanage/record",
                    name: "录音管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                        path: "record",
                        name: "录音记录",
                        component: () =>
                            import ('../views/components/recordmanage/record/Record')
                    }]
                },

                {
                    path: "areamanage",
                    redirect: "/areamanage/areaList",
                    name: "站点管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                            path: "area",
                            name: "站点列表",
                            component: () =>
                                import ('../views/components/areamanage/area/Area')
                        },
                        {
                            path: "areamap",
                            name: "站点地图",
                            component: () =>
                                import ('../views/components/areamanage/areamap/AreaMap')
                        },
                        {
                            path: "polygonMaplist",
                            name: "多边形站点列表",
                            component: () =>
                                import ('../views/components/areamanage/polygonMapList/polygonMapList')
                        },
                        {
                            path: "polygonMap",
                            name: "多边形站点地图",
                            component: () =>
                                import ('../views/components/areamanage/polygonMap/polygonMap')
                        }
                    ]
                },

                {
                    path: "businessmanage",
                    redirect: "/businessmanage/business",
                    name: "业务管理",
                    component: {
                        render(c) {
                            return c("router-view");
                        }
                    },
                    children: [{
                        path: "business",
                        name: "业务列表",
                        component: () =>
                            import ('../views/components/businessmanage/business/Business')
                    }]
                }

            ]
        },
        {
            path: "/pages",
            name: "Pages",
            component: {
                render(c) {
                    return c("router-view");
                }
            },
            children: [{
                path: "login",
                name: "Login",
                component: () =>
                    import ('../views/components/pages/Login.vue')
            }]
        }
    ]
})
