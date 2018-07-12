<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">角色管理</h3>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive" >
          <el-table :data="DataArr" style="width: 100%" border >
            <el-table-column label="ID" prop="id" width="70"></el-table-column>
            <el-table-column label="角色名称" prop="name"></el-table-column>
            <el-table-column label="角色描述" prop="remark"></el-table-column>
            <el-table-column label="状态" prop="status" width="100">
              <template scope="scope">
                <el-tag :type="scope.row.status == 1 ? 'success' : 'warning'" close-transition>{{scope.row.status == 1 ? '开启' : '禁止'}}</el-tag>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="140">
              <template scope="scope">
                <el-button size="small" type="info" data-toggle="modal" data-target="#modalEdit"  @click="fuzhi(scope.$index, scope.row)">权限设置
                </el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 分页 -->
        <!--   <el-pagination v-show="allPage>1" layout="prev, pager, next"  @current-change="goPage" :current-page="nowPage" :page-count="allPage" class="pull-right"></el-pagination> -->
        </div>
        <!-- /.box-body -->
      </div>
    </div>
    <!--  编辑模态框 -->
    <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">权限设置</h3>
          </div>
          <div class="modal-body">
              <el-tree :data="menuArr" show-checkbox node-key="id" ref="tree" :default-checked-keys='roleMenuArr' :accordion='true'></el-tree>
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
  </div>
</template>

<script>
  const initConfig = {
    "method": "get",
    "url": "/index.php?g=Privilege&m=AdminPrivilege&a=getRoleList",
    "carrier": "DataArr",
    "notAlert": true
  };
  export default{
    name: 'myNoteLists',
    data(){
      return {
        loading: false,
        Loading: false,
        nowPage: 1,
        allPage: 1,
        DataArr: [],
        temp: '',
        menuArr:[],
        roleMenuArr:[]
     }
    },
    methods: {
      // goPage(num){
      //   //页面跳转
      //   var _this = this;
      //   //记录当前页面
      //   _this.nowPage = num;
      //   //切换路由
      //   _this.go(_this.$route.path, num);
      //   //加载对应页面的列表
      //   initConfig.params.p = _this.nowPage;
      //   //重新绑定数据
      //   _this.myHttp(initConfig, function (res) {
      //     _this.allPage = res.page;
      //   });
      // },
      fuzhi(index, item){
        var _this=this;
        //复制当前操作对象
        _this.temp = item.id;
        //请求菜单
        var configForMenu={
          "method": "get",
          "url": "/index.php?g=Privilege&m=AdminPrivilege&a=getAllNav",
          "carrier": "menuArr",
          "notAlert": true
        };
        //请求角色已分配的权限
        var configForRoleMenu={
          "method": "get",
          "url": "/index.php?g=Privilege&m=AdminPrivilege&a=getRoleNav",
          "params": {
            "id": _this.temp
          },
          "notAlert": true
        };
        _this.myHttp(configForRoleMenu,function(res){
          var tempArr=[];
          tempArr=res.data; 
          _this.myHttp(configForMenu,function(){
              var tempMenuArr=[];
              //去掉父亲id，只要子id
              tempArr.forEach(function(item){
                _this.menuArr.forEach(function(obj){
                  obj.children.forEach(function(child){
                    if(item==(child.id-0)){
                      tempMenuArr.push(item);
                    }
                  });
                });
              });
              _this.roleMenuArr=tempMenuArr;
          });
       });
      },
      editSubmit(){
        //上传修改表单
        var _this = this;
        _this.loading = true;
        var tempArr=[];
        var repeatArr=[];
        //获取勾选的节点id
        var checkedArr=_this.$refs.tree.getCheckedKeys();

        //把每个子菜单的父id找出来
        checkedArr.forEach(function(checkedId){
            _this.menuArr.forEach(function(item){
              item.children.forEach(function(obj){
                  if(checkedId==(obj.id-0)){
                     repeatArr.push(obj.parentid-0);
                  } 
              });
            });
        });
        //去掉重复的值
        for(var i=0;i<repeatArr.length;i++){
          if(repeatArr[i]!=repeatArr[i+1]){
            tempArr.push(repeatArr[i]);
          }
        }
        //去掉已经存在的父亲id
        checkedArr.forEach(function(checkedId){
          tempArr.forEach(function(item){
            if(checkedId==item){
              tempArr.splice(tempArr.indexOf(item),1);
            }
          });
        });
        //把去重剩下的父亲id推到checkedArr里，做传参用
        tempArr.forEach(function(item){
          checkedArr.push(item);
        });
        var config = {
          "method": 'post',
          "url":  "/index.php?g=Privilege&m=AdminPrivilege&a=setNav",
          "params": {
            "id": _this.temp,
            "nav":checkedArr
          }
        };
        _this.myHttp(config, function () {
          $('.modal').modal('hide');
            //更新列表数据
            _this.myHttp(initConfig)
          });
      }
    },
    created(){
      var _this = this;
      _this.myHttp(initConfig);
    }
  }
</script>
<style scoped>
</style>
