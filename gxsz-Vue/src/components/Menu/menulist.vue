<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title pull-left" style="line-height:34px">菜单列表</h3>
        </div>
        <div class="box-body table-responsive">
          <el-table :data="tableData" height="550" style="width:100%;">
            <el-table-column prop="id" label="ID" width="70">
            </el-table-column>
            <el-table-column prop="name" label="菜单名" width="120">
            </el-table-column>
            <el-table-column prop="parentid" label="父类ID" width="100">
            </el-table-column>
            <el-table-column prop="listorder" label="排序" width="70">
            </el-table-column>
            <el-table-column prop="url" label="路径">
            </el-table-column>
            <el-table-column prop="icon" label="图标" width="180">
            </el-table-column>
            <el-table-column label="操作" width="280">
              <template scope="scope">
                <el-button size="small" v-if="scope.row.status == 0" @click='changeStatus(scope.$index, scope.row)'>已隐藏</el-button>
                <el-button size="small" v-if="scope.row.status == 1" type="success" @click='changeStatus(scope.$index, scope.row)'>已显示</el-button>
                <el-button @click="copydata(scope.$index, scope.row)" type="danger" data-toggle="modal" data-target="#modalDelete" size="small">删除</el-button>
                <el-button @click="copydata(scope.$index, scope.row)" size="small" data-toggle="modal" data-target="#modalEdit">编辑</el-button>
              </template>
            </el-table-column>

          </el-table>
        </div>

      </div>

      <!--
  	作者：704905123@qq.com
  	时间：2017-07-20
  	描述：编辑模态框
  -->
      <div class="modal fade" id="modalEdit" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h3 class="modal-title">菜单编辑</h3>
            </div>
            <div class="modal-body">
              <form>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <el-input v-model.trim="tempid" disabled="" placeholder="ID"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <el-input v-model.trim="tempname" placeholder="菜单名"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <el-input v-model.trim="tempparentid" placeholder="父类ID"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <el-input v-model.trim="templistorder" placeholder="排序"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <el-input v-model.trim="tempurl" placeholder="URL"></el-input>
                    </div>
                  </div>
                </div>
                <div class="row">
                  <div class="col-md-12 col-sm-12 col-xs-12">
                    <div class="form-group">
                      <el-input v-model.trim="tempicon" placeholder="图标"></el-input>
                    </div>
                  </div>
                </div>
              </form>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="editSubmit">确定</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
      <!--
    	作者：704905123@qq.com
    	时间：2017-07-23
    	描述：删除模态框
    -->
      <div class="modal fade" id="modalDelete" tabindex="-1" role="dialog">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
              <h3 class="modal-title">确认删除选项?</h3>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-primary" @click="deleteClick">确定</button>
              <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  const initConfig = {
    "method": 'get',
    "url": '/index.php?g=Menu&m=AdminMenu&a=index',
    "carrier": "optionsObj",
    "notAlert": true
  };
  export default {
    data() {
      return {
        loading: true,
        Loading: true,
        tempparentid: '',
        tempname: '',
        tempid: '',
        templistorder: '',
        tempurl: '',
        tempicon: '',
        optionsObj: [],
        tableData: []
      }
    },
    methods: {
      deleteClick() {
        var _this = this;
        var config = {
          method: 'post',
          url: '/index.php?g=Menu&m=AdminMenu&a=delete',
          params: {
            "id": this.tempid
          }
        };
        this.myHttp(config, function() {
          _this.tempname = '';
          _this.tempid = '';
          _this.tempurl = '';
          _this.templistorder = '';
          _this.tempparentid = '';
          _this.tempicon = '';
          $('.modal').modal('hide');
        });
      },
      copydata(index, item) {
        this.tempid = item.id;
        this.tempname = item.name;
        this.tempurl = item.url;
        this.tempicon = item.icon;
        this.templistorder = item.listorder;
        this.tempparentid = item.parentid;
      },
      //切换显示/隐藏状态
      changeStatus(index, obj) {
        var _this = this;
        var config = {
          method: 'get',
          url: '/index.php?g=Menu&m=AdminMenu&a=hidden',
          params: {
            "id": obj.id,
            "status": obj.status
          }
        };
        _this.myHttp(config,
          function() {
            //更新列表
            _this.myHttp(initConfig, function() {
              _this.tableData.splice(0, _this.tableData.length);
              for(var a = 0; a < _this.optionsObj.length; a++) {
                for(var b = 0; b < _this.optionsObj[a].submenu.length; b++) {
                  _this.tableData.push(_this.optionsObj[a].submenu[b]);
                }
                _this.tableData.push(_this.optionsObj[a]);
              }

            });
          })
      },
      editSubmit() {
        var _this = this;
        var checkResult = _this.checkList([{
            "name": "tempname",
            "reg": ["notnull"]
          },
          {
            "name": "tempid",
            "reg": ["notnull"]
          },
          {
            "name": "templistorder",
            "reg": ["notnull"]
          },
          {
            "name": "tempicon",
            "reg": ["notnull"]
          },
          {
            "name": "tempparentid",
            "reg": ["notnull"]
          }
        ]);

        if(checkResult) {
          var config = {
            method: 'post',
            url: '/index.php?g=Menu&m=AdminMenu&a=edit_post',
            params: {

              "id": _this.tempid,
              "parentid": _this.tempparentid,
              "label": _this.tempname,
              "href": _this.tempurl,
              "icon": _this.tempicon,
              "listorder": _this.templistorder
            }
          };
          _this.myHttp(config, function() {
            _this.tempname = '';
            _this.tempid = '';
            _this.tempurl = '';
            _this.templistorder = '';
            _this.tempparentid = '';
            _this.tempicon = '';
            $('.modal').modal('hide');
          });
        } else {
          this.$message({
            "message": "请填写完整信息",
            "type": "error"
          });
        }
      }
    },

    created() {
      var _this = this;
      //请求接口 获得列表数据
      var config = {
        "method": 'get',
        "url": '/index.php?g=Menu&m=AdminMenu&a=index',
        "carrier": "optionsObj",
        "notAlert": true
      };
      _this.myHttp(config, function() {
        for(var a = 0; a < _this.optionsObj.length; a++) {
          for(var b = 0; b < _this.optionsObj[a].submenu.length; b++) {
            _this.tableData.push(_this.optionsObj[a].submenu[b]);
          }
          _this.tableData.push(_this.optionsObj[a]);
        }
      });
    }
  }
</script>
<style>

</style>