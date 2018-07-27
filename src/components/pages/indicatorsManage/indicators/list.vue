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
            <el-select size="small" v-model="searchForm.businessFormId" placeholder="请选择" @change="getSpeciesList()">
              <el-option v-for="(item, index) in formList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="业种">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择">
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
            <el-button type="primary" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="xinzeng();">新增</el-button>
            <el-button type="primary" size="medium" v-on:click="bianji();">编辑</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="data.list" border size="medium">
        <el-table-column align="center" prop="id" label="序号"></el-table-column>
        <el-table-column align="center" prop="projectName" label="品牌名称"></el-table-column>
        <el-table-column align="center" prop="area" label="业态"></el-table-column>
        <el-table-column align="center" prop="company" label="业种"></el-table-column>
        <el-table-column align="center" prop="company" label="经营方式"></el-table-column>
        <el-table-column align="center" prop="company" label="修改时间"></el-table-column>
        <el-table-column align="center" prop="company" label="修改人"></el-table-column>
        <el-table-column align="center" prop="merchandiseName" label="状态">
          <template slot-scope="scope">
            <el-button disabled  size="small" type="success" v-if="scope.row.status === 'ENABLED'">启用</el-button>
            <el-button disabled  size="small" type="danger" v-if="scope.row.status === 'DISABLED'">禁用</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center"  label="操作" width="200">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="editDetails(scope.row.id)">编辑</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
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
    searchForm: {
      // area: '',
      // company: '',
      // startTime: null
    },
    infoData: {},
    speciesList: [],
    formList: [],
    brandList: [],
    page: 1,
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0
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
      window.$getspeciesSelect(this.searchForm.businessFormId).then((res) => {
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
        this.brandList = res.resultList
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    // 查看详情
    editDetails (id) {
      var url = "http://123.207.169.220:8080/api/region/find/project/list";
      alert("url:"+url);
      axios.post(url,
        // 通过qs.stringify()将对象解析成URL的形式
        /*qs.stringify({ } )*/
        {},
       //,{emulateJSON: true},
        {
          headers:{
            "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
            "ACCESS-TOKEN":"37a2cb88c84449e2b720290e4e9de819"
          }
        }).then(reponse=>{
          alert("1111");
          console.log(reponse)
         // this.tableData=reponse.data.data
        })
     /* this.$router.push('/indicatorsManage/indicators/details/' + id)*/
    },
    // showDetails (id) {
    //   this.$router.push('/projecManage/indicators/details/' + id)
    // },

    //新增项目
    xinzeng (id) {
      this.$router.push('/indicatorsManage/indicators/add/' + id)
    },
    //编辑
    bianji (id) {
      this.$router.push('/indicatorsManage/indicators/bianji/' + id)
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
