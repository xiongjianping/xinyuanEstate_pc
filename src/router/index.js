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
        {
          path: '/index',
          name: 'index',
          meta: {
            pageName: '首页'
          },
          component: resolve => require(['@/components/pages/index'], resolve)
        },
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
                    pageName: '新增/编辑项目'
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
                    pageName: '新增/编辑楼层'
                  },
                  component: resolve => require(['@/components/pages/projecManage/floor/add.vue'], resolve)
                },
                {
                  path: 'details/:id',
                  name: 'floorDetails',
                  meta: {
                    parentPath: '/projecManage',
                    pageName: '详情'
                  },
                  component: resolve => require(['@/components/pages/projecManage/floor/details.vue'], resolve)
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
                    pageName: '新增/编辑铺位'
                  },
                  component: resolve => require(['@/components/pages/projecManage/store/add.vue'], resolve)
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
                  path: 'details/:id',
                  name: 'indicatorsDetails',
                  meta: {
                    parentPath: '/indicatorsManage',
                    pageName: '新增/编辑铺位'
                  },
                  component: resolve => require(['@/components/pages/indicatorsManage/indicators/details.vue'], resolve)
                }
              ]
            },
          ]
        },
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
                    name: 'qianyue',
                    meta: {
                      parentPath: '/qianyue',
                      pageName: '版本管理1'
                    },
                    component: resolve => require(['@/components/pages/qianyue/qianyue/list.vue'], resolve)
                  },
                  {
                    path: 'edit/:id',
                    name: 'versionAdd',
                    meta: {
                      parentPath: '/dataManage',
                      pageName: '新增/编辑版本'
                    },
                    component: resolve => require(['@/components/pages/dataManage/qianyue/add.vue'], resolve)
                  }
                ]
              },
              {
                path: 'sanjiao',
                name: 'sanjiao',
                meta: {
                  pageName: '三角管理'
                },
                component: resolve => require(['@/components/common/SubContent.vue'], resolve),
                children: [
                  {
                    path: 'list',
                    name: 'sanjiao',
                    meta: {
                      parentPath: '/sanjiao',
                      pageName: '版本管理1'
                    },
                    component: resolve => require(['@/components/pages/qianyue/sanjiao/list.vue'], resolve)
                  },
                ]
              },
            ]
          },
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
        {
          path: '/evaluationTpl',
          name: 'evaluationTpl',
          meta: {
            pageName: '帮扶计划'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
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
        {
          path: '/organizationStructure',
          name: 'organizationStructure',
          meta: {
            pageName: '评估模板'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            {
              path: 'organization',
              name: 'organization',
              meta: {
                parentPath: '/organizationStructure',
                pageName: '评估模板'
              },
              component: resolve => require(['@/components/pages/organizationStructure/organization/list.vue'], resolve)
            },
            {
              path: 'details/:id',
              name: 'organizationDetails',
              meta: {
                parentPath: '/organizationStructure',
                pageName: '模板管理'
              },
              component: resolve => require(['@/components/pages/organizationStructure/organization/details.vue'], resolve)
            }
          ]
        },

        {
          path: '/dataDictionary',
          name: 'dataDictionary',
          meta: {
            pageName: '系统平台'
          },
          component: resolve => require(['@/components/common/SubContent.vue'], resolve),
          children: [
            {
              path: '/brand/list/:userId/detail',
              name: 'brand',
              meta: {
                pageName: '数据字典'
              },
              component: resolve => require(['@/components/common/SubContent.vue'], resolve),
              children: [
                {
                  path: 'list',
                  name: 'brandList',
                  meta: {
                    parentPath: '/dataDictionary',
                    pageName: '品牌管理'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/brand/list.vue'], resolve)
                },
                {
                  path: 'edit/:id',
                  name: 'brandEdit',
                  meta: {
                    parentPath: '/dataDictionary',
                    pageName: '新增/编辑品牌'
                  },
                  component: resolve => require(['@/components/pages/dataDictionary/brand/add.vue'], resolve)
                }
              ]
            }
          ]
        },
      ]
    }
  ]
})
