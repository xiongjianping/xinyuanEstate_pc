<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">区间设置</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select  size="small" v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目">
            <el-select  size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼栋" v-if="different === 2">
            <el-select v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼层">
            <el-select size="small" v-model="searchForm.floorId" placeholder="请选择楼层">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>


        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.conditionId" placeholder="请选择业态">
              <el-option v-for="(item, index) in bList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业种">
            <el-select  size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="areaChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--<el-col :span="5">-->
          <!--<el-form-item label="维度" v-if="businessId === 2" >-->
            <!--<el-select  size="small" v-model="different" placeholder="请选择维度">-->
              <!--<el-option v-for="(item, index) in dimensionList" :key="ind ex" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->





        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button id="fileUpload_button" class="mr10 ml10" type="primary" size="medium" v-on:click="importFile()">导入</el-button>
            <input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />
            <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="exportExl()">导出</el-button>
            <!-- <el-button type="primary" size="medium" v-on:click="kxxz(1);">客销度新增</el-button>
            <el-button type="primary" size="medium" v-on:click="yzl(1);">溢租率新增</el-button> -->
          </el-form-item>
        </el-col>

      </el-form>
    </el-row>

    <el-dialog class="RentingRate" title="区间设置" :visible="dialogFormVisible" @close='closeDialog'>
      <el-form class="yzl-line-top"></el-form>
      <el-form>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="业态" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="areaId" placeholder="全部区域" @change="businessTypeChange()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="projectId" placeholder="项目A" @change="businessTypeChange()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="searchForm.floorId" placeholder="F1" @change="businessTypeChange()">
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="searchForm.conditionId" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select  size="small" v-model="searchForm.businessSpeciesId" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="项目A" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="合理百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="提升百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="良好百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="优秀百分比" :label-width="formLabelWidthQJ">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTriangle ()">保 存</el-button>
      </div>
    </el-dialog>

    <p class="t"></p>
    <div class="biaoti1">区间设置列表</div>
    <el-button class="NewlyAdded"  type="primary" align="center" v-on:click="showCreateCompany()">新增</el-button>

    <div class="listCont">
        <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="projectName" label="楼层"></el-table-column>
        <el-table-column align="center" prop="projectName" label="品牌名称"></el-table-column>
        <el-table-column align="center" prop="conditionName" label="业态名称"></el-table-column>
        <el-table-column align="center" prop="majoName" label="业种名称"></el-table-column>
        <el-table-column align="center" prop="yx" label="优秀"></el-table-column>
        <el-table-column align="center" prop="lh" label="良好"></el-table-column>
        <el-table-column align="center" prop="ts" label="提升"></el-table-column>
        <el-table-column align="center" prop="hl" label="合格"></el-table-column>
        <!--<el-table-column align="center" prop="ks" label="亏损"></el-table-column>-->
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="prev, pager, next"
          :total="data.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    formLabelWidth: '50px',
    formLabelWidthQJ:'90px',
    different:'',
    dimensionList: window.$dimensionList,
    businessId:2,
    businessList:[{name: '客销度', id:2}],
    areaId:'',
    areaList:{},
    projectList:{},
    buildingList:{},
    buildingId:'',
    floorList:{},
    bList:{},
    sList:{},
    data: {},
    loading: false,
    searchForm: {},
    infoData: {},
    page: 1,
    size: 10,
    conditionId:'',
    projectId:'',
    dialogFormVisible:false
  }),
  created () {
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {console.log(err)})
  },
  methods: {
    closeDialog(){
      this.dialogFormVisible = false;//清空数据
    },
    showCreateCompany() {
        this.dialogFormVisible = true
    },
    importFile(){
      document.getElementById('fileUpload_input').click()
    },
    areaChanged(){
      this.projectId = ''
      if(this.different ===3 ){
        this.conditionId = ''
      }

      window.$getProjectListForArea(this.areaId).then((res) => {
        this.projectList = res
      }, (err) => {this.showAlert(err)})
    },
    projectChanged(){
      if(this.different === 2){
        window.$getBuilding(this.projectId).then((res) => {
          this.buildingList = res
        }, (err) => {
          this.showAlert(err)
        })
      } else if(this.different === 3){
        window.$getBusinessListForProject(this.projectId).then((res) => {
          this.bList = res
        }, (err) => {this.showAlert(err)})
      }
    },
    buildingChanged(){
      window.$getFloorForBuilding(this.buildingId).then(res =>{
        this.floorList = res
      }, err => {
        this.showAlert(err)
      })
    },
    fileUpload(e){
      // if(!this.businessId){
      //   this.showAlert('请选择业务类型')
      //   return false
      // }

      let url = this.businessId === 1 ? '' : (this.businessId === 2 ? '/intervalimportexcel/excel/intervalguestimport/sheet' : '')
      window.$fileUpload(e, url).then((res) => {
        this.showAlert('导入成功')
        this.page = 1
        this.size = 10
        this.searchList()
      }, (err) =>{this.showAlert(err)})
    },
    exportExl(){
      // if(!this.businessId){
      //   this.showAlert('请选择业务类型')
      //   return false
      // }
      if(!this.projectId){
        this.showAlert('请选择项目')
        return false
      }
      let url = this.businessId === 1 ? '' : (this.businessId === 2 ? '/standardexport/excel/qjszkxd' : '')
      window.$exportExls(url, this.projectId).then((res) => {
        console.log(res)
        let link = document.createElement('a')
        link.href = res
        link.click()
      }, (err) => {
        this.showAlert(err)
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
    searchList(type){
      if(type === 1){
        this.page =1
      }

      this.searchForm.projectId = this.projectId
      if(this.different === 3) {
        this.searchForm.conditionId = this.conditionId
      }

      this.$axios.post('/conditionguestinterval/find/conditionguestinterval/list?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {
        this.data = res
      }).catch(function (eMsg) {
        this.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataManage/trigonometric/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/trigonometric/edit/' + id)
    },
    kxxz (id) {
      this.$router.push('/dataManage/trigonometric/kx-xinzeng/' + id)
    },
    yzl (id) {
      this.$router.push('/dataManage/trigonometric/yz-xinzeng/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'height:50px;font-size:15px'
    },
    showAlert: function (cont) {
        this.$alert(cont, '温馨提示', {
          confirmButtonText: '确定'
        })
      }
  }
}
</script>
<style scoped  lang="less">
  .yzl-line-top{
    height: 1px;
    background: #FFF;
    border-top: 1px solid #000;
    padding: 10px;
    margin-top:-25px;
  }
  .dialog-footer{
    text-align: center;
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
  .mainContent{
    width: 100%;
    // height: 100%;
    background: #fff;
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

</style>
