<!--<template>-->
  <!--<div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">-->
    <!--<el-row class="searchBox" :gutter="20">-->
      <!--<h3 id="title">标准三角形</h3><br>-->
      <!--<el-form label-width="100px" :model="searchForm">-->

        <!--&lt;!&ndash;<el-col :span="5">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="版本">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="30" placeholder="请输入"></el-input>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="业务类型">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select size="small" v-model="searchForm.businessType" placeholder="请选择业务类型">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="维度" v-if="searchForm.businessType === 1 || searchForm.businessType === 3">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="searchForm.dimensionType" placeholder="请选择维度" @change="dimensionChange">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in dimensionList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5" v-if="searchForm.businessType === 2 || searchForm.dimensionType">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="区域">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="项目" v-if="searchForm.businessType === 2 || searchForm.dimensionType" >&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="projectId" placeholder="请选择项目" @change="projectChanged()">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5" v-if="searchForm.businessType != 2 && searchForm.dimensionType === 2">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="楼栋">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="searchForm.buildingId" placeholder="请选择楼层" @change="getFloorList()">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5" v-if="searchForm.businessType != 2 && searchForm.dimensionType === 2">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="楼层">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="floorId" placeholder="请选择楼层">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-col :span="5"  v-if="searchForm.businessType != 2 && searchForm.dimensionType === 3">&ndash;&gt;-->
          <!--&lt;!&ndash;<el-form-item label="业态">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-select v-model="conditionId" placeholder="请选择业态">&ndash;&gt;-->
              <!--&lt;!&ndash;<el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-select>&ndash;&gt;-->
          <!--&lt;!&ndash;</el-form-item>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-col>&ndash;&gt;-->

        <!--&lt;!&ndash; <el-col :span="6">-->
          <!--<el-form-item label="数据涵盖起止时间" label-width="150px">-->
            <!--<el-date-picker-->
              <!--size="small"-->
              <!--v-model="searchForm.startTime"-->
              <!--type="datetime"-->
              <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="4">-->
          <!--<el-form-item label="至" label-width="50px">-->
            <!--<el-date-picker-->
              <!--size="small"-->
              <!--v-model="searchForm.endTime"-->
              <!--type="datetime"-->
              <!--placeholder="选择日期">-->
            <!--</el-date-picker>-->
          <!--</el-form-item>-->
        <!--</el-col> &ndash;&gt;-->


        <!--&lt;!&ndash;修改&ndash;&gt;-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="区域：">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="全部区域" @change="businessTypeChange()">-->
              <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="项目：">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="项目A" @change="businessTypeChange()">-->
              <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="楼层：">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="F1" @change="businessTypeChange()">-->
              <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="业态：">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">-->
              <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="品牌">-->
            <!--<el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>-->
          <!--</el-form-item>-->
        <!--</el-col>-->
        <!--<el-col :span="5">-->
          <!--<el-form-item label="状态：">-->
            <!--<el-select  size="small" v-model="businessType" placeholder="全部状态" @change="businessTypeChange()">-->
              <!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
        <!--</el-col>-->

        <!--<el-col :span="24" class="text-center">-->
          <!--<el-form-item label-width="0">-->
            <!--<el-button type="primary" size="medium" class="mr10 ml10" v-on:click="searchList(1);">搜索</el-button>-->
            <!--&lt;!&ndash;<el-button id="fileUpload_button" class="mr10 ml10" type="primary" size="medium" v-on:click="importFile()">导入</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<input id="fileUpload_input" class="uploadInput" type="file" @change="fileUpload" />&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="exportExl()">导出</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash; <el-button type="primary" size="medium" v-on:click="xinzeng();">导入</el-button> &ndash;&gt;-->
            <!--&lt;!&ndash; <el-button type="primary" size="medium" v-on:click="bianji(1);">编辑</el-button> &ndash;&gt;-->
            <!--&lt;!&ndash; <el-button type="primary" size="medium" v-on:click="xm_yzl(1);">项目溢租率</el-button>-->
            <!--<el-button type="primary" size="medium" v-on:click="lc_yzl(1);">楼层溢租率</el-button>-->
            <!--<el-button type="primary" size="medium" v-on:click="yt_yzl(1);">业态溢租率</el-button>-->
            <!--<el-button type="primary" size="medium" v-on:click="kxd(1);">客销度</el-button>-->
            <!--<el-button type="primary" size="medium" v-on:click="spz(1);">适配值</el-button> &ndash;&gt;-->
          <!--</el-form-item>-->
        <!--</el-col>-->
      <!--</el-form>-->
    <!--</el-row>-->
    <!--<p class="t"></p>-->
    <!--<div class="biaoti1">标准三角形</div>-->


    <!--<div class="listCont">-->
      <!--<el-button class="new" type="success"  disabled>新增</el-button>-->
      <!--<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">-->
        <!--<el-tab-pane label="溢租率" name="first">-->
          <!--<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>-->
            <!--&lt;!&ndash;<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>&ndash;&gt;-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="status" label="签约状态">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>&ndash;&gt;-->

            <!--&lt;!&ndash;<el-table-column align="center" prop="different" label="类别">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

            <!--<el-table-column align="center"  label="操作" width="100">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
                <!--<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="客销度" name="second">-->
          <!--<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">-->
            <!--&lt;!&ndash;<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>&ndash;&gt;-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="铺位号"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="品牌名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="status" label="签约状态">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->

            <!--<el-table-column align="center" prop="fittedVerssionName" label="毛利率"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="客单价"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>-->

            <!--&lt;!&ndash;<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>&ndash;&gt;-->

            <!--&lt;!&ndash;<el-table-column align="center" prop="different" label="类别">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

            <!--<el-table-column align="center"  label="操作" width="100">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
                <!--<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</el-tab-pane>-->
        <!--<el-tab-pane label="适配值" name="third">-->
          <!--<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">-->
            <!--&lt;!&ndash;<el-table-column align="center" type="index" label="序号" width="50"></el-table-column>&ndash;&gt;-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="项目名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="楼层"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="业态名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="业种名称"></el-table-column>-->
            <!--<el-table-column align="center" prop="status" label="签约状态">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 1">未审核</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 2">审核成功</el-button>-->
                <!--<el-button disabled type="text" size="small" v-if="scope.row.status === 3">审核失败</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="适配值"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="生效时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="创建时间"></el-table-column>-->
            <!--<el-table-column align="center" prop="fittedVerssionName" label="创建人"></el-table-column>-->

            <!--&lt;!&ndash;<el-table-column align="center" prop="fittedVerssionName" label="版本名称"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="sumTarget" label="指标总数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="targetcount" label="已录入指标数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="untargetcount" label="未录入指标数"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>&ndash;&gt;-->

            <!--&lt;!&ndash;<el-table-column align="center" prop="different" label="类别">&ndash;&gt;-->
            <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 1">项目</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 2">楼层</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button disabled type="text" size="small" v-if="scope.row.different === 3">品牌</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;</template>&ndash;&gt;-->
            <!--&lt;!&ndash;</el-table-column>&ndash;&gt;-->

            <!--<el-table-column align="center"  label="操作" width="100">-->
              <!--<template slot-scope="scope">-->
                <!--<el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>-->
                <!--<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>-->
              <!--</template>-->
            <!--</el-table-column>-->
          <!--</el-table>-->
        <!--</el-tab-pane>-->
      <!--</el-tabs>-->


      <!--&lt;!&ndash;<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column align="center" type="index" label="序号"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column align="center" prop="standardVerssionName" label="版本"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType === 2" align="center" prop="contractName" label="品牌名称"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType != 2 && searchForm.dimensionType === 2" align="center" prop="floorName" label="楼层名称"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType === 2 || searchForm.dimensionType === 3" align="center" prop="conditionName" label="业态名称"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType === 2" align="center" prop="grossRate" label="毛利率"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType === 2" align="center" prop="perSale" label="客单价"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType === 1" align="center" prop="rent" label="溢租率"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column v-if="searchForm.businessType === 3" align="center" prop="fitted" label="适配值"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>&ndash;&gt;-->
        <!--&lt;!&ndash;&lt;!&ndash; <el-table-column align="center"  label="操作" width="200">&ndash;&gt;-->
          <!--&lt;!&ndash;<template slot-scope="scope">&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>&ndash;&gt;-->
            <!--&lt;!&ndash;<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>&ndash;&gt;-->
          <!--&lt;!&ndash;</template>&ndash;&gt;-->
        <!--&lt;!&ndash;</el-table-column> &ndash;&gt;&ndash;&gt;-->
      <!--&lt;!&ndash;</el-table>&ndash;&gt;-->

      <!--<div class="paginationCont">-->
        <!--<el-pagination-->
          <!--@current-change="handleCurrentChange"-->
          <!--:current-page="page"-->
          <!--layout="prev, pager, next"-->
          <!--:total="data.count">-->
        <!--</el-pagination>-->
      <!--</div>-->
    <!--</div>-->
  <!--</div>-->
<!--</template>-->
<!--<script>-->

<!--import moment from 'moment'-->
<!--export default {-->
  <!--data: () => ({-->
    <!--businessTypeList: window.$businessTypeList,-->
    <!--dimensionList: window.$dimensionList,-->
    <!--businessList: [],-->
    <!--areaList: [],-->
    <!--projectList: [],-->
    <!--buildingList:[],-->
    <!--floorList: [],-->
    <!--data: {-->

    <!--},-->
    <!--loading: false,-->
    <!--activeName: 'first',-->
    <!--searchForm: {},-->
    <!--infoData: {},-->
    <!--page: 1,-->
    <!--size: 10,-->
    <!--dialogFormVisible: false,-->
    <!--dialogVisible: false,-->
    <!--pictureList: [],-->
    <!--picIndex: 0,-->
    <!--floorId:'',-->
    <!--conditionId:'',-->
    <!--projectId:''-->
  <!--}),-->
  <!--created () {-->
    <!--window.$getAreaList().then((res) => {-->
      <!--this.areaList = res-->
    <!--}, (err) => {-->
      <!--this.showAlert(err)-->
    <!--})-->
  <!--},-->
  <!--methods: {-->
    <!--importFile(){-->
      <!--document.getElementById('fileUpload_input').click()-->
    <!--},-->
    <!--areaChanged(){-->
      <!--this.page = 1-->
      <!--this.size = 10-->
      <!--this.projectId = ''-->
      <!--this.searchForm.buildingId = ''-->
      <!--this.floorId = ''-->
      <!--this.conditionId = ''-->
      <!--window.$getProjectListForArea(this.searchForm.areaId).then((res) => {-->
        <!--this.projectList = res-->
      <!--}, (err) => {-->
        <!--this.showAlert(err)-->
      <!--})-->
    <!--},-->
    <!--projectChanged(){-->
      <!--this.page = 1-->
      <!--this.size = 10-->
      <!--this.searchForm.buildingId = ''-->
      <!--this.floorId = ''-->
      <!--this.conditionId = ''-->
      <!--if(this.searchForm.dimensionType === 2){// 获取楼栋-->
        <!--window.$getBuilding(this.projectId).then((res) => {-->
          <!--this.buildingList = res-->
        <!--}, (err) => {-->
          <!--this.showAlert(err)-->
        <!--})-->
      <!--} else if(this.searchForm.dimensionType === 3){// 获取业态-->
        <!--window.$getBusinessListForProject(this.projectId).then((res) => {-->
          <!--this.businessList = res-->
        <!--}, (err) => {-->
          <!--this.showAlert(err)-->
        <!--})-->
      <!--}-->

    <!--},-->
    <!--getFloorList(){-->
      <!--this.page = 1-->
      <!--this.size = 10-->
      <!--this.floorId = ''-->
      <!--window.$getFloorForBuilding(this.searchForm.buildingId).then((res) => {-->
        <!--this.floorList = res-->
      <!--}, (err) => {-->
        <!--this.showAlert(err)-->
      <!--})-->
    <!--},-->
    <!--dimensionChange() {-->
      <!--this.page = 1-->
      <!--this.size = 10-->
      <!--this.data = {}-->
    <!--},-->
    <!--toggleTab: function(tab) {-->
      <!--this.currentTab = tab; // tab 为当前触发标签页的组件名-->
    <!--},-->
    <!--handleClick (tab, event) {-->
      <!--console.log(tab, event)-->
    <!--},-->
    <!--handleSizeChange (val) {-->
      <!--this.size = val-->
      <!--this.searchList()-->
    <!--},-->
    <!--handleCurrentChange (val) {-->
      <!--this.page = val-->
      <!--this.searchList()-->
    <!--},-->
    <!--searchList (type) {-->
      <!--if(type === 1){-->
        <!--this.page =1-->
      <!--}-->

      <!--let url = ''-->
      <!--if(this.searchForm.businessType === 1){// 溢租率列表接口-->
        <!--if(this.searchForm.dimensionType === 1){-->
          <!--url = '/standardprojectrent/find/standardprojectrent/list'-->
        <!--} else if(this.searchForm.dimensionType === 2) {-->
          <!--this.searchForm.floorId = this.floorId-->
          <!--url = '/standardfloorrent/find/standardfloorrent/list'-->
        <!--} else if(this.searchForm.dimensionType === 3) {-->
          <!--this.searchForm.conditionId = this.conditionId-->
          <!--url = '/standardconditionrent/find/standardconditionrent/list'-->
        <!--}-->
      <!--} else if(this.searchForm.businessType === 3){// 适配值-->
        <!--if(this.searchForm.dimensionType === 1){-->
          <!--url = '/standardprojectfitted/find/standardprojectfitted/list'-->
        <!--} else if(this.searchForm.dimensionType === 2) {-->
          <!--this.searchForm.floorId = this.floorId-->
          <!--url = '/standardfloorfitted/find/standardfloorfitted/list'-->
        <!--} else if(this.searchForm.dimensionType === 3) {-->
          <!--this.searchForm.conditionId = this.conditionId-->
          <!--url = '/standardconditionfitted/find/standardconditionrent/list'-->
        <!--}-->
      <!--} else if(this.searchForm.businessType === 2){-->
        <!--url = '/standardbrandsale/find/standardbrandsale/list'-->
      <!--}-->

      <!--this.$axios.post(url + '?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {-->
        <!--this.data = res-->
        <!--console.log(res)-->
      <!--}, (err) => {this.showAlert(err)})-->
    <!--},-->
    <!--fileUpload(e){-->
      <!--if(!this.searchForm.businessType){-->
        <!--this.showAlert('请选择业务类型')-->
        <!--return false-->
      <!--}-->
      <!--let url = this.searchForm.businessType === 1 ? '/standimport/excel/standrentimport/sheet' : (this.searchForm.businessType === 2 ? '/standimport/excel/standguestimport/sheet' : '/standimport/excel/standfittedimport/sheet')-->
      <!--window.$fileUpload(e, url).then((res) => {-->
        <!--this.showAlert('导入成功')-->
        <!--this.page = 1-->
        <!--this.size = 10-->
        <!--this.searchList()-->
      <!--}, (err) =>{this.showAlert(err)})-->
    <!--},-->
    <!--exportExl(){-->
      <!--if(!this.searchForm.businessType){-->
        <!--this.showAlert('请选择业务类型')-->
        <!--return false-->
      <!--}-->
      <!--if(!this.projectId){-->
        <!--this.showAlert('请选择项目')-->
        <!--return false-->
      <!--}-->
      <!--let url = this.searchForm.businessType === 1 ? '/standardexport/excel/yzl' : (this.searchForm.businessType === 2 ? '/standardexport/excel' : '/standardexport/excel/spz')-->
      <!--window.$exportExls(url, this.projectId).then((res) => {-->
        <!--console.log(res)-->
        <!--let link = document.createElement('a')-->
        <!--link.href = res-->
        <!--link.click()-->
      <!--}, (err) => {-->
        <!--this.showAlert(err)-->
      <!--})-->
    <!--},-->
    <!--// 查看详情-->
    <!--showDetails (id) {-->
      <!--this.$router.push('/dataManage/version/details/' + id)-->
    <!--},-->
    <!--editDetails (id) {-->
      <!--this.$router.push('/dataManage/version/details/' + id)-->
    <!--},-->
    <!--xinzeng(id){-->
      <!--this.$router.push('/dataManage/version/xinzeng/' + id)-->
    <!--},-->
    <!--bianji(id){-->
      <!--this.$router.push('/dataManage/version/bianji/' + id)-->
    <!--},-->
    <!--xm_yzl(id){-->
      <!--this.$router.push('/dataManage/version/xmyzl/' + id)-->
    <!--},-->
    <!--lc_yzl(id){-->
      <!--this.$router.push('/dataManage/version/lcyzl/' + id)-->
    <!--},-->
    <!--yt_yzl(id){-->
      <!--this.$router.push('/dataManage/version/ytyzl/' + id)-->
    <!--},-->
    <!--kxd(id){-->
      <!--this.$router.push('/dataManage/version/kxd/' + id)-->
    <!--},-->
    <!--spz(id){-->
      <!--this.$router.push('/dataManage/version/spz/' + id)-->
    <!--},-->
    <!--rowClass({ row, rowIndex}) {-->
      <!--return 'height:50px;font-size:15px'-->
    <!--},-->
    <!--showAlert(cont) {-->
        <!--this.$alert(cont, '温馨提示', {-->
          <!--confirmButtonText: '确定'-->
        <!--})-->
      <!--}-->
  <!--}-->
<!--}-->
<!--</script>-->
<!--<style scoped  lang="less">-->
  <!--.tabs{-->
    <!--width: 100%;-->
    <!--height:50px;-->
    <!--background: #e7cb8a !important;-->
    <!--margin-bottom: 5px;-->
    <!--div{-->
      <!--display: inline-block;-->
      <!--position: absolute;-->
      <!--top: 50px;-->
    <!--}-->
    <!--.tab{-->
      <!--background-size: 100% 220px;-->
      <!--position: relative;-->
      <!--top: -11px;-->
      <!--left: -41px;-->
      <!--border-bottom-left-radius: 10px;-->
      <!--border-bottom-right-radius: 10px;-->
      <!--a{-->
        <!--display: inline-block;-->
      <!--}-->
      <!--img{-->
        <!--width: 220px;-->
        <!--height: 120px;-->
      <!--}-->
    <!--}-->
  <!--}-->
  <!--.mainContent{-->
    <!--width: 100%;-->
    <!--// height: 100%;-->
    <!--background: #fff;-->
  <!--}-->
<!--.el-date-editor.el-input, .el-date-editor.el-input__inner{-->
  <!--width: 100%;-->
<!--}-->
<!--.uploadInput{-->
    <!--top:0px;-->
    <!--width: 0;-->
    <!--height: 100%;-->
    <!--visibility: hidden;-->
  <!--}-->
  <!--.new{-->
    <!--float: right;-->
  <!--}-->
<!--</style>-->



<template>
<div class="mainContent" v-loading="loading" element-loading-text="拼命加载中">
  <el-row class="searchBox" :gutter="20">
  <h3 id="title">标准三角形</h3><br>
  <el-form label-width="100px" :model="searchForm">

<!--<el-col :span="5">-->
<!--<el-form-item label="版本">-->
<!--<el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="30" placeholder="请输入"></el-input>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5">-->
<!--<el-form-item label="业务类型">-->
<!--<el-select size="small" v-model="searchForm.businessType" placeholder="请选择业务类型">-->
<!--<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5">-->
<!--<el-form-item label="维度" v-if="searchForm.businessType === 1 || searchForm.businessType === 3">-->
<!--<el-select v-model="searchForm.dimensionType" placeholder="请选择维度" @change="dimensionChange">-->
<!--<el-option v-for="(item, index) in dimensionList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5" v-if="searchForm.businessType === 2 || searchForm.dimensionType">-->
<!--<el-form-item label="区域">-->
<!--<el-select v-model="searchForm.areaId" placeholder="请选择区域" @change="areaChanged()">-->
<!--<el-option v-for="(item, index) in areaList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5">-->
<!--<el-form-item label="项目" v-if="searchForm.businessType === 2 || searchForm.dimensionType" >-->
<!--<el-select v-model="projectId" placeholder="请选择项目" @change="projectChanged()">-->
<!--<el-option v-for="(item, index) in projectList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5" v-if="searchForm.businessType != 2 && searchForm.dimensionType === 2">-->
<!--<el-form-item label="楼栋">-->
<!--<el-select v-model="searchForm.buildingId" placeholder="请选择楼层" @change="getFloorList()">-->
<!--<el-option v-for="(item, index) in buildingList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5" v-if="searchForm.businessType != 2 && searchForm.dimensionType === 2">-->
<!--<el-form-item label="楼层">-->
<!--<el-select v-model="floorId" placeholder="请选择楼层">-->
<!--<el-option v-for="(item, index) in floorList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->
<!--<el-col :span="5"  v-if="searchForm.businessType != 2 && searchForm.dimensionType === 3">-->
<!--<el-form-item label="业态">-->
<!--<el-select v-model="conditionId" placeholder="请选择业态">-->
<!--<el-option v-for="(item, index) in businessList" :key="index" :label="item.name" :value="item.id"></el-option>-->
<!--</el-select>-->
<!--</el-form-item>-->
<!--</el-col>-->

<!-- <el-col :span="6">
<el-form-item label="数据涵盖起止时间" label-width="150px">
<el-date-picker
size="small"
v-model="searchForm.startTime"
type="datetime"
placeholder="选择日期">
</el-date-picker>
</el-form-item>
</el-col>
<el-col :span="4">
<el-form-item label="至" label-width="50px">
<el-date-picker
size="small"
v-model="searchForm.endTime"
type="datetime"
placeholder="选择日期">
</el-date-picker>
</el-form-item>
</el-col> -->


<!--修改-->
<el-col :span="5">
<el-form-item label="区域：">
<el-select  size="small" v-model="businessType" placeholder="全部区域" @change="businessTypeChange()">
<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
</el-select>
</el-form-item>
</el-col>
<el-col :span="5">
<el-form-item label="项目：">
<el-select  size="small" v-model="businessType" placeholder="项目A" @change="businessTypeChange()">
<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
</el-select>
</el-form-item>
</el-col>
<el-col :span="5">
<el-form-item label="楼层：">
<el-select  size="small" v-model="businessType" placeholder="F1" @change="businessTypeChange()">
<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
</el-select>
</el-form-item>
</el-col>
<el-col :span="5">
<el-form-item label="业态：">
<el-select  size="small" v-model="businessType" placeholder="餐饮" @change="businessTypeChange()">
<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
</el-select>
</el-form-item>
</el-col>
<el-col :span="5">
<el-form-item label="品牌">
<el-input size="small" v-model="searchForm.standardVerssionName" :maxlength="11" placeholder=" "></el-input>
</el-form-item>
</el-col>
<el-col :span="5">
<el-form-item label="状态：">
<el-select  size="small" v-model="businessType" placeholder="全部状态" @change="businessTypeChange()">
<el-option v-for="(item, index) in businessTypeList" :key="index" :label="item.name" :value="item.id"></el-option>
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

<el-dialog title="新增公司" :visible="dialogFormVisible">
<el-form>
1111
</el-form>

</el-dialog>

<el-dialog title="新增公司" :visible="dialogFormVisible1">
<el-form>
2222
</el-form>
</el-dialog>

<el-dialog title="新增公司" :visible="dialogFormVisible2">
<el-form>
333
</el-form>
</el-dialog>


<p class="t"></p>
<div class="biaoti1">标准三角形</div>


<div class="listCont">
<el-button class="new" type="success" v-on:click="showCreateCompany()">新增</el-button>
<el-button type="primary" class="mr10 ml10" size="medium" v-on:click="showCreateCompany();">新增</el-button>
<el-tabs v-model="activeName2" type="card" @tab-click="handleClick">
<el-tab-pane label="溢租率" tabbolock="91" name="first">
<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">
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

<el-table-column align="center"  label="操作" width="100">
<template slot-scope="scope">
<el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
</template>
</el-table-column>
</el-table>
</el-tab-pane>
<el-tab-pane label="客销度" tabbolock="107" name="second">
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

<el-table-column align="center"  label="操作" width="100">
<template slot-scope="scope">
<el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
</template>
</el-table-column>
</el-table>
</el-tab-pane>
<el-tab-pane label="适配值" tabbolock="126" name="third">
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

<el-table-column align="center"  label="操作" width="100">
<template slot-scope="scope">
<el-button type="text" v-on:click="showDetails(scope.row.id)">查看</el-button>
<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>
</template>
</el-table-column>
</el-table>
</el-tab-pane>
</el-tabs>

<!--<el-table :data="data.resultList" border size="medium" :header-cell-style="rowClass">-->
<!--<el-table-column align="center" type="index" label="序号"></el-table-column>-->
<!--<el-table-column align="center" prop="standardVerssionName" label="版本"></el-table-column>-->
<!--<el-table-column align="center" prop="projectName" label="项目名称"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType === 2" align="center" prop="contractName" label="品牌名称"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType != 2 && searchForm.dimensionType === 2" align="center" prop="floorName" label="楼层名称"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType === 2 || searchForm.dimensionType === 3" align="center" prop="conditionName" label="业态名称"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType === 2" align="center" prop="grossRate" label="毛利率"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType === 2" align="center" prop="perSale" label="客单价"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType === 1" align="center" prop="rent" label="溢租率"></el-table-column>-->
<!--<el-table-column v-if="searchForm.businessType === 3" align="center" prop="fitted" label="适配值"></el-table-column>-->
<!--<el-table-column align="center" prop="createTime" label="创建时间"></el-table-column>-->
<!--<el-table-column align="center" prop="modifyTime" label="修改时间"></el-table-column>-->
<!--&lt;!&ndash; <el-table-column align="center"  label="操作" width="200">-->
<!--<template slot-scope="scope">-->
<!--<el-button type="text" v-on:click="editDetails(scope.row.id)">修改</el-button>-->
<!--<el-button type="text" v-on:click="showDetails(scope.row)">删除</el-button>-->
<!--</template>-->
<!--</el-table-column> &ndash;&gt;-->
<!--</el-table>-->

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
  businessList: [],
  areaList: [],
  projectList: [],
  buildingList:[],
  floorList: [],
  formLabelWidth: '120px',
  tabbolock:'',
  data: {

  },
  loading: false,
  activeName: 'first',
  searchForm: {},
  infoData: {},
  page: 1,
  size: 10,
  dialogFormVisible: false,
  dialogFormVisible1:false,
  dialogFormVisible2:false,
  dialogVisible: false,
  pictureList: [],
  picIndex: 0,
  floorId:'',
  conditionId:'',
  projectId:''
  }),
  created () {
    window.$getAreaList().then((res) => {
       this.areaList = res
    }, (err) => {
       this.showAlert(err)
    })
  },
  methods: {
    showCreateCompany() {
      if (this.tabbolock == "91") {
        this.dialogFormVisible = true
   }
    if(this.tabbolock=='107'){
      this.dialogFormVisible1=true;
  }
    if(this.tabbolock=='126'){
      this.dialogFormVisible2=true;
  }
  },
  createCompany(){
    this.dialogFormVisible = false
  },
  importFile(){
     document.getElementById('fileUpload_input').click()
  },
  areaChanged(){
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
  projectChanged(){
    this.page = 1
    this.size = 10
    this.searchForm.buildingId = ''
    this.floorId = ''
    this.conditionId = ''
    if(this.searchForm.dimensionType === 2){ // 获取楼栋
     window.$getBuilding(this.projectId).then((res) => {
          this.buildingList = res
      }, (err) => {
        this.showAlert(err)
    })
   }   else if(this.searchForm.dimensionType === 3){// 获取业态
     window.$getBusinessListForProject(this.projectId).then((res) => {
       this.businessList = res
    }, (err) => {
      this.showAlert(err)
  })
  }

  },
  getFloorList(){
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
  toggleTab: function(tab) {
  this.currentTab = tab; // tab 为当前触发标签页的组件名
  },
  handleClick (tab, event) {
  console.log(tab,tab._uid)
  this.tabbolock=tab._uid;
  },
  handleSizeChange (val) {
  this.size = val
  this.searchList()
  },
  handleCurrentChange (val) {
  this.page = val
  this.searchList()
  },
  searchList (type) {
  if(type === 1){
  this.page =1
  }

  let url = ''
  if(this.searchForm.businessType === 1){// 溢租率列表接口
  if(this.searchForm.dimensionType === 1){
  url = '/standardprojectrent/find/standardprojectrent/list'
  } else if(this.searchForm.dimensionType === 2) {
  this.searchForm.floorId = this.floorId
  url = '/standardfloorrent/find/standardfloorrent/list'
  } else if(this.searchForm.dimensionType === 3) {
  this.searchForm.conditionId = this.conditionId
  url = '/standardconditionrent/find/standardconditionrent/list'
  }
  } else if(this.searchForm.businessType === 3){// 适配值
  if(this.searchForm.dimensionType === 1){
  url = '/standardprojectfitted/find/standardprojectfitted/list'
  } else if(this.searchForm.dimensionType === 2) {
  this.searchForm.floorId = this.floorId
  url = '/standardfloorfitted/find/standardfloorfitted/list'
  } else if(this.searchForm.dimensionType === 3) {
  this.searchForm.conditionId = this.conditionId
  url = '/standardconditionfitted/find/standardconditionrent/list'
  }
  } else if(this.searchForm.businessType === 2){
  url = '/standardbrandsale/find/standardbrandsale/list'
  }

  this.$axios.post(url + '?p=' + this.page + '&c=' + this.size, this.searchForm).then((res) => {
  this.data = res
  console.log(res)
  }, (err) => {this.showAlert(err)})
  },
  fileUpload(e){
  if(!this.searchForm.businessType){
  this.showAlert('请选择业务类型')
  return false
  }
  let url = this.searchForm.businessType === 1 ? '/standimport/excel/standrentimport/sheet' : (this.searchForm.businessType === 2 ? '/standimport/excel/standguestimport/sheet' : '/standimport/excel/standfittedimport/sheet')
  window.$fileUpload(e, url).then((res) => {
  this.showAlert('导入成功')
  this.page = 1
  this.size = 10
  this.searchList()
  }, (err) =>{this.showAlert(err)})
  },
  exportExl(){
  if(!this.searchForm.businessType){
  this.showAlert('请选择业务类型')
  return false
  }
  if(!this.projectId){
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
  showDetails (id) {
  this.$router.push('/dataManage/version/details/' + id)
  },
  editDetails (id) {
  this.$router.push('/dataManage/version/details/' + id)
  },
  xinzeng(id){
  this.$router.push('/dataManage/version/xinzeng/' + id)
  },
  bianji(id){
  this.$router.push('/dataManage/version/bianji/' + id)
  },
  xm_yzl(id){
  this.$router.push('/dataManage/version/xmyzl/' + id)
  },
  lc_yzl(id){
  this.$router.push('/dataManage/version/lcyzl/' + id)
  },
  yt_yzl(id){
  this.$router.push('/dataManage/version/ytyzl/' + id)
  },
  kxd(id){
  this.$router.push('/dataManage/version/kxd/' + id)
  },
  spz(id){
  this.$router.push('/dataManage/version/spz/' + id)
  },
  rowClass({ row, rowIndex}) {
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
<style scoped  lang="less">
.tabs{
width: 100%;
height:50px;
background: #e7cb8a !important;
margin-bottom: 5px;
div{
display: inline-block;
position: absolute;
top: 50px;
}
.tab{
background-size: 100% 220px;
position: relative;
top: -11px;
left: -41px;
border-bottom-left-radius: 10px;
border-bottom-right-radius: 10px;
a{
display: inline-block;
}
img{
width: 220px;
height: 120px;
}
}
}
.mainContent{
width: 100%;
// height: 100%;
background: #fff;
}
.el-date-editor.el-input, .el-date-editor.el-input__inner{
width: 100%;
}
.uploadInput{
top:0px;
width: 0;
height: 100%;
visibility: hidden;
}
.new{
float: right;
}
</style>
