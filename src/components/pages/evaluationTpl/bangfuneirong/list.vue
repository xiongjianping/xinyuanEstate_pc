<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="6">
          <el-form-item label="类别">
            <el-select size="small" v-model="searchForm.type" placeholder="请选择">
              <el-option v-for="(item,index) in helpTypeList" :key="index" :label="item.typename" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" v-on:click="searchList(1);"  @click="changeType()">搜索</el-button>
            <el-button type="primary" size="medium" v-on:click="searchList(1);">新增</el-button>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <div class="listCont">
      <el-table :data="defaultHelpCon.resultList" border size="medium">
        <el-table-column align="center" type="index" label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="typeName" label="类别"></el-table-column>
        <el-table-column align="center" prop="context" label="帮扶内容"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
            <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="paginationCont">
        <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="data.page" :page-sizes="[10, 20, 50, 100]" :page-size="size" layout="total, sizes, prev, pager, next, jumper" :total="data.count">
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
    searchForm: {
      type: '',
      company: '',
      startTime: null
    },
    infoData: {},
    size: 10,
    dialogFormVisible: false,
    dialogVisible: false,
    pictureList: [],
    picIndex: 0,
    helpType: {},
    helpTypeList: [
      { type: 1, typename: "租金帮扶" },
      { type: 2, typename: "活动支持" },
      { type: 3, typename: "点位宣传支持" },
      { type: 4, typename: "品牌及会员" },
      { type: 5, typename: "其他" }
    ],
    defaultHelpCon: {}
  }),
  created() {
    // this.searchList(1)
    window.$helpContent(this.helpType).then((res) => {
      this.defaultHelpCon = res;
      this.typeNameShow(this.defaultHelpCon)
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
        that.loading = false
        that.data = res
      }).catch(function(eMsg) {
        that.loading = false
        that.showAlert(eMsg)
      })
    },
    // 查看详情
    showDetails(id) {
      this.$router.push('/evaluationTpl/bangfuneirong/details/' + id)
    },
    editDetails(id) {
      this.$router.push('/evaluationTpl/bangfuneirong/edit/' + id)
    },
    //操作原始数据，增加类型名称字段
    typeNameShow(data) {
      for (var i = 0; i < data.resultList.length; i++) {
        if (data.resultList[i].type == "1") {
          data.resultList[i].typeName = "租金帮扶";
        } else if (data.resultList[i].type == "2") {
          data.resultList[i].typeName = "活动支持";
        } else if (data.resultList[i].type == "3") {
          data.resultList[i].typeName = "点位宣传支持";
        } else if (data.resultList[i].type == "4") {
          data.resultList[i].typeName = "品牌及会员";
        } else if (data.resultList[i].type == "5") {
          data.resultList[i].typeName = "其他";
        }
      }
    },
    changeType() {
      this.helpType.type = this.searchForm.type;
      window.$helpContent(this.helpType).then((res) => {
        this.defaultHelpCon = res;
        this.typeNameShow(this.defaultHelpCon)
      }, (err) => {})
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
.mainContent {
  width: 100%;
  height: 100%;
  background: #fff;
}

.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}

</style>
