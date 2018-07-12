<template>
    <aside class="main-sidebar">
      <!-- sidebar: style can be found in sidebar.less -->
      <section class="sidebar">
        <!-- search form -->
<!--         <form class="sidebar-form">
          <div class="input-group">
            <input type="text" name="q" class="form-control" placeholder="Search...">
            <span class="input-group-btn">
          <button type="submit" name="search" id="search-btn" class="btn btn-flat"><i class="fa fa-search"></i>
          </button>
        </span>
          </div>
        </form> -->
        <!-- /.search form -->
        <!-- sidebar menu: : style can be found in sidebar.less -->
        <div v-loading="Loading" element-loading-text="正在加载中...">
          <ul class="sidebar-menu" v-show="menu">
            <li class="treeview" v-for="item in menu">
              <a href="#">
                <i :class="item.icon"></i> <span>{{item.name}}</span>
                <span class="pull-right-container">
            <i class="fa fa-angle-left pull-right"></i>
          </span>
              </a>
              <ul class="treeview-menu" v-show="item.submenu&&item.submenu.length>0" style="top:40px">
                <li v-for="subitem in item.submenu" @click='go(subitem.url)'>
                  <a :href="'#/'+subitem.url">
                    <i :class="subitem.icon"></i> <span>{{subitem.name}}</span>
                    <span class="pull-right-container" v-show="subitem.submenu.length>0">
                <i class="fa fa-angle-left pull-right"></i>
              </span>
                  </a>
                  <ul class="treeview-menu" v-show="subitem.submenu&&subitem.submenu.length>0">
                    <li v-for="subsubitem,k in subitem.submenu" @click='go(subsubitem.url)'>
                      <a :href="'#/'+subsubitem.url">
                        <i :class="subsubitem.icon"></i> <span>{{subsubitem.name}}</span>
                      </a>
                    </li>
                  </ul>
                </li>
              </ul>
            </li>
          </ul>
        </div>

      </section>

    </aside>
</template>

<script>
  export default{
    name:'main-sidebar',
    data(){
      return {
        title:'',
        menu:'',
        Loading:true
      }
    },
    methods:{

    },
    created:function(){
      var _this=this;
      var config={
        "method":"get" ,
        "url":'/index.php?g=office&m=indexadmin&a=menu',
        "carrier":"menu",
        "notAlert":true
      };
      _this.myHttp(config);
    }
  }





</script>
<style scoped>
i+span{
  font-family: '微软雅黑' !important;
  font-weight: bold !important;
  letter-spacing: 3px;
}
</style>
