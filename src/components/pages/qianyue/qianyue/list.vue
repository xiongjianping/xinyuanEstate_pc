<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-form label-width="100px" :model="searchForm">
      <el-row class="searchBox" :gutter="30">
        <h3 id="title">签约管理</h3><br>
          <el-col :span="5">
            <el-form-item label="区域">
              <el-select size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="5">
            <el-form-item label="项目">
              <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
      </el-row>
      <el-row class="searchBox" :gutter="30">
        <el-col :span="5">
          <el-form-item label="品牌/铺位">
            <el-input size="small" maxlength="11" v-model="searchForm.brandName" placeholder="请输入品牌/铺位"/>
          </el-form-item>
        </el-col>
        <!--<el-col :span="5">-->
          <!--<el-form-item label="铺位">-->
            <!--<el-input size="small" maxlength="11" v-model="searchForm.name" placeholder="请输入铺位"/>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
          <!--<el-col :span="5">-->
            <!--<el-form-item label="楼栋">-->
              <!--<el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
                <!--<el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->

          <el-col :span="5">
            <el-form-item label="业态">
              <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择业态"  @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <!--<el-col :span="5">-->
            <!--<el-form-item label="业种">-->
              <!--<el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">-->
                <!--<el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-col>-->
        <el-col :span="5">
          <el-form-item label="楼层">
            <el-select size="small" v-model="searchForm.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态">
            <el-select size="small" v-model="searchForm.status" placeholder="请选择状态">
              <el-option v-for="(item, index) in statusList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

      </el-row>

    </el-form>
    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="reset();">清空</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="qianyue(0);">签约</el-button>
    </div>

    <!--<p class="t"></p>-->
    <!--<div class="biaoti1">签约管理列表</div>-->
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column type="index" align="center" width="50" label="序号" :index="indexMethod"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目"></el-table-column>
        <el-table-column align="center" prop="brandName" label="品牌名称"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
        <el-table-column align="center" prop="roomName" label="铺位名称"></el-table-column>
        <el-table-column align="center" prop="businessFormName" label="业态"></el-table-column>
        <el-table-column align="center" prop="businessSpeciesName" label="业种"></el-table-column>
        <el-table-column align="center" prop="acreage" label="面积"></el-table-column>
        <el-table-column align="center" prop="status" label="状态">
          <template slot-scope="scope">
            <p class="using" v-if="scope.row.state">已签约</p>
            <p class="unusing" type="danger" v-if="!scope.row.state">已解约</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
        <el-table-column align="center" prop="invalidTime" label="失效时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="breakContract(scope.row.id)" v-if="scope.row.state">解约</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="prev, pager, next"
          :total="data.countSize">
        </el-pagination>
      </div>
    </div>


    <el-dialog title="选择生效时间" :visible.sync="dialogFormVisible">
      <el-form style="line-height: 40px;">
        <el-date-picker v-model="effectTime" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" class="ml10" size="medium"  @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" class="ml10" size="medium"  @click="breakContractGo_yyh()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    //区域id
    myareaId:'',
    //项目id
    myprojectId:'',
    //业态id
    mybusinessFormId:'',
    //业种id
    mybusinessSpeciesId:'',
    data: {},
    loading: false,
    searchForm: {
      areaId: '',
      projectId: '',
      buildingId: '',
      floorId: '',
      businessFormId: '',
      businessSpeciesId: '',
      brandName: '',
    },
    page: 1,
    size: 10,
    areaList: [],
    projectList: [],
    buildingList: [],
    floorList: [],
    businessList: [],
    speciesList: [],
    brandList:[],
    projectId:'',
    buildingId:'',
    floorId:'',
    business:'',
    businessSpeciesId:'',
    species:'',
    brandId:'',
    statusList:[
      {
        id:0,
        name:'已解约'
      },
      {
        id:1,
        name:'已签约'
      }
    ],

    effectTime:'',
    dialogFormVisible: false,
    sendData: {},
    currentTime: '',
    selectTime: '',

  }),
  created () {
    window.$getformSelect().then((res) => {
        this.businessList = res
      }, (err) => {})

      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {})
      this.searchList(1)
  },
  methods: {
    indexMethod(index) {
      return (this.page-1)*10+index + 1;
    },
    reset(){
      this.searchForm.areaId= '';
      this.searchForm.projectId= '';
      this.searchForm.brandName= '';
      this.searchForm.businessFormId= '';
      this.searchForm.floorId= '';
      this.searchForm.status= '';
      this.searchList(1)
    },
    areaChanged(){
      this.searchForm.buildingId = ''
      this.floorId = ''
      this.myareaId = this.searchForm.areaId

      window.$getProjectListForArea(this.myareaId).then((res) => {
        this.projectList = res

      }, (err) => {
        this.showAlert(err)
      })
    },
    //2.项目
    projectChanged(){
      this.searchForm.buildingId = ''
      this.myprojectId = this.searchForm.projectId;
      this.floorId = ''
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.buildingList = res
        //调用楼层
        window.$getFloorForBuilding(res[0].id).then((floorRes) => {
          this.floorList = floorRes
        }, (err) => {
          this.showAlert(err)
        })
      }, (err) => {
        this.showAlert(err)
      })

      this.getBind()
    },
    // 业态
    businessChanged(){
      // this.searchForm.businessSpeciesId = ''
      // this.speciesList = [];
      // this.brandId = ''
      this.mybusinessFormId = this.searchForm.businessFormId;

      window.$getSpeciesSelect(this.mybusinessFormId).then((res) => {
        this.speciesList = res
        console.log(res);
      }, (err) => {
        this.showAlert(err)
      })
      this.getBind()
    },
    //业种
    speciesChanged(){
      this.brandList = ''
      this.mybusinessSpeciesId = this.searchForm.businessSpeciesId;
      //获取品牌
      this.getBind()
    },
    getBind(){
      this.brandList = ''
      var params = {}
      params.projectId = this.myprojectId
      params.fromId = this.mybusinessFormId
      params.speciesId = this.mybusinessSpeciesId

      //获取品牌
      window.$getcontractIdForSpecies(params).then((res) => {
        this.brandList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    brandChanged(){
      console.log(this.searchForm.brandId)
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

      var currentdateToday = year + seperator1 + month + seperator1 + strDate;
      console.log("xxx当前时间***："+currentdateToday)
      this.currentTime = currentdateToday+""

    },


    /**
     * 比较两个时间的大小
     * 时间格式：yyyy-MM-dd hh:mm:ss
     * @param {Object} currentTimeString	当前时间（开始时间）
     * @param {Object} selectTimeString		选择时间（结束时间）
     */
   dateFormatCompare(currentTimeString,selectTimeString){

        var b = currentTimeString.replace(/-/g,'/');
        var e = selectTimeString.replace(/-/g,'/');
        var bs = Date.parse(b);
        var es = Date.parse(e);
        var disparityTime =(es-bs)/3600/1000;

        return disparityTime;

    },


    breakContractGo_yyh(){
        this.getCurrentDateTime();
        this.sendData.effectTime = this.effectTime;

        //开始时间日期拼接
        var start_date_time = this.currentTime+" "+"00"+":"+"01"+":00";
        //结束时间日期拼接
        var end_date_time = this.effectTime +" "+"00"+":"+"01"+":00";

        // disparityTime>0 结束时间大， disparityTime<0结束时间小， disparityTime=0 日期相等
        console.log("*********"+this.dateFormatCompare(this.currentTime,this.effectTime))
        var disparityTime = this.dateFormatCompare(this.currentTime,this.effectTime);

        // if(disparityTime<0){
        //   // alert("开始时间大");
        //   // 选择时间不能小于当前时间，即当前时间大
        //   alert("解约时间不能小于当天时间！");
        //   return
        // }
        // else if (disparityTime>0){
        //   alert("结束时间大");
        // }else if (disparityTime==0){
        //   alert("相等");
        // }



      window.$breakContract_yyh(this.sendData.id,this.sendData.effectTime).then((res) => {
          alert(res)
          this.dialogFormVisible = false;
          this.searchList()
        }, (err) => {
          this.showAlert(err)
          this.dialogFormVisible = false;
        })
    },

    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.searchList()
    },
    searchList (type) {
      // this.searchForm.brandId = this.searchForm.contractId
      // this.searchForm.floorId = this.floorId


      if(type === 1){
        this.page = 1
      }
      window.$getBrandAllList(this.page, this.size, this.searchForm).then((res) => {
        this.data = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    breakContract(id){

      this.dialogFormVisible = true;
      this.sendData.id = id;

    },

    //签约
    qianyue(id) {
      this.$router.push('/qianyue/qianyue/add/' + id)
    },
    rowClass({ row, rowIndex}) {
      //console.log(rowIndex) //表头行标号为0
      return 'height:50px;font-size:15px'
    },
    showAlert(cont) {
        this.$alert(cont, '温馨提示', {
          confirmButtonText: '确定'
        })
      }
  }
}
</script>
<style scoped  lang="less">
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
  .listCont{
    margin: 42px 0;padding: 0;
  }
</style>
