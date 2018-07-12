<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">用户信息</h3>
          <div class="input-group  pull-left" style="margin-left:3px">
           <!--  <a  :href="expExcel" target="_blank" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExport"><span class="glyphicon glyphicon-export"></span> 导出人员</a> -->

             <a  href="javascript:;" type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalExport"><span class="glyphicon glyphicon-export"></span> 导出人员</a>

            <!--   <button @click="impExcel" class="btn btn-primary" style="margin-left:20px">导入人员</button> -->
            <el-upload class="upload-demo" style="display:inline-block;margin-left:20px" action="/gxsz_office/index.php?g=UsersManager&m=AdminUsersManager&a=userInfoImportExcelPost" :show-file-list="false" :on-success="impExcel" 
            :file-list="fileArr">
            <button  class="btn btn-primary" ><span class="glyphicon glyphicon-import"></span> 导入人员</button>
           
          </el-upload> 
          <button @click="resetPW" class="btn btn-primary" style="margin-left:20px"><span class="glyphicon glyphicon-erase"></span>  重置密码</button>
          <button @click='go("UsersManager/AdminUsersManager/add")' class="btn btn-primary" style="margin-left:20px"><span class="glyphicon glyphicon-erase"></span>  添加用户</button>
          <!--   <input type="file" name="file" class="btn btn-primary" @click="importSubmit"/> -->
          <button type="button" class="btn btn-primary" v-if="selectedArr.length>0" data-toggle="modal" data-target="#modalDeleteAll" style="margin-left:10px">删除</button>
        </div>
        <div class="input-group pull-right" >
         <button type="button" class="btn btn-primary" @click='go("UsersManager/AdminUsersManager/usersAdmin/1")'>管理员信息</button> 
         <button type="button" @click="bindSelect" class="btn btn-primary" data-toggle="modal" data-target="#modalSearch" style="margin-right:10px;margin-left:10px"><i class="fa fa-search" style="color:white" ></i> 高级搜索</button>
       </div><!-- /input-group --> 
     </div>
     <!-- /.box-header -->
     <div class="box-body table-responsive">
       <el-table :data="DataArr" style="width: 100%"  @selection-change="handleSelectionChange">
         <el-table-column type="selection" width="35"></el-table-column>
         <el-table-column label="ID" prop="id"  width="70"></el-table-column>
         <el-table-column label="用户名" prop="user_login" width="120" ></el-table-column>
         <el-table-column label="姓名" prop="user_nicename" width="120"></el-table-column>
         <el-table-column label="工作部门" prop="department" ></el-table-column>
         <el-table-column label="学校" prop="sch_name" ></el-table-column>    
         <el-table-column label="工作电话" prop="workphone" width="140"></el-table-column>
</el-table-column>
<el-table-column label="操作"  width="280">
 <template scope="scope">
   <el-button size="small" v-if="scope.row.user_status == 0"  @click='changeStatus(scope.$index, scope.row)'>已禁用</el-button>
   <el-button size="small" v-if="scope.row.user_status == 1" type="success"  @click='changeStatus(scope.$index, scope.row)'>已启用</el-button>
   <el-button size="small" type="info" @click='go("UsersManager/AdminUsersManager/usersDetail/"+scope.row.id)'>详情</el-button> 
   <el-button size="small" @click='go("UsersManager/AdminUsersManager/usersEdit/"+scope.row.id)' :disabled="scope.row.editStatus == 1">编辑</el-button> 
   <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete" @click="fuzhi(scope.$index, scope.row)" :disabled="scope.row.editStatus == 1">删除</el-button> 
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
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <el-input v-model.trim="name" placeholder="用户名"></el-input>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group">
                <el-input v-model.trim="realname" placeholder="姓名"></el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group" >
                <el-input v-model.trim="workType" placeholder="工作类别"></el-input>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
             <div class="form-group" >   
              <el-select v-model.trim="workDep" placeholder="工作部门"  clearable filterable>
                <el-option v-for="item in dep_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
              </el-select>

            </div>
          </div>
        </div>
        <div class="row">
          <div class="col-md-6 col-sm-12 col-xs-12">
            <div class="form-group" >
             <el-select v-model.trim="political" placeholder="政治面貌"  clearable filterable>
              <el-option v-for="item in pol_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col-md-6 col-sm-12 col-xs-12">
          <div class="form-group" >
           <!-- <el-input v-model.trim="workType" placeholder="工作类别"></el-input> -->
           <el-select v-model.trim="education" placeholder="在职教育"  clearable filterable>
            <el-option v-for="item in edu_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="form-group" >
          <!-- <el-select v-model.trim="workName" placeholder="职称"  clearable filterable>
            <el-option v-for="item in workName_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select> -->
           <el-input v-model.trim="workName" placeholder="职称"></el-input>
        </div>
      </div>
      <div class="col-md-6 col-sm-12 col-xs-12">
        <div class="form-group" >
          <el-select v-model.trim="nation" placeholder="民族"  clearable filterable>
            <el-option v-for="item in nation_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
        </div>
      </div>
    </div>
    <div class="row">
      <div class="col-md-6 col-sm-12 col-xs-12">
       <div class="form-group" >
        <el-select v-model.trim="role" placeholder="角色"  clearable filterable>
          <el-option v-for="item in role_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
      </div>
    </div>
    <div class="col-md-6 col-sm-12 col-xs-12">
     <div class="form-group" >
      <el-select v-model.trim="status" placeholder="状态"  clearable filterable>
        <el-option v-for="item in status_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
      </el-select>
    </div>
  </div>
</div>  
<div class="row">
  <div class="col-md-12 col-sm-12 col-xs-12">
   <div class="form-group" >
    <el-select v-model.trim="school" placeholder="学校"  clearable filterable>
      <el-option v-for="item in sch_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
  </div>
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
<!-- 导出选择字段模态框 -->
<div class="modal fade" id="modalExport" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">信息选择</h3>
      </div>
      <div class="modal-body">
      <el-tree :data="infoArr" show-checkbox node-key="value" ref="tree"  :accordion='true'></el-tree>
      </div>
      <div class="modal-footer">

     <!--    <a  :href="expExcel" target="_blank" type="button" class="btn btn-primary" @click="countIds()">确定</a> -->
        <button type="button" class="btn btn-primary" @click="exportExcel()" >确定</button>
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
    "url": "/index.php?g=usersManager&m=AdminUsersManager&a=lists",
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
        Loading: true,
        loading: false,
        searchObj:'',
        selectedArr: [],
        name:'',
        realname:'',
        education:'',
        edu_list:[],
        political:'',
        pol_list:[],
        workDep:'',
        dep_list:[],
        workType:'',
        workName:'',
        workName_list:[],
        nation:'',
        nation_list:[],
        role:'',
        role_list:[],
        status:'',
        status_list:[],
        school:'',
        sch_list:[],
        expExcel:'',
        fileArr:[],
        infoArr:[]
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
      bindSelect() {
         // 请求接口 获得列表数据
         if (this.searchObj) {
            //如果有值,不再请求
            return;
          };
          var _this = this;
          var config = {
            "method": 'get',
            "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=advanceSearch&type=UM',
            "carrier": "searchObj",
            "notLoading": true,
            "notAlert": true
          };
          _this.myHttp(config,function(){
            //绑定各个option的数据
            _this.edu_list=_this.searchObj.education;
            _this.pol_list=_this.searchObj.political;
            _this.dep_list=_this.searchObj.dept;
            _this.workName_list=_this.searchObj.current_title;
            _this.nation_list=_this.searchObj.user_nation;
            _this.role_list=_this.searchObj.name;
            _this.status_list=_this.searchObj.user_status;
            _this.sch_list=_this.searchObj.sch_name;
          });    
        },
                    changeStatus(index, obj) {
                var _this = this;
                var config = {
                    method: 'get',
                    url: '/index.php?g=UsersManager&m=AdminUsersManager&a=hidden',
                    params: {
                        "id": obj.id,
                        "status": obj.user_status
                    }
                };
                _this.myHttp(config,
                function() {
                    //更新列表
                    _this.myHttp(initConfig)
                })
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
            'user_login':_this.name,
            'realname':_this.realname,
            'political_status':_this.political,
            'onthejob_education':_this.education,
            'department':_this.workDep,
            'job_category':_this.workType,
            'user_nation':_this.nation,
            'role':_this.role,
            'school':_this.school,
            'current_title':_this.workName,
            'userstatus':_this.status
          };
          _this.myHttp(initConfig, function (res) {
          //手动关闭确认框
          $('.modal').modal('hide');
          //搜索完成之后重新绑定数据列表
          _this.allPage = res.page;
        });
      },  

      //重置密码
      resetPW(){
        if (this.selectedArr.length > 0) {
          var ids=[];
          this.selectedArr.forEach(function (item) {
            ids.push(item.id);
          });
          var config = {
            "method": 'get',
            "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=passwordReset',
            "params":{
              "id":ids
            }
          };
          this.myHttp(config);
        }
        else{
          this.$message({
            "message": "请至少选择一项!",
            "type": "info"
          });
        }; 
      },

      //导入人员信息
      impExcel(data){
        if(data.code==0){
          this.$message({
            "message": data.msg,
            "type": "success"
          });
        }else{
          this.$message({
            "message": "导入人员失败!",
            "type": "error"
          });
        }
      },

      //导出excel
      exportExcel(){
        var _this=this;
        var checkedArr=_this.$refs.tree.getCheckedKeys();
  
        var tempArr=checkedArr.map(function(item){return item-1});
        
        var str=`<form action="/gxsz_office/index.php?g=UsersManager&m=AdminUsersManager&a=userInfoExportExcel" method="post" id="excelForm">
        <input type="hidden" name="user_login" value=${_this.name} >
        <input type="hidden" name="realname" value=${_this.realname} >
        <input type="hidden" name="political_status" value=${_this.political} >
        <input type="hidden" name="onthejob_education" value=${_this.education} >
        <input type="hidden" name="department" value=${_this.workDep} >
        <input type="hidden" name="job_category" value=${_this.workType} >
        <input type="hidden" name="user_nation" value=${_this.nation} >
        <input type="hidden" name="school" value=${_this.school} >
        <input type="hidden" name="current_title" value=${_this.workName} >
        <input type="hidden" name="userstatus" value=${_this.status} >
        <input type="hidden" name="role" value=${_this.role} >
        <input type="hidden" name="id" value=${tempArr} >
        <input type="hidden" name="type" value=0 >
      </form>`;
      var ooForm=document.createElement('div');
      ooForm.id='ooForm';
      ooForm.innerHTML=str;
      document.body.appendChild(ooForm);
      var oForm=document.getElementById('excelForm');
      oForm.submit();
      document.body.removeChild(ooForm);

      },
      // countIds(){
      //     var str="/gxsz_office/index.php?g=UsersManager&m=AdminUsersManager&a=userInfoExportExcel&";
      //     var checkedArr=_this.$refs.tree.getCheckedKeys();
      //     for(var name in initConfig.params){
      //       str+=name+'='+initConfig.params[name]+'&';
      //     }
      //     this.expExcel=str;
      // },

      //单击删除
      removeSubmit(){
        var _this = this;
        //需要删除的新闻id数组
        var ids = [];
        ids[0] = _this.temp;
        _this.loading = true;
        var config = {
          method: 'get',
          url: '/index.php?g=UsersManager&m=AdminUsersManager&a=delete',
          params: {
            "id": ids
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
            url: '/index.php?g=UsersManager&m=AdminUsersManager&a=delete',
            params: {
              "id": ids,
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
      },
      // exportSubmit(){
      //  if (this.selectedArr.length > 0) {
      //                 //有选中值的情况 
      //                 var _this = this;
      //                 _this.Loading = true;
      //                 var ids=[];
      //                 this.selectedArr.forEach(function(item){
      //                   ids.push(item.id);
      //                 });
      //                 var config = {
      //                   method: 'get',
      //                   url: '/index.php?g=UsersManager&m=AdminUsersManager&a=userInfoExportExcel',
      //                   params: {
      //                     "id": ids,
      //                   }
      //                 };
      //                 _this.myHttp(config,function(){
      //                   $('.modal').modal('hide');
      //                   //刷新所选项

      //                 });

      //               }else{
      //                 this.$message({
      //                   "message": "请至少选择一项!",
      //                   "type": "info"
      //                 });
      //               }
      //             }
    }  ,
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

      //请求所有信息字段
      var configForInfo={
        "method": "get",
        "url": "/index.php?g=usersManager&m=AdminUsersManager&a=getExportField",
        "notAlert": true
      };
      _this.myHttp(configForInfo,function(res){
        var arr=res.data;
        var tempArr=[];
        arr.forEach(function(item){
          item.value+=1;
          tempArr.push(item);
        });
        _this.infoArr=tempArr;
      });
    }
  }
</script>
<style scoped>
</style>
