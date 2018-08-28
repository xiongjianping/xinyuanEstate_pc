<template>
  <div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
    <el-row class="searchBox" :gutter="30">
      <h3 id="title">标准三角形</h3><br>
      <el-form label-width="100px" :model="searchForm">
        <el-col :span="5">
          <el-form-item label="对象" :label-width="formLabelWidth" >
            <el-select  size="small" v-model="objType" placeholder="项目" @change="objTypeChange()">
              <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="区域" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.areaId" placeholder="全部区域" @change="areaChanged()">
              <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="项目" :label-width="formLabelWidth">
            <el-select   size="small" v-model="searchForm.projectId" placeholder="请选择项目" @change="projectChanged()">
              <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼栋"  style="display: none;">
            <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
            <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" >
              <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="楼层" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.floorId" placeholder="请选择楼层" >
              <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业态" :label-width="formLabelWidth">
            <el-select  size="small" v-model="searchForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
              <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="业种" :label-width="formLabelWidth">
            <el-select size="small" v-model="searchForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
              <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <el-form-item label="品牌" :label-width="formLabelWidth">
            <el-select size="small" v-model="searchForm.brandId" placeholder="请选择品牌" @change="brandIdChanged()">
              <!--<el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>-->
              <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
           <el-form-item label="品牌：">
             <el-input size="small" v-model="searchForm.brandId" :maxlength="11" placeholder=" "></el-input>
           </el-form-item>
         </el-col>-->
        <!--   <el-col :span="5">
             <el-form-item label="状态：">
               <el-select  size="small" v-model="searchForm.contractType" placeholder="全部状态" @change="contractTypeChange()">
                 <el-option v-for="(item, index) in contractTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
               </el-select>
             </el-form-item>
           </el-col>-->

        <!--<el-col :span="5">-->
        <!--<el-form-item label="业务类型">-->
        <!--<el-select  size="small" v-model="businessType" placeholder="请选择业务类型" @change="businessTypeChange()">-->
        <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->

        <el-col :span="5">
          <el-form-item label="时间" :label-width="formLabelWidth">
            <el-date-picker v-model="effectTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
        </el-col>

        <!--<el-col :span="5">-->
        <!--<el-form-item label="维度" v-if="businessType === 2" >-->
        <!--<el-select  size="small" v-model="searchForm.different" placeholder="请选择维度">-->
        <!--<el-option v-for="(item, index) in dimensionTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-dialog title="导出" :visible.sync="dialogFormVisible">-->
        <!--<el-form :model="exportExlsData">-->
        <!--<el-form-item label="区域">-->
        <!--<el-select v-model="exportExlsData.areaId" placeholder="请选择区域" @change="areaChange()">-->
        <!--<el-option v-for="(item,index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--<el-form-item label="项目">-->
        <!--<el-select v-model="exportExlsData.projectId" placeholder="请选择项目">-->
        <!--<el-option v-for="(item,index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>-->
        <!--</el-select>-->
        <!--</el-form-item>-->
        <!--</el-form>-->
        <!--<div slot="footer" class="dialog-footer">-->
        <!--<el-button @click="dialogFormVisible = false">取 消</el-button>-->
        <!--<el-button type="primary" @click="exportExls()">确 定</el-button>-->
        <!--</div>-->
        <!--</el-dialog>-->

        <el-col :span="24" class="text-center">
          <el-form-item label-width="0">
            <el-button type="primary" class="mr10 ml10" size="medium" v-on:click="searchList(1);">搜索</el-button>
            <!--<el-button id="fileUpload_button" class="mr10 ml10" type="primary" size="medium" v-on:click="importFile()">导入</el-button>-->
            <!--<input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />-->
            <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="exportFile();">导出</el-button>-->
          </el-form-item>
        </el-col>
      </el-form>
    </el-row>
    <el-dialog title="溢租率" :visible="dialogFormVisible"  @close='closeDialog'>
      <el-form class="yzl-line-top"></el-form>
      <el-form  label-width="50px" :model="rentForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="objType" placeholder="请选择对象维度" @change="objTypeChange()">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="rentForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8">
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="rentForm.projectId" placeholder="请选择项目" @change="rentProjectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼栋："  style="display: none;">
              <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
              <el-select size="small" v-model="rentForm.buildingId" placeholder="请选择楼栋" >
                <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="rentForm.floorId" placeholder="请选择楼层" @change="businessTypeChange()">
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="rentForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select size="small" v-model="rentForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="溢租率" :label-width="formLabelWidth">
              <el-input size="small" v-model="rentForm.rentFee" :maxlength="11" placeholder=" "></el-input>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="生效时间" :label-width="formLabelWidthYZ">
              <el-date-picker v-model="effectTime" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>

        </el-row>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="createStandardRent()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="客销度" :visible="dialogFormVisible1" @close='closeDialogKXD'>
      <el-form class="yzl-line-top"></el-form>
      <el-form :model="guestForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="objType" placeholder="请选择对象维度" @change="objTypeChange()">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.projectId" placeholder="请选择项目" @change="guestProjectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼栋"  style="display: none;">
              <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
              <el-select size="small" v-model="guestForm.buildingId" placeholder="请选择楼栋" >
                <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.floorId" placeholder="请选择楼层" >
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="guestForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select size="small" v-model="guestForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

          <el-col :span="8">
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <el-select size="small" v-model="guestForm.brandId" placeholder="请选择品牌">
                <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>

        </el-row>
        <el-row class="yzl-line"></el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="毛利率" :label-width="formLabelWidth">
              <el-input size="small" v-model="guestForm.persent" :maxlength="11" placeholder="请输入客流量 "></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="客单价" :label-width="formLabelWidth">
              <el-input size="small" v-model="guestForm.sale" :maxlength="11" placeholder="请选择销售额"></el-input>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker v-model="effectTime2" value-format="yyyy-MM-dd" type="date" placeholder="选择日期"></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible1 = false">取 消</el-button>
        <el-button type="primary" @click="createStandardGuest()">保 存</el-button>
      </div>
    </el-dialog>
    <el-dialog title="适配值" :visible="dialogFormVisible2" @close='closeDialogSPZ'>
      <el-form class="yzl-line-top"></el-form>
      <el-form :model="fittedForm">
        <el-row>
          <el-col :span="8">
            <el-form-item label="对象" :label-width="formLabelWidth">
              <el-select  size="small" v-model="objType" placeholder="项目" @change="objTypeChange()">
                <el-option v-for="(item, index) in objTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col  :span="8">
            <el-form-item label="区域" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.areaId" placeholder="全部区域" @change="areaChanged()">
                <el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="项目" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.projectId" placeholder="项目A" @change="fittedProjectChanged()">
                <el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="楼栋："  style="display: none;">
              <!--  <el-select size="small" v-model="searchForm.buildingId" placeholder="请选择楼栋" @change="buildingChanged()">-->
              <el-select size="small" v-model="fittedForm.buildingId" placeholder="请选择楼栋" >
                <el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col  :span="8" >
            <el-form-item label="楼层" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.floorId" placeholder="请选择楼层" @change="businessTypeChange()">
                <el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row>
          <el-col :span="8">
            <el-form-item label="业态" :label-width="formLabelWidth">
              <el-select  size="small" v-model="fittedForm.businessFormId" placeholder="请选择业态" @change="businessChanged()">
                <el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="业种" :label-width="formLabelWidth">
              <el-select size="small" v-model="fittedForm.businessSpeciesId" placeholder="请选择业种" @change="speciesChanged()">
                <el-option v-for="(item, index) in speciesList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
          <el-col :span="8">
            <el-form-item label="品牌" :label-width="formLabelWidth">
              <!-- <el-input size="small" v-model="fittedForm.brandId" :maxlength="11" placeholder="品牌"></el-input>-->
              <el-select size="small" v-model="fittedForm.brandId" placeholder="请选择品牌" @change="brandIdChanged()">
                <el-option v-for="(item, index) in brandList" :key="index" :label="item.name" :value="item.id"></el-option>
              </el-select>
            </el-form-item>
          </el-col>
        </el-row>
        <el-row class="FitnessValue">
            <el-col :span="8">
              <el-form-item label="适配值" :label-width="formLabelWidthDT">
                <el-input size="small" v-model="fittedForm.fittedVal" :maxlength="11" placeholder=" "></el-input>
              </el-form-item>
            </el-col>
          <el-col :span="8">
            <el-form-item label="时间" :label-width="formLabelWidth">
              <el-date-picker
                v-model="effectTime3"
                type="date"
                value-format="yyyy-MM-dd"
                placeholder="选择日期">
              </el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogFormVisible2 = false">取 消</el-button>
        <el-button type="primary" @click="createStandardFitted()">保 存</el-button>
      </div>
    </el-dialog>


    <p class="t"></p>
    <div class="biaoti1">标准三角形列表</div>
    <el-button class="NewlyAdded" type="primary" align="center" v-on:click="showCreate()">新增</el-button>

    <div class="listCont">
      <!--<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="showCreateCompany();">新增</el-button>-->
      <el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
        <el-tab-pane label="溢租率" name="first">
          <el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
            <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
           <!-- <el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>-->
            <el-table-column align="center" prop="formName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="speciesName" label="业种名称"></el-table-column>
           <!-- <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>-->
            <el-table-column align="center" prop="rentingRateVal" label="溢租率"></el-table-column>
            <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>
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
            <el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>
            <el-table-column align="center" prop="floorName" label="楼层"></el-table-column>
            <el-table-column align="center" prop="formName" label="业态名称"></el-table-column>
            <el-table-column align="center" prop="speciesName" label="业种名称"></el-table-column>
          <!--  <el-table-column align="center" prop="status" label="签约状态">
              <template slot-scope="scope">
                <el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>
                <el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>
              </template>
            </el-table-column>-->
            <el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>
            <el-table-column align="center" prop="effectTime" label="生效时间"></el-table-column>
            <el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>
            <el-table-column align="center" prop="createUser" label="创建人"></el-table-column>

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
  //定义变量
  //区域id
  var myareaId='';
  //业态id
  var mybusinessFormId='';
  //业种id
  var mybusinessSpeciesId = '';
  import moment from 'moment'
  export default {
    data: () => ({
      searchForm:{},
      formLabelWidth:"60px",
      formLabelWidthYZ:'70px',
      formLabelWidthDT:'85px',
      contractTypeList:[],//签约状态
      businessTypeList: window.$businessTypeList2,
      dimensionTypeList: window.$dimensionList2,
      businessType: '',
      exportExlsData: {},
      areaList:[],
      projectList:[],
      projectId:'',
      data: {},
      loading: false,
      infoData: {},
      page: 1,
      size: 10,
      dialogFormVisible: false,
      dialogFormVisible1: false,
      dialogFormVisible2: false,
      fittedVal:0,
      pictureList: [],
      picIndex: 0,
      //  value6:[],
      activeName2: 'first',
      buildingList:[],
      buildingId:'',
      floorList:[],
      floorId:'',
      businessList:[],
      business:'',
      businessSpeciesId:'',
      speciesList:[],
      species:'',
      brandList:[],
      brandId:"",
      objTypeList:[
        {
          id: '0',
          name: '项目'
        },
        {
          id: '1',
          name: '楼层'
        },{
          id: '2',
          name: '业态'
        },{
          id: '3',
          name: '业种'
        },
        {
          id: '4',
          name: '品牌'
        }],
      objType:'0',
      //搜索条件
      searchRequest : {
        projectId : "",//项目ID
        buildingId : "",//楼栋
        floorId : "",//楼层
        formId : "", //业态
        speciesId:'',//业种
        brandName : "", //品牌
        effectTime : '',//生效时间
        contractId : '' //签约id
      },
      rentForm:{},
      rentCreateDate:{
        projectId:'', //项目ID
        buildingId:'', //楼栋ID
        floorId:'', //楼层ID
        formId:'',//业态
        speciesId:'',//业种
        contractId:'',//签约ID
        rentingRateVal:'',//溢租率
        effectTime:'', //生效时间
        contractId:'',//签约ID
        effectTime:'' //生效时间
      },
      fittedCreateDate :{
        projectId:'',
        buildingId:'',
        floorId:'', //楼层ID
        formId:'',//业态
        speciesId:'',//业种
        contractId:'',//签约ID
        fittedVal:'',//市场地位
        effectTime:'' //生效时间
      },
      guestProjectCreateDate:{
        projectId:'', //项目ID
        passengerFlow:'',//客流量
        alesVolume:'',//销售额
        effectTime:'' //生效时间
      },
      guestFloorCreateDate:{
        projectId:'', //项目ID
        buildingId:'', //楼栋ID
        floorId:'', //楼层ID
        passengerFlow:'',//客流量
        alesVolume:'',//销售额
        effectTime:'' //生效时间
      },
      guestBrandCreateDate:{
        projectId:'', //项目ID
        buildingId:'', //楼栋ID
        floorId:'', //楼层ID
        formId:'',//业态
        speciesId:'',//业种
        contractId:'',//签约ID
        interestVal:'',//毛利率
        interestVal:'',//客单价
        effectTime:'' //生效时间
      },

      /*    options4: [],
          value9: [],
          list: [],
          loading: false,
          states: [],*/
      rentFee:0.00,
      wuyefei:0.00,
      zhejiufei:0.00,
      rengongchengben:0.00,
      agencyFee:0.00,
      guestForm:{},
      contractType:'',
      persent:'',//客流量
      sale:'',//销售额
      fittedForm:{},
      shichangdiwei:'',
      pinpaidiwei:'',
      pinpaixingxiang:'',
      zifeishoujiaolv:'',
      liansuogengjindu:'',
      kefutousu:'',
      qihuapeihedu:'',
      effectTime:'',
      effectTime2:'',
      effectTime3:''
    }),
    created () {
      window.$getformSelect().then((res) => {
        this.businessList = res
      }, (err) => {})
      console.log("created:"+this.businessList);
      window.$getAreaList().then((res) => {
        this.areaList = res
      }, (err) => {console.log(err)})
      this.searchList(1)
    },
    methods: {
      createStandardRent(){
        this.rentCreateDate.projectId = this.rentForm.projectId //项目ID
        this.rentCreateDate.buildingId = this.rentForm.buildingId //楼栋ID
        /*this.rentCreateDate.contractId = this.rentForm.brandId//签约ID*/
        this.rentCreateDate.rentingRateVal = this.rentForm.rentFee//溢租率
        this.rentCreateDate.effectTime = this.effectTime; //生效时间
        if(this.objType==0){
          window.$createStandardProjectRentObj(this.rentCreateDate).then((res) => {
            this.showAlert('新增项目溢租率成功！')
            this.closeDialog();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==1){
          this.rentCreateDate.floorId = this.rentForm.floorId; //楼层ID
          window.$createStandardFloorRentObj(this.rentCreateDate).then((res) => {
            this.closeDialog();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==2){
          this.rentCreateDate.floorId = this.rentForm.floorId; //楼层ID
          this.rentCreateDate.formId = this.rentForm.businessFormId//业态
          window.$createStandardFormRentObj(this.rentCreateDate).then((res) => {
            this.closeDialog();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==3){
          this.rentCreateDate.floorId = this.rentForm.floorId; //楼层ID
          this.rentCreateDate.formId = this.rentForm.businessFormId//业态
          this.rentCreateDate.speciesId = this.rentForm.businessSpeciesId//业种
          window.$createStandardMajorRentObj(this.rentCreateDate).then((res) => {
            this.closeDialog();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==4){
          this.showAlert("标准三角形对象级别选择最低到业种级。")
        }
        this.closeDialog();
      },
      createStandardGuest(){
        window.$getAreaList().then((res) => {
          this.areaList = res
        }, (err) => {console.log(err)})

        this.guestForm.effectTime2 = this.effectTime2;
        console.log("objType:"+this.objType);
        if(this.objType==4){
          this.guestBrandCreateDate.projectId = this.guestForm.projectId; //项目ID
          this.guestBrandCreateDate.buildingId = this.guestForm.buildingId;  //楼栋ID
          this.guestBrandCreateDate.floorId = this.guestForm.floorId; //楼层ID
          this.guestBrandCreateDate.formId = this.guestForm.businessFormId; //业态
          this.guestBrandCreateDate.speciesId = this.guestForm.businessSpeciesId; //业种
          this.guestBrandCreateDate.contractId = this.guestForm.brandId;//签约ID
          this.guestBrandCreateDate.interestVal = this.guestForm.persent;//毛利率
          this.guestBrandCreateDate.priceVal = this.guestForm.sale;//客单价
          this.guestBrandCreateDate.effectTime = this.guestForm.effectTime2; //生效时间
          console.log("新增品牌客销度！");
          console.log(this.guestBrandCreateDate)
          //调接口
          window.$createStandardGuestBrandObj(this.guestBrandCreateDate).then((res) => {
            console.log(res)
            this.showAlert("新增品牌客销度成功！")
            this.closeDialogKXD();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
          this.closeDialogKXD();
        }else if(this.objType==0){
          this.showAlert("客销度到品牌，请选择对象为品牌！")
        }else  if(this.objType==1){
          this.showAlert("客销度到品牌，请选择对象为品牌！")
        }else  if(this.objType==2){
          this.showAlert("客销度到品牌，请选择对象为品牌！")
        }else  if(this.objType==3){
          this.showAlert("客销度到品牌，请选择对象为品牌！")
        }
        console.log("客销度新增---")
        console.log(this.guestForm);
        this.closeDialogKXD();
      },
      createStandardFitted(){
        window.$getAreaList().then((res) => {
          this.areaList = res
        }, (err) => {console.log(err)})
        this.fittedCreateDate.projectId = this.fittedForm.projectId; //项目ID
        this.fittedCreateDate.buildingId = this.fittedForm.buildingId; //楼栋ID
        this.fittedCreateDate.contractId = this.fittedForm.brandId;//签约ID
        this.fittedCreateDate.fittedVal  = this.fittedForm.fittedVal;//适配值
        this.fittedCreateDate.effectTime = this.effectTime3; //生效时间
        console.log("适配值新增--------");
        console.log(this.fittedCreateDate);
        if(this.objType==0){
          window.$createStandardProjectFittedObj(this.fittedCreateDate).then((res) => {
            this.showAlert('新增项目适配值成功！')
            this.closeDialogSPZ();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==1){
          this.fittedCreateDate.floorId = this.fittedForm.floorId; //楼层ID
          window.$createStandardFloorFittedObj(this.fittedCreateDate).then((res) => {
            this.showAlert('新增楼层适配值成功！')
            this.closeDialogSPZ();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==2){
          this.fittedCreateDate.floorId = this.fittedForm.floorId; //楼层ID
          this.fittedCreateDate.formId  = this.fittedForm.businessFormId;//业态
          window.$createStandardFormFittedObj(this.fittedCreateDate).then((res) => {
            this.showAlert('新增业态适配值成功！')
            this.closeDialogSPZ();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==3){
          this.fittedCreateDate.floorId = this.fittedForm.floorId; //楼层ID
          this.fittedCreateDate.formId  = this.fittedForm.businessFormId;//业态
          this.fittedCreateDate.speciesId = this.fittedForm.businessSpeciesId;//业种
          window.$createStandardMajorFittedObj(this.fittedCreateDate).then((res) => {
            this.showAlert('新增业种适配值成功！')
            this.closeDialogSPZ();
          }, (err) => {
            console.log(err)
            this.showAlert(err)
          })
        }else if(this.objType==4){
          this.showAlert("标准三角形对象级别选择最低到业种级。")
        }
        this.closeDialogSPZ();
      },
      closeDialog(){
        this.floorId = '';
        this.brandId = '';
        this.rentFee = '';
        this.effectTime = '';
        this.dialogFormVisible = false;//清空数据
      },
      closeDialogKXD(){
        this.floorId = '';
        this.brandId = '';
        this.dialogFormVisible1 = false;//清空数据
      },
      closeDialogSPZ(){
        this.floorId = '';
        this.brandId = '';
        this.dialogFormVisible2 = false;//清空数据
      },
      showCreate() {
        dialogFormVisible: false;
        dialogFormVisible1: false;
        dialogFormVisible2: false;
        if (this.activeName2 == "first") {
          this.dialogFormVisible = true
        }
        if (this.activeName2 == 'second'){
          this.dialogFormVisible1 = true;
        }
        if (this.activeName2 == 'third') {
          this.dialogFormVisible2 = true;
        }
        window.$getformSelect().then((res) => {
          this.businessList = res
        }, (err) => {})
        console.log("created:"+this.businessList);
        window.$getAreaList().then((res) => {
          this.areaList = res
          /* console.log("createRent---")
           console.log(res)*/
        }, (err) => {console.log(err)})
      },
      //自己添加
      // 1.区域
      areaChanged(){
        this.searchForm.projectId = '';
        this.searchForm.buildingId = '';
        this.floorId = '';
        myareaId = this.searchForm.areaId;
        if (this.dialogFormVisible) {
          myareaId = this.rentForm.areaId;
          /*this.dialogFormVisible = true*/
        }
        if (this.dialogFormVisible1){
          myareaId = this.guestForm.areaId;
          /* this.dialogFormVisible1 = true;*/
        }
        if (this.dialogFormVisible2) {
          myareaId = this.fittedForm.areaId;
          /* this.dialogFormVisible2 = true;*/
        }
        console.log("areaChanged---"+myareaId);
        window.$getProjectListForArea(myareaId).then((res) => {
          console.log("areachanged");
          console.log(res)
          this.projectList = res
        }, (err) => {
          this.showAlert(err)
        })
      },
//打印对象值
      objTypeChange(){
        //this.showAlert(this.objType);
      },

      //2.项目
      projectChanged(){
        this.searchForm.buildingId = ''
        this.searchForm.floorId=''
        this.floorList = ''
     /*   this.floorId = ''*/
        window.$getBuilding(this.searchForm.projectId).then((res) => {
          console.log("projectChanged");
          console.log(res)
          //调用楼层
          window.$getFloorForBuilding(res[0].id).then((floorRes) => {
            this.floorList = floorRes
            console.log("楼层----")
            console.log(floorRes);
          }, (err) => {
            this.showAlert(err)
          })
        }, (err) => {
          this.showAlert(err)
        })
      },
      //2.溢租率新增项目
      rentProjectChanged(){
        this.rentForm.buildingId = ''
        this.floorId = ''
        window.$getBuilding(this.rentForm.projectId).then((res) => {
          console.log("溢租率projectChanged");
          console.log(res)
          //调用楼层
          window.$getFloorForBuilding(res[0].id).then((floorRes) => {
            this.floorList = floorRes
            console.log("溢租率楼层----")
            console.log(floorRes);
          }, (err) => {
            this.showAlert(err)
          })
        }, (err) => {
          this.showAlert(err)
        })
      },
      //3.客销度新增项目
      guestProjectChanged(){
        this.guestForm.buildingId = ''
        this.floorId = ''
        window.$getBuilding(this.guestForm.projectId).then((res) => {
          console.log("客销度projectChanged");
          console.log(res)
          //调用楼层
          window.$getFloorForBuilding(res[0].id).then((floorRes) => {
            this.floorList = floorRes
            console.log("客销度楼层----")
            console.log(floorRes);
          }, (err) => {
            this.showAlert(err)
          })
        }, (err) => {
          this.showAlert(err)
        })
      },
      //3.适配值新增项目
      fittedProjectChanged(){
        this.fittedForm.buildingId = ''
        this.floorId = ''
        window.$getBuilding(this.fittedForm.projectId).then((res) => {
          console.log("适配值projectChanged");
          console.log(res)
          //调用楼层
          window.$getFloorForBuilding(res[0].id).then((floorRes) => {
            this.floorList = floorRes
            console.log("适配值楼层----")
            console.log(floorRes);
          }, (err) => {
            this.showAlert(err)
          })
        }, (err) => {
          this.showAlert(err)
        })
      },
      //3.楼栋
      buildingChanged(){
        this.floorId = '';
        window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {
          this.floorList = res
        }, (err) => {
          this.showAlert(err)
        })
      },

      // 业态
      businessChanged(){
        this.searchForm.businessSpeciesId = ''
        this.speciesList = [];
        this.brandId = ''
        mybusinessFormId = this.searchForm.businessFormId;
        if (this.dialogFormVisible) {
          this.rentForm.businessSpeciesId = ''
          mybusinessFormId = this.rentForm.businessFormId;
        }
        if (this.dialogFormVisible1){
          this.guestForm.businessSpeciesId = ''
          mybusinessFormId = this.guestForm.businessFormId;
        }
        if (this.dialogFormVisible2) {
          this.fittedForm.businessSpeciesId = ''
          mybusinessFormId = this.fittedForm.businessFormId;
        }
        //console.log("businessChanged---"+mybusinessFormId);
        window.$getSpeciesSelect(mybusinessFormId).then((res) => {
          console.log("业态change-----")
          console.log(res)
          this.speciesList = res
        }, (err) => {
          this.showAlert(err)
        })

      },
      //业种
      speciesChanged(){
        this.brandList = ''
        mybusinessSpeciesId = this.searchForm.businessSpeciesId;
        if (this.dialogFormVisible) {
          this.rentForm.brandList = ''
          mybusinessSpeciesId = this.rentForm.businessSpeciesId;
        }
        if (this.dialogFormVisible1){
          this.guestForm.brandList = ''
          mybusinessSpeciesId = this.guestForm.businessSpeciesId;
        }
        if (this.dialogFormVisible2) {
          this.fittedForm.brandList = ''
          mybusinessSpeciesId = this.fittedForm.businessSpeciesId;
        }
        //获取品牌
        //window.$getBrandForSpecies(mybusinessSpeciesId).then((res) => {
        window.$getcontractIdForSpecies(mybusinessSpeciesId).then((res) => {
          console.log("品牌list")
          console.log(res)
          this.brandList = res
          if (this.dialogFormVisible) {
            //  for()res
            this.rentForm.brandList = res
          }
          if (this.dialogFormVisible1){
            this.guestForm.brandList = res
          }
          if (this.dialogFormVisible2) {
            this.fittedForm.brandList = res
          }
        }, (err) => {
          this.showAlert(err)
        })
      },
      //品牌
      brandIdChanged(){
        // this.showAlert(this.rentForm.brandId);
      },
      createCompany() {
        this.dialogFormVisible = false
      },
      handleClick(tab, event) {
        console.log(tab, event);
      },
      importFile(){
        document.getElementById('fileUpload_input').click()
      },
      areaChange(){
        window.$getProjectListForArea(this.exportExlsData.areaId).then((res) => {
          this.projectList = res
        }, (err) => { this.showAlert(err)})
      },
      exportFile(){
        if(!this.businessType){
          this.showAlert('请选择业务类型');
          return false
        }
        this.dialogFormVisible = true
      },
      exportExls(){
        if(!this.exportExlsData.projectId){
          this.showAlert('请选择项目');
          return false
        }
        let url = this.businessType === 1 ? '/standardexport/excel/dtyzl' : (this.businessType === 2 ? '/standardexport/excel/dtkxd' : '/standardexport/excel/dtspz')
        window.$exportExls(url, this.exportExlsData.projectId).then((res) => {
          console.log(res);
          let link = document.createElement('a');
          link.href = res;
          link.click()
        }, (err) => {
          this.showAlert(err)
        })
      },
      fileUpload(e){
        if(!this.businessType){
          this.showAlert('请选择业务类型')
          return false
        }
        // let url = '/excel/excel/import/sheet'
        let url = this.businessType === 1 ? '/importexcel/excel/rentimport/sheet' : (this.businessType === 2 ? '/importexcel/excel/guestimport/sheet' : '/importexcel/excel/fittedimport/sheet')
        window.$fileUpload(e, url).then((res) => {
          this.showAlert('导入成功')
        }, (err) =>{this.showAlert(err)})
      },
      businessTypeChange(){
        this.page = 1;
        this.size = 10
      },
      handleSizeChange (val) {
        this.size = val;
        this.searchList()
      },
      handleCurrentChange (val) {
        this.page = val;
        this.searchList()
      },
      searchList (type) {
        if(type === 1){
          this.page =1
        }
        this.data="";//清空数据
        this.searchRequest.projectId = this.searchForm.projectId; //项目ID
        this.searchRequest.buildingId = this.searchForm.buildingId; //楼栋
        this.searchRequest.floorId = this.searchForm.floorId; //楼层
        this.searchRequest.formId = this.searchForm.businessFormId; //业态
        this.searchRequest.speciesId = this.searchForm.businessSpeciesId; //业种
        this.searchRequest.brandName = this.searchForm.brandName //品牌
        this.searchRequest.effectTime = this.effectTime;//生效时间
        this.searchRequest.contractId =this.searchForm.brandId;
        if (this.activeName2 == "first") {//溢租率
          if(this.objType==0){
            window.$getStandardProjectRentList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形项目溢租率列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }else if(this.objType==1){
            window.$getStandardFloorRentList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形楼层溢租率列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }
          else if(this.objType==2){
            window.$getStandardFormRentList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形业态溢租率列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }
          else if(this.objType==3){
            window.$getStandardMajorRentList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形业种溢租率列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }
          else if(this.objType==4){
           this.showAlert("无品牌溢租率");
          }
        }
        if (this.activeName2 == 'second'){//客销度
          //调接口
          this.data="";//清空数据
          if(this.objType==4){
            //调客销度品牌接口
            window.$getStandardBrandGuestList(this.page, this.size, this.searchRequest)
              .then((res) => {
                this.data = res
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
            this.closeDialogKXD();
          }else if(this.objType==0){
            this.showAlert('标准三角形客销度对象请选择品牌级！')
          }else  if(this.objType==1) {
            this.showAlert('标准三角形客销度对象请选择品牌级！')
          } else  if(this.objType==2) {
            this.showAlert('标准三角形客销度对象请选择品牌级！')
          }else  if(this.objType==3) {
            this.showAlert('标准三角形客销度对象请选择品牌级！')
          }

        }
        if (this.activeName2 == 'third') {//适配值
          if(this.objType==0){
            window.$getStandardProjectFittedList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形项目适配值列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }else if(this.objType==1){
            window.$getStandardFloorFittedList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形楼层适配值列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }
          else if(this.objType==2){
            window.$getStandardFormFittedList(this.page, this.size, this.searchRequest)
              .then((res) => {
                console.log(res)
                this.data = res
                console.log("标准三角形业态适配值列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }
          else if(this.objType==3){
            window.$getStandardMajorFittedList(this.page, this.size, this.searchRequest)
              .then((res) => {
                this.data = res
                console.log("标准三角形业种适配值列表")
                console.log(res)
                /*this.projectList = this.data.resultList*/
              }, (err) => {
                console.log(err)
              })
          }
          else if(this.objType==4){
            this.showAlert("无品牌适配值");
          }
        }


        /* if(this.businessType === 1){

         } else if(this.businessType === 2){
           if(!this.searchForm.different){
             this.showAlert('请选择维度');
           } else {
             url = '/guestverssion/find/guestverssion/list'
           }
         } else if(this.businessType === 3){

         }*/
      },
      // 查看详情
      showDetails (id) {
        this.showAlert(id);
        this.$router.push('/dataManage/dongtai/details/' + id)
      },
      editDetails (id) {
        this.$router.push('/dataManage/dongtai/edit/' + id)
      },
      xiugai (id) {
        this.$router.push('/dataManage/dongtai/xiugai/' + id)
      },
      xiangqing (id) {
        this.$router.push('/dataManage/dongtai/xiangqing/' + id)
      },
      rowClass({ row, rowIndex}) {
        console.log(rowIndex); //表头行标号为0
        return 'height:50px;font-size:15px'
      },
      showAlert: function (cont) {
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
