<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm" class="formStyle">

        <el-col :span="5">
          <el-form-item label="品牌">
            <el-input size="small" v-model="searchForm.name" :maxlength="11" placeholder="请输入品牌名称"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业态">
            <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择业态" @change="getSpeciesList()">
              <el-option v-for="(item, index) in formList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业种">
            <el-select size="small" v-model="businessSpeciesId" placeholder="请选择业种">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
        <el-form-item label="时间">
            <el-date-picker  size="small" v-model="value6" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期" format="yyyy-MM-dd"
              value-format="yyyy-MM-dd">
          </el-date-picker>
        </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" class="mr25" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="xinzeng(0);">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
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
            <el-button disabled size="small" type="success" v-if="scope.row.state === 1">签约</el-button>
            <el-button disabled size="small" type="danger" v-if="scope.row.state === 2">停用</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="bianji(scope.row.id)">编辑</el-button>
            <el-button type="text" v-on:click="deleteBrand(scope.row.id)">删除</el-button>
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
    size: 10,
    value6: [],
    businessSpeciesId:''
  }),
  created() {
    this.searchList(1)
    window.$getformSelect().then((res) => {
      this.formList = res
    }, (err) => {
      this.showAlert(err)
    })
  },
  methods: {
    getSpeciesList() {
      this.businessSpeciesId = ''
      window.$getSpeciesSelect(this.searchForm.businessFormId).then((res) => {
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    handleSizeChange(val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.searchList()
    },
    searchList(type) {
      this.loading = true
      if(this.value6){
          this.searchForm.createTimeBegin = this.value6[0]
          this.searchForm.createTimeEnd = this.value6[1]
      }

      if(type === 1){
        this.page = 1
      }

      this.searchForm.businessSpeciesId = this.businessSpeciesId
      window.$getBrandList(this.page, this.size, this.searchForm).then((res) => {
        this.loading = false
        this.data = res
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    //新增项目
    xinzeng(id) {
      this.$router.push('/indicatorsManage' + '/indicators/add/' + id)
    },
    //编辑
    bianji(id) {
      this.$router.push('/indicatorsManage/indicators/bianji/' + id)
    },
    deleteBrand(id) {
      this.loading = true
      window.$deleteBrand(id).then((res) => {
        for (var i = this.data.resultList.length - 1; i >= 0; i--) {
          if (this.data.resultList[i].id === id) {
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
    rowClass({ row, rowIndex }) {
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
<style scoped lang="less">
.mainContent {
  width: 100%;
  // height: 120%;
  background: #fff;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.formStyle {
  height: 66px;
}

</style>
