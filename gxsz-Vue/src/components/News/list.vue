<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">新闻审核</h3>
          <div class="input-group  pull-left" style="margin-left:3px">
            <button type="button" class="btn btn-primary" style="margin-right:10px" @click="checkAll"><span class="glyphicon glyphicon-ok"></span> 审核通过</button>
            <button type="button" class="btn btn-primary" style="margin-right:10px" @click="uncheckAll"><span class="glyphicon glyphicon-remove"></span> 取消审核</button>
            <button type="button" class="btn btn-primary" style="margin-right:10px" @click="setTop"><span class="glyphicon glyphicon-arrow-up"></span> 置顶</button>
            <button type="button" class="btn btn-primary" style="margin-right:10px" @click="unsetTop"><span class="glyphicon glyphicon-arrow-down"></span> 取消置顶</button>
            <button type="button" class="btn btn-primary" v-show="selectedArr.length>0" data-toggle="modal"
              data-target="#modalDeleteAll">删除所选
            </button>
          </div>
          <div class="input-group pull-right">
            <button type="button" @click="bindSelect" class="btn btn-primary" data-toggle="modal"
            data-target="#modalSearch" style="margin-right:10px">
            <i class="fa fa-search" style="color:white"></i> 高级搜索
          </button>
        </div><!-- /input-group -->
      </div>
      <!--<span v-show="isShowResult"-->
      <!--style="float: right;margin-right: 40px;font-size: 18px;font-weight:bold">查询结果如下</span>-->
      <!-- /.box-header -->
      <div class="box-body table-responsive">
        <el-table :data="DataArr" style="width: 100%" @selection-change="handleSelectionChange">
          <el-table-column type="selection" width="35"></el-table-column>
          <el-table-column label="优先级" width="80">
            <template scope="scope">
              <!-- 这里的优先级显示最好先判断下有没有 -->
              <el-input v-model.trim="scope.row.listorder" @blur="setLevel(scope.$index,scope.row )" :disabled="scope.row.post_status!= 1"></el-input>
            </template>
          </el-table-column>
         <!--  <el-table-column label="id" prop="id" width="70"></el-table-column> -->
          <el-table-column label="标题">
           <template scope="scope">
             <a :href="'/gxsz_office/index.php?g=gxsz&m=NewsList&a=newsdetail&id='+scope.row.id" :class='{"disabled":scope.row.post_status!= 1}' target="_blank" type="text" size="small">{{scope.row.post_title}}</a>
           </template>
         </el-table-column>
         <el-table-column label="分类" prop="post_term"></el-table-column>
         <el-table-column label="发布人" prop="post_author" width="80"></el-table-column>
         <el-table-column label="点击量" prop="post_hits" width="80"></el-table-column>
         <el-table-column label="联系方式" prop="post_author_phone" width="140"></el-table-column>
         <el-table-column label="投稿时间" prop="post_date" width="105"></el-table-column>
         <el-table-column label="状态" width="80">
          <template scope="scope">
            <el-tag type="warning" v-if="scope.row.post_status == 0" close-transition>正在审核</el-tag>
            <el-tag type="success" v-if="scope.row.post_status == 1" close-transition>审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.post_status == 2" close-transition>审核失败</el-tag>
            <el-tooltip placement="right" effect="light" v-if="scope.row.istop==1">
              <div slot="content">已置顶</div>
              <i class="fa fa-arrow-circle-o-up" style="vertical-align:middle"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作" width="140">
          <template scope="scope">
            <el-button size="small" @click='go("News/AdminNewsManager/auditEdit/"+scope.row.id)'>编辑</el-button>
            <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete" :disabled="scope.row.post_status == 1"
            @click="fuzhi(scope.$index, scope.row)">删除
          </el-button>
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
          <div class="form-group">
            <el-select v-model="category" placeholder="审核状态" clearable>
              <el-option v-for="item in categoryArr" :label="item.label" :value="item.value"
              :key="item.value"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-cascader :options="termArr" @change="termChange" :show-all-levels="false" clearable filterable
            placeholder="归属栏目" change-on-select style="width:100%"></el-cascader>
          </div>
          <div class="form-group">
            <el-select v-model="topStatus" clearable placeholder="置顶状态">
              <el-option v-for="item in topStatusArr" :label="item.label" :value="item.value"
              :key="item.value"></el-option>
            </el-select>
          </div>
          <div class="form-group">
            <el-input v-model.trim="keyword" placeholder="新闻关键字"></el-input>
          </div>
          <div class="form-group">
            <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围"
            style="width:100%"></el-date-picker>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading"
        @click="searchSubmit()">确定
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
        <button type="button" class="btn btn-primary" @click="removeSubmit()">确定</button>
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
        <button type="button" class="btn btn-primary" @click="removeAllSubmit()">确定</button>
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
    "url": "/index.php?g=news&m=AdminNewsManager&a=auditList",
    "carrier": "DataArr",
    "params": {
      "p": 1,
      "audit": '',
      "term": '',
      "keyword": '',
      "istop": '',
      "start_time": '',
      "end_time": ''
    },
    "notAlert": true
  };
  export default {
    name: 'auditList',
    data() {
      return {
        temp: '',
        Loading: true,
        loading: false,
        nowPage: 1,
        allPage: 1,
        DataArr: [],
        selectedArr: [],
        category: '',
        term: '',
        termArr: [],
        topStatus: '',
        categoryArr: [{
          value: '1',
          label: '正在审核'
        }, {
          value: '2',
          label: '审核通过'
        }, {
          value: '3',
          label: '审核失败'
        }],
        topStatusArr: [{
          value: '1',
          label: '已置顶'
        }, {
          value: '2',
          label: '未置顶'
        }],
        keyword: '',
        dateRange: []
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
      //获取高级搜索中栏目列表
      bindSelect() {
        var _this = this;
        //请求接口 获得列表数据
        if (_this.termArr.length>0) {
          //如果有值,不再请求
          return;
        }

        var config = {
          "method": 'get',
          "url": '/index.php?g=news&m=AdminNewsManager&a=get_terms',
          "carrier": "termArr",
          "notLoading": true,
          "notAlert": true
        };
        _this.myHttp(config);
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
          "audit": _this.category,
          "term": _this.term[_this.term.length - 1]?_this.term[_this.term.length - 1]:'',
          "keyword": _this.keyword,
          "istop": _this.topStatus ? _this.topStatus : 0,
          "start_time":_this.dateRange[0]? _this.formatDate(_this.dateRange[0]):'',
          "end_time": _this.dateRange[1]?_this.formatDate(_this.dateRange[1]):''
        };
        _this.myHttp(initConfig, function (res) {
          //手动关闭确认框
          $('.modal').modal('hide');
          //搜索完成之后重新绑定数据列表
          _this.allPage = res.page;
        });
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
          url: '/index.php?g=news&m=AdminNewsManager&a=delete',
          params: {
            "ids": ids
          }
        };
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
      // 设置优先级
      setLevel(index, obj) {
        var _this = this;
        if (obj.id > 0) {
          //在rank值有效的情况下 发送请求
          var config = {
            method: 'get',
            url: '/index.php?g=news&m=AdminNewsManager&a=setlevel',
            params: {
              "id": obj.id,
              "listorder": obj.listorder
            },
            "notLoading": true
          };
          _this.myHttp(config);
        }else{
          this.$message({
            "message": "格式不正确!",
            "type": "error"
          });
        }
      },
      //全选/反选新闻
      handleSelectionChange(arr) {
        this.selectedArr = arr;
      },
      //选择term栏目时,更改当前term值
      termChange(val){
        this.term = val;
      },
      //顶部功能组
      setTop() {
        if (this.selectedArr.length > 0) {
          var _this = this;
          //确定选中的都是已经通过审核的新闻
          for (var i = 0; i < _this.selectedArr.length; i++) {
            if (_this.selectedArr[i].post_status != 1) {
              this.$message({
                message: '审核通过的新闻才能置顶!',
                type: 'info'
              });
              return false;
            }
          }
          ;
          //选中的新闻都是审核通过的,进行置顶
          var ids = [];
          this.selectedArr.forEach(function (item) {
            //将选中的新闻的id放入id数组
            ids.push(item.id);
          });
          var config = {
            method: 'get',
            url: '/index.php?g=news&m=AdminNewsManager&a=top',
            params: {
              "ids": ids,
              "top": 0
            }
          };
          _this.myHttp(config,function(){
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
      unsetTop() {
        if (this.selectedArr.length > 0) {
          //有选中值的情况
          var _this = this;
          var ids = [];

          this.selectedArr.forEach(function (item) {
            ids.push(item.id);
          });
          var config = {
            method: 'get',
            url: '/index.php?g=news&m=AdminNewsManager&a=top',
            params: {
              "ids": ids,
              "top": 1
            }
          };
          _this.myHttp(config,function(){
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
      checkAll() {
        if (this.selectedArr.length > 0) {
          //有选中值的情况
          var _this = this;
          var ids = [];
          this.selectedArr.forEach(function (item) {
            ids.push(item.id);
          });
          var config = {
            method: 'get',
            url: '/index.php?g=news&m=AdminNewsManager&a=audit',
            params: {
              "ids": ids,
              "check": 0
            }
          };
          _this.myHttp(config,function(){
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
      uncheckAll() {
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
            url: '/index.php?g=news&m=AdminNewsManager&a=audit',
            params: {
              "ids": ids,
              "check": 1
            }
          };
          _this.myHttp(config,function(){
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
      removeAllSubmit(){
        if (this.selectedArr.length > 0) {
          //有选中值的情况
          var _this = this;
         for(var i=0;i<this.selectedArr.length;i++){
            if(this.selectedArr[i].post_status!==1){
              //如果选项中存在审核通过的新闻,提示不能删除
              this.$message({
                "message": "选项中存在审核通过的新闻!",
                "type": "warning"
              });
              return false;
            }
          };
          _this.Loading = true;
          var ids = [];

          this.selectedArr.forEach(function (item) {
            ids.push(item.id);
          });

          var config = {
            method: 'get',
            url: '/index.php?g=news&m=AdminNewsManager&a=delete',
            params: {
              "ids": ids,
              "check": 0
            }
          };
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
      }
      //顶部功能组 ↑
      //清空搜索模态框的值
      // reset(){
      //   this.category='',
      //   this.term='',
      //   this.keyword='',
      //   this.topcode='',
      //   this.dateRange=''
      // }
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
    // mounted(){
    //   var _this=this;
    //   $('.modal').on('hidden.bs.modal', function () {
    //     _this.reset();
    //   });
    // }

  }
</script>
<style scoped>
a.disabled{
  pointer-events: none;
  color:black;
}
</style>
