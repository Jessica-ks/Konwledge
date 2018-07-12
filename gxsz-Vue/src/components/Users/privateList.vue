<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">个人通讯录</h3>

          <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入姓名..." @keyup.enter='searchSubmit(searchWord)'
                   v-model.trim="searchWord">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="searchSubmit(searchWord)"><i
                class="fa fa-search"></i></button>
            </span>
          </div><!-- /input-group -->
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAdd"
                  style="margin-right:10px"><span class="glyphicon glyphicon-plus"></span> 添加联系人
          </button>
          <span v-show="isShowResult"
                style="float: right;margin-right: 40px;font-size: 18px;font-weight:bold">查询结果如下</span>
        </div>


        <!-- /.box-header -->
        <div class="box-body table-responsive">
          <el-table :data="DataArr" style="width: 100%" border>
            <el-table-column label="id" prop="id" width="60"></el-table-column>
            <el-table-column label="姓名" prop="name" width="160"></el-table-column>
            <el-table-column label="手机号" prop="phone"></el-table-column>
            <el-table-column label="工作电话" prop="officephone"></el-table-column>
            <el-table-column label="Email" prop="email" width="260"></el-table-column>
            <el-table-column label="分组" prop="group" width="75">
              <template scope="scope">
                <el-tag :type="'primary'" v-if="scope.row.group" close-transition>{{scope.row.group}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template scope="scope">
                <el-button size="small" data-toggle="modal" data-target="#modalEdit"
                           @click="fuzhi(scope.$index, scope.row)">编辑
                </el-button>
                <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete"
                           @click="fuzhi(scope.$index, scope.row)">删除
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
          <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"
                         :page-count="allPage" class="pull-right"></el-pagination>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <!-- /.col -->
    <!-- 添加模态框 -->
    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">添加联系人</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':nowNameTips,'has-success':nowNameTips}">
                <input type="text" class="form-control" placeholder="姓名" v-model.trim="nowName">
                <span class="help-block" style="text-align:center" v-show="nowNameTips">{{nowNameTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':nowPhoneTips,'has-success':nowPhoneTips}">
                <input type="text" class="form-control" placeholder="手机号" v-model.trim="nowPhone">
                <span class="help-block" style="text-align:center" v-show="nowPhoneTips">{{nowPhoneTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':nowOfficePhoneTips,'has-success':nowOfficePhoneTips}">
                <input type="text" class="form-control" placeholder="工作电话" v-model.trim="nowOfficePhone">
                <span class="help-block" style="text-align:center"
                      v-show="nowOfficePhoneTips">{{nowOfficePhoneTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':nowEmailTips,'has-success':nowEmailTips}">
                <input type="text" class="form-control" placeholder="邮箱" v-model.trim="nowEmail">
                <span class="help-block" style="text-align:center" v-show="nowEmailTips">{{nowEmailTips}}</span>
              </div>
              <div class="form-group">
                <el-select v-model="nowTerm" placeholder="请选择分类">
                  <el-option v-for="item in termArr" :label="item.title" :value="item.title"
                             :key="item.title"></el-option>
                </el-select>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addSubmit()" v-loading="loading" :disabled="loading">
              确定
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
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
            <h3 class="modal-title">编辑联系人</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':oldNameTips,'has-success':oldNameTips}">
                <input type="text" class="form-control" placeholder="姓名" v-model.trim="oldName">
                <span class="help-block" style="text-align:center" v-show="oldNameTips">{{oldNameTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':oldPhoneTips,'has-success':oldPhoneTips}">
                <input type="text" class="form-control" placeholder="手机号" v-model="oldPhone">
                <span class="help-block" style="text-align:center" v-show="oldPhoneTips">{{oldPhoneTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':oldOfficePhoneTips,'has-success':oldOfficePhoneTips}">
                <input type="text" class="form-control" placeholder="工作电话" v-model="oldOfficePhone">
                <span class="help-block" style="text-align:center"
                      v-show="oldOfficePhoneTips">{{oldOfficePhoneTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':oldEmailTips,'has-success':oldEmailTips}">
                <input type="text" class="form-control" placeholder="邮箱" v-model="oldEmail">
                <span class="help-block" style="text-align:center" v-show="oldEmailTips">{{oldEmailTips}}</span>
              </div>
              <div class="form-group">
                <el-select v-model="oldTerm" placeholder="请选择分类">
                  <el-option v-for="item in termArr" :label="item.title" :value="item.title"
                             :key="item.title"></el-option>
                </el-select>
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
    "url": "/index.php?g=office&m=useraddress&a=lists",
    "carrier": "DataArr",
    "params": {
      "p": 1,
      "searchWord": ''
    },
    "notAlert": true
  };
  export default{
    name: 'privateList',
    data(){
      return {
        loading: false,
        Loading: true,
        nowPage: 1,
        allPage: 1,
        isShowResult: false,
        DataArr: [],
        termArr: [],
        searchWord: '',
        temp: '',
        nowName: '',
        nowNameTips: '',
        nowPhone: '',
        nowPhoneTips: '',
        nowOfficePhone: '',
        nowOfficePhoneTips: '',
        nowEmail: '',
        nowEmailTips: '',
        nowTerm: '',
        oldName: '',
        oldNameTips: '',
        oldPhone: '',
        oldPhoneTips: '',
        oldOfficePhone: '',
        oldOfficePhoneTips: '',
        oldEmail: '',
        oldEmailTips: '',
        oldTerm: ''
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
      fuzhi(index, obj){
        //复制当前操作对象的数据
        this.temp = obj.id;
        this.oldName = obj.name;
        this.oldPhone = obj.phone;
        this.oldOfficePhone = obj.officephone;
        this.oldEmail = obj.email;
        this.oldTerm = obj.group;
      },
      addSubmit(){
        //上传添加表单
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "nowName",
            "reg": ["notnull"]
          },
          {
            "name": "nowPhone",
            "reg": ["notnull", "phone"]
          },
          {
            "name": "nowOfficePhone",
            "reg": ["officephone"]
          },
          {
            "name": "nowEmail",
            "reg": ["email"]
          }
        ]);
        if (checkResult) {
          //请求接口
          this.loading = true;
          var config = {
            "method": 'post',
            "url": '/index.php?g=office&m=useraddress&a=addPost',
            "params": {
              'name': _this.nowName,
              'phone': _this.nowPhone,
              'email': _this.nowEmail,
              'officePhone': _this.nowOfficePhone,
              'address': _this.nowEmail,
              'group': _this.nowTerm
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            //更新列表数据
            initConfig.params.p = _this.nowPage;
            _this.myHttp(initConfig,
              function (resp) {
                //初始化数据
                _this.allPage = resp.page;
              })
          })
        }
      },
      editSubmit(){
        //上传修改表单
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "oldName",
            "reg": ["notnull"]
          },
          {
            "name": "oldPhone",
            "reg": ["notnull", "phone"]
          },
          {
            "name": "oldOfficePhone",
            "reg": ["officephone"]
          },
          {
            "name": "oldEmail",
            "reg": ["email"]
          }
        ]);
        if (checkResult) {
          _this.loading = true;
          var config = {
            "method": 'post',
            "url": '/index.php?g=office&m=useraddress&a=editPost',
            "params": {
              'id': _this.temp,
              'name': _this.oldName,
              'phone': _this.oldPhone,
              'email': _this.oldEmail,
              'office_phone': _this.oldOfficePhone,
              'group': _this.oldTerm
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            initConfig.params.p = _this.nowPage;
            //更新列表数据
            _this.myHttp(initConfig)
          })
        }
      },
      removeSubmit(){
        //确定删除
        var _this = this;
        _this.loading = true;
        var config = {
          "method": 'get',
          "url": '/index.php?g=office&m=useraddress&a=delete',
          "params": {
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
        })
      },
      searchSubmit(wd){
        var _this = this;
        _this.loading = true;
        wd ? _this.isShowResult = true : _this.isShowResult = false;
        initConfig.params = {
          "p": 1,
          "search_key": wd
        };
        _this.myHttp(initConfig, function (resp) {
//            if(_this.allPage>resp.page){
//                //如果查询的结果总页码数小于当前页码总数,会造成goPage()重复执行.这个问题有待解决←←←←←←←←←←←←←←←
//              return false;
//            }
          _this.allPage = resp.page;
        });
      }
    },
    created(){
      var _this = this;
      //发起请求数据
      //根据路由来确定初始页
      initConfig.params = {"p": _this.$route.params.num};
      _this.myHttp(initConfig,
        function (resp) {
          //绑定数据
          _this.nowPage = _this.$route.params.num - 0;
          _this.allPage = resp.page;
          //请求接口分组数据
          var config = {
            "method": 'get',
            "url": '/index.php?g=office&m=useraddress&a=get_groups',
            "notAlert": true,
            "carrier": "termArr",
            "notLoading": true
          };
          _this.myHttp(config)
        });
    },
    mounted(){
      var _this = this;
      $('.modal').on('hidden.bs.modal', function () {
        _this.resetData(["nowName", "nowPhone", "nowOfficePhone", "nowEmail", "nowTerm", "temp", "oldName", "oldPhone", "oldOfficePhone", "oldEmail", "oldTerm"]);
      });
    }
  }
</script>
<style scoped>
  .box-header .input-group {
    width: 200px;
    float: right;
  }
</style>
