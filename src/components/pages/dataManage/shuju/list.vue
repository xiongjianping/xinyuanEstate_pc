<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入区域"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层">
            <el-input size="small" v-model="searchForm.projectleader" :maxlength="30" placeholder="请输入"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌">
            <el-select size="small" v-model="searchForm.company" placeholder="请选择">
              <el-option label="请选择" value="null"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0" style="margin-left:180px; margin-top:-62px">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">导入</el-button>
            <el-button type="primary" size="medium" v-on:click="searchList(2);">导出</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="listCont">
      <div class="detailsContent">
        <h3 class="title">每日导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="7" :offset="1">
            {{data.projectName}}
          </el-col><br>
          <el-col :span="4" :offset="1">
            客流销售导入：{{data.area}}
          </el-col>
          <el-checkbox v-model="checked">选择导入导出</el-checkbox><br>
          <el-col :span="4" :offset="1">
            毛利率、客单价导入：{{data.area}}
          </el-col>
          <el-checkbox v-model="checked">选择导入导出</el-checkbox>
        </el-row>

        <h3 class="title">每月导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="7" :offset="1">
            {{data.projectName}}
          </el-col><br>
          <el-col :span="4" :offset="1">
            固定成本导入：{{data.area}}
          </el-col>
          <el-checkbox v-model="checked">选择导入导出</el-checkbox><br>
        </el-row>

        <h3 class="title">每季导入</h3>
        <i></i>
        <el-row class="detailsInfo" :gutter="30">
          <el-col :span="7" :offset="1">
            {{data.projectName}}
          </el-col><br>
          <el-col :span="4" :offset="1">
            适配值导入：{{data.area}}
          </el-col>
          <el-checkbox v-model="checked">选择导入导出</el-checkbox><br>
        </el-row>
      </div>
      <el-checkbox-group
        v-model="checkedCities1"
        :min="1"
        :max="2">
        <el-checkbox v-for="city in cities" :label="city" :key="city">{{city}}</el-checkbox>
      </el-checkbox-group>

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
      startTime: null
    },
    infoData: {},
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0
  }),
  created () {
    this.searchList(1)
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.data.page = val
      this.searchList()
    },
    searchList (type) {
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
      }).catch(function (eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/shuju/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/shuju/edit/' + id)
    },

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
    height: 150%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
