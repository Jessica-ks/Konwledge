<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">思政文件</h3>
          <div class="input-group  pull-left" style="margin-left:3px">
            <el-upload class="upload-demo" style="display:inline-block;margin-left:20px" action="/gxsz_office/index.php?g=CloudStorage&m=AdminFiles&a=storageUpload" :data="{'pid':1}" :show-file-list="false" :on-success="importFile"
            :file-list="fileArr">
            <button  class="btn btn-primary" ><span class="glyphicon glyphicon-upload"></span> 上传文件</button>
          </el-upload>
          <button type="button" class="btn btn-primary" v-if="selectedArr.length>0" data-toggle="modal" data-target="#modalDeleteAll" style="margin-left:10px">删除</button>
        </div>
        <div class="input-group pull-right" >
         <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px"><i class="fa fa-search" style="color:white" ></i> 高级搜索</button>
       </div><!-- /input-group -->
     </div>
     <!-- /.box-header -->
     <div class="box-body table-responsive">
       <el-table :data="DataArr" style="width: 100%"  @selection-change="handleSelectionChange" >
         <el-table-column type="selection" width="50"></el-table-column>
        <!--  <el-table-column label="ID" prop="id" ></el-table-column> -->
         <el-table-column label="文件名" prop="filename" ></el-table-column>
         <el-table-column label="类型" prop="type" ></el-table-column>
         <el-table-column label="发布人" prop="username"></el-table-column>
         <el-table-column label="大小" prop="size" ></el-table-column>
         <el-table-column label="下载量" prop="dltimes" ></el-table-column>
         <el-table-column label="修改时间" prop="time" width="160"></el-table-column>
         <el-table-column label="操作"  width="180" prop="download">
          <template scope="scope">
            <el-button size="small" data-toggle="modal" data-target="#modalEdit" @click="fuzhi(scope.$index, scope.row)">编辑</el-button>
            <a @click="loadFile(scope.$index, scope.row)" :href="load_File" target="_blank" type="button" class="btn btn-primary" style="width:44px;font-size:12px;padding:0;line-height:25px;"  v-show="scope.row.download==1">下载</a>
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
             <div class="row">
               <div class="col-md-12 col-sm-12 col-xs-12" >
                <div class="form-group" :class="{'has-error':oldNameTips,'has-success':oldNameTips}">
                  <input type="text" class="form-control" placeholder="文件名称" v-model.trim="oldName">
                  <span class="help-block" style="text-align:center" v-show="oldNameTips">{{oldNameTips}}</span>
                </div>
              </div>
            </div>
            <div class="row">
             <div class="col-md-12 col-sm-12 col-xs-12" >
              <div class="form-group">
               <el-select v-model.trim="nowSch" placeholder="请选择学校"  clearable filterable multiple>
                  <el-option v-for="item in schArr" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </div>
             </div>
            </div>
            <div class="row">
             <div class="col-md-12 col-sm-12 col-xs-12" >
              <div class="form-group">
               <el-select v-model.trim="nowDep" placeholder="请选择部门"  clearable filterable multiple>
                  <el-option v-for="item in depArr" :label="item.label" :value="item.value" :key="item.value"></el-option>
                </el-select>
              </div>
             </div>
            </div>
             <div class="row">
             <div class="col-md-12 col-sm-12 col-xs-12" >
              <div class="form-group">
                <el-select v-model="per_label" @change="changePerson" filterable multiple remote placeholder="请在下方选择人员..."></el-select>
              </div>
             </div>
            </div>
            <div class="row">
             <div class="col-md-12 col-sm-12 col-xs-12" >
              <div class="form-group">
                 <el-cascader v-if="flag" :options="perTree" @active-item-change="handleItemChange" filterable @change="selectPerson"
                             style="width:100%;border-radius:0" placeholder="请选择人员..."></el-cascader>
              </div>
             </div>
            </div>
            <div class="row">
             <div class="col-md-4 col-sm-12 col-xs-12" >
              <div class="form-group" style="margin-left:10px">
                <label> 可见</label>
                <div class="input-group radio-height">
                  <el-switch v-model="isAccess" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否"></el-switch>
                </div>
              </div>
             </div>
             <div class="col-md-4 col-sm-12 col-xs-12" >
              <div class="form-group" style="margin-left:10px">
               <label> 下载</label>
                <div class="input-group radio-height">
                  <el-switch v-model="isLoad" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否"></el-switch>
                </div>
              </div>
             </div>
             <div class="col-md-4 col-sm-12 col-xs-12" >
              <div class="form-group" style="margin-left:10px">
               <label> 编辑</label>
                <div class="input-group radio-height">
                  <el-switch v-model="isEdit" on-color="#13ce66" off-color="#ff4949" on-text="是" off-text="否"></el-switch>
                </div>
              </div>
             </div>
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
    "url": "/index.php?g=CloudStorage&m=AdminFiles&a=publicFile",
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
        flag: true,
        DataArr: [],
        Loading: true,
        loading: false,
        searchObj:'',
        selectedArr: [],
        dateRange:'',
        oldName:'',
        oldNameTips:'',
        schArr:[],
        nowSch:'',
        depArr:[],
        perArr:[],
        nowDep:'',
        perTree:[],
        per_label: [],
        tempPerArr: [],
        nowPer: [],
        fileArr:[],
        isAccess:true,
        isLoad:true,
        isEdit:false,
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
      //选择某个人员时,保存其value,然后把label放到上边input
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
      //右侧已选人员发生变动时
      changePerson(leftPer) {
        //leftPer为剩下的人员
        var _this = this;
        //这个arr用来记录剩下人员的value
        var arr = [];
        if ( leftPer && (leftPer.length - _this.tempPerArr.length < 0)) {
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
      //高级搜索
      searchSubmit() {
        //请求接口 获得列表数据
        var _this = this;
        _this.loading = true;
        _this.Loading = true;
        //改变查询条件
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
            "url": '/index.php?g=CloudStorage&m=AdminFiles&a=fileEdit',
            "params": {
              'id': _this.temp,
              'pid':1,
              'filename': _this.oldName,
              'sch_id': _this.nowSch,
              'group_id':_this.nowDep,
              'user_id':_this.nowPer,
              'edit':_this.isEdit?1:0,
              'access':_this.isAccess?1:0,
              'download':_this.isLoad?1:0
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            _this.flag = false;
            initConfig.params.p = _this.nowPage;
            //更新列表数据
            _this.myHttp(initConfig)
          })
        }
      },
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
          var str="/gxsz_office/index.php?g=CloudStorage&m=AdminFiles&a=storageDownload";
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
      initConfig.params = {"page": _this.$route.params.num};
      _this.myHttp(initConfig,
        function (resp) {
          //绑定数据
          _this.nowPage = _this.$route.params.num - 0;
          _this.allPage = resp.page;
        });

      var configForSch = {
        "method": 'get',
        "url": '/index.php?g=General&m=Common&a=get_all_school',
        "carrier": "schArr",
        "notAlert": true
      };
      var configForDep = {
        "method": 'get',
        "url": '/index.php?g=General&m=Common&a=get_dept_list',
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
    },
    mounted()
    {
      var _this = this;
      $('.modal').on('hidden.bs.modal', function () {
        _this.resetData(["oldName", "nowDep", "per_label"]);
        _this.isEdit=false;
      });
       $('.modal').on('shown.bs.modal', function () {
        _this.flag = true;
        _this.per_label = [];
      });
    }
  }
</script>
<style scoped>
</style>
