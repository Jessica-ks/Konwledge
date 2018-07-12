<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">反馈详情</h3>
<!--           <div class="input-group  pull-left" style="margin-left:3px">
            <el-upload class="upload-demo" style="display:inline-block;margin-left:20px" action="/gxsz_office/index.php?g=CloudStorage&m=AdminFiles&a=storageUpload" :data="{'pid':0}" :show-file-list="false" :on-success="importFile" 
            :file-list="fileArr">
            <button  class="btn btn-primary" ><span class="glyphicon glyphicon-upload"></span> 上传文件</button>        
          </el-upload> 
          <button type="button" class="btn btn-primary" v-if="selectedArr.length>0" data-toggle="modal" data-target="#modalDeleteAll" style="margin-left:10px">删除</button>
        </div> -->
      <!--   <div class="input-group pull-right" >
         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px"><i class="fa fa-search" style="color:white" ></i> 高级搜索</button>
       </div> -->
     </div>
     <!-- /.box-header -->
     <div class="box-body table-responsive">
       <el-table :data="DataArr" style="width: 100%"  @selection-change="handleSelectionChange" >
         <!-- <el-table-column type="selection" width="50"></el-table-column> -->
        <!--  <el-table-column label="ID" prop="id"  width="110"></el-table-column> -->
         <el-table-column label="文件名" prop="filename" ></el-table-column>
         <el-table-column label="类型" prop="type" ></el-table-column>
         <el-table-column label="大小" prop="size" ></el-table-column>
         <el-table-column label="发布人" prop="username" ></el-table-column>
<!--          <el-table-column label="下载量" prop="dltimes" ></el-table-column> -->
         <el-table-column label="上传时间" prop="time"  width="160"></el-table-column> 
         <el-table-column label="操作"  width="180">
          <template scope="scope">
            <!-- <el-button size="small" data-toggle="modal" data-target="#modalEdit" @click="fuzhi(scope.$index, scope.row)">编辑</el-button> -->
            <a @click="loadFile(scope.$index, scope.row)" :href="load_File" target="_blank" type="button" class="btn btn-primary" style="width:44px;font-size:12px;padding:0;line-height:25px;">下载</a>
           <!--  <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete" @click="fuzhi(scope.$index, scope.row)">删除</el-button>  -->
         </template>
       </el-table-column>
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
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入名称..." v-model.trim="keyword" @keyup.enter='searchSubmit()'>
            </div>
          </div>
          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围" style="width:100%" @keyup.enter='searchSubmit()'></el-date-picker>
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
<!-- 编辑模态框 -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">编辑文件</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':oldNameTips,'has-success':oldNameTips}">
                <input type="text" class="form-control" placeholder="名称" v-model.trim="oldName">
                <span class="help-block" style="text-align:center" v-show="oldNameTips">{{oldNameTips}}</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="editSubmit()" v-loading="loading" :disabled="loading">
              确定
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
<!-- 删除确认模态框 -->
<div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">确认删除选项?</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="removeSubmit()" >确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
      </div>
    </div>
  </div>
</div>
<!-- 全部删除模态框 -->
<div class="modal fade" id="modalDeleteAll" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">确认删除<span style="color:red" v-if="selectedArr.length>1">这些</span>选项?</h3>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="removeAllSubmit()" >确定</button>
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
    "url": "/index.php?g=document&m=Admindocument&a=feedback",
    "carrier": "DataArr",
    "params": {
      "page": 1,
      "filename": '',
      "early": '',
      "late": ''
    },
    "notAlert": true
  };
  export default {
    name: 'personFile',
    data() {
      return {
        temp: '',
        nowPage: 1,
        allPage: 1,
        DataArr: [],
        Loading: true,
        loading: false,
        searchObj:'',
        selectedArr: [],
        dateRange:'',
        oldName:'',
        oldNameTips:'',
        fileArr:[],
        keyword:'',
        load_File:''
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
        initConfig.params.page = _this.nowPage;
        //重新绑定数据
        _this.myHttp(initConfig, function (res) {
          _this.allPage = res.page;
        });
      }, 
      fuzhi(index, obj) {
        //把当前的操作对象改为obj
        this.temp = obj.id;
        this.oldName=obj.filename;
      },
      //高级搜索
      searchSubmit() {
        //请求接口 获得列表数据
        var _this = this;
        _this.loading = true;
        _this.Loading = true;
        initConfig.params={
          'filename':_this.keyword,
          'early':_this.dateRange[0]? _this.formatDate(_this.dateRange[0]):'',
          'late':_this.dateRange[1]?_this.formatDate(_this.dateRange[1]):''
        };
        _this.myHttp(initConfig, function (res) {
          //手动关闭确认框
          $('.modal').modal('hide');
          //搜索完成之后重新绑定数据列表
            _this.allPage = res.page;

        });
      },
       editSubmit(){
        //上传修改表单
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "oldName",
            "reg": ["notnull"]
          }
        ]);
        if (checkResult) {
          _this.loading = true;
          var config = {
            "method": 'post',
            "url": "/index.php?g=document&m=Admindocument&a=feedbackDownload",
            "params": {
              'id': _this.temp
              // 'pid':0,
              // 'filename': _this.oldName
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            initConfig.params.page = _this.nowPage;
            //更新列表数据
            _this.myHttp(initConfig)
          })
        }
      },   
      //上传文件
      importFile(data){
        var _this=this;
        if(data.code==0){
          _this.myHttp(initConfig,
            function (resp) {
              //初始化数据
              _this.allPage = resp.page;
            });
          this.$message({
            "message": data.msg,
            "type": "success"
          });
        }else{
          this.$message({
            "message": data.msg,
            "type": "error"
          });
        }

      },
      //下载文件
      loadFile(index,obj){
          var id= obj.id;
          var str="/gxsz_office/index.php?g=document&m=Admindocument&a=feedbackDownload";
          str+='&id='+id;
          this.load_File=str;
      },
      //单击删除
      removeSubmit(){
        var _this = this;
        //需要删除的新闻id数组
        var ids = [];
        ids[0] = _this.temp;
        _this.loading = true;
        var config = {
          method: 'get',
          url: '/index.php?g=CloudStorage&m=AdminFiles&a=storageDelete',
          params: {
            "id": ids
          }
        };
        _this.myHttp(config, function () {
          //手动关闭确认框
          $('.modal').modal('hide');
          //删除某条信息之后,如果当前页已经没有项目了,转至最后一页
          // console.log(_this.allPage,_this.nowPage);
          initConfig.params.page = _this.nowPage > _this.allPage ? _this.allPage : _this.nowPage;
          //更新列表数据
          _this.myHttp(initConfig,
            function (resp) {
              //初始化数据
              _this.allPage = resp.page;
            })
        });
      },
      //全选/反选
      handleSelectionChange(val) {
        this.selectedArr = val;
      },
      removeAllSubmit(){
        if (this.selectedArr.length > 0) {
         //有选中值的情况
          var _this = this;
          _this.Loading = true;
          var ids = [];
          this.selectedArr.forEach(function (item) {
            ids.push(item.id);
          });

          var config = {
            method: 'get',
            url: '/index.php?g=CloudStorage&m=AdminFiles&a=storageDelete',
            params: {
              "id": ids,
            }
          };
          _this.myHttp(config,function(){
              //记得手动把模态框隐藏
              $('.modal').modal('hide');
            //删除之后,如果当前页已经没有项目了,转至最后一页
            initConfig.params.page = _this.nowPage > _this.allPage ? _this.allPage : _this.nowPage;
            _this.myHttp(initConfig,function(res){
              _this.allPage=res.page;
            });
          });
        }else{
          this.$message({
            "message": "请至少选择一项!",
            "type": "info"
          });
        }
      }
    },
    created() {
      var _this = this;
      //发起请求数据
      initConfig.params = {"page": _this.$route.params.num, "doc_id": _this.$route.params.id};
      _this.myHttp(initConfig,
        function (resp) {
          //绑定数据
          _this.nowPage = _this.$route.params.num - 0;
          _this.allPage = resp.page;
        });
    },

  }
</script>
<style scoped>

</style>
