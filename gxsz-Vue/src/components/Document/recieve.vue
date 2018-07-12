<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">接收公文</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive" >
         <el-table :data="DataArr"  style="width: 100%" border >
          <el-table-column  label="id" prop="doc_id" width="70" > </el-table-column>
           <el-table-column  label="标题" prop="title" >
              <template scope="scope">
                <el-button @click='go("Document/AdminDocument/detail/"+scope.row.doc_id)' type="text" size="small">{{scope.row.title}}</el-button>
              </template>
           </el-table-column>
           <el-table-column  label="发布人" prop="user_nicename" width="170"></el-table-column>
           <el-table-column  label="发布时间" prop="create_time" width="180" show-overflow-tooltip></el-table-column>
           <el-table-column  label="点击量" prop="hits" width="100"></el-table-column>
           <el-table-column label="操作" width="140">
            <template scope="scope">
              <el-button size="small" @click='go("Document/AdminDocument/redirect/"+scope.row.doc_id)' :disabled="scope.row.role_status == 0">转发</el-button>
              <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete"  @click="fuzhi(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
       </el-table>
       <!-- 分页 -->
          <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"  :page-count="allPage"
                         class="pull-right"></el-pagination>
     </div>
     <!-- /.box-body -->
   </div>
 </div>
 <!-- /.col -->
 <!-- 删除确认模态框 -->
 <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">确认删除?</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="removeSubmit()" v-loading="loading"
        :disabled="loading">确定
      </button>
      <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
    </div>
  </div>
</div>
</div>
</div>
</template>

<script>
  const initConfig = {
    "method": "get",
    "url": "/index.php?g=document&m=Admindocument&a=lists",
    "carrier": "DataArr",
    "notAlert": true
  };
 export default{
    name:'list',
    data(){
      return{
        loading: false,
        Loading: true,
        nowPage: 1,
        allPage: 1,
        DataArr: [],
        temp:''
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
      },
      fuzhi(index, obj){
        //记录当前操作对象的值
        this.temp = obj.doc_id;
      },
      removeSubmit(){
        var _this = this;
        _this.loading = true;
        var config = {
          "method": 'get',
          "url": '/index.php?g=document&m=Admindocument&a=delete',
          "params": {
            "doc_id": _this.temp,
            "type":"recieve"
          }
        };
        _this.myHttp(config, function () {
          $('.modal').modal('hide');
          
                   //删除某条信息之后,如果当前页已经没有项目了,转至最后一页
                   initConfig.params.p = _this.nowPage > _this.allPage ? _this.allPage : _this.nowPage; 
           //更新列表数据
           _this.myHttp(initConfig,
            function (resp) {
              //初始化数据
              _this.allPage = resp.page;
            });
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
