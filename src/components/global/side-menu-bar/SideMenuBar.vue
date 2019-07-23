<template>
    <div class="menu_page">
        <!-- <el-menu router :unique-opened="true" :default-active="defaultActive" :default-openeds="defaultOpen" @open="handleOpen" @select="handleSelect"> -->
        <el-menu router :unique-opened="true" :default-active="defaultActive" :default-openeds="defaultOpen">
            <template v-for=" item in data ">
                <el-submenu v-if="item.isSubMenu" :key="item.url" :index="item.url">
                    <template slot="title">
                        <span class="title_margin_left">{{item.name}}</span>
                    </template>
                    <el-menu-item :index="subItem.url" v-for=" subItem in item.childs" :key="subItem.url">
                        <span class="title_margin_left" :id="subItem.url" slot="title">{{subItem.name}}</span>
                    </el-menu-item>
                </el-submenu>
                <el-menu-item :index="item.url" :key="item.url" v-else-if="!item.isSubMenu">
                    <!-- <i class="el-icon-location"></i> -->
                    <span class="title_margin_left" slot="title">{{item.name}}</span>
                </el-menu-item>
            </template>
        </el-menu>
    </div>
</template>
<script>
export default {
  name: 'SideMenuBar',
  props: ['data', 'defaultActive','defaultOpen'],
  methods:{
    handleOpen(key, keyPath) {
      console.log('open:'+key, keyPath);
      let selectedRoute;
      let flag=false;//是否强制跳转
      this.data.forEach((menuItem,index)=>{
        if(menuItem.url===key && menuItem.isSubMenu==true){
          flag=true;
          selectedRoute=menuItem.childs[0].url;//默认展开子菜单第一级
        }
      });
      if(flag){
        this.$router.push({
          path:selectedRoute
        });
      }
      this.$emit('handleChangeMenu',key);
    },
    handleSelect(key, keyPath) {
      console.log('selected:'+key, keyPath);
      this.data.forEach((menuItem,index)=>{
        if(menuItem.isSubMenu==true && menuItem.url===keyPath[0]){
          if(key==menuItem.childs[0].url){
            this.removeStyle(document.getElementById(key));
            document.getElementById(key).parentElement.classList.add('is-active');
          }else{
            document.getElementById(key).parentElement.parentElement.childNodes[0].classList.remove('is-active');
          }
        }
      });
    },
    removeStyle(obj){
      let s=this.getAllSiblings(obj);
      // console.log(s);
      for(let i=0;i<s.length;i++){
        // console.log(s[i]);
        s[i].classList.remove('is-active');
      }
    },
    getAllSiblings(elm){
      let a = [];    //保存所有兄弟节点
      let p = elm.parentElement.parentElement.children; //获取父级的所有子节点
      for(let i = 0; i < p.length; i++){  //循环
          if(p[i].nodeType == 1 && p[i] != elm){  //如果该节点是元素节点与不是这个节点本身
              a.push(p[i]);      // 添加到兄弟节点里
          }
      }
      return a;
    }
  }
}
</script>
<style scoped>
/* .menu_page{
  width: 180px;
  height: 100%;
  background-color: #000000;
} */
.el-menu{
    background-color: #fbfbfb  !important;
    border-right:1px solid #eeeeee !important;
    height: 100%;
}
.title_margin_left{
  /* margin-left: 10%; */
  color:#666;
}
/* .el-menu-item.is-active {
  background-color: #485468;
  border-left:3px solid #409EFF;
} */
.el-menu-item.is-active .title_margin_left{
    color:#409EFF;
}

.el-submenu .el-menu-item{
  padding-left: 30px!important;
}

.menu_page.sideMenuBar{
  height: 100%;
}
/* .el-menu-item:hover{
    background-color: #485468;
} */
/* .el-submenu.is-active .el-submenu__title:hover{
    background-color: #485468 !important;
}
.el-submenu__title:hover{
    outline: 0 !important;
    color: #409EFF !important;
    background-color: #485468 !important;
} */
</style>
