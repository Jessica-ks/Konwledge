<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">人员管理</h3>
          <div class="input-group  pull-left" style="margin-left:3px">
            <button type="button" class="btn btn-primary" v-if="selectedArr.length>0" data-toggle="modal" data-target="#modalDeleteAll">删除</button>
          </div>
          <div class="input-group pull-right" >
           <button type="button" @click="bindSelect" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px"><i class="fa fa-search" style="color:white" ></i> 高级搜索</button>
         </div><!-- /input-group -->
       </div>
       <!-- /.box-header -->
       <div class="box-body table-responsive">
         <el-table :data="DataArr" style="width: 100%"  @selection-change="handleSelectionChange">
           <el-table-column type="selection"></el-table-column>
           <el-table-column label="优先级" width="80">
             <template scope="scope">
               <!-- 这里的优先级显示需要先判断下有没有 -->
               <el-input v-model="scope.row.listorder" @blur="setLevel(scope.$index,scope.row )" :disabled="scope.row.status==0"></el-input>
             </template>
           </el-table-column>
             <!-- <el-table-column label="id" prop="id"></el-table-column> -->
           <el-table-column label="类别" prop="model_type"></el-table-column>
           <!-- <el-table-column label="标题" prop="model_name" ></el-table-column> -->
          <el-table-column label="标题">
           <template scope="scope">
             <a :href="'/gxsz_office/index.php?g=gxsz&m=Advance&a=adv_detail&id='+scope.row.id" :class='{"disabled":scope.row.status==0}' target="_blank" type="text" size="small">{{scope.row.model_name}}</a>
           </template>
           </el-table-column>
           <el-table-column label="填入时间" prop="time" width="105"></el-table-column>
           <el-table-column label="操作"  width="220">
             <template scope="scope">
               <el-button size="small" v-if="scope.row.status == 0" @click='changeStatus(scope.$index, scope.row)'>已隐藏</el-button>
               <el-button size="small" v-if="scope.row.status == 1" type="success" @click='changeStatus(scope.$index, scope.row)'>已显示</el-button>
               <el-button size="small" @click='go("News/AdminSzModels/edit/"+scope.row.id)'>编辑</el-button>
               <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete" :disabled="scope.row.status == 1" @click="fuzhi(scope.$index, scope.row)">删除</el-button>
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
             <div class="form-group" >
              <el-select v-model.trim="term" placeholder="分类" clearable filterable>
                <el-option v-for="item in termArr" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
              <!-- <el-cascader :options="termArr" @change="termChange" :show-all-levels="false" clearable filterable change-on-select style="width:100%"></el-cascader> -->
            </div>
            <div class="form-group">
              <el-input v-model.trim="keyword" placeholder="标题关键字"></el-input>
            </div>
            <div class="form-group">
             <el-date-picker v-model="dateRange" type="daterange" placeholder="选择日期范围"  style="width:100%">
             </el-date-picker>
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
    "url": "/index.php?g=news&m=AdminSzModels&a=lists",
    "carrier": "DataArr",
    "params": {
        "p": 1,
        "model_type": '',
        "keyword": '',
        "start_time": '',
        "end_time": ''
    },
    "notAlert": true
};
export default {
        name:'adminSzModels',
        data() {
            return {
                temp: '',
                Loading: true,
                loading: false,
                nowPage: 1,
                allPage: 1,
                DataArr: [],
                selectedArr: [],
                term: '',
                termArr: [],
                keyword: '',
                dateRange: []
            }
        },
        methods: {
            goPage(num) {
                //页面跳转
                var _this = this;
                //记录当前页面
                _this.nowPage = num;
                //切换路由
                _this.go(_this.$route.path, num);
                //加载对应页面的列表
                initConfig.params.p = _this.nowPage;
                //重新绑定数据
                _this.myHttp(initConfig,
                function(res) {
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
                    "url": '/index.php?g=News&m=AdminSzModels&a=getTermList',
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
            // 设置优先级
            setLevel(index, obj) {
                var _this = this;
                if (obj.id > 0) {
                    //在rank值有效的情况下 发送请求
                    var config = {
                        method: 'get',
                        url: '/index.php?g=News&m=AdminSzModels&a=setlevel',
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
            //高级搜索
            searchSubmit() {
                //请求接口 获得列表数据
                var _this = this;
                _this.loading = true;
                _this.Loading = true;
                //改变查询条件
                initConfig.params = {
                    "model_type": _this.term,
                    "keyword": _this.keyword,
                    "start_time": _this.dateRange[0] ? _this.formatDate(_this.dateRange[0]) : '',
                    "end_time": _this.dateRange[1] ? _this.formatDate(_this.dateRange[1]) : ''
                };
                _this.myHttp(initConfig,
                function(res) {
                    //手动关闭确认框
                    $('.modal').modal('hide');
                    //搜索完成之后重新绑定数据列表
                    _this.allPage = res.page;
                });
            },
            //单击删除
            removeSubmit() {
                var _this = this;
                //需要删除的id数组
                var ids = [];
                ids[0] = _this.temp;
                _this.loading = true;
                var config = {
                    method: 'get',
                    url: '/index.php?g=News&m=AdminSzModels&a=delete',
                    params: {
                        "id": ids
                    }
                };
                _this.myHttp(config,
                function() {
                    //手动关闭确认框
                    $('.modal').modal('hide');
                    //删除某条信息之后,如果当前页已经没有项目了,转至最后一页
                    initConfig.params.p = _this.nowPage > _this.allPage ? _this.allPage: _this.nowPage;
                    //更新列表数据
                    _this.myHttp(initConfig,
                    function(resp) {
                        //初始化数据
                        _this.allPage = resp.page;
                    })
                });
            },
            //全选/反选
            handleSelectionChange(arr) {
                this.selectedArr = arr;
            },
            //选择term栏目
            termChange(val) {
                this.term = val;
            },
            //切换显示/隐藏状态
            changeStatus(index, obj) {
                var _this = this;

                var config = {
                    method: 'get',
                    url: '/index.php?g=News&m=AdminSzModels&a=hidden',
                    params: {
                        "id": obj.id,
                        "status": obj.status
                    }
                };
                _this.myHttp(config,
                function() {
                    //更新列表
                    _this.myHttp(initConfig)
                })
            },
            removeAllSubmit() {
                if (this.selectedArr.length > 0) {
                    //有选中值的情况
                    var _this = this;
                    _this.Loading = true;
                    var ids = [];
                    this.selectedArr.forEach(function(item) {
                        ids.push(item.id);
                    });
                    var config = {
                        method: 'get',
                        url: '/index.php?g=News&m=AdminSzModels&a=delete',
                        params: {
                            "id": ids,
                        }
                    };
                    _this.myHttp(config,
                    function() {
                        //记得手动把模态框隐藏
                        $('.modal').modal('hide');
                        //删除之后,如果当前页已经没有项目了,转至最后一页
                        initConfig.params.p = _this.nowPage > _this.allPage ? _this.allPage: _this.nowPage;
                        _this.myHttp(initConfig,
                        function(res) {
                            _this.allPage = res.page;
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
            initConfig.params = {
                "p": _this.$route.params.num
            };
            _this.myHttp(initConfig,
            function(resp) {
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
