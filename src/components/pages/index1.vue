<template>
  <div id="box">
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
            <div id="main3"></div>
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
            <span class="rx">西安鑫苑大都汇  </span>
            <span class="rx">楼层数：共5层</span>
            <br>
            <span class="rx">开始时间：2016年12月16日 </span>
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
  </div>
</template>
<script>
import echarts from '../../../static/js/echarts.js'

export default {

  data() {
    return {
      searchForm: {},
      areaList: {},
      projectList: {},
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
      china: []
    }
  },
  created() {
    window.$getAreaList().then((res) => {
      this.areaList = res
      console.log(this.areaList)
    }, (err) => { console.log(err) })

    // 查询全国客流量
    this.$axios.get('/dayguest/find/passengerflowall/list')
      .then(res => {
        this.countryPassengerFlow = res
      }, (err) => { console.log(err) })
    // 查询全国销售额
    this.$axios.get('/dayguest/find/saleroomall/list')
      .then(res => {
        this.countrySalesVolume = res
      }, (err) => { console.log(err) })
  },
  mounted() {
    this.getAaa()
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
      textStyle: {
        color: "white"
      },

      legend: {
        data: ['流量', '降雨量'],
        x: 'left',

      },
      parallelAxis: [

        {
          dim: 0,
          name: '溢租率(%)',
          min: -100,
          max: 100,
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
          name: '客销率',
          min: -50,
          max: 200,
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
          name: '适配度',
          min: 0,
          max: 8000,
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
        left: '8%', // 平行坐标系的位置设置
        right: '8%',
        bottom: '20%',
        top: '20%',
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
            value: [-20, 130, 3600],
            lineStyle: {
              color: '#fff'
            }
          },
          {
            value: [-20, null, 3600],
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
            value: [-45, 180, 6000],

            lineStyle: {
              color: 'yellow'
            }
          },
          {
            value: [-45, null, 6000],
            lineStyle: {
              color: 'yellow'
            }
          }
        ]
      }]
    };
    myChart.setOption(option);

    var myChart1 = echarts.init(document.getElementById('main1'));
    var option1 = {
      textStyle: {
        color: "white"
      },
      tooltip: {
        trigger: 'axis'
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
          name: '最高气温',
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
          name: '最低气温',
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
  },

  filters: {

  },
  methods: {
    getAaa() {
      console.log('取接口')
      this.$axios.get('/pctriangle/find/salepassengerflow/all')
        .then(res => {
          this.passengerFlowList = res

          var areaNameList = []
          var seriesList = [{
              name: '全国各区域客流量',
              type: 'bar',
              label: seriesLabel,
              data: []
            },
            {
              name: '全国各区域销售量',
              type: 'bar',
              label: seriesLabel,
              data: []
            }
          ]
          var params
          for (var i = 0; i < this.passengerFlowList.length; i++) {
            areaNameList.push(this.passengerFlowList[i].areaName)
            seriesList[0].data.push(this.passengerFlowList[i].passengerFlow)
            seriesList[1].data.push(this.passengerFlowList[i].saleroom)
          }

          var myChart3 = echarts.init(document.getElementById('main3'));
          var valueNameList = ['全国各区域客流量', '全国各区域销售量']

          var seriesLabel = {
            normal: {
              show: true,
              textBorderColor: '#fff',
              textBorderWidth: 2
            }
          }
          var option3 = {
            tooltip: {
              trigger: 'axis',
              axisPointer: {
                type: 'shadow'
              }
            },
            legend: {
              data: valueNameList
            },
            grid: {
              left: 50
            },
            toolbox: {
              show: true,
              feature: {
                saveAsImage: {}
              }
            },
            xAxis: {
              type: 'value',
              name: 'Days',
              axisLabel: {
                formatter: '{value}'
              }
            },
            yAxis: {
              type: 'category',
              inverse: true,
              data: areaNameList
            },
            series: seriesList
            // [
            //     {
            //         name: 'City Alpha',
            //         type: 'bar',
            //         data: [165, 170, 30],
            //         label: seriesLabel
            //     },
            //     {
            //         name: 'City Beta',
            //         type: 'bar',
            //         label: seriesLabel,
            //         data: [150, 105, 110]
            //     },
            //     {
            //         name: 'City Gamma',
            //         type: 'bar',
            //         label: seriesLabel,
            //         data: [220, 82, 63]
            //     }
            // ]
          }
          myChart3.setOption(option3)
        }, (err) => { console.log(err) })
    },
    getProjectList() {
      window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
        this.projectList = res
        console.log(this.projectList)
      })
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
    }
  }
}

</script>
<style scoped lang="less">
/*首页左上*/

.left-top {
  width: 100%;
  height: 250px;
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 350px;
  position: relative;
}

.left-top .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 70px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.left-top span {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}

.left-top .lzi {
  color: white;
  text-align: center;
  font-size: 23px;
  position: relative;
  top: 100px;
}

.left-top .lzi i {
  background: #1fa8f3;
  padding: 1px;
  border-radius: 2px;
}

/*首页左中*/

.left-cont {
  width: 100%;
  height: 250px;
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 350px;
  position: relative;
}

.left-cont .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 80px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.left-cont span {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}


/*首页左下*/

.left-bottom {
  width: 100%;
  height: 250px;
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 350px;
  position: relative;
}

.left-bottom .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 120px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.left-bottom span {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}

.left-bottom #main1 {
  position: absolute;
  bottom: -15px;
  left: 20px;
  overflow: hidden;
  width: 85%;
  height: 200px;
  cursor: crosshair;
  color: #fff;
}

.left-bottom .lx {
  position: relative;
  top: 0;
  left: 0;
}

/*首页中上*/

.cont-top {
  width: 100%;
  height: 400px;
  /*background: red;*/
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 300px;
  position: relative;
}

.cont-top .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 70px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.cont-top span {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}

.cont-top .center-cent1 {
  position: absolute;
  top: 20px;
  left: 200px;
}

.cont-top .center-cent1 select {
  border: none;
  border-bottom: 1px solid #fff;
  background: none;
  color: #ede0e0;
  width: 95px;
  border-radius: 0px;
  margin-top: 5px;
}

.cont-top #main {
  position: absolute;
  top: 21%;
  left: 28%;
  overflow: hidden;
  width: 300px;
  height: 300px;
}

.cont-top .cent-btn-left2 {
  position: absolute;
  bottom: 50px;
  left: 100px;
  color: #FFF;
  font-size: 50px;
}

.cont-top .cent-btn-right {
  position: absolute;
  left: 28%;
  width: 300px;
  bottom: 13%;
  color: #FFF;
}

.cont-top .cent-btn-right div {
  display: inline-block;
  font-size: 16px;
  width: 32%;
}

.cont-top .cent-btn-right div:nth-child(1) {
  position: absolute;
  left: 0;
}

.cont-top .cent-btn-right div:nth-child(2) {
  position: absolute;
  left: 43%;
}

.cont-top .cent-btn-right div:nth-child(3) {
  position: absolute;
  left: 85%;
}

/*首页中下*/

.cont-bottom {
  width: 100%;
  height: 370px;
  /*background: red;*/
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 300px;
  position: relative;
}

.cont-bottom .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 90px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.cont-bottom span {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}



/*首页右上*/

.right-top {
  width: 100%;
  height: 280px;
  /*background: red;*/
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 320px;
  position: relative;
}

.right-top .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 50px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.right-top .r1 {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}

.right-top .right-img {
  width: 89%;
  height: 200px;
  position: absolute;
  top: 20px;
  left: 10px;
  background: url("../../assets/images/r_t.png")no-repeat;
  background-size: 100% 100%;
}

.right-top .zi {
  position: absolute;
  bottom: 10px;
  left: 12px;
  color: #fff;
  font-size: 12px;
}























/*首页右中*/

.right-cont {
  width: 100%;
  height: 230px;
  /*background: red;*/
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 320px;
  position: relative;
}

.right-cont .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 30px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.right-cont span {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}

.right-cont p {
  text-align: center;
  color: white;
  font-size: 14px;
  /*line-height: 30px;*/
  position: relative;
  top: 40px;
}


/*首页右下*/

.right-bottom {
  width: 100%;
  height: 250px;
  /*background: red;*/
  background: url("../../assets/images/l_t.png")no-repeat;
  background-size: 100% 100%;
  min-width: 300px;
  position: relative;
}

.right-bottom .xing {
  background: #169bd5;
  height: 20px;
  display: inline-block;
  padding: 3px 40px;
  transform: skew(-45deg);
  position: absolute;
  top: 0;
  left: 20px;
}

.right-bottom .r3-1 {
  position: absolute;
  top: 0;
  left: 30px;
  display: block;
  color: #fff;
}

.right-bottom .r3 {
  position: relative;
  top: 35px;
  left: 170px;
  color: #FFF;
  border-radius: 5px;
  padding: 5px;
  width: 100px;
  height: 20px;
  background: #24aef4;
}

.right-bottom p {
  color: white;
  font-size: 14px;
  /*line-height: 30px;*/
  position: relative;
  top: 60px;
  left: 15px;
}
</style>
