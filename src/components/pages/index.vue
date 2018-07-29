<template>
  <div>
    <div class="index-box">
      <!--首页左边页面布局-->
      <div class="left-box">
        <div class="left-top">
          <div class="left-top-t1">
            <p>全国各项目总量</p>
          </div>
          <p>销售：500,000万元 </p>
          <p>客流：50,000万人次 </p>
        </div>
        <div class="left-cent">
          <div class="left-top-t2">
            <p>全国各区域客流量排行</p>
          </div>
          <div class="left-cent-t1">
            <p class="p1"><i></i><span>全国各区域客流量</span></p>
            <p class="p2"><i></i><span>全国各区域销售量</span></p>
          </div>
          <div class="left-cent-t2">
            <ul>
              <li>
                <i class="i1">01</i>
                <span>华北区域</span>
                <span class="span1">
                  <p class="p1"></p>
                  <p class="p2"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                  <p>300</p>
                </i>
              </li>
              <li>
                <i class="i1">02</i>
                <span>华南区域</span>
                <span class="span1">
                  <p class="p1"></p>
                  <p class="p2"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                  <p>300</p>
                </i>
              </li>
              <li>
                <i class="i1">03</i>
                <span>华西南区域</span>
                <span class="span1">
                  <p class="p1"></p>
                  <p class="p2"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                  <p>300</p>
                </i>
              </li>
              <li>
                <i class="i1">04</i>
                <span>华西区域</span>
                <span class="span1">
                  <p class="p1"></p>
                  <p class="p2"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                  <p>300</p>
                </i>
              </li>
              <li>
                <i class="i1">05</i>
                <span>华中区域</span>
                <span class="span1">
                  <p class="p1"></p>
                  <p class="p2"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                  <p>300</p>
                </i>
              </li>
              <li>
                <i class="i1">06</i>
                <span>华东区域</span>
                <span class="span1">
                  <p class="p1"></p>
                  <p class="p2"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                  <p>300</p>
                </i>
              </li>
            </ul>
          </div>
        </div>
        <div class="left-btn">
          <div class="left-top-t3">
            <p>全国销售额与客流量增长趋势统计</p>
          </div>
          <div class="left-btn-t1">
            <p class="p1"><i></i><span>全国各区域客流量</span></p>
            <p class="p2"><i></i><span>全国各区域销售量</span></p>
          </div>

        </div>
      </div>
      <!--首页中间页面布局-->
      <div class="center-box">
        <div class="center-box-top">
          <div class="center-top-t1">
            <p>三角理论统计</p>
          </div>
          <div class="center-cent1">
            <div class="left">
              <select>
                <option value="华北区域">华北区域</option>
                <option value="华南区域">华南区域</option>
                <option value="华西南区域">华西南区域</option>
                <option value="华中地区">华中地区</option>
              </select>
              <select>
                <option value="北京">北京</option>
                <option value="沈阳">沈阳</option>
                <option value="上海">上海</option>
                <option value="广州">广州</option>
              </select>
              <select>
                <option value="全部项目">全部项目</option>
                <option value="项目一">项目一</option>
                <option value="项目二">项目二</option>
                <option value="项目三">项目三</option>
              </select>
            </div>
            <div class="right">
              <select>
                <option value="全部楼层">全部楼层</option>
                <option value="一层">一层</option>
              </select>
              <select>
                <option value="全部业态">全部业态</option>
                <option value="服装类">服装类</option>
              </select>
              <select>
                <option value="全部品牌">全部品牌</option>
                <option value="A&amp;F">A&amp;F</option>
                <option value="杰克琼斯">杰克琼斯</option>
                <option value="斯莱德">斯莱德</option>
              </select>
            </div>
            <!--<div class="cent-img"></div>-->
            <div id="main" style="width: 200px;height:200px;"></div>
            <div class="cent-btn">
              <div class="cent-btn-left">
                <div class="cent-btn-left1">综合评估</div>
                <div class="cent-btn-left2">优</div>
              </div>
              <div class="cent-btn-right">
                <ul>
                  <li><div>10P</div><p>溢租率</p></li>
                  <li><div>10P</div><p>客销度</p></li>
                  <li><div>10P</div><p>适配值</p></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div class="center-box-btn">
          <div class="center-btn-t1">
            <p>全国各城市项目品牌总量</p>
          </div>
          <div class="center-btn-left"></div>
          <div class="cent-top-t2">
            <ul>
              <li>
                <span>华北区</span>
                <span class="span1">
                  <p class="p1"></p>
                </span>
                <i class="i2">
                  <p>500</p>
                </i>
              </li>
              <li>
                <span>华中区</span>
                <span class="span1">
                  <p class="p1"></p>
                </span>
                <i class="i2">
                  <p>400</p>
                </i>
              </li>
              <li>
                <span>华东区</span>
                <span class="span1">
                  <p class="p1"></p>
                </span>
                <i class="i2">
                  <p>300</p>
                </i>
              </li>
              <li>
                <span>华南区</span>
                <span class="span1">
                  <p class="p1"></p>
                </span>
                <i class="i2">
                  <p>200</p>
                </i>
              </li>
              <li>
                <span>华西北区</span>
                <span class="span1">
                  <p class="p1"></p>
                </span>
                <i class="i2">
                  <p>100</p>
                </i>
              </li>
              <li>
                <span>华西南区</span>
                <span class="span1">
                  <p class="p1"></p>
                </span>
                <i class="i2">
                  <p>100</p>
                </i>
              </li>
            </ul>

          </div>
        </div>
      </div>
      <!--首页右边页面布局-->
      <div class="right-box">
        <div class="right-top">
          <div class="right-top-t1">
            <p>项目预览</p>
          </div>
          <div class="right-img"></div>
          <div class="right_img1"></div>
          <span>西安鑫苑大都汇 &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp &nbsp</span>
          <span>楼层数：共5层</span><br>
          <span>开始时间：2016年12月16日 &nbsp &nbsp &nbsp &nbsp &nbsp</span>
          <span>面积：12万平方</span>
        </div>
        <div class="right-cent">
          <div class="right-cent-t2">
            <p>客销度</p>
          </div>
          <p class="r2">E1：短期下调租金培育品牌经营</p>
          <p class="r2">E2:辅助品牌经营</p>
          <p class="r2">E3:分析品牌下降原因</p>
          <p class="r2">E4:下调租金</p>
          <p class="r2">E5:品牌淘汰</p>
        </div>
        <div class="right-bottom">
          <div class="right-bottom-t2">
            <p>建议措施</p>
          </div>
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
  components: {

  },
  data () {
   return{

   }
  },
  created(){
   /* this.$http.post("http://123.207.169.220:8080/tissue/employee/login", {
      "userName": "admin",
      "userPassword": "admin"
    })
      .then((data) => {
        this.arrs = data.body;
        window.Vue.http.headers.common['accessToken'] = data.body.data.accessToken;
      })
    this.$http.post("http://123.207.169.220:8080/region/find/project/list?p=1&c=10", {})
      .then((data) => {
        // console.log(data)
        this.arrs2 = data.body;
      })*/
  },
  mounted () {
    var myChart = echarts.init(document.getElementById('main'));
    var option = {
      legend: {
        data:['流量','降雨量'],
        x: 'left'
      },
      parallelAxis: [
        {dim: 0, name: '溢租率(%)',min:-100,max:100,
          axisLine:{
            lineStyle:{
              width:10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'blue' // 0% 处的颜色
                }, {
                  offset: 0.33, color: 'green' // 100% 处的颜色
                },
                  {
                    offset: 0.66, color: 'yellow' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'red' // 0% 处的颜色
                  }],
                globalCoord: true // 缺省为 false
              }
            },
          }
        },
        {dim: 1, name: '客销率',min:-50,max:200,
          axisLine:{
            lineStyle:{
              width:10,
              color: {
                type: '',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'blue' // 0% 处的颜色
                }, {
                  offset: 0.25, color: 'green' // 100% 处的颜色
                },
                  {
                    offset: 0.5, color: 'yellow' // 0% 处的颜色
                  },
                  {
                    offset: 0.75, color: 'white' // 0% 处的颜色
                  }],
                globalCoord: true // 缺省为 false
              }
            }
          }
        },
        {dim: 2, name: '适配度',min:0,max:8000,
          axisLine:{
            textStyle:{
              opacity:0.5
            },
            lineStyle:{
              width:10,
              color: {
                type: 'linear',
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [{
                  offset: 0, color: 'blue' // 0% 处的颜色
                }, {
                  offset: 0.33, color: 'green' // 100% 处的颜色
                },
                  {
                    offset: 0.66, color: 'yellow' // 0% 处的颜色
                  },
                  {
                    offset: 1, color: 'red' // 0% 处的颜色
                  }],
                globalCoord: false // 缺省为 false
              }
            }
          }}
      ],
      parallel: {                         // 这是『坐标系』的定义
        left: '8%',                     // 平行坐标系的位置设置
        right: '8%',
        bottom: '20%',
        top: '20%',
        parallelAxisDefault: {          // 『坐标轴』的公有属性可以配置在这里避免重复书写
          type: 'value',
          nameLocation: 'end',
          nameGap: 20,
          opacity:0.6,
        }
      },
      series: [{
        type: 'parallel',
        lineStyle: {
          width: 3
        },
        data: [
          {
            value:[-20, 130, 3600],
            lineStyle:{
              color:'blue'
            }
          },
          {
            value:[-20, null,3600],
            lineStyle:{
              color:'blue'
            }
          }
        ]
      },{
        color:'#333',
        type: 'parallel',
        lineStyle: {
          width: 3
        },
        data: [
          {
            value:[-45, 180, 6000],
            lineStyle:{
              color:'red'
            }
          },
          {
            value:[-45, null, 6000],
            lineStyle:{
              color:'red'
            }
          }
        ]
      }]
    };
    // 使用刚指定的配置项和数据显示图表。
    myChart.setOption(option);


  },
  filters: {
  },
  methods: {

  }
}
</script>

<style scoped  lang="less">
  .index-box{
    width: 100%;
    /*首页左边样式布局样式表*/
    .left-box{
      width: 25%;
      height: auto;
      float: left;
      .left-top{
        width: 100%;
        height:100px;
        margin-left: 5px;
        background-image: url("../../assets/images/l_t.png");
        background-size:100% 100px;
        .left-top-t1{
          width: 190px;
          height: 28px;
          margin-left: 7px;
          background: url("../../assets/images/l_t1.png");
          p{
            text-align: center;
            color: white;
            font-size: 16px;
            line-height: 30px;
          }
        }
        p{
          color: white;
          margin-top: 10px;
          text-align: center;
        }
      }
      .left-cent{
        width: 100%;
        height:280px;
        margin-top: 15px;
        margin-left: 5px;
        background: url("../../assets/images/l_t.png");
        background-size:100% 280px;
        .left-top-t2{
          width: 190px;
          height: 28px;
          margin-left: 7px;
          background: url("../../assets/images/l_t1.png");
          p{
            text-align: center;
            color: white;
            font-size: 14px;
            line-height: 30px;
          }
        }
        .left-cent-t1{
          width: 80%;
          height: 30px;
          margin-left: 45px;
          margin-top: 15px;
          .p1{
            float: left;
            span{
              float: left;
              color: white;
              margin-left: 3px;
              font-size: 12px;
            }
          }
          .p1 i{
            width: 10px;
            height: 10px;
            margin-top: 3px;
            display: block;
            clear: both;
            margin-left: 35px;
            float: left;
            background: blue;
          }
          .p2{
            float: left;
            span{
              float: left;
              color: white;
              margin-left: 3px;
              font-size: 12px;
            }
          }
          .p2 i{
            width: 10px;
            height: 10px;
            display: block;
            margin-top: 3px;
            clear: both;
            float: left;
            margin-left: 5px;
            background: green;
          }
        }
        .left-cent-t2{
          width: 85%;
          height: 200px;
          margin-left: 25px;
          ul li{
            width: 100%;
            height: 30px;
            margin-top: 2px;
            .i1{
              float: left;
              display: block;
              width: 25px;
              height: 25px;
              text-align: center;
              font-size: 16px;
              line-height:25px;
              color: white;
              background: rgba(22, 155, 213, 1);
              border-radius: 5px;
            }
            span{
              float: left;
              display: block;
              margin-left: 15px;
              line-height: 25px;
              color: white;
              font-size: 14px;
            }
            .span1{
              display: block;
              float: left;
              width: 90px;
              height: 32px;
              margin-left: 10px;
              .p1{
                width: 100%;
                height: 5px;
                background: blue;
                margin-top: 10px;
              }
              .p2{
                width: 50%;
                height: 5px;
                background: green;
                margin-top: 5px;
              }
            }
            .i2{
              display: block;
              float: right;
              width: 40px;
              height: 32px;
              p{
                width: 100%;
                height:8px;
                margin-top: 5px;
                font-size: 13px;
                color: white;
                text-align: center;
              }
            }
          }
        }
      }
      .left-btn{
        width: 100%;
        height:157px;
        margin-left: 5px;
        background: url("../../assets/images/l_t.png");
        background-size:100% 157px;
        .left-top-t3{
          width: 65%;
          height: 28px;
          background: url("../../assets/images/l_t1.png");
          background-size: 100%;
          p{
            text-align: center;
            color: white;
            font-size: 10px;
            line-height: 30px;
          }
        }
        .left-btn-t1{
          width: 80%;
          height: 30px;
          margin-top: 3px;
          margin-left: 38px;
          .p1{
            float: left;
            span{
              float: left;
              color: white;
              margin-left: 3px;
              font-size: 12px;
            }
          }
          .p1 i{
            width: 10px;
            height: 10px;
            margin-top: 3px;
            display: block;
            clear: both;
            float: left;
            margin-left: 50px;
            background: blue;
          }
          .p2{
            float: left;
            span{
              float: left;
              color: white;
              margin-left: 3px;
              font-size: 12px;
            }
          }
          .p2 i{
            width: 10px;
            height: 10px;
            display: block;
            margin-top: 3px;
            clear: both;
            float: left;
            background: green;
          }
        }
      }
    }
    /*首页中间样式布局样式表*/
    .center-box{
      width: 50%;
      height: auto;
      float: left;
      .center-box-top{
        width: 100%;
        background-image: url("../../assets/images/l_t.png");
        background-size:100% 100%;
        .center-top-t1{
          width: 190px;
          height: 28px;
          margin-left:15px;
          background: url("../../assets/images/l_t1.png");
          p{
            text-align: center;
            color: white;
            font-size: 16px;
            line-height: 30px;
          }
        }
        .center-cent1{
          height: 300px;
          margin-left: -50px;
          select{
            width: 90px;
            height: 25px;
            font-size: 10px;
            background: transparent;
            color: white;
            float: left;
            margin-left: 10px;
            margin-top: 5px;
            position: relative;
            left: 160px;
            top: -16px;
            option{
              background: transparent;
              color: black;
            }
          }
          .left{
            margin-left: 80px;
          }
          .right{
            margin-left: 80px;
            clear: both;
          }
          /*.cent-img{*/
            /*width: 35%;*/
            /*height: 110px;*/
            /*background: url("../../assets/images/cent.png");*/
            /*margin-top: 30px;*/
            /*margin-left: 280px;*/
            /*background-size: 100% 110px;*/
          /*}*/
          .cent-btn{
            width: 85%;
            height: 130px;
            margin-left: 80px;
          }
          .cent-btn-left{
            width: 180px;
            height: 130px;
            position: absolute;
            .cent-btn-left1{
              width: 60%;
              height: 50px;
              position: relative;
              top: -25px;
              text-align: center;
              color: white;
              font-size: 16px;
              line-height: 55px;
              float: left;
            }
            .cent-btn-left2{
              width: 40%;
              height: 50px;
              float: left;
              color: white;
              text-align: center;
              font-weight: bold;
              font-size: 50px;
              line-height: 10px;
            }
          }
          .cent-btn-right{
            width: 80%;
            height: 80px;
            float: right;
            /*background: red;*/
            margin-top: -33px;
            ul li{
              display: block;
              float: left;
              width:50px;
              height: 50px;
              background: rgba(22, 155, 213, 1);
              margin-left: 60px;
              margin-top: 11px;
              border-radius: 50%;
              div{
                width: 30px;
                height: 30px;
                background: white;
                margin-top: 10px;
                margin-left: 10px;
                border-radius: 50%;
                text-align: center;
                line-height: 30px;
                font-size: 16px;
              }
              p{
                text-align: center;
                color: white;
                line-height: 50px;
                font-size: 15px;
              }
            }
          }
          #main{
            position: relative;
            overflow: hidden;
            width: 200px;
            height: 200px;
            padding: 0px;
            margin: 0px;
            border-width: 0px;
            cursor: crosshair;
            left: -100px;
            top:15px;
            /*background: pink;*/
            color:#fff;
          }
        }
      }
      .center-box-btn{
        width: 100%;
        height: 104%;
        background-image: url("../../assets/images/l_t.png");
        background-size:100% 104%;
        .center-btn-t1{
          width: 200px;
          height: 28px;
          margin-left:5px;
          background: url("../../assets/images/l_t1.png");
          background-size: 100%;
          p{
            text-align: center;
            color: white;
            font-size: 10px;
            line-height: 30px;
          }
        }
        .center-btn-left{
          width: 50%;
          height:198px;
          margin-left: 33px;
          background:url("../../assets/images/ditu.png");
          background-size: 100% 100%;
        }
        .cent-top-t2{
          width: 85%;
          height: 200px;
          float: right;
          margin-top: -209px;
          margin-right: -300px;
          ul li{
            width: 100%;
            height: 30px;
            margin-top: 2px;
            .i1{
              float: left;
              display: block;
              width: 25px;
              height: 25px;
              text-align: center;
              font-size: 16px;
              line-height:25px;
              color: white;
              background: rgba(22, 155, 213, 1);
              border-radius: 5px;
            }
            span{
              float: left;
              display: block;
              margin-left: 15px;
              line-height: 25px;
              color: white;
              font-size: 14px;
            }
            .span1{
              display: block;
              float: left;
              width: 90px;
              height: 32px;
              margin-left: 10px;
              .p1{
                width: 100%;
                height: 5px;
                background: blue;
                margin-top: 10px;
              }
              .p2{
                width: 50%;
                height: 5px;
                background: green;
                margin-top: 5px;
              }
            }
            .i2{
              display: block;
              float: left;
              width: 40px;
              height: 32px;
              p{
                width: 100%;
                height:8px;
                margin-top: 5px;
                font-size: 13px;
                color: white;
                text-align: center;
              }
            }
          }
        }
      }
    }
    /*首页右边样式布局样式表*/
    .right-box{
      width: 25%;
      height: auto;
      float: left;
      .right-top{
        width: 100%;
        height:220px;
        margin-top: -5px;
        /*margin-left: 5px;*/
        background: url("../../assets/images/l_t.png");
        background-size:100% 220px;
        .right-top-t1{
          width: 190px;
          height: 28px;
          margin-left: 7px;
          background: url("../../assets/images/l_t1.png");
          p{
            text-align: center;
            color: white;
            font-size: 16px;
            line-height: 30px;
          }
        }
        .right-img{
          width: 89%;
          height: 140px;
          background: url("../../assets/images/r_t.png");
          margin-top: 2px;
          margin-left: 10px;
          background-size: 100% 150px;
        }
        .right_img1{
          width: 15%;
          height: 54px;
          background: url("../../assets/images/r_t1.png");
          margin-top: -137px;
          margin-left: 13px;
          background-size: 100% 54px;
        }
      }
      span{
        font-size: 12px;
        color: #fff;
        display: inline-block;
        position: relative;
        top:81px;
        left: 18px;
      }
      .right-cent{
        width: 100%;
        height:180px;
        margin-top: -5px;
        /*margin-left: 5px;*/
        background: url("../../assets/images/l_t.png");
        background-size:100% 180px;
        .right-cent-t2{
          width: 190px;
          height: 28px;
          margin-left: 7px;
          background: url("../../assets/images/l_t1.png");
          p{
            text-align: center;
            color: white;
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
      .r2{
        color: #fff;
        margin-top: 8px;
        margin-left: 35px;
        font-size: 14px;
      }
      .right-bottom{
        width: 100%;
        height:175px;
        margin-top: -5px;
        /*margin-left: 5px;*/
        background: url("../../assets/images/l_t.png");
        background-size:100% 175px;
        .right-bottom-t2{
          width: 190px;
          height: 28px;
          margin-left: 7px;
          background: url("../../assets/images/l_t1.png");
          p{
            text-align: center;
            color: white;
            font-size: 16px;
            line-height: 30px;
          }
        }
      }
      .r3{
        background: #24aef4;
        display: inline-block;
        position: relative;
        top: 4px;
        left: 80px;
        padding: 6px;
        margin-left: 10px;
        border-radius: 10px;
      }
      .r4{
        font-size: 10px;
        color: #fff;
        margin-top: 6px;
        margin-left: 35px;
      }
    }
  }
</style>
