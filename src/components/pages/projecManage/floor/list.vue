<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">楼层管理</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="区域">
            <el-select size="small" v-model="searchForm.areaId" placeholder="请选择">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="项目">
            <el-input size="small" v-model="searchForm.projectName" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        
        <el-col :span="5">
          <el-form-item label="方位">
            <el-select size="small" v-model="searchForm.location" placeholder="请选择位置">
              <el-option label="地上" value="1"></el-option>
              <el-option label="地下" value="2"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="editDetails(0);">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">楼层管理列表</div>
    <div class="listCont">
      <el-table :data="floorList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="areaName" label="区域"></el-table-column>
        <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
        <el-table-column align="center" prop="buildingName" label="楼栋"></el-table-column>
        <el-table-column align="center" prop="name" label="楼层"></el-table-column>
        <el-table-column align="center" prop="location" label="位置">
          <template slot-scope="scope">
            <p v-if="scope.row.location === 1">地上</p>
            <p v-if="scope.row.location === 2">地下</p>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="acreage" label="面积"></el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="当前状态">
          <template slot-scope="scope">
            <p class="using" v-if="scope.row.state">启用</p>
            <p class="unusing" v-if="!scope.row.state">禁用</p>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="xiangqing(scope.row.id)">查看</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row.id)">编辑</el-button>
            <!-- <el-button type="text" v-on:click="deleteFloor(scope.row.id)">删除</el-button> -->
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
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    data: {},
    loading: false,
    searchForm: {},
    areaList:[],
    floorList: [],
    page: 1,
    size: 10
  }),
  created () {
    this.searchList(1)
    window.$getAreaList().then((res) => {
      this.areaList = res
    }, (err) => {
      this.showAlert(err)
    })
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
    searchList (type) {
      this.loading = true
      if(type === 1) {
        this.page = 1
      }

      window.$getFloorList(this.page, this.size, this.searchForm)
      .then((res) => {
        this.loading = false
        this.data = res
        this.floorList = res.resultList
        console.log(this.floorList)
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    // 查看详情
    showDetails (id) {
      this.$router.push('/projecManage/floor/details/' + id)
    },
    //编辑
    editDetails (id) {
      this.$router.push('/projecManage/floor/add/' + id)
    },
    //详情
    xiangqing(id){
      this.$router.push('/projecManage/floor/xiangqing/' + id)
    },
    deleteFloor(id){
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
      window.$deleteFloor(id).then((res) => {
        for(var i = this.floorList.length - 1; i >= 0; i--){
          if(this.floorList[i].id === id){
            this.floorList.splice(i, 1)
            this.loading = false
            return false
          }
        }
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
      }).catch(() => {
                  
      })
    },
    rowClass({ row, rowIndex}) {
      console.log(rowIndex) //表头行标号为0
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
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
