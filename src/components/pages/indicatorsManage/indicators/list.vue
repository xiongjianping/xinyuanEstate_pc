<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="品牌名称">
            <el-input size="small" v-model="searchForm.name" :maxlength="11" placeholder="请输入项目名称"></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择业态" @change="getSpeciesList()">
              <el-option v-for="(item, index) in formList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6.5">
          <el-form-item label="开始时间" label-width="100px">
            <el-date-picker
              size="small"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              v-model="searchForm.createTimeBegin"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="至" label-width="50px">
            <el-date-picker
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              size="small"
              v-model="searchForm.createTimeEnd"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList();">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="xinzeng(0);">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium">
        <el-table-column align="center" type="index" label="序号"></el-table-column>
        <el-table-column align="center" prop="name" label="品牌名称"></el-table-column>
        <el-table-column align="center" prop="businessFormName" label="业态"></el-table-column>
        <el-table-column align="center" prop="businessSpeciesName" label="业种"></el-table-column>
        <el-table-column align="center" prop="brandType" label="经营方式">
          <template slot-scope="scope">
            <el-button disabled type="text" size="small" v-if="scope.row.brandType === 1">直营</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.brandType === 2">代理</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
        <el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>
        <!-- <el-table-column align="center" prop="company" label="修改人"></el-table-column> -->
        <el-table-column align="center" prop="state" label="状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.state === 1">签约</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.state === 2">停用</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="bianji(scope.row.id)">编辑</el-button>
            <el-button type="text" v-on:click="deleteBrand(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
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
import qs from 'qs';
import axios from 'axios';
export default {
  data: () => ({
    data: {},
    loading: false,
    searchForm: {},
    infoData: {},
    speciesList: [],
    formList: [],
    page: 1,
    size: 10
  }),
  created () {
    this.searchList()
    window.$getformSelect().then((res) => {
      this.formList = res
    }, (err) => {
      this.showAlert(err)
    })
  },
  methods: {
    getSpeciesList(){
      window.$getSpeciesSelect(this.searchForm.businessFormId).then((res) => {
        this.speciesList = res
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
    searchList () {
      this.loading = true
      window.$getBrandList(this.page, this.size, this.searchForm).then((res) => {
        this.loading = false
        this.data = res
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    //新增项目
    xinzeng(id){
      this.$router.push('/indicatorsManage' + '/indicators/add/' + id)
    },
    //编辑
    bianji (id) {
      this.$router.push('/indicatorsManage/indicators/bianji/' + id)
    },
    deleteBrand(id){
      this.loading = true
      window.$deleteBrand(id).then((res) => {
        for(var i = this.data.resultList.length - 1; i >= 0; i--){
          if(this.data.resultList[i].id === id){
            this.data.resultList.splice(i, 1)
            this.loading = false
            return false
          }
        }
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
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
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
</style>
