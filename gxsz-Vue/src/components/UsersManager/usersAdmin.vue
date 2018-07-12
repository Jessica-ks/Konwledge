<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">管理员信息</h3>
        <div class="input-group pull-right" >
         <button type="button" @click="bindSelect" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px;margin-left:10px"><i class="fa fa-search" style="color:white" ></i> 高级搜索</button>
       </div><!-- /input-group -->
     </div>
     <!-- /.box-header -->
     <div class="box-body table-responsive">
       <el-table :data="DataArr" style="width: 100%" >
         <!-- <el-table-column label="ID" prop="id"  width="70"></el-table-column> -->
         <el-table-column label="用户名" prop="loginname" ></el-table-column>
         <el-table-column label="姓名" prop="nicename" ></el-table-column>
         <el-table-column label="角色" prop="rolename" ></el-table-column>
         <el-table-column label="学校" prop="schname" ></el-table-column>
         <el-table-column label="工作部门" prop="deptname" ></el-table-column>
         <el-table-column label="工作电话" prop="work_phone" ></el-table-column>
       </el-table>
       <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"
         :page-count="allPage" class="pull-right"></el-pagination>
       </div>
<!-- /.box-body -->
</div>
</div>
<!-- /.col -->
<!-- 搜索模态框 -->
<div class="modal fade" id="modalSearch" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">高级搜索</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
             <div class="form-group" >
              <el-select v-model.trim="workDep" placeholder="工作部门"  clearable filterable>
                <el-option v-for="item in dep_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>

            </div>
          </div>
          <div class="col-md-6 col-sm-12 col-xs-12">
           <div class="form-group" >
            <el-select v-model.trim="role" placeholder="角色"  clearable filterable>
              <el-option v-for="item in role_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12 col-sm-12 col-xs-12">
         <div class="form-group" >
          <el-select v-model.trim="school" placeholder="学校"  clearable filterable>
            <el-option v-for="item in sch_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </div>
      </div>
    </div>
  </form>
</div>
<div class="modal-footer">
  <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="searchSubmit()">确定</button>
  <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
</div>
</div>
</div>
</div>
</div>
</template>
<script>
  const initConfig = {
    "method": "get",
    "url": "/index.php?g=usersManager&m=AdminUsersManager&a=getAdminList",
    "carrier": "DataArr",
    "params": {
      "p": 1
    },
    "notAlert": true
  };
  export default {
    name: 'UsersManagerList',
    data() {
      return {
        temp: '',
        nowPage: 1,
        allPage: 1,
        DataArr: [],
        Loading: true,
        loading: false,
        searchObj:'',
        workDep:'',
        dep_list:[],
        role:'',
        role_list:[
          {value:5,
           label:'高校管理员'
          },
          {value:6,
           label:'部门管理员'
          }
        ],
        school:'',
        sch_list:[],

      }
    },
    methods: {
      goPage(num){
        //页面跳转
        var _this = this;
        //记录当前页面
        _this.nowPage = num;
        //切换路由
        _this.go(_this.$route.path, num);
        //加载对应页面的列表
        initConfig.params.p = _this.nowPage;
        //重新绑定数据
        _this.myHttp(initConfig, function (res) {
          _this.allPage = res.page;
        });
      },

      //获取选项的值
      bindSelect() {
         // 请求接口 获得列表数据
         if (this.searchObj) {
            //如果有值,不再请求
            return;
          };
          var _this = this;
          var config = {
            "method": 'get',
            "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=advanceSearch',
            "carrier": "searchObj",
            "notLoading": true,
            "notAlert": true
          };
          _this.myHttp(config,function(){
            //绑定各个option的数据
            _this.dep_list=_this.searchObj.dept;
            // _this.role_list=_this.searchObj.name;
            _this.sch_list=_this.searchObj.sch_name;
          });
        },

        fuzhi(index, obj) {
          //把当前的操作对象改为obj
          this.temp = obj.id;
        },

        //高级搜索
        searchSubmit() {
          //请求接口 获得列表数据
          var _this = this;
          _this.loading = true;
          _this.Loading = true;
          //改变查询条件
          initConfig.params = {
            'did':_this.workDep,
            'rid':_this.role,
            'sid':_this.school
          };
          _this.myHttp(initConfig, function (res) {
          //手动关闭确认框
          $('.modal').modal('hide');
          //搜索完成之后重新绑定数据列表
          _this.allPage = res.page;
        });
      },

    },
    created() {
      var _this = this;
      //发起请求数据
      initConfig.params = {"p": _this.$route.params.num};
      _this.myHttp(initConfig,
        function (resp) {
          //绑定数据
          _this.nowPage = _this.$route.params.num - 0;
          _this.allPage = resp.page;
        });
    }
  }
</script>
<style scoped>
</style>
