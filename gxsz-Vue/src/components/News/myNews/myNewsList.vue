<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">我的新闻</h3>
          <div class="input-group pull-right">
            <button type="button" class="btn btn-primary" data-toggle="modal" @click="bindSelect"
            data-target="#modalSearch" style="margin-right:10px"><i class="fa fa-search"
            style="color:white"></i> 高级搜索
          </button>
        </div>
      </div>
      <div class="box-body table-responsive">
        <el-table :data="DataArr" style="width: 100%">
          <el-table-column label="id" prop="id" width="70"></el-table-column>
          <el-table-column label="标题" prop="post_title">
           <template scope="scope">
             <a :href="'/gxsz_office/index.php?g=gxsz&m=NewsList&a=newsdetail&id='+scope.row.id" :class='{"disabled":scope.row.post_status!= 1}'  target="_blank" type="text" size="small">{{scope.row.post_title}}</a>
           </template>
         </el-table-column>
         <el-table-column label="分类" prop="post_term" ></el-table-column>
         <el-table-column label="点击量" prop="post_hits" width="80"></el-table-column>
         <el-table-column label="投稿时间" prop="post_date" width="105"></el-table-column>
         <el-table-column label="状态" prop="address" width="80">
          <template scope="scope" >
            <el-tag type="warning" v-if="scope.row.post_status == 0" close-transition>正在审核</el-tag>
            <el-tag type="success" v-if="scope.row.post_status == 1" close-transition>审核通过</el-tag>
            <el-tag type="danger" v-if="scope.row.post_status == 2" close-transition>审核失败</el-tag>
            <el-tooltip placement="right" effect="light" v-if="scope.row.istop==1">
              <div slot="content">已置顶</div>
              <i class="fa fa-arrow-circle-o-up" style="vertical-align:middle"></i>
            </el-tooltip>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="140">
          <template scope="scope">
            <el-button size="small" @click='go("News/myNewslist/newsEdit/"+scope.row.id)'
            :disabled="scope.row.post_status == 1">编辑
          </el-button>
          <el-button size="small" type="danger" data-toggle="modal" :disabled="scope.row.post_status == 1"
          data-target="#modalDelete" @click="fuzhi(scope.$index, scope.row)">删除
        </el-button>
      </template>
    </el-table-column>
  </el-table>
  <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"  :page-count="allPage" class="pull-right"></el-pagination>
</div>
</div>
</div>
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
            <el-input v-model.trim="keyword" placeholder="新闻关键字"></el-input>
          </div>
          <div class="form-group">
            <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围" style="width:100%">
            </el-date-picker>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" @click="searchSubmit()">确定</button>
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
    "url": "/index.php?g=news&m=AdminNews&a=myNewslist",
    "carrier": "DataArr",
    "params": {
      "p": 1,
      "audit": '',
      "term": '',
      "keyword": '',
      "start_time": '',
      "end_time": ''
    },
    "notAlert": true
  };
  export default{
    name: 'myNewsList',
    data() {
      return {
        temp: '',
        nowPage: 1,
        allPage: 1,
        DataArr: [],
        Loading: true,
        loading: false,
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
      //获取选项的值
      bindSelect(){
        var _this = this;
        //请求接口 获得列表数据
        if (_this.termArr.length > 0) {
          //如果有值,不再请求
          return;
        }
        var config = {
          "method": 'get',
          "url": '/index.php?g=news&m=AdminNews&a=get_terms',
          "carrier": "termArr",
          "notLoading": true,
          "notAlert": true
        };
        _this.myHttp(config);
      },
      fuzhi(index, obj){
        //把当前的操作对象改为obj
        this.temp = obj.id;
      },
      //高级搜索
      searchSubmit(){
        //请求接口 获得列表数据
        var _this = this;
        _this.loading = true;
        _this.Loading = true;
        //改变查询条件
        initConfig.params = {
          "audit": _this.category,
          "term": _this.term[_this.term.length - 1]?_this.term[_this.term.length - 1]:'',
          "keyword": _this.keyword,
          "start_time": _this.dateRange[0] ? _this.formatDate(_this.dateRange[0]) : '',
          "end_time": _this.dateRange[1] ? _this.formatDate(_this.dateRange[1]) : ''
        };
        _this.myHttp(initConfig, function (res) {
          //手动关闭确认框
          $('.modal').modal('hide');
          //搜索完成之后重新绑定数据列表
          _this.allPage = res.page;
        });
      },
      //删除
      removeSubmit(){
        var _this = this;
        _this.loading = true;
        var config = {
          method: 'get',
          url: '/index.php?g=news&m=AdminNews&a=delete',
          params: {
            "id": _this.temp
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
      //选择term栏目时,更改当前term值
      termChange(val){
        this.term = val;
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
a.disabled{
  pointer-events: none;
  color:black;
}
</style>
