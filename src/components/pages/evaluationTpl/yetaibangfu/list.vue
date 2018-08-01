<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中" >
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域：">
            <el-select size="small" v-model="area" placeholder="请选择区域" @change="changeArea()">
              <el-option v-for="(item, index) in allArea" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="项目：">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目">
              <el-option v-for="(item, index) in allProject" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="xinzeng(1);">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="floorName" label="楼层名称"></el-table-column>
        <el-table-column align="center" prop="yx" label="优秀"></el-table-column>
        <el-table-column align="center" prop="lh" label="良好"></el-table-column>
        <el-table-column align="center" prop="ts" label="提升"></el-table-column>
        <el-table-column align="center" prop="hl" label="合理"></el-table-column>
        <el-table-column align="center" prop="ks" label="亏损"></el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="page"
          :page-sizes="[10, 20, 50, 100]"
          :page-size="size"
          layout="total, sizes, prev, pager, next, jumper"
          :total="data.countSize">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    area: '',
    data:{},
    building: '',
    loading: false,
    searchForm: {},
    page: 1,
    size: 10,
    allArea: {},
    allProject: {},
  }),
  created () {
    window.$getAreaList().then((res) => {
        this.allArea = res;
      }, (err) => {
        this.showAlert(err)
      }),
    this.searchList()
  },
  methods: {
    handleSizeChange (val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange (val) {
      this.page = val
      this.searchList()
    },
    searchList() {
      window.$helpBusinessContent(this.page, this.size, this.searchForm).then((res) => {
        this.data = res;
      }, (err) => {
        this.showAlert(err)
      })
    },
    changeArea() {
      window.$helpSearchproject(this.area).then((res) => {
        this.allProject = res;
      }, (err) => {})
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/details/' + id)
    },
    editDetails (id) {
      this.$router.push('/projecManage/edit/' + id)
    },
    xinzeng(id){
      this.$router.push("/evaluationTpl/yetaibangfu/xinzeng/"+id)
    },

  }
}
</script>
<style scoped  lang="less">
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
