<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12" >
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-header">
          <h3 class="box-title">我的笔记</h3>
          <button type="button" class="btn btn-primary" data-toggle="modal" data-target="#modalAdd"><span class="glyphicon glyphicon-plus"></span> 添加笔记</button>
        </div>
        <!-- /.box-header -->
        <div class="box-body table-responsive" >
          <el-table :data="DataArr" style="width: 100%" border >
            <el-table-column label="id" prop="id" width="70"></el-table-column>
            <el-table-column label="标题" prop="title"></el-table-column>
            <el-table-column label="内容" prop="content"></el-table-column>
            <!-- <el-table-column label="提醒时间" prop="remind_time" v-show:"false"></el-table-column> -->
            <el-table-column label="时间" prop="execute_time"  v-show:"false"></el-table-column>
             <el-table-column label="地点" prop="note_location"  v-show:"false"></el-table-column>
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
          <el-pagination v-show="allPage>1" layout="prev, pager, next"  @current-change="goPage" :current-page="nowPage" :page-count="allPage" class="pull-right"></el-pagination>
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
            <h3 class="modal-title">添加笔记</h3>
          </div>
          <div class="modal-body">
            <form>
               <div class="form-group" :class="{'has-error':nowTitleTips}">
                <input type="text" class="form-control" placeholder="请输入标题" v-model.trim="nowTitle">
                <span class="help-block" style="text-align:center" v-show="nowTitleTips">{{nowTitleTips}}</span>
              </div>
              <div style="border: solid #000; border-width:1px 0px;padding: 15px 0px 5px 0px;">
                <div class="block">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="nowExecuteTime"
                    type="datetime"
                    placeholder="选择行程时间">
                  </el-date-picker>
                </div><br />
                 <div class="form-group">
                  <input type="text" class="form-control" placeholder="地点" v-model.trim="nowLocation">
                  <!-- <span class="help-block" style="text-align:center" v-show="nowTitleTips">{{nowTitleTips}}</span> -->
                </div>
                <div class="form-group" :class="{'has-error':nowContentTips}">
                  <textarea class="form-control" style="resize:none" rows="5" placeholder="请输入内容..."
                            v-model.trim="nowContent"></textarea>
                  <span class="help-block" style="text-align:center" v-show="nowContentTips">{{nowContentTips}}</span>
                </div>
              </div>
              <!-- <br /> -->
          <!--     <div class="block">
                <el-date-picker
                  style="width: 100%;"
                  v-model="nowTime"
                  type="datetime"
                  placeholder="选择提醒时间">
                </el-date-picker>
              </div><br /> -->
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
            <h3 class="modal-title">编辑笔记</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':oldTitleTips}">
                <input type="text" class="form-control" placeholder="请输入标题" v-model.trim="oldTitle">
                <span class="help-block" style="text-align:center" v-show="oldTitleTips">{{oldTitleTips}}</span>
              </div>
              <div style="border: solid #000; border-width:1px 0px;padding: 15px 0px 5px 0px;">
                <div class="block">
                  <el-date-picker
                    style="width: 100%;"
                    v-model="oldExecuteTime"
                    type="datetime"
                    placeholder="设置行程时间">
                  </el-date-picker>
                </div><br />
                 <div class="form-group" >
                  <input type="text" class="form-control" placeholder="地点" v-model.trim="oldLocation">
                 <!--  <span class="help-block" style="text-align:center" v-show="oldTitleTips">{{oldTitleTips}}</span> -->
                </div>
                <div class="form-group" :class="{'has-error':oldContentTips}">
                  <textarea class="form-control" style="resize:none" rows="5" placeholder="请输入内容..."
                            v-model.trim="oldContent"></textarea>
                  <span class="help-block" style="text-align:center" v-show="oldContentTips">{{oldContentTips}}</span>
                </div>
              </div>
              <br />
          <!--     <div class="block">
                <el-date-picker
                  style="width: 100%;"
                  v-model="oldTime"
                  type="datetime"
                  placeholder="设置提醒时间">
                </el-date-picker>
              </div><br /> -->
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
    "url": "/index.php?g=office&m=usernote&a=myNotelists",
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
        DataArr: [],
        nowTitle: '',
        nowTitleTips: '',
        oldTitle: '',
        oldTitleTips: '',
        nowContent: '',
        nowContentTips: '',
        oldContent: '',
        oldContentTips: '',
        nowTime: '',//提醒时间
        oldTime: '',
        nowExecuteTime: '',//行程时间
        oldExecuteTime: '',
        nowLocation: '',//地点
        oldLocation: '',
        note_location: '',
        remind_Time:'',
        temp: '',
        index: '',
      }
    },
    methods: {
      //yyyy-MM-dd HH:mm:ss字符串转换data对象
      StringToDate(s) {
          var d = new Date();
          d.setYear(parseInt(s.substring(0,4),10));
          d.setMonth(parseInt(s.substring(5,7)-1,10));
          d.setDate(parseInt(s.substring(8,10),10));
          d.setHours(parseInt(s.substring(11,13),10));
          d.setMinutes(parseInt(s.substring(14,16),10));
          d.setSeconds(parseInt(s.substring(17,19),10));
          return d;
      },
      // 时间格式转变
      formatDateTime(date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        m = m < 10 ? ('0' + m) : m;
        var d = date.getDate();
        d = d < 10 ? ('0' + d) : d;
        var h = date.getHours();
        h=h < 10 ? ('0' + h) : h;
        var minute = date.getMinutes();
        minute = minute < 10 ? ('0' + minute) : minute;
        var second=date.getSeconds();
        second=second < 10 ? ('0' + second) : second;
        return y + '-' + m + '-' + d+' '+h+':'+minute+':'+second;
      },
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
      fuzhi(index, item){
        //复制当前操作对象
        this.temp = item.id;
        this.oldTitle = item.title;
        this.oldContent = item.content;
        // this.oldTime = this.StringToDate(item.remind_time);
        this.oldExecuteTime = this.StringToDate(item.execute_time);
        this.oldLocation = item.note_location;
      },
      addSubmit(){
        //上传添加表单
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "nowTitle",
            "reg": ["notnull"]
          },
          {
            "name": "nowContent",
            "reg": ["notnull"]
          }
        ]);
        if (checkResult) {
          //请求接口
          this.loading = true;
          // _this.nowTime = _this.formatDateTime(_this.nowTime);
          _this.nowExecuteTime = _this.formatDateTime(_this.nowExecuteTime);
          var config = {
            "method": 'post',
            "url": '/index.php?g=office&m=usernote&a=addPost',
            "params": {
              "title": _this.nowTitle,
              "content": _this.nowContent,
              // "remind_time": _this.nowTime,
              "execute_time": _this.nowExecuteTime,
              "note_location": _this.nowLocation,
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
            //更新列表数据
            initConfig.params = {"p": _this.nowPage};
            _this.myHttp(initConfig,
              function (resp) {
                //初始化数据
                _this.allPage = resp.page;
              });
          });
          // config = {
          //   "method": 'post',
          //   "url": '/index.php?g=office&m=usernote&a=remind',
          // };
          // _this.myHttp(config,function () {
          //   console.log("请求成功");
          // })
        }

      },
      editSubmit(){
        //上传修改表单
        var _this = this;
        var checkResult = _this.checkList([
          {
            "name": "oldTitle",
            "reg": ["notnull"]
          },
          {
            "name": "oldContent",
            "reg": ["notnull"]
          }
        ]);
        if (checkResult) {
          _this.loading = true;
          // _this.oldTime = _this.formatDateTime(_this.oldTime);
          _this.oldExecuteTime = _this.formatDateTime(_this.oldExecuteTime);
          var config = {
            "method": 'post',
            "url": '/index.php?g=office&m=usernote&a=editPost',
            "params": {
              "note_id": _this.temp,
              "title": _this.oldTitle,
              "content": _this.oldContent,
              // "remind_time": _this.oldTime,
              "execute_time": _this.oldExecuteTime,
              "note_location": _this.oldLocation,
            }
          };
          _this.myHttp(config, function () {
            $('.modal').modal('hide');
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
          "url": '/index.php?g=office&m=usernote&a=deleteAjax',
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
    }
    ,
    mounted()
    {
      var _this = this;
      $('.modal').on('hidden.bs.modal', function () {
        _this.resetData(["oldTitle", "nowTitle", "oldContent", "nowContent", "nowTime","nowExecuteTime",'nowLocation','temp']);
      });

    }
  }
</script>
<style scoped>
</style>
