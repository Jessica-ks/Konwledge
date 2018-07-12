<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12"  v-loading="Loading" element-loading-text="正在加载中...">
      <div class="box box-primary">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">未读消息</h3>
        <!--   <div class="input-group pull-right" >
           <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px"><i class="fa fa-search" style="color:white" @click="bindSelect"></i> 高级搜索</button>
         </div> -->
         <!-- /input-group --> 
       </div>
       <!-- /.box-header -->
       <div class="box-body table-responsive">
         <div class="row">
           <div class="col-md-offset-3 col-md-6 col-sm-12 col-xs-12">
             <el-alert v-for="item in DataArr"  :title="item.createtime" type="info" :description="item.content"show-icon  :key="item.id" show-icon @close="close(item.id)"  style="margin-top:20px"></el-alert>
              <span v-show="DataArr.length==0" class="notData">暂无数据</span>
           </div>
         </div>
         <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"
           :page-count="allPage" class="pull-right"></el-pagination>
         </div>
         <!-- /.box-body -->
       </div>
     </div>
     <!-- /.col -->
   </div>
 </div>
</div>
</div>
</template>
<script>
  const initConfig = {
    "method": "get",
    "url": "/index.php?g=Message&m=AdminMessage&a=unReadList",
    "carrier": "DataArr",
    "params": {
      "p": 1
    },
    "notAlert": true
  };
  export default{
    name:'unreadMsg',
    data() {
      return {
        nowPage:1,
        allPage:1,
        DataArr:[],
        Loading:true,
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
        //加载对应页面的列表
        initConfig.params.p = _this.nowPage;
        //重新绑定数据
        _this.myHttp(initConfig, function (res) {
          _this.allPage = res.page;
        });
      },
      close(id){
        var _this=this;
        var config={
          method:'get',
          url:'/index.php?g=Message&m=AdminMessage&a=change_read_status',
          params:{
            "id":id
          }
        };
        _this.myHttp(config, function () {
          //删除某条信息之后,如果当前页已经没有项目了,转至最后一页
          initConfig.params.p = _this.nowPage > _this.allPage ? _this.allPage : _this.nowPage;
          //更新列表数据
          _this.myHttp(initConfig,
            function (resp) {
              //初始化数据
              _this.allPage = resp.page;
            })
        });
      // _this.$http({
      //   method:'get',
      //   url:'/index.php?g=Message&m=AdminMessage&a=change_read_status',
      //   params:{
      //     "id":id
      //   }
      // }).then(function(res){ 
      //   if(res.data.status===1){
      //         //成功       
      //         //重新读取当前页
      //         _this.bindData(_this.nowPage);
      //       }else{
      //         this.$message({
      //           message: res.data.info,
      //           type: 'error'
      //         });
      //       }
      //     },function(err){
      //       console.log(err);
      //     });
    }
  },
  created(){
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
.notData{
    position: absolute;
    left: 50%;
    top: 50%;
    -ms-transform: translate(-50%,-50%);
    transform: translate(-50%,-50%);
    color: #5e7382;
}
</style>
