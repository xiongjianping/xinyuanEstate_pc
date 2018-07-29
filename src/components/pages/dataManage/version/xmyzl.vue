<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="20">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="版本名称">
            <el-input size="small" v-model="searchForm.projectleader" :maxlength="30" placeholder="请输入项目负责人"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目">
            <el-select v-model="value" placeholder="请选择">
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value">
              </el-option>
            </el-select>
          </el-form-item>
        </el-col><br><br><br>
        <el-col :span="7">
          <el-form-item label="数据涵盖起止时间" label-width="150px">
            <el-date-picker
              size="small"
              v-model="searchForm.startTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="至" label-width="50px">
            <el-date-picker
              size="small"
              v-model="searchForm.endTime"
              type="datetime"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="xinzeng(1);">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-row>
        <el-button type="primary">项目溢租率</el-button>
      </el-row>
      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" prop="id" label="序号"></el-table-column>
        <el-table-column align="center" prop="area" label="版本"></el-table-column>
        <el-table-column align="center" prop="area" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="area" label="业种"></el-table-column>
        <el-table-column align="center" prop="area" label="溢租率"></el-table-column>
        <el-table-column align="center" prop="startTime" label="修改时间"></el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="data.page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
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
    data: {

    },
    loading: false,
    activeName: 'first',
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
    toggleTab: function(tab) {
      this.currentTab = tab; // tab 为当前触发标签页的组件名
    },
    handleClick (tab, event) {
      console.log(tab, event)
    },
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
      this.$router.push('/dataManage/version/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/dataManage/version/details/' + id)
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
      position: absolute;
      top: 50px;
    }
    .tab{
      background-size: 100% 220px;
      position: relative;
      top: -11px;
      left: -41px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      a{
        display: inline-block;
      }
      img{
        width: 220px;
        height: 120px;
      }
    }
  }
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
