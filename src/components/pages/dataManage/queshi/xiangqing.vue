<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">数据缺失详情</h3><br>
      <el-col :span="4" :offset="1">
        项目：{{res.projectName}}
      </el-col>
      <el-col :span="3" :offset="1">
        应录数据：{{res.day}}天
      </el-col>

      <el-col :span="10" :offset="1">
        查询日期：{{searchRequest.beginTime}}-{{searchRequest.endTime}}
      </el-col>
    </el-row>
    <!--<el-row>-->
      <!--<el-col :span="3" :offset="1">-->
        <!--查询日期：{{data.companyName}}-->
      <!--</el-col>-->
    <!--</el-row>-->




    <div class="listCont">
      <div class="f-cb numcon">
        <div class="f-fl num">({{res.xmnum}})</div>
        <div class="f-fl num">({{res.lcnum}})</div>
        <div class="f-fl num">({{res.ppnum}})</div>
      </div>

      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="项目维度" name="first">
          <el-table :data="data" border size="medium">
            <el-table-column align="center" prop="day" label="缺失日期"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="楼层维度" name="second">
          <el-table :data="data" border size="medium">
            <el-table-column align="center" prop="name" label="楼层名称"></el-table-column>
            <el-table-column align="center" prop="day" label="缺失日期"></el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="品牌维度" name="third">
          <el-table :data="data" border size="medium">
            <el-table-column align="center" prop="name" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="day" label="缺失日期"></el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>

      <!--<div class="paginationCont">-->
        <!--<el-pagination-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="page"-->
          <!--layout="prev, pager, next"-->
          <!--:total="data.countSize">-->
        <!--</el-pagination>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data: () => ({
      isSearchList: false,
      //区域id
      myareaId:'',
      //项目id
      myprojectId:'',
      //业态id
      mybusinessFormId:'',
      //业种id
      mybusinessSpeciesId:'',
      type: 0,
      data: [],
      loading: true,
      searchForm:{},
      formLabelWidth:"70px",
      formLabelWidthYZ:'70px',
      formLabelWidthDT:'85px',
      businessType: '',
      exportExlsData: {},
      areaList:[],
      projectList:[],
      projectId:'',

      options:[
        {
          id: '0',
          name: '全部',
        }
      ],
      infoData: {},
      page: 1,
      size: 10,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      pictureList: [],
      picIndex: 0,
      //  value6:[],
      activeName2: 'first',
      buildingList:[],
      buildingId:'',
      floorList:[],
      floorId:'',
      businessList:[],
      business:'',
      businessSpeciesId:'',
      speciesList:[],
      species:'',
      brandList:[],
      brandId:"",
      objTypeList:[
        {
          id: 0,
          name: '项目'
        },
        {
          id: 1,
          name: '楼层'
        },
        {
          id: 2,
          name: '品牌'
        }],
      objTypeList1:[
        {
          id: 2,
          name: '品牌'
        }],
      objType: 2,

      rentFee:0.00,
      wuyefei:0.00,
      zhejiufei:0.00,
      rengongchengben:0.00,
      agencyFee:0.00,
      guestForm:{},
      contractType:'',
      persent:'',//客流量
      sale:'',//销售额
      fittedForm:{},
      shichangdiwei:'',
      pinpaidiwei:'',
      pinpaixingxiang:'',
      zifeishoujiaolv:'',
      liansuogengjindu:'',
      kefutousu:'',
      qihuapeihedu:'',
      effectTime:'',
      effectTime2:'',
      effectTime3:'',
      //搜索条件
      searchRequest : {
        projectId : "",//项目ID
        beginTime : '',//开始时间
        endTime : '',//结束时间
      },
      res:'',
    }),
    created () {
      this.searchList(0)
      this.searchRequest.projectId = this.$route.query.id;
      this.searchRequest.beginTime = sessionStorage.getItem("beginTime");
      this.searchRequest.endTime = sessionStorage.getItem("endTime");
      // this.searchRequest.beginTime = this.$route.query.times[0];
      // this.searchRequest.endTime = this.$route.query.times[1];

      window.$getQueshiDetail(this.searchRequest)
        .then((res) => {
          console.log(res)
          this.res = res
          this.loading = false;
        }, (err) => {
          console.log(err)
        })
      console.log(  this.searchRequest.beginTime )
      console.log( this.searchRequest.endTime)
    },
    methods: {


      handleClick(tab, event) {
        this.type = tab.index
        console.log(this.type)
        if(this.type != 1) {
          this.objType = 2
        }

        this.searchList(0)
      },
      searchList (type) {

        if (this.type == 0) {//项目维度
          this.searchRequest.projectId = this.$route.query.id;
          this.searchRequest.beginTime = sessionStorage.getItem("beginTime");
          this.searchRequest.endTime = sessionStorage.getItem("endTime");
          this.data="";//清空数据
          this.loading = true;
          window.$getQueshiDetail(this.searchRequest)
            .then((res) => {
              console.log(res)
              this.data = res.project
              this.loading = false;
            }, (err) => {
              console.log(err)
            })
        } else if (this.type == 1){//楼层维度
          //调接口
          this.searchRequest.projectId = this.$route.query.id;
          this.searchRequest.beginTime = sessionStorage.getItem("beginTime");
          this.searchRequest.endTime = sessionStorage.getItem("endTime");
          this.data="";//清空数据
          this.loading = true;
          window.$getQueshiDetail(this.searchRequest)
            .then((res) => {
              this.data = res.floor
              this.loading = false;
            }, (err) => {
              console.log(err)
            })
        } else if (this.type == 2) {//品牌维度
          this.searchRequest.projectId = this.$route.query.id;
          this.searchRequest.beginTime = sessionStorage.getItem("beginTime");
          this.searchRequest.endTime = sessionStorage.getItem("endTime");
          this.data="";//清空数据
          this.loading = true;
          console.log(this.objType)
          //调接口
          window.$getQueshiDetail(this.searchRequest)
            .then((res) => {
              this.data = res.brand
              this.loading = false;
            }, (err) => {
              console.log(err)
            })
        }



      },


      showAlert: function (cont) {
        this.$alert(cont, '温馨提示', {
          confirmButtonText: '确定',
          callback: action =>{
            if(this.isSearchList){
              this.isSearchList = false
              this.searchList(0)
            }
          }
        })
      }
    }
  }

</script>
<style  lang="less">
  .yzl-line{
    height: 1px;
    background: #fff;
    border-top: 1px solid #CCC;
    padding-bottom: 16px;
  }
  .yzl-line-top{
    height: 1px;
    background: #FFF;
    border-top: 1px solid #000;
    padding: 10px;
    margin-top:-25px;
  }
  h4{
    font-size: 20px;
    font-weight: 800;
  }
  .el-dialog__footer{
    text-align: center;
  }
  .yzl{
    margin: 0 auto;
  }
  .tabs{
    width: 100%;
    height:50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div{
      display: inline-block;
    }
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  .uploadInput{
    top:0px;
    width: 0;
    height: 100%;
    visibility: hidden;
  }
  .el-tabs__content {
    overflow: inherit;
  }
  .listCont{
    position: relative;
    .numcon{
      position: absolute;
      top: 42px;
      left: 79px;
      font-size: 12px;
      color: #ff4200;
      .num{
        width: 97px;
      }
    }
  }
</style>
