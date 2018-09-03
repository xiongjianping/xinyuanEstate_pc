<template>
  <!--签约-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">

    <el-row class="searchBox" :gutter="30">

      <el-form label-width="100px" :model="searchData">
        <el-row>
          <el-col :span="8">
            <el-form-item label="类别：">
              <el-select size="small" v-model="searchData.type" placeholder="租金帮扶">
                <el-option v-for="(item, index) in typeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="帮扶内容：">
              <el-input v-model="searchData.context" type="textarea" autosize placeholder="请输入内容">
              </el-input>
            </el-form-item>
          <!-- <p style="margin-left: 100px;">帮扶内容：</p>
          <el-input v-model="searchData.context" type="textarea" autosize placeholder="请输入内容" style="margin-left: 170px; width:800px">
          </el-input> -->
          </el-col>
        </el-row>
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
      searchData:{},
      loading: false,
      typeList: window.$helpTypeList
    }),
    created(){
    },
    methods: {
      create(){
        window.$createHelpContent(this.searchData).then((res) => {
          this.showAlert('新增成功')
          this.goBack()
        }, (err) => {
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
  .biao{
    width: 350px;
    height: 350px;
    border: 3px solid #000;
    margin-left: 160px;
    el-table{
      margin-top: 50px;
    }
    /*.main{*/
      /*width: 280px;*/
      /*height: 280px;*/
      /*border: 1px solid #000;*/
      /*margin: 0 auto;*/
      /*margin-top: 10px;*/
      /*tr{*/
        /*height: 20px;*/
        /*border: 1px solid #CCC;*/
        /*background: red;*/
      /*}*/
      /*!*th,tr,td{*!*/
        /*!*height: 20px;*!*/
        /*!*border: 1px solid #ccc;*!*/
        /*!*border-collapse: collapse;*!*/
        /*!*text-align: center;*!*/
      /*!*}*!*/
    /*}*/
  }


</style>
