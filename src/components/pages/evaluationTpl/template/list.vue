<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <!--  <el-form-item label="区域">
            <el-input size="small" v-model="alProject" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item> -->
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.area" placeholder="全部" @change="changeArea()">
              <el-option v-for="(item,index) in allArea" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称">
            <!--          <el-input size="small" v-model="searchForm.projectleader" :maxlength="30" placeholder="请输入项目负责人"></el-input> -->
            <el-select size="small" v-model="searchForm.pro" placeholder="全部">
              <el-option v-for="(item,index) in allProject" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="scarchProject();">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="addPage();">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="defaultProjectData.resultList" border size="medium">
        <el-table-column align="center" type="index" prop='id' label="序号"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="yx" label="优秀"></el-table-column>
        <el-table-column align="center" prop="lh" label="良好"></el-table-column>
        <el-table-column align="center" prop="ts" label="提升"></el-table-column>
        <el-table-column align="center" prop="hl" label="合理"></el-table-column>
        <el-table-column align="center" prop="ks" label="亏损"></el-table-column>
      </el-table>
      <!--<div class="paginationCont">-->
      <!--<el-pagination-->
      <!--@size-change="handleSizeChange"-->
      <!--@current-change="handleCurrentChange"-->
      <!--:current-page="data.page"-->
      <!--:page-sizes="[10, 20, 50, 100]"-->
      <!--:page-size="size"-->
      <!--layout="total, sizes, prev, pager, next, jumper"-->
      <!--:total="data.count">-->
      <!--</el-pagination>-->
      <!--</div>-->
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    data: {},
    loading: false,
    searchForm: {
      area: '',
      company: '',
      startTime: null,
      pro: ''
    },
    infoData: {},
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    defaultProject: {},
    defaultProjectData: {},
    allArea: {},
    allProject: {},

  }),
  created() {
    this.defaultProject = {
      "areaId": "",
      "projectId": ""
    }
    window.$helpScarchAll(this.defaultProject).then((res) => {
      this.defaultProjectData = res;
    }, (err) => {})

    window.$getAreaList().then((res) => {
      this.allArea = res;
      console.log(this.allArea)
    }, (err) => {})

  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange(val) {
      this.data.page = val
      this.searchList()
    },
    searchList(type) {
      this.loading = true
      var that = this
      var page
      var params = {
        publishedName: that.searchForm.publishedName ? that.searchForm.publishedName : null,
        merchandise: that.searchForm.merchandise ? that.searchForm.merchandise : null,
        startTime: that.searchForm.startTime ? moment(new Date(that.searchForm.startTime).getTime()).format('YYYY-MM-DD HH:mm:ss') : null
      }
      if (type === 1) {
        page = 1
      } else {
        page = this.data.page
      }
      console.log(params, page)
      that.loading = true
      // that.$axios.post('/shop/Appraise/queryAll?p=' + page + '&c=' + that.size, params).then((res) => {
      that.$axios.get('/list').then((res) => {
        that.loading = false
        that.data = res
      }).catch(function(eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails(id) {
      this.$router.push('/projecManage/details/' + id)
    },
    editDetails(id) {
      this.$router.push('/projecManage/edit/' + id)
    },
    //change区域方法
    changeArea() {
      window.$helpSearchproject(this.searchForm.area).then((res) => {
        this.allProject = res;
      }, (err) => {})
    },
    //搜索
    scarchProject() {
      this.defaultProject = {
        "areaId": this.searchForm.area,
        "projectId": this.searchForm.pro
      }
      window.$helpScarchAll(this.defaultProject).then((res) => {
        this.defaultProjectData = res;
      }, (err) => {})
    },
    addPage() {
      this.$router.push('/evaluationTpl/template/add');
    },
    showAlert: function(cont) {
      this.$alert(cont, '温馨提示', {
        confirmButtonText: '确定'
      })
    }
  }
}

</script>
<style scoped lang="less">
.mainContent {
  width: 100%;
  height: 100%;
  background: #fff;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

</style>
