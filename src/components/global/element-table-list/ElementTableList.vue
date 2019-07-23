
// 表格组件
<template>
  <div class="form-component" v-loading="loading2" element-loading-background="rgba(0, 0, 0, 0.3)">
    <el-table  
    :data="cardData"  
    style="width: 100%;" 
    @cell-click="detailsCard" 
    :header-cell-style="tableHeaderColor"
    :cell-style="tableColor" 
    :default-sort="{prop: 'date', order: 'descending'}" 
    :height="tabHeight"
    @selection-change="handleSelectionChange"
    >     
      <!-- 头部开始的 select 框-->
      <template v-if="cols.isSelection">
        <el-table-column type="selection" width="80" align="center" fixed="left"></el-table-column>
      </template>
    

      <template v-for="(col ,index) in cols.colList">
          <template v-if="cols.isStatue && col.label == 'statueIcon'" >
           
            <el-table-column :class-name="'row-statue-icon'" align="center"  width="20">
              <template slot-scope="scope">
                <template v-for="(statueItem,index) in col.statueIconList">
                    <span v-if="scope.row[col.prop]==statueItem.value" :class="statueItem.calssName" style="position: absolute;
                    top: 0px;
                    left: -80px;
                    width: 35px;
                    height: 35px;
                    z-index: 99;
                    background-size: cover;"></span>
                </template>
              </template>
            </el-table-column>
          </template>



        <!-- 普通的数据展示 -->
        <template v-if="col.colType==1">
          <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
            align="center"></el-table-column>
        </template>
        <!-- 普通的数据展示 -->

        <!-- action  操作 -->
        <template v-if="col.colType==2">
          <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
            align="center">
            <template slot-scope="scope">
              <template v-for="(item,index) in col.actionList">
                <!-- 阿里的图标库 -->
                <template v-if="item.actiontype==1">
                  <i class="iconfont list-hover-style" :title="item.title" :class="item.iconName"
                    @click="emithandle(item.emitName,scope.row)"></i>
                </template>
                <!-- 显示文字 -->
                <template v-if="item.actiontype==2">
                  <span @click="emithandle(item.emitName,scope.row)" class="list-hover-style">
                    <span>
                      {{item.text}}
                    </span>
                  </span>

                </template>
                <template v-if="item.actiontype==3">
                  <span @click="emithandle(item.emitName,scope.row)" class="list-hover-style">
                   
                    <span>
                      {{item.text}}
                    </span>
                  </span>
                </template>
                <!-- 文字前面带icon -->
                <template v-if="item.actiontype==4">
                  <span @click="emithandle(item.emitName,scope.row)" class="list-hover-style">
                    <i class="iconfont" :class="item.iconName"></i>
                    <span>
                      {{item.text}}
                    </span>
                  </span>
                </template>
                 <!-- 系统图标 状态可变-->
                <template v-if="item.actiontype==5">
                
                  <i style="cursor:default;color:#ddd;" v-if="scope.row[item.colName] == item.disableV" class="iconfont list-hover-style" :style="item.fontStyle" :title="item.title" :class="item.iconName"
                    ></i>

                    <i v-else class="iconfont list-hover-style" :title="item.title" :style="item.fontStyle" :class="item.iconName"
                    @click="emithandle(item.emitName,scope.row)"></i>
                </template>
                <!-- element图标 状态可变-->
                <template v-if="item.actiontype==6">
        
                  <i style="cursor:default;color:#ddd;" v-if="scope.row[item.colName] == item.disableV" class="list-hover-style" :title="item.title" :class="item.iconName"
                    ></i>

                    <i v-else class="list-hover-style" :title="item.title" :class="item.iconName"
                    @click="emithandle(item.emitName,scope.row)"></i>
                </template>
           
              </template>
            </template>
          </el-table-column>
        </template>
        <!-- action  操作 -->

        <!-- 后面有小图标 -->
        <template v-if="col.colType==3">

          <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
            align="center">
            <template slot-scope="scope">
              <div>
                <!-- 这里字段写死了 ，后续看能否写活 -->
                <span>{{scope.row[col.prop]}}</span>
                <img :src="col.iconImg" :width="col.Imgwidth" alt="col.tips"
                  @click="emithandle(col.emitName,scope.row)">

              </div>
            </template>
          </el-table-column>
        </template>
      
        <!-- 字典值回选 -->
        <template v-if="col.colType==4">
            <el-table-column  :prop="col.prop" align="center" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip">
                <template slot-scope="scope">
                  <template v-for="(subItem,index) in col.dictionaryList">
                      <span v-if="scope.row[col.prop] == subItem.dictCode">{{subItem.dictName}}</span>
                  </template>
                  
                 
                </template>
              </el-table-column>
        </template>

        <!-- 可点击列跳转 -->
        <template v-if="col.colType==5">
            <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
              align="center">
            <template slot-scope="scope">
              <span style="cursor: pointer;display:block;color:#3a8ee6" @click="emithandle(col.emitName,scope.row)">{{scope.row[col.prop]}}</span>
            </template>
            </el-table-column>
        </template>

        <!-- 6 多个字段拼接 -->
        <template v-if="col.colType==6">
            <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
            align="center">
            <template slot-scope="scope">
              <div>
                  <span v-for="(propItem,index) in col.propArr">
                   
                    <span v-if="index != 0 && col.connectFlag">
                      {{col.connectFlag}}
                    </span>
                    {{scope.row[propItem]}}
                  </span>
              </div>
            </template>
          </el-table-column>
        </template>
        <!-- 7 switch主键 -->
        <template v-if="col.colType==7">
            <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
            align="center">
            <template slot-scope="scope">
              
                <el-switch
                  v-model="scope.row[col.prop]"
                  active-color="#358BFE"
                  :active-value="col.activeValue"
                  :inactive-value="col.inactiveValue"
                  @click.native="emithandle(col.emitName,scope.row)"
                  inactive-color="#dcdfe6">
                </el-switch>
              
            </template>
          </el-table-column>
        </template>
        <!-- 8 index 序号 -->
        <template v-if="col.colType==8">
          <el-table-column type='index' :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
          align="center">
          </el-table-column>
        </template>
         <!-- -1 自定义内容 -->
        <template v-if="col.colType==-1">
              <el-table-column :prop="col.prop" :label="col.label" :width="col.width" :show-overflow-tooltip="col.tooltip"
              align="center">
              <!-- <slot name="soltname" row=""></slot> -->
              <template slot-scope="scope">
                  <slot :name="col.slotName" :row="{rowData:scope.row,originData:col}">
                    <!-- 这里作用域可以直接用 element 的scope.row -->
                    <!-- {{scope.row[col.prop]}} -->
                    没有定义slot显示代码
                  </slot>
              </template>
            </el-table-column>
        </template>
      </template>


    </el-table>
  </div>
</template>

<script>
  export default {
    name:'ElementTableList',
    props: ["cardData", "cols","tabHeight"],
    data() {
      return {
        formLabelWidth: "100px",
        loading2: false,//加载动画
      };
    },
    methods: {
      // 单元格第一列点击跳详情
      detailsCard(row, column) {
        
      },
      // 标题颜色
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {

        if (rowIndex === 0) {
          return 'color: #282828;font-weight: normal;font-size:14px; background-color: #edeef3'
        }
      },
      // 单元格颜色
      tableColor({ row, column, rowIndex, columnIndex }) {
        if (column.property == 'expName') {
          return 'color: #358bfe; cursor: pointer;'
        }
      },
      handleSelectionChange(val) {
        var idArr = [];
        var idStr = '';
        for (var i = 0; i < val.length; i++) {
          idArr.push(val[i].id)
        }
        this.$emit("idStr", idArr)//选中的id emit事件

      },
      //表格的emit事件传向父级
      emithandle(emitName, data) {
        console.log('emit-----' + emitName);
        data.listTableEmitName = emitName;//添加emit属性
        this.$emit('ListItemEmit', data);//对应的父级要写好响应的on 事件;
      },
      //值班日志比较
      compareTime(startTime,endTime){
        let startArr = startTime.split(':');
        let startNum = parseInt(startArr[0])*60 + parseInt(startArr[1]);
        let endArr = endTime.split(':');
        let endNum = parseInt(endArr[0])*60 + parseInt(endArr[1]);
        
        if(startNum>=endNum)
        {
          return true;
        }
        else
        {
          return false;
        }
      }
    },
    mounted() {
      
    }
  };
</script>
<style>
  /* 覆盖组件样式 */
  .row-statue-icon{
    
  }
</style>
<style scoped lang="scss">
  .form-component{
    padding: 0 10px;
  }
  .span {
    background: #ff0000;
    width: 10px;
    height: 10px;
  }
  .list-hover-style{
   
    cursor: pointer;
    padding: 0 5px;
    font-size: 20px;
  }
  .list-hover-style:hover{
    color:#358BFE;
  }
  .row-statue-icon{
    position: static !important;
    z-index: 100;
  }
  /* start 行状态icon 的样式表开始  丰富可以一直加 */
  /* 草稿 */
  .row-statue-icon .icon-div-draft{
    position: absolute;
    top: 0px;
    left: -80px;
    width: 35px;
    height: 35px;
    z-index: 99;
    /* background: url("/static/images/public/draft-1.png") no-repeat center center; */
    background-size: cover;
  }
  /* 定稿 */
  .row-statue-icon .icon-div-finalization{
    position: absolute;
    top: 0px;
    left: -80px;
    width: 35px;
    height: 35px;
    z-index: 99;
    /* background: url("/static/images/public/draft-0.png") no-repeat center center; */
    background-size: cover;
  }
  /* end 行状态icon 的样式表开始  丰富可以一直加 */
</style>
