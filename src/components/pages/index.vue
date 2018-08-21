<template>
  <!--   <div id="box">
    <div class="col-xs-12 col-md-4 col-lg-3" style="padding: 0">
      <div class="left-box">
        <div class="left-top">
          <div class="xing"></div>
          <span>全国各项目总量</span>
          <div class="lzi">
            <p>客流:<i>{{countryPassengerFlow}}</i>万人</p>
            <p>销售:<i>{{countrySalesVolume}}</i>万元</p>
          </div>
        </div>
        <div class="left-cont ">
          <div class="xing"></div>
          <div class="left-cont-t1">
            <span class="l2">全过各区域客流量排行</span>
          </div>
          <div class="left-cont-t2">
            <div id="main3" style="width: 300px;height:240px"></div>
          </div>
        </div>
        <div class="left-bottom">
          <div class="xing"></div>
          <span>全国销售额与客流量增长趋势统计</span>
          <div class="lx">
            <p class="p1"><i></i><span>全国各区域客流量</span></p>
            <p class="p2"><i></i><span>全国各区域销售量</span></p>
          </div>
          <div id="main1" style="width: 300px;height:240px"></div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-lg-6">
      <div class="cont-box">
        <div class="cont-top">
          <div class="xing"></div>
          <span>三角理念统计</span>
          <div class="center-cent1">
            <div class="left">
              <select @change="getProjectList()" v-model="searchForm.areaId" placeholder="请选择区域">
                <option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></option>
              </select>
              <select v-model="searchForm.projectId" placeholder="请选择项目" @change="forProjectDetails()">
                <option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></option>
              </select>
              <select v-model="searchForm.checkPro" placeholder="请选择项目" @change="checkProjectType()">
                <option v-for="(item, index) in projectTypeList" :key="index" :label="item.name" :value="item.id"></option>
              </select>
            </div>
            <div class="right">
              <select placeholder="楼栋" v-if="searchForm.checkPro=='2'||searchForm.checkPro=='4'">
                <option></option>
              </select>
              <select placeholder="全部楼层" v-if="searchForm.checkPro=='2'||searchForm.checkPro=='4'">
                <option ></option>
              </select>
              <select placeholder="全部业态" v-if="searchForm.checkPro=='3'||searchForm.checkPro=='4'">
                <option ></option>
              </select>
              <select placeholder="全部品牌" v-if="searchForm.checkPro=='4'">
                <option></option>
              </select>
            </div>
          </div>
          <div id="main"></div>
          <div class="cent-btn-left2">优</div>
          <div class="cent-btn-right">
            <div>溢租率</div>
            <div>客销度</div>
            <div>适配值</div>
          </div>
        </div>
        <div class="cont-bottom">
          <div class="xing"></div>
          <span class="c2">全国各城市项目品牌总量</span>
          <div class="center-btn-left"></div>
          <div id="main2" style="width: 500px;height:300px;"></div>
        </div>
      </div>
    </div>
    <div class="col-xs-12 col-md-4 col-lg-3">
      <div class="right-box">
        <div class="right-top">
          <div class="xing"></div>
          <span class="r1">项目预览</span>
          <div class="right-img"></div>
          <div class="right_img1"></div>
          <div class="zi">
            <span class="rx">西安鑫苑大都汇 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</span>
            <span class="rx">楼层数：共5层</span>
            <br>
            <span class="rx">开始时间：2016年12月16日 &nbsp &nbsp &nbsp &nbsp &nbsp</span>
            <span class="rx">面积：12万平方</span>
          </div>
        </div>
        <div class="right-cont">
          <div class="xing"></div>
          <span class="r2-1">客销度</span>
          <p class="r2">E1：短期下调租金培育品牌经营</p>
          <p class="r2">E2:辅助品牌经营</p>
          <p class="r2">E3:分析品牌下降原因</p>
          <p class="r2">E4:下调租金</p>
          <p class="r2">E5:品牌淘汰</p>
        </div>
        <div class="right-bottom">
          <div class="xing"></div>
          <span class="r3-1">建议措施</span>
          <span class="r3">溢租率</span>
          <span class="r3">适配值</span>
          <p class="r4">E1：短期下调租金培育品牌经营</p>
          <p class="r4">E2:辅助品牌经营</p>
          <p class="r4">E3:分析品牌下降原因</p>
          <p class="r4">E4:下调租金</p>
          <p class="r4">E5:品牌淘汰</p>
        </div>
      </div>
    </div>
  </div> -->
  <div class="g_ct">
    <el-row>
      <el-col :span="6">
        <div class="left_1 mb10">
          <div class="title_bg  tit_left1"></div>
          <span class="title_txt">全国各项目总量</span>
          <div class="lzi">
            <p class="mb30">销售：<i>{{countrySalesVolume}}</i><em>万元</em></p>
            <p>客流：<i>{{countryPassengerFlow}}</i><em>万人次</em></p>
          </div>
        </div>
        <div class="left_2 mb10">
          <div class="title_bg tit_left2"></div>
          <span class="title_txt">全国各区域客流量排行</span>
          <div class="left_echars2">
            <div id="main3"></div>
          </div>
        </div>
        <div class="left_3">
          <div class="title_bg tit_left3"></div>
          <span class="title_txt">全国销售额与客流量增长趋势统计</span>
          <div class="left_echars3">
            <div id="main1"></div>
          </div>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="center_1 mb20">
          <div class="title_bg tit_center1"></div>
          <span class="title_txt">三角理念统计</span>
          <div class="select_ct">
            <div class="f-tac mt10">
              <m-select v-if="areaList.length > 0" :tabs="areaList" :clicked="clicked1" v-on:childTab="tabClick1"></m-select>
              <m-select v-if="projectList.length > 0" :tabs="projectList" :clicked="clicked2" v-on:childTab="tabClick2"></m-select>
              <m-select v-if="typeId === 1 && buildingList.length > 0" :tabs="buildingList" :clicked="clicked3" v-on:childTab="tabClick3"></m-select>
              <m-select v-if="typeId != 1 && conditionList.length > 0"  :tabs="conditionList" :clicked="clicked5" v-on:childTab="tabClick5"></m-select>
            </div>
            <div class="f-tac mt10">
              <m-select v-if="typeId === 1 && floorList.length > 0"  :tabs="floorList" :clicked="clicked4" v-on:childTab="tabClick4"></m-select>
              <m-select v-if="typeId === 3 && megabiteList.length > 0"  :tabs="megabiteList" :clicked="clicked6" v-on:childTab="tabClick6"></m-select>
              <m-select v-if="typeId === 3 && brandList.length > 0"  :tabs="brandList" :clicked="clicked8" v-on:childTab="tabClick8"></m-select>
            </div>
          </div>
          <div class="f-tac mt10 r-tab">
            <m-select :tabs="types" :clicked="clicked7" v-on:childTab="tabClick7"></m-select>
          </div>
          <div class="center_echars1">
            <div id="main"></div>
          </div>
          <div class="g_notes f-pr">
            <h2>优</h2>
            <div class="notes_list f-cb">
              <span><i>{{triangData.triangleRent}}</i>溢租率</span>
              <span><i>{{triangData.triangleGuest}}</i>客销度</span>
              <span><i>{{triangData.triangleFitted}}</i>适配值</span>
            </div>
          </div>
        </div>
        <div class="center_2 f-cb">
          <div class="center_echars2 f-fl f-tac">
              <!-- <div id="china"></div> -->
              <img src="../../assets/images/ditu.png" alt="" alt="">
          </div>
          <div class="f-fr g_place">
            <ul class="pt25">
              <li>
                <b>华北区</b>
                <span>
                   <el-progress :percentage="100" :show-text="false"></el-progress>
                </span>
                <em>500</em>
              </li>
              <li>
                <b>华北区</b>
                <span>
                  <el-progress :percentage="100" :show-text="false"></el-progress>
                </span>
                <em>500</em>
              </li>
              <li>
                <b>华中区</b>
                <span>
                  <el-progress :percentage="80" :show-text="false"></el-progress>
                </span>
                <em>400</em>
              </li>
              <li>
                <b>华东区</b>
                <span>
                  <el-progress :percentage="50" :show-text="false"></el-progress>
                </span>
                <em>300</em>
              </li>
              <li>
                <b>华南区</b>
                <span>
                  <el-progress :percentage="15" :show-text="false"></el-progress>
                </span>
                <em>200</em>
              </li>
              <li>
                <b>华西北区</b>
                <span>
                  <el-progress :percentage="15" :show-text="false"></el-progress>
                </span>
                <em>100</em>
              </li>
              <li>
                <b>华西南区</b>
                <span>
                  <el-progress :percentage="15" :show-text="false"></el-progress>
                </span>
                <em>100</em>
              </li>
            </ul>
            <el-row class="mt20 mb10 f-tac">
              <el-button type="primary" size="small">智能推送</el-button>
            </el-row>
            <el-row class="f-tac">
              <el-button type="primary" size="small">自助招商</el-button>
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right_1 mb10">
          <div class="title_bg tit_right1"></div>
          <span class="title_txt">项目预览</span>
          <swiper :options="swiperOption" ref="mySwiper" class="mySwiper_list">
            <swiper-slide>
                <div class="img">
                    <img src="../../assets/images/r_t.png" alt="">
                </div>

            </swiper-slide>
            <swiper-slide>
                <div class="img">
                    <img src="../../assets/images/r_t.png" alt="">
                </div>
            </swiper-slide>
            <!-- <div class="swiper-pagination" slot="pagination"></div> -->
          </swiper>
          <div class="swiper_txt">
            <div class="f-cb">
              <p class="f-fl">西安鑫苑大都汇</p>
              <p class="f-fr f-tar">楼层数：共5层</p>
            </div>
            <div class="f-cb">
              <p class="f-fl">开业时间：2016年12月16日</p>
              <p class="f-fr f-tar">面积：12万平方</p>
            </div>
          </div>
        </div>
        <div class="right_2 mb10">
          <div class="title_bg tit_right1"></div>
          <span class="title_txt">客销度</span>
          <div class="g_text">
              {{triangData.guestContent}}
          </div>
        </div>
        <div class="right_3">
          <div class="title_bg tit_right1"></div>
          <span class="title_txt">建设措施</span>
          <el-row class="f-tac">
            <el-button type="primary" size="small" class="mr15" @click="triangType = 1">溢租率</el-button>
            <el-button type="primary" size="small" @click="triangType = 2">适配值</el-button>
          </el-row>
          <div class="g_text" v-if="triangType === 1">
              {{triangData.rentContent}}
          </div>
          <div class="g_text" v-if="triangType === 2">
              {{triangData.fittedContent}}
          </div>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import echarts from '../../../static/js/echarts.js'
// import china from '../../components/options/china.js';
export default {

  data() {
    return {
      triangType:1,
      myChart3:{},
      myChart:{},
      searchForm: {},
      areaId:'',
      areaList: {},
      projectId:'',
      projectList: {},
      buildingId:'',
      buildingList:{},
      floorId:'',
      floorList:{},
      conditionId:'',
      conditionList:'',
      megabiteId:'',
      megabiteList:{},
      brandId:'',
      brandList:{},
      typeId: 1,
      triangData:{},
      projectTypeList: [{
          name: '项目',
          id: 1
        },
        {
          name: '楼层',
          id: 2
        },
        {
          name: '业态',
          id: 3
        },
        {
          name: '品牌',
          id: 4
        }
      ],
      projectDetail: '',
      countryPassengerFlow: '',
      countrySalesVolume: '',
      china: [],
      types:[{
          id:1,
          name:'楼层'
        },
        {
          id:2,
          name:'业态'
        },
        {
          id:3,
          name:'品牌'
        }],
      tabs: [{
          tab_id: 1,
          tab_name: '近1个月'
        },
        {
          tab_id: 2,
          tab_name: '近3个月'
        },
        {
          tab_id: 3,
          tab_name: '近6个月'
        },
        {
          tab_id: 4,
          tab_name: '1年以内'
        },
        {
          tab_id: 5,
          tab_name: '1年以上'
        }
      ],
      clicked1: false,
      clicked2: false,
      clicked3: false,
      clicked4: false,
      clicked5: false,
      clicked6: false,
      clicked7: false,
      clicked8: false,
      swiperOption: {
        // 如果需要分页器
        pagination: {
          el: '.swiper-pagination',
          clickable: true,
          renderBullet: function (index, className) {
            return '<span class="' + className + '">' + (index + 1) + '</span>';
          },
        },
        initialSlide:0
      },
      screenWidth: document.body.clientWidth
    }
  },
  created() {
    window.$getAreaList().then((res) => {
      this.areaList = res
      this.areaChangedForFloor(res[0].id)
    }, (err) => { console.log(err) })

    // 查询全国客流量
    this.$axios.get('/dayguest/find/passengerflowall/list')
      .then(res => {
        this.countryPassengerFlow = Math.round(res)
      }, (err) => { console.log(err) })
    // 查询全国销售额
    this.$axios.get('/dayguest/find/saleroomall/list')
      .then(res => {
        this.countrySalesVolume = Math.round(res)
      }, (err) => { console.log(err) })
  },
  watch:{
    screenWidth (val) {
      this.screenWidth = val
      this.myChart.resize()
      myChart1.resize()
      this.myChart3.resize()
    },
    triangData(val) {
      var option = this.getOption()

    this.myChart = echarts.init(document.getElementById('main'))
    this.myChart.setOption(option);
    },
    projectList(val){
      this.projectList = val
      console.log(this.projectList)
    },
    buildingList(val){
      this.buildingList = val
      console.log(this.buildingList)
    },
    floorList(val){
      this.floorList = val
      console.log(this.floorList)
    },
    conditionList(val){
      this.conditionList = val
    },
    megabiteList(val){
      this.megabiteList = val
    },
    brandList(val){
      this.brandList = val
    },
  },
  mounted() {
    window.onresize = () => {
      return (() => {
          window.screenWidth = document.body.clientWidth
          this.screenWidth = window.screenWidth
          this.myChart.resize()
          myChart1.resize()
          this.myChart3.resize()
      })()
    }

    var myChart1 = echarts.init(document.getElementById('main1'));
    var option1 = {
      color: ['#ce4b4b', '#00ac82'],
      textStyle: {
        color: "white"
      },
      tooltip: {
        trigger: 'axis'
      },
      legend: {
        data: ['全国各区域客流量', '全国各区域销售量'],
        left: 'right',
        top: 10,
        textStyle: {
          color: '#fff'
        }
      },
      grid: {
        left: '20%',
        right: '15%',
        bottom: '15%',
        top: '25%'
      },
      calculable: true,
      xAxis: [{
        type: 'category',
        boundaryGap: false,
        data: ['周一', '周二', '周三', '周四', '周五', '周六', '周日']
      }],
      yAxis: [{
        type: 'value',
        axisLabel: {
          formatter: '{value} °C'
        }
      }],
      series: [{
          name: '全国各区域客流量',
          type: 'line',
          data: [11, 11, 15, 13, 12, 13, 10],
          markPoint: {
            data: [
              { type: 'max', name: '最大值' },
              { type: 'min', name: '最小值' }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        },
        {
          name: '全国各区域销售量',
          type: 'line',
          data: [1, -2, 2, 5, 3, 2, 0],
          markPoint: {
            data: [
              { name: '周最低', value: -2, xAxis: 1, yAxis: -1.5 }
            ]
          },
          markLine: {
            data: [
              { type: 'average', name: '平均值' }
            ]
          }
        }
      ]
    };
    myChart1.setOption(option1);

    this.getAaa()
    //中国地图
    // var myChart_china = echarts.init(document.getElementById('china'))
    // china( myChart_china)
    this.myChart = echarts.init(document.getElementById('main'))
    var option = this.getOption()
    this.myChart.setOption(option)
  },
  methods: {
    getTriangleValue(type){
      var params = {
        projectId: this.projectId
      }
      var url = ''
      if(type === 1){
        params.floorId = this.floorId
        url = '/pctriangle/find/trianglefloor/byfloorId'
      } else if(type === 2){
        url = '/pctriangle/find/trianglecondition/byconditionId'
        params.conditionId = this.conditionId
      } else if(type === 3){
        url = '/pctriangle/find/trianglebrand/byBrandId'
        params.majoId = this.megabiteId
        params.brandId = this.brandId
      }

      this.$axios.post(url, params).then((res) => {
        console.log(res)
        this.triangData = res
      }, (err) => {console.log(err)})
    },
    getOption(){
      return  {
      textStyle: {
        color: "white"
      },
      parallelAxis: [
        {
          dim: 0,
          name: '溢租率(%)',
          min: this.triangData.intervalRent.ks,
          max: this.triangData.intervalRent.yx,
          axisLine: {
            lineStyle: {
              width: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'blue',

                  }, {
                    offset: 0.33,
                    color: 'green' // 100% 处的颜色
                  },
                  {
                    offset: 0.66,
                    color: 'yellow' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'red' // 0% 处的颜色
                  }
                ],
                globalCoord: true // 缺省为 false
              }
            },
          }
        },
        {
          dim: 1,
          name: '客销度',
          min: this.triangData.intervalGuest.ks,
          max: this.triangData.intervalGuest.yx,
          axisLine: {
            lineStyle: {
              width: 10,
              color: {
                type: '',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.25,
                    color: 'green' // 100% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: 'yellow' // 0% 处的颜色
                  },
                  {
                    offset: 0.75,
                    color: 'white' // 0% 处的颜色
                  }
                ],
                globalCoord: true // 缺省为 false
              }
            }
          }
        },
        {
          dim: 2,
          name: '适配值',
          min: this.triangData.intervalFitted.ks,
          max: this.triangData.intervalFitted.yx,
          color: "red",
          axisLine: {
            textStyle: {
              opacity: 0.5
            },
            lineStyle: {
              width: 10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                    offset: 0,
                    color: 'blue' // 0% 处的颜色
                  }, {
                    offset: 0.33,
                    color: 'green' // 100% 处的颜色
                  },
                  {
                    offset: 0.66,
                    color: 'yellow' // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: 'red' // 0% 处的颜色
                  }
                ],
                globalCoord: false // 缺省为 false
              }
            }
          }
        }
      ],
      parallel: { // 这是『坐标系』的定义
        left: '10%', // 平行坐标系的位置设置
        right: '25%',
        bottom: '10%',
        top: '15%',
        parallelAxisDefault: { // 『坐标轴』的公有属性可以配置在这里避免重复书写
          type: 'value',
          nameLocation: 'end',
          nameGap: 20,
          opacity: 0.6,
        }
      },
      series: [{
        type: 'parallel',
        lineStyle: {
          width: 3
        },
        data: [{
            value: [this.triangData.standardRent, this.triangData.standardGuest, this.triangData.standardFitted],
            lineStyle: {
              color: '#fff'
            }
          },
          {
            value: [this.triangData.standardRent, null, this.triangData.standardFitted],
            lineStyle: {
              color: '#fff'
            }
          }
        ]
      }, {
        color: '#fff',
        type: 'parallel',
        lineStyle: {
          width: 3
        },
        data: [{
            value: [this.triangData.triangleRent, this.triangData.triangleGuest, this.triangData.triangleFitted],

            lineStyle: {
              color: 'yellow'
            }
          },
          {
            value: [this.triangData.triangleRent, null, this.triangData.triangleFitted],
            lineStyle: {
              color: 'yellow'
            }
          }
        ]
      }]
    }
    },
    getAaa() {
      this.$axios.get('/pctriangle/find/salepassengerflow/all')
        .then(res => {
          this.passengerFlowList = res
          console.log(this.passengerFlowList)
          var areaNameList = []
          var seriesList = [{
              name: '全国各区域客流量',
              type: 'bar',
              label: seriesLabel,
              data: [],
            },
            {
              name: '全国各区域销售量',
              type: 'bar',
              label: seriesLabel,
              data: [],
            }
          ]
          var params
          for (var i = 0; i < this.passengerFlowList.length; i++) {
            areaNameList.push(i + 1 + ' ' + this.passengerFlowList[i].areaName)
            seriesList[0].data.push(this.passengerFlowList[i].passengerFlow)
            seriesList[1].data.push(this.passengerFlowList[i].saleroom)
          }

          this.myChart3 = echarts.init(document.getElementById('main3'));
          var valueNameList = ['全国各区域客流量', '全国各区域销售量']

          var seriesLabel = {
            normal: {
              show: true,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          }
          var option3 = {
            color: ['#66a4e3', '#58d24c'],
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: valueNameList,
              left: 'right',
              top: 10,
              textStyle: {
                color: '#fff'
              }
            },
            grid: {
              left: '6%',
              right: '4%',
              bottom: '3%',
              top: '8%'
            },
            xAxis: {
              type: 'value',
              name: 'Days',
              axisLabel: {
                formatter: '{value}'
              },
              axisLine: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false
              },
            },
            yAxis: {
              type: 'category',
              inverse: true,
              axisLine: {
                show: false,
              },
              splitLine: {
                show: false,
              },
              axisTick: {
                show: false
              },
              axisLabel: {
                show: true,
                textStyle: {
                  color: '#fff',
                  fontSize: 14,
                  align: 'left'
                }
              },
              data: areaNameList,
            },
            series: seriesList
          }
          this.myChart3.setOption(option3)
        }, (err) => { console.log(err) })
    },
    forProjectDetails() {
      $axios.get('/pctriangle/find/project/by/' + this.searchForm.projectId).then((res) => {
        this.projectDetail = res
        console.log(this.projectDetail)
      })
    },
    checkProjectType() {

    },
    showAlert(cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    },
    tabClick1(index,isClicked) {
      this.clicked1=isClicked
      this.clicked2=false
      this.clicked3=false
      this.clicked4=false
      this.clicked5=false
      this.clicked6=false
      this.clicked7=false
      this.clicked8=false
      if(this.typeId === 1){
        this.areaChangedForFloor(this.areaList[index].id)
      } else if(this.typeId === 2){
        this.areaChangedForCondition(this.areaList[index].id)
      } else if(this.typeId === 3){
        this.areaChangedForBrand(this.areaList[index].id)
      }
    },
    tabClick2(index,isClicked) {
      this.clicked2=isClicked
      this.clicked1=false
      this.clicked3=false
      this.clicked4=false
      this.clicked5=false
      this.clicked6=false
      this.clicked7=false
      this.clicked8=false

      if(this.typeId === 1){
        this.projectChangedForFloor(this.projectList[index].id)
      } else if(this.typeId === 2){
        this.projectChangedForCondition(this.projectList[index].id)
      } else if(this.typeId === 3){
        this.projectChangedForBrand(this.projectList[index].id)
      }
    },
    tabClick3(index,isClicked) {
      this.clicked3=isClicked
      this.clicked1=false
      this.clicked2=false
      this.clicked4=false
      this.clicked5=false
      this.clicked6=false
      this.clicked7=false
      this.clicked8=false

      this.buildingChanged(this.buildingList[index].id)
    },
    tabClick4(index,isClicked) {
      this.clicked4=isClicked
      this.clicked1=false
      this.clicked2=false
      this.clicked3=false
      this.clicked5=false
      this.clicked6=false
      this.clicked7=false
      this.clicked8=false

      if(this.typeId === 2){
        this.conditionChangedForCondition(this.conditionList[index].id)
      } else if(this.typeId === 3){
        this.projectChangedForBrand(this.conditionList[index].id)
      }
    },
    tabClick5(index,isClicked) {
      this.clicked5=isClicked
      this.clicked1=false
      this.clicked2=false
      this.clicked3=false
      this.clicked4=false
      this.clicked6=false
      this.clicked7=false
      this.clicked8=false

      if(this.typeId === 2) {
        this.conditionChangedForCondition(this.conditionList[index].id)
      } else if(this.typeId === 3){
        this.conditionChangedForBrand(this.conditionList[index].id)
      }
    },
    tabClick6(index,isClicked) {
      this.clicked6=isClicked
      this.clicked1=false
      this.clicked2=false
      this.clicked3=false
      this.clicked4=false
      this.clicked5=false
      this.clicked7=false
      this.clicked8=false
      this.megabiteChangedForBrand(this.megabiteList[index].id)
    },
    tabClick7(index,isClicked) {
      this.clicked7=isClicked
      this.clicked1=false
      this.clicked2=false
      this.clicked3=false
      this.clicked4=false
      this.clicked5=false
      this.clicked6=false
      this.clicked8=false

      this.typeId = this.types[index].id
    },
    tabClick8(index,isClicked) {
      this.clicked8=isClicked
      this.clicked1=false
      this.clicked2=false
      this.clicked3=false
      this.clicked4=false
      this.clicked5=false
      this.clicked6=false
      this.clicked7=false

      this.brandChangedForBrand(this.brandList[index].id)
    },
    areaChangedForFloor(areaId){ // 区域改变
      this.areaId = areaId
      window.$getProjectListForArea(this.areaId).then(res => {
        this.projectList =  res
        this.projectId = res[0].id
        console.log(res[0].id)
        window.$getBuilding(this.projectId).then(res => {
          this.buildingList = res
          this.buildingId = res[0].id
          window.$getFloorForBuilding(this.buildingId).then(res => {
            if(res!=''){
              this.floorList = res
              this.floorId = res[0].id
              console.log(res[0].id)
              this.getTriangleValue(1)
            }
          }, err => {console.log(err)})
        }, err => {console.log(err)})
      }, err => {console.log(err)})
    },
    projectChangedForFloor(projectId){ // 项目改变
      this.projectId = projectId
      window.$getBuilding(this.projectId).then(res => {
        this.buildingList = res
        this.buildingId = res[0].id
        window.$getFloorForBuilding(this.buildingId).then(res => {
          this.floorList = res
          this.floorId = res[0].id
          this.getTriangleValue(1)
        }, err => {console.log(err)})
      }, err => {console.log(err)})
    },
    buildingChanged(buildingId){ // 楼栋改变
      this.buildingId = buildingId
      window.$getFloorForBuilding(this.buildingId).then(res => {
          this.floorList = res
          this.floorId = res[0].id
          this.getTriangleValue(1)
        }, err => {console.log(err)})
    },
    floorChanged(){ // 楼层改变
      window.$getFloorForBuilding(this.buildingId).then(res => {
          this.floorList = res
          this.floorId = res[0].id
          this.getTriangleValue(1)
        }, err => {console.log(err)})
    },
    areaChangedForCondition(areaId){
      this.areaId = areaId
      window.$getProjectListForArea(this.areaId).then(res => {
        this.projectList =  res
        this.projectId = res[0].id
        window.$getBusinessListForProject(this.projectId).then(res => {
          this.conditionList = res
          this.conditionId = res[0].id
          this.getTriangleValue(2)
        }, err => {console.log(err)})
      }, err => {console.log(err)})
    },
    projectChangedForCondition(projectId){
      this.projectId = projectId
      window.$getBusinessListForProject(this.projectId).then(res => {
          this.conditionList = res
          this.conditionId = res[0].id
          this.getTriangleValue(2)
        }, err => {console.log(err)})
    },
    conditionChangedForCondition(conditionId){
      this.conditionId = conditionId
      this.getTriangleValue(2)
    },
    areaChangedForBrand(areaId){
      this.areaId = areaId
      window.$getProjectListForArea(this.areaId).then(res => {
        this.projectList =  res
        this.projectId = res[0].id
        window.$getBusinessListForProject(this.projectId).then(res => {
          this.conditionList = res
          this.conditionId = res[0].id
          window.$getSpeciesSelect(this.conditionId).then(res => {
            this.megabiteList = res
            this.megabiteId = res[0].id
            window.$getBrandForSpecies(this.megabiteId).then(res => {
              this.brandList = res
              this.brandId = res[0].id
              this.getTriangleValue(3)
            }, err => {console.log(err)})
          }, err => {console.log(err)})
        }, err => {console.log(err)})
      }, err => {console.log(err)})
    },
    projectChangedForBrand(projectId){
      this.projectId = projectId
      window.$getBusinessListForProject(this.projectId).then(res => {
        this.conditionList = res
        this.conditionId = this.conditionList[0].id
        window.$getSpeciesSelect(this.conditionId).then(res => {
          this.megabiteList = res
          this.megabiteId = res[0].id
          window.$getBrandForSpecies(this.megabiteId).then(res => {
            this.brandList = res
            this.brandId = res[0].id
            this.getTriangleValue(3)
          }, err => {console.log(err)})
        }, err => {console.log(err)})
      }, err => {console.log(err)})
    },
    conditionChangedForBrand(conditionId){
      this.conditionId = conditionId
      window.$getSpeciesSelect(this.conditionId).then(res => {
        this.megabiteList = res
        this.megabiteId = res[0].id
        window.$getBrandForSpecies(this.megabiteId).then(res => {
          this.brandList = res
          this.brandId = res[0].id
          this.getTriangleValue(3)
        }, err => {console.log(err)})
      }, err => {console.log(err)})
    },
    megabiteChangedForBrand(megabiteId){
      this.megabiteId = megabiteId
      window.$getBrandForSpecies(this.megabiteId).then(res => {
        this.brandList = res
        this.brandId = res[0].id
        this.getTriangleValue(3)
      }, err => {console.log(err)})
    },
    brandChangedForBrand(brandId){
      this.brandId = brandId
      this.getTriangleValue(3)
    },
  }
}

</script>
<style scoped lang="less">
.g_ct {
  height: 100%;
  position: relative;
  padding: 0 50px;
  box-sizing: border-box;
}

.left_1,
.left_3,
.right_2,
.right_3 {
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  min-height: 250px;
  position: relative;
}

.left_2,
.right_1 {
  padding: 10px 15px;
  box-sizing: border-box;
  width: 100%;
  min-height: 350px;
  position: relative;
}

.left_1,
.left_3 {
  background: url("../../assets/images/left.png") no-repeat;
  background-size: 100% 100%;
}

.left_2 {
  background: url("../../assets/images/left.png")no-repeat;
  background-size: 100% 100%;
}

.right_1 {
  background: url("../../assets/images/left.png")no-repeat;
  background-size: 100% 100%;
}

.right_2,
.right_3 {
  background: url("../../assets/images/left.png") no-repeat;
  background-size: 100% 100%;
}

.center_1 {
  min-height: 450px;
  background: url("../../assets/images/center_1.png")no-repeat;
  background-size: 100% 100%;
  position: relative;
  padding: 10px 15px;
  box-sizing: border-box;
}

.center_2 {
  min-height: 402px;
  background: url("../../assets/images/center_2.png")no-repeat;
  background-size: 100% 100%;
  position: relative;
  padding: 10px 15px;
  box-sizing: border-box;
}

.title_bg {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
  color: #fff;
  font-size: 14px;
  z-index:99;
  &.tit_left1 {
    padding: 3px 70px;
  }
  &.tit_left2 {
    padding: 3px 80px;
  }
  &.tit_left3 {
    padding: 3px 120px;
  }
  &.tit_center1 {
    padding: 3px 70px;
  }
  &.tit_right1 {
    padding: 3px 50px;
  }
}

.title_txt {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
  font-size: 14px;
  z-index: 999;
}

.left_1 {
  .lzi {
    color: #fff;
    font-size: 22px;
    position: absolute;
    margin: auto;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    margin-left: 8%;
    display: inline-block;
    height: 112px;
    i {
      padding: 5px;
      border-radius: 3px;
      margin: 0 15px 0 5px;
      font-size: 30px;
      background: -webkit-linear-gradient(#23acf4, #0146ad, #23acf4);
      /* Safari 5.1 - 6.0 */
      background: -o-linear-gradient(#23acf4, #0146ad, #23acf4);
      /* Opera 11.1 - 12.0 */
      background: -moz-linear-gradient(#23acf4, #0146ad, #23acf4);
      /* Firefox 3.6 - 15 */
      background: linear-gradient(#23acf4, #0146ad, #23acf4);
      /* 标准的语法 */
    }
    em {
      font-size: 16px;
    }
  }
}

.left_2 {
  .left_echars2,
  #main3 {
    width: 100%;
    min-height: 330px;
  }
}

.left_3 {
  .left_echars3,
  #main1 {width: 100%; min-height: 230px; }
}

.center_1 {
  .center_echars1,
  #main {margin:0 auto; width: 400px; min-height: 280px; }
  h2{position: absolute;font-size: 36px;color: #fff;margin:0 0 20px 10%;}
  .notes_list{width: 420px;margin:0 auto;padding-right: 40px;
    span{color: #fff;font-size: 14px;float: left;width:33.33%;text-align: center;}
    i{display: block;}
  }
}
.center_2{
  .center_echars2{width: 65%;height: 382px;line-height: 382px;
    img{max-width: 100%;height: auto;}
  }
  #china{height: 382px;}
  .g_place{width: 35%;
    li{overflow: hidden;color: #fff;line-height: 30px;}
    b{width: 28%;float: left;font-weight: 400;}
    span{width: 50%;float: left;padding-top: 12px;
      s{display:inline-block;vertical-align: middle;;height: 5px;background-color: #fff;border-radius: 1px;}
    }
    em{float: left;padding-left: 10px;display: inline-block;}
  }
}

.right_1{padding-top: 30px;
  .mySwiper_list{height: 310px;}
  .swiper_txt{color: #fff;margin:-45px 3% 0;font-size: 16px;}
  .img{height: 250px;margin:0 auto;text-align: center;
    img{width: auto;height: 100%;}
  }
}

.swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets{top: 0;right: 5%;left: auto;bottom: auto;}
.swiper-pagination{text-align: right;}
.swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet{margin:0;}

.right_2 {
  .g_text{padding:30px 40px;color: #fff;font-size: 14px;line-height: 26px;}
}
.right_3 {padding-top: 30px;
  .g_text{padding:20px 40px;color: #fff;font-size: 14px;line-height: 26px;}
}
.r-tab{
    position: absolute;
    right: 50px;
}
</style>
