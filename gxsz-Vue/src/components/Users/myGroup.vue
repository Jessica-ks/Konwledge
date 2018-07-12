<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">我的群组</h3>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAdd"><span class="glyphicon glyphicon-plus"></span> 添加群组</button>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive" >
          <el-table :data="DataArr" style="width: 100%" border >
            <el-table-column label="id" prop="value" width="70"></el-table-column>
            <el-table-column label="群组名称" prop="label"></el-table-column>
            <el-table-column label="成员数量" prop="count"></el-table-column>
            <el-table-column label="创建时间" prop="create_time" width="170"></el-table-column>
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
          <el-pagination v-if="allPage>1" layout="prev, pager, next"  @current-change="goPage" :current-page="nowPage" :page-count="allPage" class="pull-right"></el-pagination>
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <!-- /.col -->
    <!-- 添加笔记模态框 -->
    <div class="modal fade" id="modalAdd" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">添加群组</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':nowTitleTips}">
                <input type="text" class="form-control" placeholder="请输入群组名称" v-model.trim="nowTitle">
                <span class="help-block" style="text-align:center" v-show="nowTitleTips">{{nowTitleTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':targetTips}">
                <el-select v-model="per_label" @change="changePerson" filterable multiple remote  placeholder="请在下方选择人员..."></el-select>
                <span class="help-block" style="text-align:center" v-show="targetTips">{{targetTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':targetTips}">
                <el-cascader v-if="flag" :options="perTree" @active-item-change="handleItemChange" filterable @change="selectPerson"
                             style="width:100%;border-radius:0" placeholder="请选择人员..."></el-cascader>
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
    <!--  编辑模态框 -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">编辑群组</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':oldTitleTips}">
                <input type="text" class="form-control" placeholder="请输入群组名称" v-model.trim="oldTitle">
                <span class="help-block" style="text-align:center" v-show="oldTitleTips">{{oldTitleTips}}</span>
              </div>
               <div class="form-group" :class="{'has-error':targetTips}">
                <el-select v-model="per_label_edit" @change="changePersonEdit" filterable multiple remote  placeholder="请在下方选择人员..."></el-select>
                <span class="help-block" style="text-align:center" v-show="targetTips">{{targetTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':targetTips}">
                <el-cascader v-if="flag" :options="perTree" @active-item-change="handleItemChange" filterable @change="selectPersonEdit"
                             style="width:100%;border-radius:0" placeholder="请选择人员..."></el-cascader>
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
    "url": '/index.php?g=General&m=OperateGroup&a=getOperateGroupListsByUser',
    "carrier": "DataArr",
    "notAlert": true
  };
  export default{
    name: 'myNoteLists',
    data(){
      return {
        loading: false,
        Loading: true,
        nowPage: 1,
        allPage: 1,
        flag: true,
        DataArr: [],
        perArr: [],
        schArr: [],
        depArr: [],
        perTree:[],
        nowSch: [],
        nowDep: [],
        per_label: [],
        per_label_edit: [],
        nowPer: [],
        nowPerEdit: [],
        tempPerArr: [],
        tempPerArrEdit: [],
        nowTitle: '',
        nowTitleTips: '',
        oldTitle: '',
        oldTitleTips: '',
        targetTips: '',
        temp: '',
        index: ''
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
      handleItemChange(val) {
        //请求人员列表
        var _this = this;
        if (val.length == 2) {
          //选中了某个学校下的部门,获取学校,部门ID,发起请求获取人员列表
          var sch_id = val[0];
          var dept_id = val[1];
          //配置发送请求
          var configForPerson = {
            method: 'post',
            url: '/index.php?g=General&m=Common&a=get_people_list',
            params: {
              "sch_id": sch_id,
              "dept_id": dept_id
            },
            "carrier": "perArr",
            "notAlert": true,
            "notLoading":true
          };
          _this.myHttp(configForPerson, function () {
            //得到了对应的人员列表之后
            _this.perTree.forEach(function (sch) {
              sch.children.forEach(function (dep) {
                if (sch.value == sch_id && dep.value == dept_id) {
                  //找到对应的学校下的部门,插入人员列表
                  dep.children=_this.perArr?_this.perArr:[];
                }
              })
            })
          });
        }
      },
      //选择某个人员时,保存其value,然后把label放到右边input
      selectPerson(val) {
        var _this = this;
        var obj = {};
        //如果这个人已经在nowPer里了
        for(var i=0,len=_this.nowPer.length;i<len;i++){
              if(_this.nowPer[i]==val[2]){
                  return false;
              }
        };
        //把选中人员先用obj存起来再放到tempPerArr中
        _this.nowPer.push(val[2]);
        obj.value = val[2];
        _this.perArr.forEach(function (person) {
          //然后在人员列表中寻找对应val[2]的人员
          if (person.value == val[2]) {
            //向右侧已选人员input添加label
            _this.per_label.push(person.label);
            obj.label = person.label;
          }
        });
        //把前面记录的obj放到人员缓存数组
        _this.tempPerArr.push(obj);

      },
        //选择某个人员时,保存其value,然后把label放到右边input
      selectPersonEdit(val) {
        var _this = this;
        var obj = {};
        //如果这个人已经在nowPer里了
        for(var i=0,len=_this.nowPerEdit.length;i<len;i++){
              if(_this.nowPerEdit[i]==val[2]){
                  return false;
              }
        };
        //把选中人员先用obj存起来再放到tempPerArrEdit中
        _this.nowPerEdit.push(val[2]);
        obj.value = val[2];
        _this.perArr.forEach(function (person) {
          //然后在人员列表中寻找对应val[2]的人员
          if (person.value == val[2]) {
            //向右侧已选人员input添加label
            _this.per_label_edit.push(person.label);
            obj.label = person.label;
          }
        });
        //把前面记录的obj放到人员缓存数组
        _this.tempPerArrEdit.push(obj);

      },
      //添加已选人员发生变动时
      changePerson(leftPer) {
        //leftPer为剩下的人员
        var _this = this;
        //这个arr用来记录剩下人员的value
        var arr = [];
        if (leftPer.length - _this.tempPerArr.length < 0) {
          //表示此时人员减少
          leftPer.forEach(function (label) {
            _this.tempPerArr.forEach(function (per) {
              //找出剩下的人员
              if (per.label == label) {
                arr.push(per.value);
              }
            })
          });
          //重置nowPer数组
          _this.nowPer = arr;
        }
      },

      fuzhi(index, item){
        //复制当前操作对象
        var _this = this;
        _this.temp = item.value;
        _this.oldTitle = item.label;
        var arr = [], arrValue = [], arrLabel = [];
        item.users.forEach(function(obj){
          arrLabel.push(obj.label);
          arrValue.push(obj.value);
          arr.push(obj);
        });
        _this.per_label_edit = arrLabel;
        _this.nowPerEdit = arrValue;
        _this.tempPerArrEdit = arr;
      },
      //编辑已选人员发生变动时
      changePersonEdit(leftPer) {
        //leftPer为剩下的人员
        var _this = this;
        //这个arr用来记录剩下人员的value
        var arr = [];
        if (leftPer.length - _this.tempPerArrEdit.length < 0) {
          //表示此时人员减少
          leftPer.forEach(function (label) {
            _this.tempPerArrEdit.forEach(function (per) {
              //找出剩下的人员
              if (per.label == label) {
                arr.push(per.value);
              }
            })
          });
          //重置nowPerEdit数组
          _this.nowPerEdit = arr;
        }
      },
      addSubmit(){
        //上传添加表单
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "nowTitle",
            "reg": ["notnull"]
          }
        ]);
        _this.targetTips =  _this.nowPer.length == 0 ? '请至少选择一个成员!' : null;
        if (checkResult && !_this.targetTips) {
          //请求接口
          this.loading = true;
          var config = {
            "method": 'post',
            "url": '/index.php?g=General&m=OperateGroup&a=addOperateGroup',
            "params": {
              "title": _this.nowTitle,
              "group": _this.nowPer
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            _this.flag = false;
            //更新列表数据
            initConfig.params = {"p": _this.nowPage};
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
            "name": "oldTitle",
            "reg": ["notnull"]
          }
        ]);
         _this.targetTips =  _this.nowPerEdit.length == 0 ? '请至少选择一个成员!' : null;
        if (checkResult && !_this.targetTips) {
          _this.loading = true;
          var config = {
            "method": 'post',
            "url": '/index.php?g=General&m=OperateGroup&a=editOperateGroupUser',
            "params": {
              "note_id": _this.temp,
              "title": _this.oldTitle,
              "group": _this.nowPerEdit
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            _this.flag = false;
            //更新列表数据
            initConfig.params = {"p": _this.nowPage};
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
          "url": '/index.php?g=General&m=OperateGroup&a=delete',
          "params": {
            "id": _this.temp
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
            })
        })
      }
    },
    created()
    {
      var _this = this;
      //发起请求数据
      initConfig.params = {"p": _this.$route.params.num};
      _this.myHttp(initConfig,
        function (resp) {
          //绑定数据
          _this.nowPage=_this.$route.params.num-0;
          _this.allPage = resp.page;
        });
      var configForSch = {
        "method": 'get',
        "url": '/index.php?g=General&m=Common&a=get_all_school',
        "params":{
          "app_type":"doc"
        },
        "carrier": "schArr",
        "notAlert": true
      };
      var configForDep = {
        "method": 'get',
        "url": '/index.php?g=General&m=Common&a=get_dept_list',
        "params":{
          "app_type":"doc"
        },
        "carrier": "depArr",
        "notAlert": true
      };
      //请求接口获取学校列表
      _this.myHttp(configForSch,
        function () {
          //获取到学校列表之后
          _this.schArr.forEach(function (sch) {
            //为每一个学校新增一个children属性
            _this.$set(sch, 'children', []);
            //人员树中第一层(学校)赋值
            _this.perTree.push(sch);
          });
          //请求接口,获取部门列表
          _this.myHttp(configForDep,
            function () {
              //获取到部门列表之后
              _this.schArr.forEach(function (sch) {
                _this.depArr.forEach(function (dep) {
                  //再为每一个部门新增一个children属性
                  _this.$set(dep, 'children', []);
                  //人员树中的第二层(每个学校下的部门)
                  sch.children.push(dep);
                  //等待联级搜索框选中部门再请求人员列表
                });
              });
            });
        });
    }
    ,
    mounted()
    {
      var _this = this;
      $('.modal').on('hidden.bs.modal', function () {
        _this.resetData(["nowTitle", "per_label", 'temp','nowPer','tempPerArr']);
      });
      $('.modal').on('shown.bs.modal', function () {
        _this.flag = true;
      });
    }
  }
</script>
<style scoped>
</style>
