<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" border v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">未读通知</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive">
         <el-table :data="DataArr"  style="width: 100%">
          <el-table-column  label="id" prop="id" width="70" > </el-table-column>
          <el-table-column  label="标题" prop="title" >
            <template scope="scope">
              <el-button @click='go("Notification/AdminNotification/detail/"+scope.row.id)' type="text" size="small">{{scope.row.title}}</el-button>
            </template>
          </el-table-column>
          <el-table-column  label="发布人" prop="name"  width="170"></el-table-column>
          <el-table-column  label="发布时间" prop="publish_time" width="180"></el-table-column>
          <el-table-column  label="点击量" prop="hits" width="100"></el-table-column>
        </el-table>
        <!-- 分页 -->
          <el-pagination v-show="allPage>1" layout="prev, pager, next" :current-page="nowPage" @current-change="goPage" :page-count="allPage"
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
    "url": "/index.php?g=notification&m=AdminNotification&a=unReadList",
    "carrier": "DataArr",
    "notAlert": true
  };
 export default{
  name:'unreadList',
  data(){
    return{
      loading: false,
      Loading: true,
      nowPage: 1,
      allPage: 1,
      DataArr: []
    }
  },
  methods:{
    goPage(num){
      //页面跳转
      var _this = this;
      //记录当前页面
      _this.nowPage = num;
      //切换路由
      _this.go(_this.$route.path, num);
      //重新绑定数据
      initConfig.params = {"p": _this.nowPage};
      _this.myHttp(initConfig);
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
    }
  }
</script>
<style scoped>
  .input-group{
    width: 350px;
    float: right;
  }
  .input-group input{
    float: right;
    width: 150px;
  }
  .input-group input:nth-child(2){
    margin-right: 8px;
  }
</style>
