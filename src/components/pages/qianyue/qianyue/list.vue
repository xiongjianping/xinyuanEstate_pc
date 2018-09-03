<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">签约管理</h3><br>
      <el-form label-width="100px" :model="searchForm">
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
        <el-col :span="5">
          <el-form-item label="楼栋">
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层">
            <el-select size="small" v-model="floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择业态"  @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌">
            <el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌">
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="铺位">
            <el-input size="small" maxlength="11" v-model="searchForm.name" placeholder="请输入铺位"/>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="qianyue(0);">签约</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">签约管理列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
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
      <el-form>
        <el-date-picker v-model="effectTime" value-format="yyyy-MM-dd"  type="date" placeholder="选择日期"></el-date-picker>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="breakContractGo_yyh()">确 定</el-button>
      </div>
    </el-dialog>

  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    data: {},
    loading: false,
    searchForm: {},
    page: 1,
    size: 10,
    businessList: [],
    speciesList: [],
    brandList:[],
    areaList: [],
    projectList: [],
    buildingList: [],
    floorList: [],
    floorId:'',
    brandId:'',

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

        if(disparityTime<0){
          // alert("开始时间大");
          // 选择时间不能小于当前时间，即当前时间大
          alert("解约时间不能小于当天时间！");
          return
        }
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
      this.searchForm.brandId = this.brandId
      this.searchForm.floorId = this.floorId

      if(type === 1){
        this.page = 1
      }
      window.$getBrandAllList(this.page, this.size, this.searchForm).then((res) => {
        this.data = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    businessChanged(){
      this.searchForm.businessSpeciesId = ''
      this.brandId = ''
      window.$getSpeciesSelect(this.searchForm.businessFormId).then((res) => {
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })

    },
    speciesChanged(){
      this.brandId = ''
      window.$getBrandForSpecies(this.searchForm.businessSpeciesId).then((res) => {
        this.brandList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    areaChanged(){
      this.searchForm.projectId = ''
      this.searchForm.buildingId = ''
      this.floorId = ''
      window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
        this.projectList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    projectChanged(){
      this.searchForm.buildingId = ''
      this.floorId = ''
      window.$getBuilding(this.searchForm.projectId).then((res) => {
        this.buildingList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    buildingChanged(){
       this.floorId = ''
      window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
        this.floorList = res
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
</style>
