<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">数据录入日志</h3><br>
      <el-form label-width="100px" :model="searchForm">

        <el-col :span="5">
          <el-form-item label="区域" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.areaId" placeholder="全部区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目" :label-width="formLabelWidth">
            <el-select   size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="5">
          <el-form-item label="时间">
            <el-date-picker size="small" v-model="searchForm.times" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
                            value-format="yyyy-MM-dd">
            </el-date-picker>
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">数据录入日志列表</div>
    <div class="f-cb queshidays">
      <div class="f-fl" v-if="this.yinglu">应录数据: {{yinglu}}天</div>
      <!--<div class="f-fl ml30" v-if="this.yinglu">缺失数据: 项目:{{xmnum}}天</div>-->
      <!--<div class="f-fl ml15" v-if="this.yinglu">楼层:{{lcnum}}天</div>-->
      <!--<div class="f-fl ml15" v-if="this.yinglu">品牌:{{ppnum}}天 </div>-->

    </div>

    <div class="listCont">
      <el-table :data="listCont" border size="medium">
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="xse" label="销售额">
          <template slot-scope="scope">
            <p class="unusing" v-if="scope.row.xse">缺失</p>
            <p class="using" v-if="!scope.row.xse">正常</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="kll" label="销售额">
          <template slot-scope="scope">
            <p class="unusing" v-if="scope.row.kll">缺失</p>
            <p class="using" v-if="!scope.row.kll">正常</p>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
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
    loading: false,
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
    pictureList: [],
    picIndex: 0,
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
    //搜索条件
    searchRequest : {
      projectId : "",//项目ID
      beginTime : '',//开始时间
      endTime : '',//结束时间
    },

    rentForm:{},
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
    times:'',
    listCont:[],
    yinglu:'',
    xmnum:'',
    lcnum:'',
    ppnum:'',
  }),
  created () {
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {console.log(err)})

    // this.searchList()
  },
  methods: {
    // 1.区域
    areaChanged(){
      // this.searchForm.projectId = ''
      this.myareaId = this.searchForm.areaId
      window.$getProjectListForArea(this.myareaId).then((res) => {
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    //2.项目
    projectChanged() {
      this.myprojectId = this.searchForm.projectId;
    },


    handleClick(tab, event) {
      this.type = tab.index

      this.searchList()
    },

    handleSizeChange (val) {
      this.size = val;
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val;
      this.searchList()
    },
    searchList () {
      if(this.searchForm.times){
        this.searchRequest.beginTime = this.searchForm.times[0]
        this.searchRequest.endTime = this.searchForm.times[1]
        sessionStorage.setItem("beginTime", this.searchRequest.beginTime);
        sessionStorage.setItem("endTime", this.searchRequest.endTime);
      }
      this.searchRequest.projectId = this.searchForm.projectId; //项目ID
      this.listCont="";//清空数据
      this.loading = true;
      window.$getQueshiList(this.searchRequest)
        .then((res) => {
          this.listCont = res;
          this.yinglu = res[0].day;
          this.loading = false;
          // this.xmnum = res[0].xmnum;
          // this.lcnum = res[0].lcnum;
          // this.ppnum = res[0].ppnum;
        }, (err) => {
          this.loading = true;
          console.log(err)
        })
    },
    // 查看详情
    showDetails (id,times) {
      // this.showAlert(id);
      // this.$router.push('/dataManage/queshi/xiangqing/' + id + this.searchForm.times)
      this.$router.push({path:'/dataManage/queshi/xiangqing',query: { id: id,times:times }})
    },
    showAlert: function (cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定',
        callback: action =>{
          if(this.isSearchList){
            this.isSearchList = false
            this.searchList(1)
          }
        }
      })
    }
  }
}

</script>
<style  lang="less">
  .mainContent{
    position: relative;
    .queshidays{
      position: absolute;
      top:120px;
      left:200px;
      font-size: 12px;
      z-index: 10000;
    }
  }
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
</style>
