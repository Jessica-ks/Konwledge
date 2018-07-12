<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">反馈列表</h3>
          <button type="button" class="btn btn-primary" v-if="selectedArr.length>0" data-toggle="modal" data-target="#modalDeleteAll" style="margin-left:10px">删除</button>

     </div>
     <!-- /.box-header -->
     <div class="box-body table-responsive">
       <el-table :data="DataArr" style="width: 100%"  @selection-change="handleSelectionChange" >
        <el-table-column
          type="selection"
          width="55"></el-table-column>
         <el-table-column label="ID" prop="id"  width="70"></el-table-column>
         <el-table-column label="内容" prop="content" ></el-table-column>
         <el-table-column label="邮箱" prop="email" ></el-table-column>
         <el-table-column label="类别" prop="type" ></el-table-column>
          <el-table-column label="操作" width="100">
            <template scope="scope">
              <el-button
                size="small"
                type="danger" 
                data-toggle="modal" 
                data-target="#modalDelete" 
                @click="fuzhi(scope.$index, scope.row)" >删除</el-button>
            </template>
          </el-table-column>
       </el-table>
       <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"
         :page-count="allPage" class="pull-right"></el-pagination>
       </div>
<!-- /.box-body -->
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
    "url": "/index.php?g=feedback&m=feedbackadmin&a=lists",
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
        selectedArr: [],
        Loading: true,
        loading: false
      }
    },
    methods: {
      removeSubmit(){
        var _this = this;
        //需要删除的新闻id数组
        var ids = [];
        ids[0] = _this.temp;
        _this.loading = true;
       var config = {
          "method": 'get',
          "url": '/index.php?g=feedback&m=feedbackadmin&a=delete',
          "params": {
            "id": ids.join(',')
          }

        }
        _this.myHttp(config, function () {
          //手动关闭确认框
          $('.modal').modal('hide');
          //删除某条信息之后,如果当前页已经没有项目了,转至最后一页
          initConfig.params.p = _this.nowPage > _this.allPage ? _this.allPage : _this.nowPage;
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
            "method": 'get',
            "url": '/index.php?g=feedback&m=feedbackadmin&a=delete',
            "params": {
              "id": ids.join(',')
            }

          }
          _this.myHttp(config,function(){
              //记得手动把模态框隐藏
              $('.modal').modal('hide');
            //删除之后,如果当前页已经没有项目了,转至最后一页
            initConfig.params.p = _this.nowPage > _this.allPage ? _this.allPage : _this.nowPage;
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
      },
      fuzhi(index, obj) {
        //把当前的操作对象改为obj
        this.temp = obj.id;
      },
      // handleDelete (index, rows) {
      //   this.$confirm('取消该任务？', '提示', {
      //     confirmButtonText: '确定',
      //     cancelButtonText: '取消',
      //     type: 'warning'
      //   }).then(() => {
      //   var _this = this;
      //   var config = {
      //     "method": 'get',
      //     "url": '/index.php?g=feedback&m=feedbackadmin&a=delete',
      //     "params": {
      //       "id": _this.DataArr[index].id
      //     }

      //   }
      //   _this.myHttp(config,function(response){
      //     _this.DataArr.splice(index, 1)
      //   })
      //   }).catch(() => {
      //     this.$message({
      //       type: 'info',
      //       message: '取消失败！'
      //     })
      //   })
      // },
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
      // bindSelect() {
      //    // 请求接口 获得列表数据
      //    if (this.searchObj) {
      //       //如果有值,不再请求
      //       return;
      //     };
      //     var _this = this;
      //     var config = {
      //       "method": 'get',
      //       "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=advanceSearch',
      //       "carrier": "searchObj",
      //       "notLoading": true,
      //       "notAlert": true
      //     };
      //     _this.myHttp(config,function(){
      //       //绑定各个option的数据
      //       _this.dep_list=_this.searchObj.dept;
      //       // _this.role_list=_this.searchObj.name;
      //       _this.sch_list=_this.searchObj.sch_name;
      //     });    
      //   },

        // fuzhi(index, obj) {
        //   //把当前的操作对象改为obj
        //   this.temp = obj.id;
        // },

        //高级搜索
      //   searchSubmit() {
      //     //请求接口 获得列表数据
      //     var _this = this;
      //     _this.loading = true;
      //     _this.Loading = true;
      //     //改变查询条件
      //     initConfig.params = {
      //       'did':_this.workDep,
      //       'rid':_this.role,
      //       'sid':_this.school
      //     };
      //     _this.myHttp(initConfig, function (res) {
      //     //手动关闭确认框
      //     $('.modal').modal('hide');
      //     //搜索完成之后重新绑定数据列表
      //     _this.allPage = res.page;
      //   });
      // },  

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
