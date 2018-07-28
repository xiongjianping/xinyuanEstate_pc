import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)


export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/login'
    },
    {
      path: '/login',
      component: resolve => require(['@/components/pages/Login'], resolve)
    },
    {
      path: '/home',
      name: 'home',
      component: resolve => require(['@/components/common/Home.vue'], resolve),
        children: [
        //  首页
        {
          path: '/index',
          name: 'index',
          meta: {
            pageName: '首页'
          },
          component: resolve => require(['@/components/pages/index'], resolve)
        },
        //  项目管理
        {
          path: '/projecManage',
          name: 'projecManage',
          meta: {
            pageName: '项目管理'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            {
              path: 'projec',
              name: 'projec',
              meta: {
                pageName: '项目管理1'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'projecList',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '项目列表'
                  },
                  component: resolve => require(['@/components/pages/projecManage/projec/list.vue'], resolve)
                },
                {
                  path: 'add/:id',
                  name: 'projecAdd',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '新增项目'
                  },
                  component: resolve => require(['@/components/pages/projecManage/projec/add.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'projecDetails',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/projecManage/projec/details.vue'], resolve)
                },
                {
                  path: 'bianji/:id',
                  name: 'projecBianji',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '编辑'
                  },
                  component: resolve => require(['@/components/pages/projecManage/projec/bianji.vue'], resolve)
                }

              ]
            },
            {
              path: 'floor',
              name: 'floor',
              meta: {
                pageName: '楼层管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'floorList',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '楼层列表'
                  },
                  component: resolve => require(['@/components/pages/projecManage/floor/list.vue'], resolve)
                },
                {
                  path: 'add/:id',
                  name: 'floorAdd',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '新增'
                  },
                  component: resolve => require(['@/components/pages/projecManage/floor/add.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'floorDetails',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '编辑'
                  },
                  component: resolve => require(['@/components/pages/projecManage/floor/details.vue'], resolve)
                },
                {
                  path: 'xiangqing/:id',
                  name: 'floorXiangqing',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/projecManage/floor/xiangqing.vue'], resolve)
                }
              ]
            },
            {
              path: 'store',
              name: 'store',
              meta: {
                pageName: '铺位管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'storeList',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '铺位列表'
                  },
                  component: resolve => require(['@/components/pages/projecManage/store/list.vue'], resolve)
                },
                {
                  path: 'add/:id',
                  name: 'storeAdd',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '新增铺位'
                  },
                  component: resolve => require(['@/components/pages/projecManage/store/add.vue'], resolve)
                },
                {
                  path: 'xiangqing/:id',
                  name: 'storeXiangqing',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/projecManage/store/xiangqing.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'storeDetails',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/projecManage/store/details.vue'], resolve)
                }
              ]
            }
          ]
        },
        //  品牌管理
        {
          path: '/indicatorsManage',
          name: 'indicatorsManage',
          meta: {
            pageName: '品牌管理'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            {
              path: 'indicators',
              name: 'indicators',
              meta: {
                pageName: '品牌管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children:[
                {
                  path: 'list',
                  name: 'indicatorsList',
                  meta: {
                    parentPath: '/indicatorsManage',
                    pageName: '品牌管理'
                  },
                  component: resolve => require(['@/components/pages/indicatorsManage/indicators/list.vue'], resolve)
                },
                {
                  path: 'add/:id',
                  name: 'indicatorsAdd',
                  meta: {
                    parentPath: '/indicatorsManage',
                    pageName: '新增品牌'
                  },
                  component: resolve => require(['@/components/pages/indicatorsManage/indicators/add.vue'], resolve)
                },
                {
                  path: 'bianji/:id',
                  name: 'indicatorsBianji',
                  meta: {
                    parentPath: '/indicatorsManage',
                    pageName: '新增品牌'
                  },
                  component: resolve => require(['@/components/pages/indicatorsManage/indicators/bianji.vue'], resolve)
                }
              ]
            },
          ]
        },
        //  签约管理
        {
            path: '/qianyue',
            name: 'qianyue',
            meta: {
              pageName: '签约管理'
            },
            component: resolve => require(['@/components/common/SubContent.vue'], resolve),
            children: [
              {
                path: 'qianyue',
                name: 'qianyue',
                meta: {
                  pageName: '签约管理'
                },
                component: resolve => require(['@/components/common/SubContent.vue'], resolve),
                children: [
                  {
                    path: 'list',
                    name: 'qianyueList',
                    meta: {
                      parentPath: '/qianyue',
                      pageName: '签约管理'
                    },
                    component: resolve => require(['@/components/pages/qianyue/qianyue/list.vue'], resolve)
                  },
                  {
                    path: 'add/:id',
                    name: 'qianyueAdd',
                    meta: {
                      parentPath: '/qianyue',
                      pageName: '签约'
                    },
                    component: resolve => require(['@/components/pages/qianyue/qianyue/add.vue'], resolve)
                  }
                ]
              },
              {
                path: 'sanjiao',
                name: 'sanjiao',
                meta: {
                  pageName: '三角理论'
                },
                component: resolve => require(['@/components/common/SubContent.vue'], resolve),
                children: [
                  {
                    path: 'list',
                    name: 'sanjiao',
                    meta: {
                      parentPath: '/sanjiao',
                      pageName: '三角理论'
                    },
                    component: resolve => require(['@/components/pages/qianyue/sanjiao/list.vue'], resolve)
                  },
                ]
              },
            ]
          },
        //  数据管理
        {
          path: '/dataManage',
          name: 'dataManage',
          meta: {
            pageName: '数据管理'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            {
              path: 'version',
              name: 'version',
              meta: {
                pageName: '版本管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'versionList',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '标准三角形'
                  },
                  component: resolve => require(['@/components/pages/dataManage/version/list.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'versionDetails',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/dataManage/version/details.vue'], resolve)
                }
              ]
            },
            {
              path: 'dongtai',
              name: 'dongtai',
              meta: {
                pageName: '动态三角形'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'dongtaiList',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '动态三角形'
                  },
                  component: resolve => require(['@/components/pages/dataManage/dongtai/list.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'dongtaiDetails',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/dataManage/dongtai/details.vue'], resolve)
                }
              ]
            },
            {
              path: 'shuju',
              name: 'shuju',
              meta: {
                pageName: '版本管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'shuju',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '动态三角形'
                  },
                  component: resolve => require(['@/components/pages/dataManage/shuju/list.vue'], resolve)
                },
                {
                  path: 'edit/:id',
                  name: 'versionAdd',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '新增/编辑版本'
                  },
                  component: resolve => require(['@/components/pages/dataManage/version/add.vue'], resolve)
                }, {
                  path: 'details/:id',
                  name: 'versionDetails',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/dataManage/version/details.vue'], resolve)
                }
              ]
            },
            {
              path: 'trigonometric',
              name: 'trigonometric',
              meta: {
                pageName: '区间设置'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'trigonometricList',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '区间设置'
                  },
                  component: resolve => require(['@/components/pages/dataManage/trigonometric/list.vue'], resolve)
                }, {
                  path: 'details/:id',
                  name: 'trigonometricAdd',
                  meta: {
                    parentPath: '/dataManage',
                    pageName: '新增'
                  },
                  component: resolve => require(['@/components/pages/dataManage/trigonometric/details.vue'], resolve)
                }
              ]
            }
          ]
        },
        //  帮扶计划
        {
          path: '/evaluationTpl',
          name: 'evaluationTpl',
          meta: {
            pageName: '帮扶计划'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            //项目帮扶
            {
              path: 'template',
              name: 'template',
              meta: {
                pageName: '项目帮扶'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'templateList',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '模板管理1'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/list.vue'], resolve)
                }, {
                  path: 'edit/:id',
                  name: 'templateAdd',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '新增/编辑模板'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/add.vue'], resolve)
                }, {
                  path: 'details/:id',
                  name: 'templateDetails',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/details.vue'], resolve)
                }
              ]
            },
            //楼层帮扶
            {
              path: 'evaluation',
              name: 'evaluation',
              meta: {
                pageName: '楼层帮扶'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'evaluationList',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '模板管理1'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/evaluation/list.vue'], resolve)
                }, {
                  path: 'edit/:id',
                  name: 'templateAdd',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '新增'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/add.vue'], resolve)
                }
              ]
            },

            {
              path: 'yetaibangfu',
              name: 'yetaibangfu',
              meta: {
                pageName: '楼层帮扶'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'yetaibangfuList',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '模板管理1'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/yetaibangfu/list.vue'], resolve)
                }, {
                  path: 'edit/:id',
                  name: 'templateAdd',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '新增/编辑模板'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/add.vue'], resolve)
                }, {
                  path: 'details/:id',
                  name: 'templateDetails',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/details.vue'], resolve)
                }
              ]
            },
            {
              path: 'bangfuneirong',
              name: 'bangfuneirong',
              meta: {
                pageName: '楼层帮扶'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'bangfuneirongList',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '模板管理1'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/bangfuneirong/list.vue'], resolve)
                }, {
                  path: 'edit/:id',
                  name: 'templateAdd',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '新增/编辑模板'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/add.vue'], resolve)
                }, {
                  path: 'details/:id',
                  name: 'templateDetails',
                  meta: {
                    parentPath: '/evaluationTpl',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/evaluationTpl/template/details.vue'], resolve)
                }
              ]
            }
          ]
        },

        //  评估模板
        {
          path: '/organizationStructure',
          name: 'organizationStructure',
          meta: {
            pageName: '评估模板'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          // children: [
          //   {
          //     path: 'organizationStructure',
          //     name: 'organizationStructure',
          //     meta: {
          //       pageName: '模板管理'
          //     },
          //     component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children:[
                {
                  path: 'organization',
                  name: 'organizationList',
                  meta: {
                    parentPath: '/organizationStructure',
                    pageName: '模板管理'
                  },
                  component: resolve => require(['@/components/pages/organizationStructure/organization/list.vue'], resolve)
                },
                {
                  path: 'bianji/:id',
                  name: 'organizationBianji',
                  meta: {
                    parentPath: '/organizationStructure',
                    pageName: '编辑'
                  },
                  component: resolve => require(['@/components/pages/organizationStructure/organization/bianji.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'organizationDetails',
                  meta: {
                    parentPath: '/organizationStructure',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/organizationStructure/organization/details.vue'], resolve)
                }
            //   ]
            // },
          ]
        },

        //  系统平台
        {
          path: '/dataDictionary',
          name: 'dataDictionary',
          meta: {
            pageName: '系统平台'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            {
              path: 'brand',
              name: 'brand',
              meta: {
                pageName: '业态管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'brand',
                  meta: {
                    parentPath: '/brand',
                    pageName: '业态管理'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/brand/list.vue'], resolve)
                },
              ]
            },
            {
              path: 'formats',
              name: 'formats',
              meta: {
                pageName: '业种管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'formats',
                  meta: {
                    parentPath: '/formats',
                    pageName: '业种管理'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/formats/list.vue'], resolve)
                },
              ]
            },
            {
              path: 'megabite',
              name: 'megabite',
              meta: {
                pageName: '适配值'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'megabite',
                  meta: {
                    parentPath: '/megabite',
                    pageName: '适配值'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/megabite/list.vue'], resolve)
                },
              ]
            },
            {
              path: 'qujiangongsi',
              name: 'qujiangongsi',
              meta: {
                pageName: '区间公司'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'qujiangongsi',
                  meta: {
                    parentPath: '/qujiangongsi',
                    pageName: '区间公司'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/qujiangongsi/list.vue'], resolve)
                },
              ]
            },
            {
              path: 'zuzhiguanli',
              name: 'zuzhiguanli',
              meta: {
                pageName: '组织管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'zuzhiguanli',
                  meta: {
                    parentPath: '/zuzhiguanli',
                    pageName: '组织管理'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/zuzhiguanli/list.vue'], resolve)
                },
              ]
            },
            {
              path: 'renyuanguanli',
              name: 'renyuanguanli',
              meta: {
                pageName: '人员管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'renyuanguanli',
                  meta: {
                    parentPath: '/renyuanguanli',
                    pageName: '人员管理'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/renyuanguanli/list.vue'], resolve)
                },
              ]
            },
            {
              path: 'jueseguanli',
              name: 'jueseguanli',
              meta: {
                pageName: '角色管理'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'jueseguanli',
                  meta: {
                    parentPath: '/jueseguanli',
                    pageName: '角色管理'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/jueseguanli/list.vue'], resolve)
                },
              ]
            },
          ]
        },
      ]
    }
  ]
})
