<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">新闻编辑</h3>
          <div class="input-group  pull-left" style="margin-left:3px">
          <button type="button" class="btn btn-primary" v-if="selectedArr.length>0" data-toggle="modal" data-target="#modalDeleteAll" style="margin-left:10px">删除</button>
        </div>
        <div class="input-group pull-right" >
         <button type="button" @click="bindSelect" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px"><i class="fa fa-search" style="color:white" ></i> 高级搜索</button>
       </div><!-- /input-group --> 
     </div>
     <!-- /.box-header -->
     <div class="box-body table-responsive">
       <el-table :data="DataArr" style="width: 100%"  @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="35"></el-table-column>
         <el-table-column label="ID" prop="id"  width="70"></el-table-column>
         <el-table-column label="用户名" prop="user_login" width="160" show-overflow-tooltip></el-table-column>
         <el-table-column label="姓名" prop="user_nicename" width="140" show-overflow-tooltip></el-table-column>
         <el-table-column label="学校" prop="sch_name"  show-overflow-tooltip ></el-table-column>  
         <el-table-column label="负责模块" prop="term" show-overflow-tooltip></el-table-column>
         <el-table-column label="手机号" prop="user_phone" width="160"></el-table-column> 
         <el-table-column label="操作"  width="140">
           <template scope="scope">
             <el-button size="small" data-toggle="modal" data-target="#modalEdit" @click="fuzhi(scope.$index, scope.row)">编辑</el-button>
             <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete" @click="fuzhi(scope.$index, scope.row)">删除</el-button> 
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
                <el-input v-model.trim="login_name" placeholder="用户名"></el-input>
              </div>
          </div>
          <div class="row">
              <div class="form-group">
                <el-input v-model.trim="real_name" placeholder="姓名"></el-input>
              </div>
          </div>
          <div class="row">
             <div class="form-group" >
              <el-select v-model.trim="school" placeholder="学校"  clearable filterable>
                <el-option v-for="item in sch_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
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
<!-- 模块分配模态框 -->
<div class="modal fade" id="modalEdit" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">模块分配</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
             <div class="form-group">
            <el-select v-model="term_label" @change="removeTerm" filterable multiple remote placeholder="请在下方选择栏目...">
            </el-select>
           </div>
         <!--   <div class="form-group" >
            <el-cascader :options="termArr" :show-all-levels="false" change-on-select filterable @change="addTerm" style="width:100%;border-radius:0" placeholder="请选择栏目"></el-cascader>
           </div> -->
             <div class="form-group" >
              <el-select v-model.trim="selectedTerm" placeholder="栏目"  clearable filterable @change="termChange">
                <el-option v-for="item in termArr" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>
          </div>  
          </div>
      </form>
    </div>
    <div class="modal-footer">
      <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="editSubmit()">确定</button>
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
    "url": "/index.php?g=Privilege&m=AdminPrivilege&a=getAuditList",
    "carrier": "DataArr",
    "params": {
        "p": 1,
        "user_login": '',
        "user_nicename": '',
        "school": ''
    },
    "notAlert": true
};
export default {
        name:
        'newsEditList',
        data() {
            return {
                temp: '',
                nowPage: 1,
                allPage: 1,
                DataArr: [],
                Loading: true,
                loading: false,
                searchObj: '',
                selectedArr: [],
                login_name: '',
                real_name: '',
                status: '',
                school: '',
                sch_list: [],
                term: [],
                selectedTerm:'',
                termArr: [],
                term_label:[]
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
            //获取选项的值
            bindSelect() {
                // 请求接口 获得列表数据
                if (this.sch_list.length > 0) {
                    //如果有值,不再请求
                    return;
                };
                var _this = this;
                var configForSch = {
                    "method": 'get',
                    "url": '/index.php?g=General&m=Common&a=get_all_school',
                    "carrier": "sch_list",
                    "notAlert": true
                };
                _this.myHttp(configForSch);
            },
            fuzhi(index, obj) {
              var arr=[];
              var tempTerm;
              var tempVal=[];
              var _this=this;
                //把当前的操作对象改为obj
                this.temp = obj.id;
                //记录当前已有的栏目
                tempTerm=obj.term.split(',');
              for(var i=0;i<tempTerm.length;i++){
                //往label那边push,以便展示term文本
                  arr.push(tempTerm[i]);
                  //往term那边push,以便保存当前已有的term
                  _this.termArr.forEach(function(item){
                    if(item.label==tempTerm[i]){
                      tempVal.push(item.value)
                    }
                  });
              };
              this.term=tempVal;
              this.term_label=arr;
              },
              termChange(val){
                var _this=this;
                _this.termArr.forEach(function(item){
                  if(item.value==val&&_this.term.indexOf(val)===-1){
                    _this.term_label.push(item.label);_this.term.push(val);
                  }
                });
                
              },
            //高级搜索
            searchSubmit() {
                //请求接口 获得列表数据
                var _this = this;
                _this.loading = true;
                _this.Loading = true;
                //改变查询条件
                initConfig.params = {
                    'user_login': _this.login_name,
                    "user_nicename": _this.real_name,
                    'school': _this.school
                };
                _this.myHttp(initConfig,
                function(res) {
                    //手动关闭确认框
                    $('.modal').modal('hide');
                    //搜索完成之后重新绑定数据列表
                    _this.allPage = res.page;
                });
            },
            editSubmit(){
        //上传修改表单
          var _this = this;
          _this.loading = true;
          var config = {
            "method": 'post',
            "url": '/index.php?g=Privilege&m=AdminPrivilege&a=auditEdit',
            "params": {
              "id": _this.temp,
              "term": _this.term,
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            //更新列表数据
            initConfig.params = {"p": _this.nowPage};
            _this.myHttp(initConfig)
          })
      },
            //修改新闻所属栏目
            addTerm(val) {
                var _this = this;
                if (!val) return false;
                var termValue = val[val.length - 1];
                if (_this.term.indexOf(termValue) != -1) {
                    //如果选择的栏目已经有了,停止
                    return false;
                };
                //term数组中添加新的term,label数组中添加对应的文本
                _this.term.push(termValue);
                _this.termArr.forEach(function(termObj) {
                    if (termObj.value == termValue) {
                        _this.term_label.push(termObj.label)
                    }
                });
            },
            //删除新闻所属栏目
            removeTerm(labels) {
                var _this = this;
                //用来暂时保存剩下的栏目
                var tempArr = [];
                if (labels.length - _this.term.length < 0) {
                    //此时栏目减少
                    labels.forEach(function(label) {
                        //找出剩下的栏目
                        _this.termArr.forEach(function(termObj) {
                            if (termObj.label == label) {
                                tempArr.push(termObj.value);
                            }
                        });
                    });
                    _this.term = tempArr;
                }
            },
            //单击删除
            removeSubmit() {
                var _this = this;
                //需要删除的新闻id数组
                var ids = [];
                ids[0] = _this.temp;
                _this.loading = true;
                var config = {
                    method: 'get',
                    url: '/index.php?g=Privilege&m=AdminPrivilege&a=auditDelete',
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
            handleSelectionChange(val) {
                this.selectedArr = val;
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
                        url: '/index.php?g=Privilege&m=AdminPrivilege&a=auditDelete',
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
                } else {
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
            //请求term
            var configForTerm = {
                "method": 'get',
                "url": '/index.php?g=news&m=AdminNewsManager&a=get_terms',
                "carrier": "termArr",
                "notAlert": true
            };
            _this.myHttp(initConfig,
            function(resp) {
                //绑定数据
                _this.nowPage = _this.$route.params.num - 0;
                _this.allPage = resp.page;
                var arr=[];
                //绑定人员列表完毕之后,获取term
                _this.myHttp(configForTerm,
                function() {
                    //获取到栏目列表之后,把所有的栏目以对象的形式放到数组里,方便后面操作
                    _this.termArr.forEach(function(item) {
                      delete _this.termArr.children;
                        arr.push(item);
                        // item.children.forEach(function(subitem) {
                        //     _this.termArr.push(subitem)
                        // });
                    });
                    _this.termArr=arr;

                });
            })
        },
        mounted(){
          var _this=this;
          $('.modal').on('hidden.bs.modal', function () {

            _this.term_label=[];
          });
        }
    }
</script>
<style scoped>
</style>
