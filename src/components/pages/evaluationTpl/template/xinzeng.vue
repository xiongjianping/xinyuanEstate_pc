<template>
  <!--签约-->
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="区域：">
            <el-select size="small" v-model="searchForm.area" placeholder="请选择" @change="changeArea()">
              <el-option v-for="(item,index) in allArea" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="项目名称：">
            <el-select size="small" v-model="searchForm.pro" placeholder="请选择">
              <el-option v-for="(item,index) in allProject" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <br>
        <br>
        <br>
        <br>
        <br>
        <el-col :span="6">
          <el-form-item label="">
            <el-select size="small" v-model="searchForm.types" placeholder="租金帮扶 ">
              <el-option v-for="(item,index) in helpTypeList" :key="index" :label="item.typename" :value="item.code"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="6" style="margin-left: -150px">
          <el-form-item label="">
            <el-select size="small" v-model="searchForm.eva" placeholder="优秀">
              <el-option v-for="(item,index) in evaluateTypeList" :key="index" :label="item.typename" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <br>
        <br>
        <br>
        <br>
        <div class="biao">
          <el-table :data="allcontext" height="280" border style="width: 280px;margin: 0 auto;">
            <el-checkbox v-model="checked">备选项</el-checkbox>
            <el-table-column type="index" prop="id" label="序号" style='height:50px;text-align: center'>
            </el-table-column>
            <el-table-column prop="typeName" label="类别" style='text-align: center'>
            </el-table-column>
            <el-table-column prop="context" label="帮扶内容" style='text-align: center'>
            </el-table-column>
          </el-table>
        </div>
        <div class="xxk">
          <button>取消</button>
          <button @click="addNewData()">新增</button>
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
    searchForm: {
      area: '',
      company: '',
      startTime: null,
      pro: '',
      types: '',
      eva: '',
    },
    infoData: {},
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    allArea: {},
    allProject: {},
    helpTypeList: [
      { code: 1, typename: "租金帮扶" },
      { code: 2, typename: "活动支持" },
      { code: 3, typename: "点位宣传支持" },
      { code: 4, typename: "品牌及会员" },
      { code: 5, typename: "其他" }
    ],
    evaluateTypeList: [
      { type: 'yx', typename: "优秀" },
      { type: 'lh', typename: "良好" },
      { type: 'ts', typename: "提升" },
      { type: 'hl', typename: "合理" },
      { type: 'ks', typename: "亏损" }
    ],
    allcontext: [],
    contentListPostData: {},
  }),
  created() {
    window.$getAreaList().then((res) => {
        this.allArea = res;
        console.log(this.allArea)
      }, (err) => {}),
      window.$addContentList(this.contentListPostData).then((res) => {
        this.allcontext = res;
        console.log(res)
        this.typeNameShow(this.allcontext)
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
        console.log(res)
        that.loading = false
        that.data = res
      }).catch(function(eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })

    },
    //change区域方法
    changeArea() {
      window.$helpSearchproject(this.searchForm.area).then((res) => {
        this.allProject = res;
      }, (err) => {})
    },
    addNewData() {
      var postData = {
        "projectId": this.searchForm.area,
        "type": this.searchForm.types,
        "helpContext": [
          "CRM会员特权",
          "品牌推广支持"
        ]
      }
      window.$addContent(postData).then((res) => {
        this.allProject = res;
      }, (err) => {})
    },
    //操作原始数据，增加类型名称字段
    typeNameShow(data) {
      for (var i = 0; i < data.length; i++) {
        if (data[i].type == "1") {
          data[i].typeName = "租金帮扶";
        } else if (data[i].type == "2") {
          data[i].typeName = "活动支持";
        } else if (data[i].type == "3") {
          data[i].typeName = "点位宣传支持";
        } else if (data[i].type == "4") {
          data[i].typeName = "品牌及会员";
        } else if (data[i].type == "5") {
          data[i].typeName = "其他";
        }
      }
    },
    showMessage(cont) {
      this.$message({
        type: 'success',
        message: cont
      })
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
.xuan {
  margin-left: 15px;
  margin-top: 20px;
}

.mainContent {
  width: 100%;
  height: 100%;
  background: #fff;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

.el-col-10 {
  width: 41.66667%;
  margin-top: 45px;
}

.el-form-item {
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

el-button {
  background: rgb(22, 155, 213);
}

.xxk {
  width: 100%;
  height: 100px;
  button {
    width: 100px;
    height: 50px;
    display: inline-block;
    border-radius: 10px;
    background: rgb(22, 155, 213);
    outline: medium;
    outline: none;
    position: relative;
    left: 500px;
    top: 50px;
    margin-left: 20px;
  }
}

.biao {
  width: 350px;
  height: 350px;
  border: 3px solid #000;
  margin-left: 160px;
  el-table {
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
