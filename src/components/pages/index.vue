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


          <!-- <div class="select_ct">
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
          </div> -->


          <!-- <div data-v-c2ce7532="" class="el-date-editor el-range-editor el-input__inner el-range-input el-date-editor--daterange el-range-editor--mini">
              <i class="el-input__icon el-range__icon el-icon-date"></i>
              <input placeholder="开始日期" name="" class="el-range-input">
              <span class="el-range-separator">至</span><input placeholder="结束日期" name="" class="el-range-input">
              <i class="el-input__icon el-range__close-icon"></i>
          </div> -->



          <div class="sel_box">
            <div class="left-padding-date f-cb">
              <el-date-picker class="setTimeStyle el-range-input el-range-editor--mini el-range-separator f-fl" size="mini"
                              v-model="value_index" type="daterange" range-separator="至"
                              start-placeholder="开始日期" end-placeholder="结束日期"
                              format="yyyy-MM-dd" value-format="yyyy-MM-dd">
              </el-date-picker>
              <el-button type="primary" class="mr10 ml10 f-fl" size="medium" v-on:click="searchList2Triangle();">搜索
              </el-button>

            </div>

            <div class="left-padding">

              <m-select :tabs="areaList" :clicked="clicked1" v-on:childTab="tabClick1_yyh"></m-select>
              <m-select v-if="isProjectShow" :tabs="projectList" :clicked="clicked2"
                        v-on:childTab="tabClick2_yyh"></m-select>
              <!-- <m-select v-if="isFloorShow" :tabs="projectList" :clicked="clicked2" v-on:childTab="tabClick2"></m-select> -->
              <!-- <m-select :tabs="types" :clicked="clicked7" v-on:childTab="tabClick7"></m-select> -->
              <!-- <m-select v-if="false" :tabs="types" :clicked="clicked7" v-on:childTab="tabClick7"></m-select> -->
              <m-select :tabs="types" :clicked="clicked7" v-on:childTab="tabClick7" selectItem=""></m-select>
            </div>

            <div class="left-padding">

              <!-- <m-select v-if="typeId != 1 && conditionList.length > 0"  :tabs="conditionList" :clicked="clicked5" v-on:childTab="tabClick5"></m-select> -->
              <m-select v-if="isBuildingShow" :tabs="buildingList" :clicked="clicked3"
                        v-on:childTab="tabClick3"></m-select>
              <m-select v-if="isFloorShow" :tabs="floorList" :clicked="clicked4"
                        v-on:childTab="tabClick4_yyh"></m-select>
              <m-select v-if="isOperationShow" :tabs="megabiteList" :clicked="clicked6"
                        v-on:childTab="tabClick6"></m-select>
              <m-select v-if="isCategoryShow" :tabs="categoryList" :clicked="clicked6_category"
                        v-on:childTab="tabClick6_category"></m-select>
              <m-select v-if="isBrandShow" :tabs="brandList" :clicked="clicked8" v-on:childTab="tabClick8"></m-select>


              <!-- <m-select v-if="isBuildingShow" :tabs="types" :clicked="clicked3" v-on:childTab="tabClick3"></m-select>
              <m-select v-if="isFloorShow"  :tabs="types_louceng_test" :clicked="clicked4" v-on:childTab="tabClick4"></m-select>
              <m-select v-if="isOperationShow"  :tabs="types_yetai_test" :clicked="clicked6" v-on:childTab="tabClick6"></m-select>
              <m-select v-if="isBrandShow"  :tabs="types_pinpai_test" :clicked="clicked8" v-on:childTab="tabClick8"></m-select> -->


              <!-- <m-select v-if="isBuildingShow" :tabs="types_empty_test" :clicked="clicked3" v-on:childTab="tabClick3"></m-select>
              <m-select v-if="isFloorShow"  :tabs="types_empty_test" :clicked="clicked4" v-on:childTab="tabClick4"></m-select>
              <m-select v-if="isOperationShow"  :tabs="types_empty_test" :clicked="clicked6" v-on:childTab="tabClick6"></m-select>
              <m-select v-if="isBrandShow"  :tabs="types_empty_test" :clicked="clicked8" v-on:childTab="tabClick8"></m-select> -->

            </div>
          </div>


          <h2 class="center_1_lable">优</h2>
          <div class="center_echars1">
            <!--<span></span>-->
            <div id="main"></div>
          </div>



          <div class="g_notes f-pr">
            <!--<h2>优</h2>-->
            <div class="notes_list f-cb">
              <span><i>{{triangData.triangleRent}}</i>溢租率</span>
              <span><i>{{triangData.triangleGuest}}</i>客销度</span>
              <span><i>{{triangData.triangleFitted}}</i>适配值</span>
            </div>
          </div>
        </div>


        <div class="center_2 f-cb">
          <div class="title_bg tit_center2"></div>
          <span class="title_txt">全国各城市项目品牌总量</span>
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
              <!--<el-button type="primary" size="small">智能推送</el-button>-->
            </el-row>
            <el-row class="f-tac">
              <!--<el-button type="primary" size="small">自助招商</el-button>-->
            </el-row>
          </div>
        </div>
      </el-col>
      <el-col :span="6">
        <div class="right_1 mb20">
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
          <div class="swiper_txt f-cb">
            <div class="f-fl">
              <p>西安鑫苑大都汇</p>
              <p>楼层数：共5层</p>
            </div>
            <div class="f-fr">
              <p>开业时间：2016年12月16日</p>
              <p>面积：12万平方</p>
            </div>
          </div>
        </div>




        <!--<div>-->
          <!--<img class="tidy_img_bg" src="../../assets/images/help_command_bg.png" >-->
          <!--<div class="title_bg tit_right1"></div>-->
          <!--<span class="title_txt">指令措施</span>-->

          <!--<div class="right_2_tidy_bg mt25 ml10">-->
            <!--<img class="tidy_img" src="../../assets/images/left_tidy_titlebg.png" alt="">-->
            <!--<span class="tidy_title_txt">溢租率</span>-->
          <!--</div>-->

          <!--<div class="right_2_tidy_bg mt25 ml10">-->
            <!--<img class="tidy_img" src="../../assets/images/left_tidy_titlebg.png" alt="">-->
            <!--<span class="tidy_title_txt">客销度</span>-->
          <!--</div>-->

          <!--<div class="right_2_tidy_bg mt25 ml70">-->
            <!--<img class="tidy_img" src="../../assets/images/left_tidy_titlebg.png" alt="">-->
            <!--<span class="tidy_title_txt">适配值</span>-->
          <!--</div>-->

        <!--</div>-->


        <!--//没有数据，暂时搭架子有接口数据再细调-->
        <div class="right_2 mb10">
          <div class="title_bg_help tit_right2"></div>
          <span class="title_txt_help">指令措施</span>


          <div class="right_2_tidy_bg mt35 ml10">
            <img class="tidy_img" src="../../assets/images/left_tidy_titlebg.png" alt="">
            <span class="tidy_title_txt">溢租率</span>

            <div class="g_text">
              {{triangData.rentContent}}
            </div>
          </div>


          <div class="right_2_tidy_bg mt110 ml10">
            <img class="tidy_img" src="../../assets/images/left_tidy_titlebg.png" alt="">
            <span class="tidy_title_txt2">客销度</span>
            <div class="g_text">
            {{triangData.guestContent}}
            </div>
          </div>


          <div class="right_2_tidy_bg mt110 ml10">
            <img class="tidy_img" src="../../assets/images/left_tidy_titlebg.png" alt="">
            <span class="tidy_title_txt3">适配值</span>

            <div class="g_text">
            {{triangData.fittedContent}}
            </div>
          </div>

        </div>


        <!--<div class="right_2 mb10">-->
          <!--<div class="title_bg tit_right1"></div>-->
          <!--<span class="title_txt">客销度</span>-->
          <!--<div class="g_text">-->
            <!--{{triangData.guestContent}}-->
          <!--</div>-->
        <!--</div>-->


        <!--<div class="right_3">-->
          <!--<div class="title_bg tit_right1"></div>-->
          <!--<span class="title_txt">建设措施</span>-->
          <!--<el-row class="f-tac">-->
            <!--<el-button type="primary" size="small" class="mr15" @click="triangType = 1">溢租率</el-button>-->
            <!--<el-button type="primary" size="small" @click="triangType = 2">适配值</el-button>-->
          <!--</el-row>-->
          <!--<div class="g_text" v-if="triangType === 1">-->
            <!--{{triangData.rentContent}}-->
          <!--</div>-->
          <!--<div class="g_text" v-if="triangType === 2">-->
            <!--{{triangData.fittedContent}}-->
          <!--</div>-->
        <!--</div>-->


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
        value_index: '',//时间区间
        createTimeBegin: '',
        createTimeEnd: '',

        triangType: 1,
        myChart3: {},
        myChart1: {},
        myChart: {},
        searchForm: {},
        areaId: '',
        areaList: {},
        projectId: '',
        projectList: {},
        projectListNoData: {
          "code": "0",
          "data": [
            {
              "id": "123yyh",
              "name": "没有项目"
            }
          ]
        },

        buildingId: '',
        buildingList: {},
        floorId: '',
        floorList: {},

        megabiteId: '',
        megabiteList: {},
        categoryId:'',
        categoryList: {},
        brandId: '',
        brandList: {},

        conditionId: '',
        conditionList: '',

        typeId: 1,
        triangData: {},
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
        types: [{
          id: 1,
          name: '项目'
        }, {
          id: 2,
          name: '楼层'
        },
          {
            id: 3,
            name: '业态'
          },
          {
            id: 4,
            name: '品牌'
          }],

        types_louceng_test: [{
          id: 1,
          name: '项目_楼层'
        }, {
          id: 2,
          name: '楼层'
        },],

        types_yetai_test: [{
          id: 1,
          name: '项目_业态'
        }, {
          id: 2,
          name: '楼层'
        },],

        types_pinpai_test: [{
          id: 1,
          name: '项目_品牌'
        }, {
          id: 2,
          name: '楼层'
        },],

        types_empty_test: [],

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
        clicked6_category: false,
        clicked7: false,
        clicked8: false,

        isProjectShow: true,
        isBuildingShow: false,
        isFloorShow: false,//楼层
        isOperationShow: false,//业态
        isCategoryShow: false, //业种
        isBrandShow: false,//品牌

        swiperOption: {
          // 如果需要分页器
          pagination: {
            el: '.swiper-pagination',
            clickable: true,
            renderBullet: function (index, className) {
              return '<span class="' + className + '">' + (index + 1) + '</span>';
            },
          },
          initialSlide: 0
        },
        screenWidth: document.body.clientWidth,
        good: 0.25,
        good1: 0.5,
        good2: 0.75,
        good3: 0.95
      }
    },
    created() {
      window.$getAreaList().then((res) => {
        console.log("区域列表数据***" + res)
        this.areaList = res
        this.hintArea2ProjectOne(res[0].id) //yyh
        // this.areaChangedForFloor(res[0].id)
      }, (err) => {
        console.log(err)
      })

      // 查询全国客流量
      this.$axios.get('/dayguest/find/passengerflowall/list')
        .then(res => {
          this.countryPassengerFlow = Number(parseInt(res)/10000).toFixed(2)
        }, (err) => {
          console.log(err)
        })
      // 查询全国销售额
      this.$axios.get('/dayguest/find/saleroomall/list')
        .then(res => {
          // this.countrySalesVolume = (parseInt(res)/10000)+""
          this.countrySalesVolume = Number(parseInt(res)/10000).toFixed(2)
          Number(value).toFixed(2)
        }, (err) => {
          console.log(err)
        })
    },

    watch: {
      screenWidth(val) {
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
      projectList(val) {
        this.projectList = val
        console.log(this.projectList)
      },
      buildingList(val) {
        this.buildingList = val
        console.log(this.buildingList)
      },
      floorList(val) {
        this.floorList = val
        console.log(this.floorList)
      },
      conditionList(val) {
        this.conditionList = val
      },
      megabiteList(val) {
        this.megabiteList = val
      },
      brandList(val) {
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
            formatter: '{value}'
          }
        }],
        series: [{
          name: '全国各区域客流量',
          type: 'line',
          data: [11, 11, 15, 13, 12, 13, 10],
          // markPoint: {
          //   data: [
          //     {type: 'max', name: '最大值'},
          //     {type: 'min', name: '最小值'}
          //   ]
          // },
          markLine: {
            data: [
              {type: 'average', name: '平均值'}
            ]
          }
        },
          {
            name: '全国各区域销售量',
            type: 'line',
            data: [1, -2, 2, 5, 3, 2, 0],
            // markPoint: {
            //   data: [
            //     {name: '周最低', value: -2, xAxis: 1, yAxis: -1.5}
            //   ]
            // },
            markLine: {
              data: [
                {type: 'average', name: '平均值'}
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

      searchList2Triangle() {
        console.log("确认条件***得到所有当前数据，展示三角形")

        if (this.typeId === 1) {//当前维度项目
          console.log("维度为项目***")
          this.getTriangleValue(1)
        }
        if (this.typeId === 2) {//当前维度楼层
          console.log("维度为楼层***")
          this.getTriangleValue(2)

        }
        if (this.typeId === 3) {//当前维度业态
          console.log("维度为业态***")
          this.getTriangleValue(3)

        }
        if (this.typeId === 4) {//当前维度品牌
          console.log("维度为品牌***")
          this.getTriangleValue(4)

        }

      },


      /**
       * 获取当前时间
       * 格式YYYY-MM-DD
       */
      getCurrentDateTime(){
        var date = new Date();
        var seperator1 = "-";
        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var strDate = date.getDate();

        if (month >= 1 && month <= 9) {
          month = "0" + month;
        }
        if (strDate >= 0 && strDate <= 9) {
          strDate = "0" + strDate;
        }
        var strDateOld = strDate -1;
        if (strDateOld >= 0 && strDateOld <= 9) {
          strDateOld = "0" + strDateOld;
        }

        console.log("strDateOld***："+strDateOld)

        var currentdateYesterday = year + seperator1 + month + seperator1 + strDateOld;
        var currentdateToday = year + seperator1 + month + seperator1 + strDate;

        console.log("currentdateYesterday***："+currentdateYesterday)
        console.log("currentdateToday***："+currentdateToday)

        this.createTimeBegin = currentdateYesterday+""
        this.createTimeEnd = currentdateToday+""
        console.log("当前选中的时间区间为***"+this.createTimeBegin+","+this.createTimeEnd)
      },


      getTriangleValue(type) {
        console.log("getTriangleValue方法执行了！")

        var params = {
          projectId: this.projectId
        }

        //undefined,undefined
        // console.log("当前选中的时间区间为***"+this.value_index[0]+","+this.value_index[1])
        if(typeof(this.value_index[0]) == "undefined") {
          console.log("默认值***")
          this.getCurrentDateTime()
          params.createTime = this.createTimeBegin
          params.modifyTime = this.createTimeEnd
        }else {
          console.log("用户选择的值***")
          params.createTime = this.value_index[0]
          params.modifyTime = this.value_index[1]
        }


        console.log("此时的项目id为***" + this.projectId)
        var url = ''
        if (type === 1) {//项目。【yyh已通，默认暂无时间区间】
          // url = '/pctriangle/find/triangleproject/byprojectId'

          url = 'sy/get/project'
          params.projectId = this.projectId

          // params.createTime = this.createTimeBegin
          // params.modifyTime = this.createTimeEnd

        } else if (type === 2) {//楼层
          // params.floorId = this.floorId
          // url = '/pctriangle/find/trianglefloor/byfloorId'
          url = '/sy/get/floor'
          params.projectId = this.projectId
          params.buildingId = this.buildingId
          if(this.floorId === ""){
            alert("此项目没有楼层！")
            return
          }else{
            params.floorId = this.floorId
          }

          // params.createTime = this.createTimeBegin
          // params.modifyTime = this.createTimeEnd


        } else if (type === 3) {//业态
          // url = '/pctriangle/find/trianglecondition/byconditionId'
          // params.conditionId = this.conditionId
          // params.majoId = this.megabiteId
          url = 'sy/get/yetai'
          params.projectId = this.projectId
          if(this.megabiteId === ""){
            alert("此项目没有业态！")
            return
          }else{
            params.formId = this.megabiteId
          }
          // params.createTime = this.createTimeBegin
          // params.modifyTime = this.createTimeEnd


        } else if (type === 4) {//品牌
          // url = '/pctriangle/find/trianglebrand/byBrandId'
          // params.majoId = this.megabiteId
          // params.brandId = this.brandId
          url = 'sy/get/brand'
          params.projectId = this.projectId
          if(this.floorId==="" ||this.megabiteId === "" ||this.categoryId==="" || this.brandId===""){
            alert("此层级数据不全！")
            return
          }else{
            params.buildingId = this.buildingId
            params.floorId = this.floorId
            params.formId = this.megabiteId
            params.speciesId = this.categoryId
            params.contractId = this.brandId
          }


          // params.createTime = this.createTimeBegin
          // params.modifyTime = this.createTimeEnd


        }

        //三角形数据接口
        this.$axios.post(url, params).then((res) => {
          console.log("三角形数据接口数据triangData："+res)
          this.triangData = res
          this.good = (this.triangData.excellentPgeVal - this.triangData.goodPgeVal)/this.triangData.excellentPgeVal
          this.good1 = (this.triangData.excellentPgeVal - this.triangData.promotePgeVal)/this.triangData.excellentPgeVal
          this.good2 = (this.triangData.excellentPgeVal - this.triangData.reasonablePgeVal)/this.triangData.excellentPgeVal
          this.good3 = (this.triangData.excellentPgeVal - this.triangData.lossVal)/this.triangData.excellentPgeVal
        }, (err) => {
          console.log("返回的错误信息："+err)
          alert(err)
        })

      },


      getOption() {
        return {
          textStyle: {
            color: "white"
          },
          parallelAxis: [
            {
              dim: 0,
              name: '溢租率(%)',
              // min: this.triangData.intervalRent.ks,
              // max: this.triangData.intervalRent.yx,
              min: -180,
              max: 400,
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
              // min: this.triangData.intervalGuest.ks,
              // max: this.triangData.intervalGuest.yx,
              min: 0,
              max: this.triangData.excellentPgeVal,
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
                }
              }
            },
            {
              dim: 2,
              name: '适配值',
              // min: this.triangData.intervalFitted.ks,
              // max: this.triangData.intervalFitted.yx,
              min: 0,
              max: 10000,
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
              value: [this.triangData.standardRent > 400 ? 401 : (this.triangData.standardRent < -180 ? -181 : this.triangData.standardRent), this.triangData.standardGuest > this.triangData.excellentPgeVal ? this.triangData.excellentPgeVal + 1 : (this.triangData.standardGuest < 0 ? -1 : this.triangData.standardGuest), this.triangData.standardFitted > 10000 ? 10001 : (this.triangData.standardFitted < 0 ? -1 : this.triangData.standardFitted)],
              lineStyle: {
                color: '#fff'
              }
            },

              {
                value: [this.triangData.standardRent > 400 ? 401 : (this.triangData.standardRent < -180 ? -181 : this.triangData.standardRent), null, this.triangData.standardFitted > 10000 ? 10001 : (this.triangData.standardFitted < 0 ? -1 : this.triangData.standardFitted)],
                lineStyle: {
                  color: '#fff'
                }
              }
            ]
          },
            {
              color: '#fff',
              type: 'parallel',
              lineStyle: {
                width: 3
              },
              data: [{
                value: [this.triangData.triangleRent > 400 ? 401 : (this.triangData.triangleRent < -180 ? -181 : this.triangData.triangleRent), this.triangData.triangleGuest > this.triangData.excellentPgeVal ? this.triangData.excellentPgeVal + 1 : (this.triangData.triangleGuest < 0 ? -1 : this.triangData.triangleGuest), this.triangData.triangleFitted > 10000 ? 10001 : (this.triangData.triangleFitted < 0 ? -1 : this.triangData.triangleFitted)],
                lineStyle: {
                  color: 'yellow'
                  // color: '#fff'
                }
              },
                {
                  value: [this.triangData.triangleRent > 400 ? 401 : (this.triangData.triangleRent < -180 ? -181 : this.triangData.triangleRent), null, this.triangData.triangleFitted > 10000 ? 10001 : (this.triangData.triangleFitted < 0 ? -1 : this.triangData.triangleFitted)],
                  lineStyle: {
                    color: 'yellow'
                    // color: '#fff'
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
            console.log(res);
            console.log("this.passengerFlowList***"+this.passengerFlowList)
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
                    fontSize: 12,
                    align: 'left'
                  }
                },
                data: areaNameList,
              },
              series: seriesList
            }
            this.myChart3.setOption(option3)
          }, (err) => {
            console.log(err)
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
      },

      tabClick1(index, isClicked) {
        this.clicked1 = isClicked
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false
        //如果区域下，没有项目，清空项目数据

        if (this.typeId === 1) {//项目
          this.areaChangedForFloor(this.areaList[index].id)
        } else if (this.typeId === 2) {//
          this.areaChangedForCondition(this.areaList[index].id)
        } else if (this.typeId === 3) {
          this.areaChangedForBrand(this.areaList[index].id)
        }
      },



      tabClick7(index, isClicked) {
        console.log("***维度tabClick7被点击了!")
        console.log("***维度tabClick7的index为" + index)
        console.log("当前选中维度的name为***" + this.types[index].name)
        this.typeId = this.types[index].id
        console.log("当前选中维度的id为***" + this.typeId)

        this.clicked7 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked8 = false
        this.clicked6_category = false

        if (this.typeId === 1) {//项目维度
          console.log("维度为项目***")
          this.isBuildingShow = false
          this.isFloorShow = false
          this.isOperationShow = false
          this.isBrandShow = false
          this.isCategoryShow = false



        }

        if (this.typeId === 2) {//楼层
          console.log("维度为楼层***")
          this.isBuildingShow = false
          this.isFloorShow = true
          this.isOperationShow = false
          this.isBrandShow = false
          this.isCategoryShow = false


          this.getBuildingFloorInfo(this.projectId)

        }

        if (this.typeId === 3) {//业态
          console.log("维度为业态***")

          this.isBuildingShow = false
          this.isFloorShow = false
          this.isOperationShow = true
          this.isBrandShow = false
          this.isCategoryShow = false

          this.getProject2operation(this.projectId)

        }

        if (this.typeId === 4) {
          console.log("维度为品牌***")
          this.isBuildingShow = false
          this.isFloorShow = true
          this.isOperationShow = true
          this.isCategoryShow = true
          this.isBrandShow = true


          this.getBuildingFloorInfo(this.projectId)
          this.getMegabite2category2brand(this.projectId)

        }
      },

      //***************区域被点击【搞定】
      tabClick1_yyh(index, isClicked) {
        this.clicked1 = isClicked
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false
        this.clicked6_category = false

        this.projectId = ''
        this.projectList = {}
        this.getArea2projectInfo(index)
        // if(this.typeId === 1){//项目维度
        //    this.getArea2projectInfo(index)
        // }

      },





      getArea2projectInfo(index) {

console.log("显示区域列表值："+this.areaList)
//         window.$getAreaList().then((res) => {
// console.log("区域列表数据***" + res)
//           this.areaList = res
//
//         }, (err) => {
//           console.log(err)
//         })


        console.log("***区域tabClick1_yyh的name为" + this.areaList[index].name)
        this.areaId = this.areaList[index].id

        window.$getProjectListForArea(this.areaId).then(res => {
          console.log("tabClick1_yyh得到的项目列表数据***" + res)
          console.log("tabClick1_yyh得到的项目列表数据长度***" + res.length)

          if (res.length > 0) {


            this.projectList = res
            this.projectId = res[0].id


            if (this.typeId === 2) {//楼层维度
              this.getBuildingFloorInfo(this.projectId)
            } else if (this.typeId === 3) {//业态维度
              this.getProject2operation(this.projectId)
            } else if (this.typeId === 4) {//品牌维度
              this.getBuildingFloorInfo(this.projectId)
              this.getMegabite2category2brand(this.projectId)
            }


          } else {
            this.projectList = {}
            // this.projectList = this.projectListNoData
            this.isProjectShow = false //没有项目，就隐藏
            console.log("此区域没有项目-------------------------------")
            // alert("此区域没有项目！")
          }
        }, err => {
          console.log(err)
        })


      },


      tabClick2(index, isClicked) {
        this.clicked2 = isClicked
        this.clicked1 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false

        if (this.typeId === 1) {
          this.projectChangedForFloor(this.projectList[index].id)
        } else if (this.typeId === 2) {
          this.projectChangedForCondition(this.projectList[index].id)
        } else if (this.typeId === 3) {
          this.projectChangedForBrand(this.projectList[index].id)
        }
      },

      //项目-点击事件
      tabClick2_yyh(index, isClicked) {
        this.clicked2 = isClicked
        this.clicked1 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false
        this.clicked6_category = false


        this.projectId = this.projectList[index].id
        console.log("***tabClick2_yyh当前项目的id为" + this.projectId)

        if (this.typeId === 2) {//楼层维度
          console.log("项目变化，层级为楼层！")
          this.getBuildingFloorInfo(this.projectId)
        }
        if (this.typeId === 3) {//业态维度
          console.log("项目变化，层级为业态！")
          this.getProject2operation(this.projectId)
        }
        if (this.typeId === 4) {//品牌维度
          console.log("项目变化，层级为品牌！")
          this.getBuildingFloorInfo(this.projectId)
          this.getMegabite2category2brand(this.projectId)
        }


      },



      getProject2operation(projectId) {
        this.projectId = projectId
        // alert("业态业态业态！"+this.projectId)
        window.$getBusinessListForProject(this.projectId).then(res => {
          console.log("***当前业态列表数据为" + res)
          this.megabiteList = res
          console.log("***当前业态列表数据为xxxxx" + this.megabiteList)

          if (res.length>0) {
            if(this.megabiteList[0] === null){
              alert("数据错误!!!")
            }else{
              console.log("***当前业态列表数据name为" + res[0].name)
              this.megabiteId = res[0].id
              this.isOperationShow = true
            }
          } else {
            this.megabiteList = {}
            this.isOperationShow = false
            // alert("此项目没有业态！")
            console.log("此项目没有业态-------------------------")

            this.isCategoryShow = false
            this.isBrandShow = false

          }

        }, err => {
          console.log(err)
        })
      },



      getBuildingFloorInfo(projectId) {
        console.log("***getBuildingFloorInfo*projectId" + projectId)
        this.projectId = projectId
        window.$getBuilding(this.projectId).then(res => {
          console.log("***当前楼栋列表的数据：" + res)
          this.buildingList = res
          this.buildingId = res[0].id

          window.$getFloorForBuilding(this.buildingId).then(res => {
            console.log("***当前楼层列表的数据长度：" + res.length)
            if (res.length > 0) {
              console.log("***当前楼层列表的数据：" + res)
              this.isFloorShow = true
              this.floorList = res
              this.floorId = this.floorList[0].id
            } else {
              this.floorList = {}
              this.floorId = ""
              this.isFloorShow = false
              console.log("没有楼层数据--------------------------")
              // alert("当前项目暂时没有楼层数据！")
            }
          }, err => {
            console.log(err)
          })

        }, err => {
          console.log(err)
        })
      },


      tabClick3(index, isClicked) {
        this.clicked3 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false
        this.clicked6_category = false

        this.buildingChanged(this.buildingList[index].id)
      },

      tabClick4(index, isClicked) {
        this.clicked4 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false

        if (this.typeId === 2) {
          this.conditionChangedForCondition(this.conditionList[index].id)
        } else if (this.typeId === 3) {
          this.projectChangedForBrand(this.conditionList[index].id)
        }
      },


      tabClick4_yyh(index, isClicked) {
        console.log("tabClick4_yyh楼层下拉列表被点击！")
        this.clicked4 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false
        this.clicked6_category = false

        console.log("当前楼层名***" + this.floorList[index].name)

        if (this.typeId === 2) {

          this.floorId = this.floorList[index].id
        }
        if (this.typeId === 4) {

          this.floorId = this.floorList[index].id
        }

      },


      tabClick5(index, isClicked) {
        this.clicked5 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false
        this.clicked6_category = false

        if (this.typeId === 2) {
          this.conditionChangedForCondition(this.conditionList[index].id)
        } else if (this.typeId === 3) {
          this.conditionChangedForBrand(this.conditionList[index].id)
        }
      },


      tabClick6(index, isClicked) {
        console.log("***业态点击事件被触发_tabClick6")

        this.clicked6 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked7 = false
        this.clicked8 = false
        this.clicked6_category = false

        console.log("当前业态名***" + this.megabiteList[index].name)

        if (this.typeId === 3) {

          this.megabiteId = this.megabiteList[index].id
        }
        if (this.typeId === 4) {

          this.megabiteId = this.megabiteList[index].id

          this.getBusinessFormat2BusinessCategoryList()
        }


      },





      tabClick6_category(index, isClicked) {
        console.log("***业种点击事件被触发_tabClick6_category")
        this.clicked6_category = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked8 = false


        this.categoryId = this.categoryList[index].id
        if (this.typeId === 4) {
          this.getBusinessCategory2Brand()
        }

      },



      getMegabite2category2brand(projectId) {
        this.projectId = projectId
        // alert("品牌品牌品牌!"+this.projectId)

        window.$getBusinessListForProject(this.projectId).then(res => {
          if (res.length > 0) {
            this.isOperationShow = true
            this.megabiteList = res
            console.log("getBusinessListForProject*当前业态列表数据为" + res)
            this.megabiteId = res[0].id
            // alert("当前业态名："+res[0].name)

            this.getBusinessFormat2BusinessCategoryList()

          } else {
            this.isOperationShow = false
            this.megabiteList = {}
            // alert("此项目没有业态！")
            console.log("此项目没有业态--------------------------")

            this.isCategoryShow = false
            this.isBrandShow = false
            this.categoryList = {}
            this.brandList = {}
          }
        }, err => {
          console.log(err)
        })

      },



      getBusinessFormat2BusinessCategoryList(){

        window.$getSpeciesSelect(this.megabiteId).then((res) => {
          if (res.length > 0) {
            this.isCategoryShow = true
            console.log("业种数据："+res)
            this.categoryList = res

            this.categoryId = res[0].id

            this.getBusinessCategory2Brand()

          }else{
            console.log("当前没有业种数据--------------------------")
            this.isCategoryShow = false
            this.categoryList = {}
          }
        }, (err) => {
          this.showAlert(err)
        })

      },



      getBusinessCategory2Brand(){

        window.$getBrandForSpecies_standard(this.categoryId).then(res => {
          console.log("***品牌列表数据为" + res)
          if (res.length > 0) {
            this.isBrandShow = true
            this.brandList = res
            this.brandId = res[0].id
          } else {
            this.isBrandShow = false
            console.log("当前没有品牌数据--------------------------")
            // alert("当前没有品牌数据")
            this.brandList = {}
          }
        }, err => {
          console.log(err)
        })

      },




      tabClick8(index, isClicked) {
        console.log("tabClick8品牌下拉列表被点击！")
        this.clicked8 = isClicked
        this.clicked1 = false
        this.clicked2 = false
        this.clicked3 = false
        this.clicked4 = false
        this.clicked5 = false
        this.clicked6 = false
        this.clicked7 = false
        this.clicked6_category = false

        console.log("当前品牌名***" + this.brandList[index].name)

        if (this.typeId === 4) {
          this.brandId = this.brandList[index].id
        }


      },


      areaChangedForFloor(areaId) { // 区域改变
        this.areaId = areaId
        window.$getProjectListForArea(this.areaId).then(res => {
          console.log("项目列表数据***" + res)
          // if(res.length===0){
          // this.projectList = []
          // }else{
          //this.projectList = {}//清空项目数据
          this.projectList = res
          console.log("项目数据projectList***" + projectList)
          this.projectId = res[0].id
          console.log(res[0].id)
          // }
          window.$getBuilding(this.projectId).then(res => {
            this.buildingList = res
            this.buildingId = res[0].id
            window.$getFloorForBuilding(this.buildingId).then(res => {
              if (res != '') {
                this.floorList = res
                this.floorId = res[0].id
                console.log(res[0].id)
                this.getTriangleValue(1)
              }
            }, err => {
              console.log(err)
            })

          }, err => {
            console.log(err)
          })

        }, err => {
          console.log(err)
        })

      },


      hintArea2ProjectOne(areaId) {
        this.areaId = areaId
        window.$getProjectListForArea(this.areaId).then(res => {
          console.log("项目列表数据***" + res)
          this.projectList = res
          this.projectId = res[0].id
          this.getTriangleValue(1)
        }, err => {
          console.log(err)
        })
      },

      // handleCurrentChange (val) {
      //   // this.data.unitList.page = val
      //   // this.searchList()
      //   this.projectList = {}
      // },


      projectChangedForFloor(projectId) { // 项目改变
        this.projectId = projectId
        window.$getBuilding(this.projectId).then(res => {
          this.buildingList = res
          this.buildingId = res[0].id
          window.$getFloorForBuilding(this.buildingId).then(res => {
            this.floorList = res
            this.floorId = res[0].id
            this.getTriangleValue(1)
          }, err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        })
      },

      buildingChanged(buildingId) { // 楼栋改变
        this.buildingId = buildingId
        window.$getFloorForBuilding(this.buildingId).then(res => {
          this.floorList = res
          this.floorId = res[0].id
          this.getTriangleValue(1)
        }, err => {
          console.log(err)
        })
      },
      floorChanged() { // 楼层改变
        window.$getFloorForBuilding(this.buildingId).then(res => {
          this.floorList = res
          this.floorId = res[0].id
          this.getTriangleValue(1)
        }, err => {
          console.log(err)
        })
      },
      areaChangedForCondition(areaId) {
        this.areaId = areaId
        window.$getProjectListForArea(this.areaId).then(res => {
          this.projectList = res
          this.projectId = res[0].id
          window.$getBusinessListForProject(this.projectId).then(res => {
            this.conditionList = res
            this.conditionId = res[0].id
            this.getTriangleValue(2)
          }, err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        })
      },
      projectChangedForCondition(projectId) {
        this.projectId = projectId
        window.$getBusinessListForProject(this.projectId).then(res => {
          this.conditionList = res
          this.conditionId = res[0].id
          this.getTriangleValue(2)
        }, err => {
          console.log(err)
        })
      },
      conditionChangedForCondition(conditionId) {
        this.conditionId = conditionId
        this.getTriangleValue(2)
      },
      areaChangedForBrand(areaId) {
        this.areaId = areaId
        window.$getProjectListForArea(this.areaId).then(res => {
          this.projectList = res
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
              }, err => {
                console.log(err)
              })
            }, err => {
              console.log(err)
            })
          }, err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        })
      },
      projectChangedForBrand(projectId) {
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
            }, err => {
              console.log(err)
            })
          }, err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        })
      },
      conditionChangedForBrand(conditionId) {
        this.conditionId = conditionId
        window.$getSpeciesSelect(this.conditionId).then(res => {
          this.megabiteList = res
          this.megabiteId = res[0].id
          window.$getBrandForSpecies(this.megabiteId).then(res => {
            this.brandList = res
            this.brandId = res[0].id
            this.getTriangleValue(3)
          }, err => {
            console.log(err)
          })
        }, err => {
          console.log(err)
        })
      },

      megabiteChangedForBrand(megabiteId) {
        this.megabiteId = megabiteId
        window.$getBrandForSpecies(this.megabiteId).then(res => {
          this.brandList = res
          this.brandId = res[0].id
          this.getTriangleValue(3)
        }, err => {
          console.log(err)
        })
      },

      brandChangedForBrand(brandId) {
        this.brandId = brandId
        this.getTriangleValue(3)
      },


    }
  }

</script>

//scoped
<style lang="less">
  .g_ct {
    height: 100%;
    position: relative;
    padding: 0 50px;
    box-sizing: border-box;
  }

  .left_1,
  .left_3,
  /*.right_2,*/
  .right_3 {
    padding: 10px 15px;
    box-sizing: border-box;
    width: 100%;
    min-height: 250px;
    /*min-height: 300px;*/
    position: relative;
  }

  //帮扶最小限制
  .right_2{
    padding: 10px 15px;
    box-sizing: border-box;
    width: 100%;
    /*min-height: 250px;*/
    min-height: 495px;
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
    background: url("../../assets/images/left.png") no-repeat;
    background-size: 100% 100%;
  }

  .right_1 {
    background: url("../../assets/images/left.png") no-repeat;
    background-size: 100% 100%;
  }

  .right_2,
  .right_3 {
    /*background: url("../../assets/images/left.png") no-repeat;*/
    background: url("../../assets/images/help_command_bg.png") no-repeat;
    background-size: 105% 100%;
  }

  .right_2_tidy_bg{
    background-size: 100% 100%;
  }

  .tidy_img {
    vertical-align: middle;
    width: 97%;
    height: 120%;
  }

  .tidy_img_bg {
    width: 105%;
    height: 495px;
  }

  .tidy_title_txt {
    position: absolute;
    top: 13%;
    left: 11%;
    display: block;
    color: #fff;
    font-size: 14px;
    z-index: 999;
  }

  .tidy_title_txt2 {
    position: absolute;
    top: 41%;
    left: 11%;
    display: block;
    color: #fff;
    font-size: 14px;
    z-index: 999;
  }

  .tidy_title_txt3 {
    position: absolute;
    top: 69%;
    left: 11%;
    display: block;
    color: #fff;
    font-size: 14px;
    z-index: 999;
  }




  .center_1 {
    min-height: 450px;
    background: url("../../assets/images/center_1.png") no-repeat;
    background-size: 100% 100%;
    position: relative;
    padding: 10px 15px;
    box-sizing: border-box;
    .sel_box{
      height: 110px;
      position: relative;
    }
  }

  .center_2 {
    min-height: 402px;
    background: url("../../assets/images/center_2.png") no-repeat;
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
    top: -2px;
    left: 10px;
    color: #fff;
    font-size: 14px;
    z-index: 99;
    &.tit_left1 {
      padding: 3px 70px;
    }
    &.tit_left2 {
      padding: 3px 90px;
    }
    &.tit_left3 {
      padding: 3px 125px;
    }
    &.tit_center1 {
      padding: 3px 65px;
    }
    &.tit_center2 {
      padding: 3px 100px;
    }
    &.tit_right1 {
      padding: 3px 50px;
    }
  }


  .title_bg_help {
    background: #169bd5;
    height: 20px;
    display: inline-block;
    transform: skew(-45deg);
    position: absolute;
    top: -1px;
    left: 10px;
    color: #fff;
    font-size: 14px;
    z-index: 99;
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
    &.tit_right2 {
      padding: 3px 50px;
    }
  }


  .title_txt {
    position: absolute;
    top: -1px;
    left: 30px;
    display: block;
    color: #fff;
    font-size: 14px;
    z-index: 999;
  }

  .title_txt_help {
    position: absolute;
    top: -1px;
    left: 30px;
    display: block;
    color: #fff;
    font-size: 14px;
    z-index: 999;
  }

  .left_1 {
    position: relative;
    .lzi {
      width: 243px;
      color: #fff;
      font-size: 22px;
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translate(-50%,-50%);
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
    #main1 {
      width: 100%;
      /*min-height: 230px;*/
      /*width: 30%;*/
      min-height: 200px;
    }
  }

  .center_1 {
    .center_echars1,
    #main {
      margin: 0 auto;
      width: 400px;
      min-height: 280px;
    }
    h2 {
      position: absolute;
      font-size: 36px;
      color: #fff;
      margin: 0 0 20px 10%;
    }
    .notes_list {
      width: 420px;
      margin: 0 auto;
      padding-right: 40px;
      span {
        color: #fff;
        font-size: 14px;
        float: left;
        width: 33.33%;
        text-align: center;
      }
      i {
        display: inline-block ;
      }
    }
  }


  .center_1 h2 {
    position: absolute;
    font-size: 36px;
    color: #fff;
    bottom: 20px;
    left: -20px;
  }

  .center_1_lable {
    display: inline-block;
    vertical-align: bottom;
  }


  .center_2_lable {
    display: inline-block;
  }

  .center_2 {
    .center_echars2 {
      width: 65%;
      height: 382px;
      line-height: 382px;
      img {
        max-width: 100%;
        height: auto;
      }
    }
    #china {
      height: 382px;
    }
    .g_place {
      width: 35%;
      li {
        overflow: hidden;
        color: #fff;
        line-height: 30px;
      }
      b {
        width: 28%;
        float: left;
        font-weight: 400;
      }
      span {
        width: 50%;
        float: left;
        padding-top: 12px;
        s {
          display: inline-block;
          vertical-align: middle;;
          height: 5px;
          background-color: #fff;
          border-radius: 1px;
        }
      }
      em {
        float: left;
        padding-left: 10px;
        display: inline-block;
      }
    }
  }

  .right_1 {
    padding-top: 30px;
    .mySwiper_list {
      height: 310px;
    }
    .swiper_txt {
      color: #fff;
      margin: -45px 3% 0;
      font-size: 16px;
      &>div{
        &.f-fl{
          width: 35%;
        }
        &.f-fr{
          width: 57%;
        }
        p{
          text-align: left;
          font-size: 12px;
        }
      }

    }
    .img {
      height: 250px;
      margin: 0 auto;
      text-align: center;
      img {
        width: 282px;
        height: 100%;
      }
    }
  }

  .swiper-pagination-fraction, .swiper-pagination-custom, .swiper-container-horizontal > .swiper-pagination-bullets {
    top: 0;
    right: 5%;
    left: auto;
    bottom: auto;
  }

  .swiper-pagination {
    text-align: right;
  }

  .swiper-container-horizontal > .swiper-pagination-bullets .swiper-pagination-bullet {
    margin: 0;
  }

  .right_2 {
    .g_text {
      padding: 30px 40px;
      color: #fff;
      font-size: 14px;
      line-height: 26px;
    }
  }

  .right_3 {
    padding-top: 30px;
    .g_text {
      padding: 20px 40px;
      color: #fff;
      font-size: 14px;
      line-height: 26px;
    }
  }

  .r-tab {
    position: absolute;
    right: 50px;
  }

  .left-padding {
    padding: 1px 20px 2px 175px;
    margin: 0 !important;
  }

  .left-padding-date {
    padding: 1px 20px 2px 175px;
    margin: 0 !important;
  }

  .select_result {
    overflow: hidden !important;
    text-overflow: ellipsis !important;
    white-space: nowrap !important;
    width: 80% !important;
  }


  .setTimeStyle {
    background-color: transparent !important;
    background: transparent !important;
    .el-range-input {
      background-color: transparent !important;
      color: #ffffff;
    }
  }

  .el-range-editor--mini {
    height: 28px;
    width: 275px !important;
    .el-range-separator {
      color: #fff;
    }
  }


</style>

