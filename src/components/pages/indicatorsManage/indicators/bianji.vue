<template>
  <!--新增项目-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">
      <h3 class="title">基本信息</h3>
      <i class="hengxian"></i>
      <el-form label-width="100px" :model="data">
        <el-col :span="6">
        <el-form-item label="品牌：">
          <el-input size="small" v-model="data.name" :maxlength="11" placeholder="请输入品牌名称"></el-input>
        </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="业态：">
            <el-select size="small" v-model="data.businessFormId" placeholder="请选择业态" @change="getSpeciesList()">
              <el-option v-for="(item, index) in formList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="业种：">
            <el-select size="small" v-model="data.businessSpeciesId" placeholder="请选择业种">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6">
          <el-form-item label="经营方式：">
            <el-select size="small" v-model="data.brandType" placeholder="请选择经营方式">
              <el-option v-for="(item, index) in brandTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="6" v-if="data.state == 1">
          <el-form-item label="状态：">
            签约
          </el-form-item>
        </el-col>
        <el-col :span="6" v-if="data.state == 2" :offset="0.7">
          <el-form-item label="状态：">
            停用
          </el-form-item>
        </el-col><br><br><br><br><br><br>

      <div class="xxk">
        <button type="button" @click="goBack()">取消</button>
        <button type="button" @click="edit()">确定</button>
      </div>

      </el-form>
    </el-row>
  </div>
</template>
<script>
import moment from 'moment'
export default {
  data: () => ({
    data: {},
    loading: false,
    speciesList: [],
    formList:[],
    brandTypeList:[
      {
        name: '直营',
        id: 1
      },
      {
        name: '代理',
        id: 2
      }
    ]
  }),
  created () {
    this.getData()
  },
  methods: {
    getData(){
      window.$getformSelect().then((res) => {
        this.formList = res
        window.$getBrandDetails(this.$route.params.id).then((res) => {
          this.loading = false
          this.data = res
          this.getSpeciesList()
        }, (err) => {
          this.loading = false
          this.showAlert(err)
        })
      }, (err) => {
        this.showAlert(err)
      })
    },
    getSpeciesList(){
      window.$getSpeciesSelect(this.data.businessFormId).then((res) => {
        this.speciesList = res
      }, (err) => {
        this.showAlert(err)
      })
    },
    edit(){
      this.loading = true
      window.$editBrand(this.data).then((res) => {
        this.loading = false
        this.showAlert('修改成功')
        this.goBack()
      }, (err) => {
        this.loading = false
        this.showAlert(err)
      })
    },
    goBack(){
      this.$router.back(-1)
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
  .mainContent{
    width: 100%;
    height: 100%;
    background: #fff;
  }
.el-date-editor.el-input, .el-date-editor.el-input__inner{
  width: 100%;
}
  .el-col-10 {
    width: 41.66667%;
    margin-top: 45px;
  }
  .el-form-item{
    margin-bottom: 30px;
    margin-top: 20px;
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
  el-button{
    background: rgb(22,155,213);
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


</style>
