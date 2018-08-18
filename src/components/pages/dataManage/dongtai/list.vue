<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">动态三角形</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域：">
            <el-select  size="small" v-model="businessType" placeholder="全部区域" @change="businessTypeChange()">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目：">
            <el-select  size="small" v-model="businessType" placeholder="项目A" @change="businessTypeChange()">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层：">
            <el-select  size="small" v-model="businessType" placeholder="F1" @change="businessTypeChange()">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态：">
            <el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌">
            <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="状态：">
            <el-select  size="small" v-model="businessType" placeholder="全部状态" @change="businessTypeChange()">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <!--<el-col :span="5">-->
          <!--<el-form-item label="业务类型">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="请选择业务类型" @change="businessTypeChange()">-->
              <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <el-col :span="6">
          <el-form-item label="时间">
            <el-date-picker
              v-model="value1"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!--<el-col :span="5">-->
          <!--<el-form-item label="维度" v-if="businessType === 2" >-->
            <!--<el-select  size="small" v-model="searchForm.different" placeholder="请选择维度">-->
              <!--<el-option v-for="(item, index) in dimensionTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-dialog title="导出" :visible.sync="dialogFormVisible">-->
          <!--<el-form :model="exportExlsData">-->
            <!--<el-form-item label="区域">-->
              <!--<el-select v-model="exportExlsData.areaId" placeholder="请选择区域" @change="areaChange()">-->
                <!--<el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
            <!--<el-form-item label="项目">-->
              <!--<el-select v-model="exportExlsData.projectId" placeholder="请选择项目">-->
                <!--<el-option v-for="(item,index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <!--</el-select>-->
            <!--</el-form-item>-->
          <!--</el-form>-->
          <!--<div slot="footer" class="dialog-footer">-->
            <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
            <!--<el-button type="primary" @click="exportExls()">确 定</el-button>-->
          <!--</div>-->
        <!--</el-dialog>-->

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <!--<el-button id="fileUpload_button" class="mr10 ml10" type="primary" size="medium" v-on:click="importFile()">导入</el-button>-->
            <!--<input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />-->
            <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="exportFile();">导出</el-button>-->
            <!-- <el-button type="primary" size="medium" v-on:click="xiugai(1);">修改</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">固定成本</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button>
            <el-button type="primary" size="medium" v-on:click="xiangqing(1);">详情</el-button> -->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <p class="t"></p>
    <div class="biaoti1">动态三角形</div>
    <div class="listCont">
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="溢租率" name="first">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="租金（元/月）"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="物业费（元/年）"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="折旧费（元）"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="人工费（元）"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="代理费（元）"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>
            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->

             <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客销度" name="second">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="客流量"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="销售额"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->

           <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="适配值" name="third">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="fittedVerssionName" label="市场地位"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌定位"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌形象"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="租费收缴率"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="连锁跟进度"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="客服投诉率"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="企划配合度"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center"  label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout=" prev, pager, next"
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
    businessTypeList: window.$businessTypeList2,
    dimensionTypeList: window.$dimensionList2,
    businessType: '',
    exportExlsData: {},
    areaList:[],
    projectList:[],
    data: {},
    loading: false,
    searchForm: {},
    infoData: {},
    page: 1,
    size: 10,
    dialogFormVisible: false,
    pictureList: [],
    picIndex: 0,
    value6:[],
    activeName2: 'first'
  }),
  created () {
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {console.log(err)})
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    importFile(){
      document.getElementById('fileUpload_input').click()
    },
    areaChange(){
      window.$getProjectListForArea(this.exportExlsData.areaId).then((res) => {
        this.projectList = res
      }, (err) => { this.showAlert(err)})
    },
    exportFile(){
      if(!this.businessType){
        this.showAlert('请选择业务类型')
        return false
      }

      this.dialogFormVisible = true
    },
    exportExls(){
      if(!this.exportExlsData.projectId){
        this.showAlert('请选择项目')
        return false
      }

      let url = this.businessType === 1 ? '/standardexport/excel/dtyzl' : (this.businessType === 2 ? '/standardexport/excel/dtkxd' : '/standardexport/excel/dtspz')
      window.$exportExls(url, this.exportExlsData.projectId).then((res) => {
        console.log(res)
        let link = document.createElement('a')
        link.href = res
        link.click()
      }, (err) => {
        this.showAlert(err)
      })
    },
    fileUpload(e){
      if(!this.businessType){
        this.showAlert('请选择业务类型')
        return false
      }
      // let url = '/excel/excel/import/sheet'
      let url = this.businessType === 1 ? '/importexcel/excel/rentimport/sheet' : (this.businessType === 2 ? '/importexcel/excel/guestimport/sheet' : '/importexcel/excel/fittedimport/sheet')
      window.$fileUpload(e, url).then((res) => {
        this.showAlert('导入成功')
      }, (err) =>{this.showAlert(err)})
    },
    businessTypeChange(){
      this.page = 1
      this.size = 10
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

      if(type === 1){
        this.page =1
      }

      let url = ''
      if(this.value6){
        this.searchForm.createTimeBegin = this.value6[0]
        this.searchForm.createTimeBegin = this.value6[1]
      }
      if(this.businessType === 1){
        url = '/rantverssion/find/rantverssion/list'
      } else if(this.businessType === 2){
        if(!this.searchForm.different){
          this.showAlert('请选择维度')
          return false
        } else {
          url = '/guestverssion/find/guestverssion/list'
        }
      } else if(this.businessType === 3){
        url = '/fittedverssion/find/fittedverssion/list'
      }

      if(type === 1){
        this.page = 1
      }

      if(this.businessType === 1 || this.businessType === 2 || this.businessType === 3 ){
        this.$axios.post(url + '?p=' +this.page + '&c=' + this.size, this.searchForm).then((res) => {
          this.data = res
        }, (err) => {
          this.showAlert(err)
        })
      }
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/dataManage/dongtai/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/dongtai/edit/' + id)
    },
    xiugai (id) {
      this.$router.push('/dataManage/dongtai/xiugai/' + id)
    },
    xiangqing (id) {
      this.$router.push('/dataManage/dongtai/xiangqing/' + id)
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
      return 'width:10px;height:50px;font-size:15px'
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
