<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">指令内容</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="类别">
            <el-select size="small" v-model="searchForm.type" placeholder="请选择类型">
              <el-option v-for="(item,index) in helpTypeList" :key="index" :label="item.typename" :value="item.type"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>

    <div class="buttonList">
      <el-button type="primary" class="mr10 ml10" size="medium" @click="searchList(1)">搜索</el-button>
      <el-button type="primary" class="ml10" size="medium" v-on:click="xinzeng(1);">新增</el-button>
    </div>

    <p class="t"></p>
    <div class="biaoti1">指令内容列表</div>
    <div class="listCont">
      <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
        <el-table-column align="center" type="index"  prop='id'  label="序号" width="50"></el-table-column>
        <el-table-column align="center" prop="type" label="类别">
          <template slot-scope="scope">
            <el-button disabled type="text" size="small" v-if="scope.row.type === 1">租金指令</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.type === 2">活动支持</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.type === 3">点位宣传支持</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.type === 4">品牌及会员</el-button>
            <el-button disabled type="text" size="small" v-if="scope.row.type === 5">其他</el-button>
          </template>
        </el-table-column>
        <el-table-column align="center" prop="context" label="指令内容"></el-table-column>
        <el-table-column align="center" label="操作" width="100">
          <template slot-scope="scope">
            <!-- <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button> -->
            <el-button type="text" v-on:click="deleteContent(scope.row.id)">删除</el-button>
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
    type: '',
    page: 1,
    size: 10,
    helpTypeList: [
      { type: 1, typename: "租金指令" },
      { type: 2, typename: "活动支持" },
      { type: 3, typename: "点位宣传支持" },
      { type: 4, typename: "品牌及会员" },
      { type: 5, typename: "其他" }
    ]
  }),
  created() {
    this.searchList(1)
  },
  methods: {
    handleSizeChange(val) {
      this.size = val
      this.searchList()
    },
    handleCurrentChange(val) {
      this.page = val
      this.searchList()
    },
    searchList(type) {
      if(type === 1){
        this.page = 1
      }

      window.$helpContent(this.page, this.size, this.searchForm).then((res) => {
        this.data = res;
      }, (err) => {})
    },
    deleteContent(id) {
      this.$confirm('确认删除？', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
      this.loading = true
      window.$deleteHelpContent(id).then((res) => {
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
      }).catch(() => {

      })

    },
    editDetails(id) {
      this.$router.push('/evaluationTpl/bangfuneirong/edit/' + id)
    },
    xinzeng(id){
      this.$router.push('/evaluationTpl/bangfuneirong/xinzeng/'+id);
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
<style scoped lang="less">
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
.el-table .cell {
  white-space: pre-line;
}
</style>
