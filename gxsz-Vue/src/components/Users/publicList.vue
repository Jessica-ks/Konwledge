<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">公共通讯录</h3>
          <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入姓名..." v-model.trim="searchWord1"
                   @keyup.enter='searchSubmit()'>
            <input type="text" class="form-control" placeholder="请输入用户名..." v-model.trim="searchWord2"
                   @keyup.enter='searchSubmit()'>
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="searchSubmit()"><i
                class="fa fa-search"></i></button>
            </span>
          </div>
          <span v-show="isShowResult" style="float: right;margin-right: 40px;font-size: 18px;font-weight:bold">查询结果如下</span>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive" >
          <el-table :data="DataArr" style="width: 100%" border >
            <el-table-column label="id" prop="id" width="70"></el-table-column>
            <el-table-column label="姓名" prop="user_nicename"></el-table-column>
            <el-table-column label="用户名" prop="user_login"></el-table-column>
            <el-table-column label="工作电话" prop="workphone"></el-table-column>
            <el-table-column label="部门" prop="dept_name"></el-table-column>
            <el-table-column label="学校" prop="school_name"></el-table-column>
            <el-table-column label="Email" prop="user_email" width="220"></el-table-column>
            <el-table-column label="QQ号" prop="user_qq"></el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"  :page-count="allPage"
                         class="pull-right"></el-pagination>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <!-- /.col -->
  </div>
</template>

<script>
  const initConfig = {
    "method": "get",
    "url": "/index.php?g=office&m=useraddress&a=publicUsersList",
    "carrier": "DataArr",
    "params": {
      "p": 1,
      "user_login": '',
      "user_nicename": ''
    },
    "notAlert": true
  };
  export default{
    name: 'publicList',
    data(){
      return {
        loading: false,
        Loading: true,
        isShowResult:false,
        nowPage: 1,
        allPage: 1,
        searchWord1: '',
        searchWord2: '',
        DataArr: []
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
        initConfig.params.p=_this.nowPage;
        //重新绑定数据
        _this.myHttp(initConfig, function (res) {
          _this.allPage = res.page;
        });
      },
      searchSubmit(){
        var _this = this;
        _this.loading = true;
        _this.searchWord2||_this.searchWord1?_this.isShowResult=true:_this.isShowResult=false;
        initConfig.params={
          'user_login': _this.searchWord2,
          'user_nicename': _this.searchWord1
        };
        _this.myHttp(initConfig,function(resp){
            _this.allPage=resp.page;
        });
      }
    },
    created(){
      var _this = this;
      //发起请求数据
        initConfig.params = {"p": _this.$route.params.num};
      _this.myHttp(initConfig,
        function (resp) {
          //绑定数据
          _this.nowPage=_this.$route.params.num-0;
          _this.allPage = resp.page;
        });
    },
  }
</script>
<style scoped>
  .input-group {
    width: 350px;
    float: right;
  }

  .input-group input {
    float: right;
    width: 150px;
  }

  .input-group input:nth-child(2) {
    margin-right: 8px;
  }
</style>
