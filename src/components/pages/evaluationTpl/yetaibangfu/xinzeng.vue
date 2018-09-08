<template>
  <!--新增-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">

      <el-form label-width="100px" :model="searchForm">
        <el-row>
          <el-col :span="6">
            <el-form-item label="区域">
              <el-select size="small" v-model="area" placeholder="请选择区域" @change="changeArea()">
                <el-option v-for="(item, index) in allArea" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="项目">
              <el-select size="small" v-model="sendData.projectId" placeholder="请选择项目">
                <el-option v-for="(item, index) in allProject" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6">
            <el-form-item label="业态">
              <el-select size="small" v-model="sendData.businessFormId" placeholder="请选择业态" @change="changeForm">
                <el-option v-for="(item, index) in allFormList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>


        <el-col :span="6">
          <el-form-item label="业种">
            <el-select size="small" v-model="sendData.businessSpeciesId" placeholder="请选择业种">
              <el-option v-for="(item, index) in allSpeciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-row>

       <el-row>
          <el-col :span="6">
            <el-form-item label="类型">
              <el-select size="small" v-model="searchForm.type" placeholder="请选择类型"  @change="searchList()">
                <el-option v-for="(item, index) in helpTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="评价">
              <el-select size="small" v-model="sendData.type" placeholder="请选择评价">
                <el-option v-for="(item, index) in evaluateTypeList" :key="index" :label="item.typename" :value="item.type"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="6" >
            <el-form-item label="业务类型">
              <el-select size="small" v-model="sendData.helpType" placeholder="请选择业务类型">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
      <div class="biao mt20">
        <el-table :data="allcontext" height="280" border style="width: 100%;margin: 0 auto;" @selection-change="changeFun">
          <el-table-column align="center" type="selection" width="55" class="selection" prop='id' @selection-change="changeFun"></el-table-column>
          <el-table-column type="index" label="序号"align="center">
          </el-table-column>
          <el-table-column prop="type" label="类别"align="center">
            <template slot-scope="scope">
              <el-button disabled type="text" size="small" v-if="scope.row.type === 1">租金指令</el-button>
              <el-button disabled type="text" size="small" v-if="scope.row.type === 2">活动支持</el-button>
              <el-button disabled type="text" size="small" v-if="scope.row.type === 3">点位宣传支持</el-button>
              <el-button disabled type="text" size="small" v-if="scope.row.type === 4">品牌及会员</el-button>
              <el-button disabled type="text" size="small" v-if="scope.row.type === 5">其他</el-button>
            </template>
          </el-table-column>
          <el-table-column prop="context" label="指令内容" align="center">
          </el-table-column>
        </el-table>
      </div>
      <el-row class="f-tac">
        <el-button type="primary" class="mr15" @click="goBack()">取消</el-button>
        <el-button type="primary" @click="create()">新增</el-button>
      </el-row>
        <!-- <div class="xxk">
          <button type="button" @click="goBack()">取消</button>
          <button type="button" @click="create()">新增</button>
        </div> -->

      </el-form>
    </el-row>
  </div>
</template>
<script>
  import moment from 'moment'
  export default {
    data: () => ({
      area: '',
      building: '',
      loading: false,
      searchForm: {},
      sendData:{},
      allArea: {},
      allProject: {},
      allFormList: {},
      allSpeciesList: {},
      helpTypeList: window.$helpTypeList,
      checkList: [],
      evaluateTypeList: [
        { type: 'yx', typename: "优秀" },
        { type: 'lh', typename: "良好" },
        { type: 'ts', typename: "提升" },
        { type: 'hl', typename: "合理" },
        { type: 'ks', typename: "亏损" }
      ],
      allcontext: [],
      contentListPostData: {},
      checked: '',
      businessTypeList:window.$businessTypeList,
    }),
    created () {
       window.$getAreaList().then((res) => {
        this.allArea = res;
      }, (err) => {
        this.$helpSearchproject
      }),

      window.$getformSelect().then((res) => {
        this.allFormList = res;
      }, (err) => {
        this.showAlert(err)
      }),

    this.searchList()
    },
    methods: {
      searchList() {
      window.$addContentList(this.searchForm).then((res) => {
        this.allcontext = res;
      }, (err) => {
        this.showAlert(err)
      })
    },
    changeFun(val){
      this.checkList = val
    },
    //change区域方法
    changeArea() {
      window.$helpSearchproject(this.area).then((res) => {
        this.allProject = res;
      }, (err) => {})
    },
    changeForm(){
      window.$getSpeciesSelect(this.sendData.businessFormId).then((res) => {
        this.allSpeciesList = res;
      }, (err) => {
        this.showAlert(err)
      })
    },
    goBack(){
      this.$router.back(-1)
    },
    create(){
      this.sendData.helpContext = []
      for(var i = 0; i < this.checkList.length; i++){
        this.sendData.helpContext.push(this.checkList[i].context)
      }
      window.$createBusinessList(this.sendData).then((res) => {
        this.showAlert('新增成功')
        this.goBack()
      }, (err) => {
        this.showAlert(err)
      })
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
  .xuan{
    margin-left: 15px;
    margin-top: 20px;
  }
  .el-date-editor.el-input, .el-date-editor.el-input__inner{
    width: 100%;
  }
  .el-col-10 {
    width: 41.66667%;
    margin-top: 45px;
  }
  .el-form-item{
    margin-bottom: 10px;
    margin-top: 10px;
    margin-left: 52px;
  }
  .el-form-item__label {
    text-align: right;
    float: left;
    font-size: 17px;
    color: #606266;
    line-height: 40px;
    padding: 0 12px 0 0;
    -webkit-box-sizing: border-box;
    box-sizing: border-box;
  }
  .xxk{
    width: 100%;
    height: 100px;
    button{
      width: 100px;
      height: 50px;
      display: inline-block;
      border-radius: 10px;
      background: rgb(22,155, 213);
      outline:medium;
      outline: none;
      position: relative;
      left:500px;
      top: 50px;
      margin-left: 20px;
    }
  }
  .biao{
    width: 100%;
    height: 350px;
    border: 0px solid #fff;
    .el-table{
      margin-top: 50px;
    }
  }


</style>
