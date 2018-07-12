<template>
  <div class="row">
    <div class="col-md-12  col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">组织结构</h3>
        </div>
        <div class="box-body">
          <div class="row" >
           <div class="col-md-6 col-sm-12 col-xs-12">
            <el-input placeholder="输入关键字进行过滤" v-model="filterText"></el-input>
          </div>
        </div>
        <div class="row" style="margin-top:30px">
          <div class="col-md-6 col-sm-12 col-xs-12">
           <el-tree class="filter-tree" :data="DataArr" accordion :filter-node-method="filterNode" ref="tree2" @node-click="handleNodeClick"></el-tree>
         </div>
         <div class="col-md-4 col-md-offset-1 col-sm-12 col-xs-12">
          <el-card class="box-card" v-show="personObj" style="position:fixed;width:280px;top:106px"> 
           <!--  <div class="text item">
              <strong>姓名</strong>: {{personObj.user_nicename}} 
            </div>
            <div class="text item">
              <strong>用户名</strong>: {{personObj.user_login}} 
            </div> -->

            <div class="text item">
              <strong>学校</strong>: {{personObj.school}}
            </div>
            <div class="text item">
             <strong>部门</strong>: {{personObj.dept}}
           </div>
           <div class="text item"> 
            <strong>工作电话</strong>: {{personObj.workphone}}
          </div>
          <!--  <div class="text item"> 
            <strong>手机号</strong>: {{personObj.user_phone}}
          </div> -->
          <div class="text item"> 
            <strong>邮箱</strong>: {{personObj.user_email}}
          </div> 
          <div class="text item"> 
            <strong>QQ</strong>: {{personObj.user_qq}}
          </div>
        </el-card>
      </div>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script>
  export default {
   name: 'schoolStructure',
   data() {
     return {
      filterText:'',
      DataArr:  [],
      Loading: true,
      personObj:''
    }
  },
  watch: {
    filterText(val) {
      this.$refs.tree2.filter(val);
    }
  },
  methods: {
    handleNodeClick(data) {
      if(data.type=="dept"){
        //保证选中的节点是人员
        var _this=this;
        var config = {
          method: 'get',
          url: '/index.php?g=UsersManager&m=AdminUsersManager&a=getAdminUser',
          carrier:"personObj",
          params:{
            "did":data.id,
            "sid":data.parent
          },
          notAlert:true
        };
        _this.myHttp(config);
      }

    },
    filterNode(value, data) {
      if (!value) return true;
      return data.label.indexOf(value) !== -1;
    }
  },
  created() {
   var _this=this;
   var config = {
    method: 'get',
    url: '/index.php?g=UsersManager&m=AdminUsersManager&a=structure',
    carrier:"DataArr"
  };
  _this.myHttp(config)
}
}
</script>
<style scoped>
  .form-group .el-input{
    width:100%;
  }
  .text strong{
    letter-spacing: 2px
  } 
</style>
