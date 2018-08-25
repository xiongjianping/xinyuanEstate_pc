<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="20">
      <h3 id="title">标准三角形</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <!--修改-->
        <el-col :span="5">
          <el-form-item label="区域：">
            <el-select size="small" v-model="searchForm.areaId" placeholder="全部区域" @change="getAreaList2Current()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目：">
            <el-select size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="getProjectList2Current()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼栋：">
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="楼层：">
            <el-select size="small" v-model="searchForm.floorId" placeholder="F1" @change="getFloorList()">
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="业态：">
            <el-select size="small" v-model="searchForm.megabiteId" placeholder="餐饮" @change="dimensionChange()">
              <el-option v-for="(item, index) in megabiteList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="品牌">
            <el-input size="small" v-model="searchForm.brandId" :maxlength="11" placeholder="请选择品牌">
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <el-form-item label="状态：">
            <el-select size="small" v-model="searchForm.statusId" placeholder="全部状态" @change="businessTypeChange()">
              <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name"
                         :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" size="medium" class="mr10 ml10" v-on:click="searchList(1);">搜索</el-button>
            <!--<el-button id="fileUpload_button" class="mr10 ml10" type="primary" size="medium" v-on:click="importFile()">导入</el-button>-->
            <!--<input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />-->
            <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="exportExl()">导出</el-button>-->
            <!-- <el-button type="primary" size="medium" v-on:click="xinzeng();">导入</el-button> -->
            <!-- <el-button type="primary" size="medium" v-on:click="bianji(1);">编辑</el-button> -->
            <!-- <el-button type="primary" size="medium" v-on:click="xm_yzl(1);">项目溢租率</el-button>
            <el-button type="primary" size="medium" v-on:click="lc_yzl(1);">楼层溢租率</el-button>
            <el-button type="primary" size="medium" v-on:click="yt_yzl(1);">业态溢租率</el-button>
            <el-button type="primary" size="medium" v-on:click="kxd(1);">客销度</el-button>
            <el-button type="primary" size="medium" v-on:click="spz(1);">适配值</el-button> -->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>












    <el-dialog class="RentingRate" title="溢租率" :visible="dialogFormVisible" @close='closeDialog'>
      <el-form class="yzl-line-top"></el-form>
      <el-form :model="searchForm">
        <el-row>
          <el-col  :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="业态" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="searchForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="searchForm.projectId" placeholder="项目A" @change="projectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="F1" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="searchForm.businessType" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="溢租率" :label-width="formLabelWidth">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="生效时间" :label-width="formLabelWidth">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createTriangle ()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="客销度" :visible="dialogFormVisible1" @close="closeDialogKXD">
      <el-form class="yzl-line-top"></el-form>
      <el-form>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="业态" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="全部区域" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="项目A" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="F1" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row >
          <el-col :span="8" >
            <el-form-item label="毛利率" :label-width="formLabelWidth" align="center">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客单价" :label-width="formLabelWidth">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="生效时间" :label-width="formLabelWidth">
              <el-date-picker align="center" type="datetime" value-format="yyyy-MM-dd" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="createTriangle ()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="适配值" :visible="dialogFormVisible2" @close="closeDialogSPZ">
      <el-form class="yzl-line-top"></el-form>
      <el-form :offset="1">
        <el-row >
          <el-col  :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="业态" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="全部区域" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="项目A" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="F1" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
                <el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="适配值" :label-width="formLabelWidth">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="生效时间" :label-width="formLabelWidth">
              <el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createTriangle ()">保 存</el-button>
      </div>
    </el-dialog>
    <p class="t"></p>
    <div class="biaoti1">标准三角形列表</div>
    <el-button class="NewlyAdded" type="primary" align="right" v-on:click="showCreateCompany()">新增</el-button>

    <div class="listCont">
      <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="showCreateCompany();">新增</el-button>-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="溢租率" name="first">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>
            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="客销度" name="second">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>

            <el-table-column align="center" prop="fittedVerssionName" label="毛利率"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="客单价"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="适配值" name="third">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <!--<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>-->
            <el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>
            <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>

            <!--<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>-->
            <!--<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>-->
            <!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->

            <!--<el-table-column align="center" prop="different" label="类别">-->
            <!--<template slot-scope="scope">-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>-->
            <!--<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>-->
            <!--</template>-->
            <!--</el-table-column>-->

            <el-table-column align="center" label="操作" width="100">
              <template slot-scope="scope">
                <el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
                <el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-tab-pane>
      </el-tabs>
      <div class="paginationCont">
        <el-pagination
          @current-change="handleCurrentChange"
          :current-page="page"
          layout="prev, pager, next"
          :total="data.count">
        </el-pagination>
      </div>
    </div>
  </div>
</template>
<script>


  import moment from 'moment'

  export default {
    data: () => ({
      businessTypeList: window.$businessTypeList,
      dimensionList: window.$dimensionList,

      formLabelWidth: '70px',
      data: {},
      loading: false,
      activeName2: 'first',
      searchForm: {},
      infoData: {},
      page: 1,
      size: 10,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      dialogVisible: false,
      pictureList: [],
      picIndex: 0,


      businessList: [],
      areaList: [],
      projectList: [],
      buildingList: [],
      floorList: [],
      megabiteList:[],
      brandList:[],

      floorId: '',
      conditionId: '',
      projectId: '',
      currentAreaId:'',
      buildingId:'',

    }),


    created() {
      window.$getAreaList().then((res) => {
        this.areaList = res
        //this.hintArea2ProjectOne(res[0].id)//先不给默认太麻烦，直接让用户选
      }, (err) => {
        this.showAlert(err)
      })
    },

    methods: {
      /**
       * 默认：区域第一项值，项目第一项值
       */
      hintArea2ProjectOne(areaId){
        this.areaId = areaId
        window.$getProjectListForArea(this.areaId).then(res => {
          console.log("项目列表数据***"+res)
          this.projectList = res
          this.projectId = res[0].id
          // console.log("默认得到的项目id为***"+this.projectId)
          // this.getTriangleValue(1)//显示三角形
        }, err => {console.log(err)})
      },

      /**
       * 区域点击事件
       * 获得当前区域的id，得到对应项目列表
       */
      getAreaList2Current(){
        console.log("当前区域id为***"+this.searchForm.areaId)

        this.projectList = []
        window.$getProjectListForArea(this.searchForm.areaId).then(res => {
          console.log("当前区域对应的项目列表***"+res)
          // this.currentAreaId = this.searchForm.areaId
          this.projectList = res
        }, err => {console.log(err)})

      },


      /**
       * 项目点击事件
       * 1、首页选择区域了吗？
       * 2、获得当前列表id，来获得其他列表数据。楼栋列表，楼层列表，业态列表，品牌列表
       */
      getProjectList2Current(){
        //console.log("当前区域id为***"+this.searchForm.areaId)//这种方式依然可以获得
        //console.log("当前区域id为***"+this.currentAreaId)
        console.log("当前项目id为***"+this.searchForm.projectId)
        window.$getBuilding(this.searchForm.projectId).then(res => {
          console.log("***当前楼栋列表的数据："+res)
          this.buildingList = res//楼栋列表数据
          this.buildingId = res[0].id//楼栋只有一个
          window.$getFloorForBuilding(this.buildingId).then(res => {
            console.log("***当前楼层列表的数据长度："+res.length)//[]为空数组，长度为0
            if(res.length>0){
              console.log("***当前楼层列表的数据："+res)
              this.floorList = res
              this.floorId = this.floorList[0].id//点击的是项目，所以默认楼层第一项的id
            }else{
              this.floorList = []
              console.log("当前项目暂时没有楼层数据！")
              // alert("当前项目暂时没有楼层数据！")
            }
          }, err => {console.log(err)})
        }, err => {console.log(err)})


        window.$getBusinessListForProject(this.projectId).then(res => {
          if (res.length>0) {
            this.megabiteList = res
            console.log("getBusinessListForProject*当前业态列表数据为"+res)
            // this.megabiteId = res[0].id
            // alert("业态业态!"+this.megabiteId)
            // console.log("***业态列表第一项的id为"+this.megabiteId)

            //如果有业态，可获取品牌
            window.$getBrandForSpecies(this.megabiteId).then(res => {
              console.log("***品牌列表数据为"+res)
              if (res.length>0) {
                this.brandList = res
                // this.brandId = res[0].id
              }else{
                this.brandList = {}
                // alert("当前没有品牌数据")
                console.log("没有品牌数据！")
              }
            }, err => {console.log(err)})
          }else{
            this.megabiteList = {}
            // alert("此项目没有业态！")
            console.log("此项目没有业态！")
          }
        }, err => {console.log(err)})

      },



      closeDialog(){
        this.dialogFormVisible = false;//清空数据
      },
      closeDialogKXD(){
        this.dialogFormVisible1 = false;//清空数据
      },
      closeDialogSPZ(){
        this.dialogFormVisible2 = false;//清空数据
      },
      showCreateCompany() {
        dialogFormVisible: false;
        dialogFormVisible1: false;
        dialogFormVisible2: false;
        if (this.activeName2 == "first") {
          this.dialogFormVisible = true
        }
        if (this.activeName2 == 'second') {
          this.dialogFormVisible1 = true;
        }
        if (this.activeName2 == 'third') {
          this.dialogFormVisible2 = true;
        }
      },
      createCompany() {
        this.dialogFormVisible = false
      },
      importFile() {
        document.getElementById('fileUpload_input').click()
      },

      // getProjectListFromArea(){
      //
      // }

      areaChanged() {
        this.page = 1
        this.size = 10
        this.projectId = ''
        this.searchForm.buildingId = ''
        this.floorId = ''
        this.conditionId = ''
        window.$getProjectListForArea(this.searchForm.areaId).then((res) => {
          this.projectList = res
        }, (err) => {
          this.showAlert(err)
        })
      },

      projectChanged() {
        this.page = 1
        this.size = 10
        this.searchForm.buildingId = ''
        this.floorId = ''
        this.conditionId = ''
        // if (this.searchForm.dimensionType === 2) { // 获取楼栋
        window.$getBuilding(this.searchForm.projectId).then((res) => {
          this.buildingList = res
        }, (err) => {
          this.showAlert(err)
        })
        // } else if (this.searchForm.dimensionType === 3) {// 获取业态
        //   window.$getBusinessListForProject(this.searchForm.projectId).then((res) => {
        //     this.businessList = res
        //   }, (err) => {
        //     this.showAlert(err)
        //   })
        // }

      },
      getFloorList() {
        this.page = 1
        this.size = 10
        this.floorId = ''
        window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
          this.floorList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
      dimensionChange() {
        this.page = 1
        this.size = 10
        this.data = {}
      },
      toggleTab: function (tab) {
        this.currentTab = tab; // tab 为当前触发标签页的组件名
      },
      handleClick(tab, event) {
        console.log(tab._uid)
        this.tabbolock = tab._uid;
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
        if (type === 1) {
          this.page = 1
        }

        let url = ''
        if (this.searchForm.businessType === 1) {// 溢租率列表接口
          if (this.searchForm.dimensionType === 1) {
            url = '/standardprojectrent/find/standardprojectrent/list'
          } else if (this.searchForm.dimensionType === 2) {
            this.searchForm.floorId = this.floorId
            url = '/standardfloorrent/find/standardfloorrent/list'
          } else if (this.searchForm.dimensionType === 3) {
            this.searchForm.conditionId = this.conditionId
            url = '/standardconditionrent/find/standardconditionrent/list'
          }
        } else if (this.searchForm.businessType === 3) {// 适配值
          if (this.searchForm.dimensionType === 1) {
            url = '/standardprojectfitted/find/standardprojectfitted/list'
          } else if (this.searchForm.dimensionType === 2) {
            this.searchForm.floorId = this.floorId
            url = '/standardfloorfitted/find/standardfloorfitted/list'
          } else if (this.searchForm.dimensionType === 3) {
            this.searchForm.conditionId = this.conditionId
            url = '/standardconditionfitted/find/standardconditionrent/list'
          }
        } else if (this.searchForm.businessType === 2) {
          url = '/standardbrandsale/find/standardbrandsale/list'
        }

        this.$axios.post(url + '?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {
          this.data = res
          console.log(res)
        }, (err) => {
          this.showAlert(err)
        })
      },
      fileUpload(e) {
        if (!this.searchForm.businessType) {
          this.showAlert('请选择业务类型')
          return false
        }
        let url = this.searchForm.businessType === 1 ? '/standimport/excel/standrentimport/sheet' : (this.searchForm.businessType === 2 ? '/standimport/excel/standguestimport/sheet' : '/standimport/excel/standfittedimport/sheet')
        window.$fileUpload(e, url).then((res) => {
          this.showAlert('导入成功')
          this.page = 1
          this.size = 10
          this.searchList()
        }, (err) => {
          this.showAlert(err)
        })
      },
      exportExl() {
        if (!this.searchForm.businessType) {
          this.showAlert('请选择业务类型')
          return false
        }
        if (!this.projectId) {
          this.showAlert('请选择项目')
          return false
        }
        let url = this.searchForm.businessType === 1 ? '/standardexport/excel/yzl' : (this.searchForm.businessType === 2 ? '/standardexport/excel' : '/standardexport/excel/spz')
        window.$exportExls(url, this.projectId).then((res) => {
          console.log(res)
          let link = document.createElement('a')
          link.href = res
          link.click()
        }, (err) => {
          this.showAlert(err)
        })
      },
      // 查看详情
      showDetails(id) {
        this.$router.push('/dataManage/version/details/' + id)
      },
      editDetails(id) {
        this.$router.push('/dataManage/version/details/' + id)
      },
      xinzeng(id) {
        this.$router.push('/dataManage/version/xinzeng/' + id)
      },
      bianji(id) {
        this.$router.push('/dataManage/version/bianji/' + id)
      },
      xm_yzl(id) {
        this.$router.push('/dataManage/version/xmyzl/' + id)
      },
      lc_yzl(id) {
        this.$router.push('/dataManage/version/lcyzl/' + id)
      },
      yt_yzl(id) {
        this.$router.push('/dataManage/version/ytyzl/' + id)
      },
      kxd(id) {
        this.$router.push('/dataManage/version/kxd/' + id)
      },
      spz(id) {
        this.$router.push('/dataManage/version/spz/' + id)
      },
      rowClass({row, rowIndex}) {
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
  .dialog-footer{
    text-align: center;
  }
  .yzl-line{
    height: 1px;
    background: #fff;
    border-top: 1px solid #CCC;
    padding-bottom: 16px;
  }
  .yzl-line-top{
    height: 1px;
    background: #FFF;
    border-top: 1px solid #000;
    padding: 10px;
    margin-top:-25px;
  }
  .el-button--primary{
    color: #fff;
    background-color: #409EFF;
    border-color: #409EFF;
    height: 27px;
    line-height: 7px;
  }

  //溢租率
  .el-dialog{
    width: 200px;
    height: 400px;
    background: red;
  }
  .tabs {
    width: 100%;
    height: 50px;
    background: #e7cb8a !important;
    margin-bottom: 5px;
    div {
      display: inline-block;
      position: absolute;
      top: 50px;
    }
    .tab {
      background-size: 100% 220px;
      position: relative;
      top: -11px;
      left: -41px;
      border-bottom-left-radius: 10px;
      border-bottom-right-radius: 10px;
      a {
        display: inline-block;
      }
      img {
        width: 220px;
        height: 120px;
      }
    }
  }

  .mainContent {
    width: 100%;
    // height: 100%;
    background: #fff;
  }

  .el-date-editor.el-input, .el-date-editor.el-input__inner {
    width: 100%;
  }

  .uploadInput {
    top: 0px;
    width: 0;
    height: 100%;
    visibility: hidden;
  }

  .new {
    float: right;
  }
</style>
