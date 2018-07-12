<template>
  <div class="row">
    <div class="col-md-12 col-sm-12 col-xs-12">
      <div class="box box-primary">
        <div class="box-body table-responsive">
          <div class="row">
            <div class="col-lg-3 col-xs-6">
              <!-- small box -->
              <div class="small-box bg-aqua">
                <div class="inner">
                  <h3>{{Noti}}</h3>
                  <p>全部通知</p>
                </div>
                <div class="icon" >
                  <a href="#/Notification/AdminNotification/lists/1" style="cursor:pointer;">
                    <i class="fa fa-bell-o" style="font-size:80px;color:white;opacity:.5;"></i>
                  </a>
                </div>
                <a href="#/Notification/AdminNotification/lists/1" class="small-box-footer">更多信息
                  <i class="fa fa-arrow-circle-right" style="color:white;font-size:14px"></i>
                </a>
              </div>
            </div>
            <div class="col-lg-3 col-xs-6">
             <div class="small-box bg-green">
              <div class="inner">
                <h3>{{News}}</h3>
                <p>我的新闻</p>
              </div>
              <div class="icon">
                <a href="#/News/AdminNews/myNewslist/1" style="cursor:pointer;">
                    <i class="fa fa-newspaper-o" style="font-size:80px;color:white;opacity:.5"></i>
                </a>
              </div>
              <a href="#/News/AdminNews/myNewslist/1" class="small-box-footer">更多信息
                <i class="fa fa-arrow-circle-right" style="color:white;font-size:14px"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-xs-6">
            <div class="small-box bg-yellow">
              <div class="inner">
                <h3>{{Files}}</h3>
                <p>个人文件</p>
              </div>
              <div class="icon">
                 <a href="#/CloudStorage/Files/myCloudStorage/id/1/1" style="cursor:pointer;">
                    <i class="fa fa-file-word-o" style="font-size:80px;color:white;opacity:.5"></i>
                </a>
              </div>
              <a href="#/CloudStorage/Files/myCloudStorage/id/1/1" class="small-box-footer">更多信息
                <i class="fa fa-arrow-circle-right" style="color:white;font-size:14px"></i>
              </a>
            </div>
          </div>
          <div class="col-lg-3 col-xs-6">
            <div class="small-box bg-red">
              <div class="inner">
                <h3>{{Notes}}</h3>
                <p>我的笔记</p>
              </div>
              <div class="icon">
                <a href="#/Users/AdminNote/myNoteLists/1" style="cursor:pointer;">
                    <i class="fa  fa-pencil-square-o" style="font-size:80px;color:white;opacity:.5"></i>
                </a>
             </div>
             <a href="#/Users/AdminNote/myNoteLists/1" class="small-box-footer">更多信息
              <i class="fa fa-arrow-circle-right" style="color:white;font-size:14px"></i>
            </a>
          </div>
          </div>
          </div>

          <div class="row" v-if="DataObj.news==0">
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="box" style="height:256px">
                <div class="box-header">
                  <h3 class="box-title">高校新闻投稿排行</h3>
                  <!-- <el-button type="text" @click="show_rank_table = true" style="float:right">查看更多 >></el-button> -->
                </div>
                <div class="box-body table-responsive no-padding">
                  <table class="table tableVry">
                    <tr style="background-color: rgb(236, 240, 245);height:42px">
                      <th style="width:15%;padding-left:10px">名次</th>
                      <th style="width: 25%">高校名称</th>
                      <th style="width: 45%;">热度</th>
                      <th style="width: 15%">新闻数量</th>
                    </tr>
                    <tr style="height:32px" v-for="(item,k) in schArr" :key="k">
                      <td style="padding-left:10px">{{k+1}}</td>
                      <td>{{item.sch_name}}</td>
                      <td style="padding-right:30px">
                        <div class="progress progress-xs progress-striped active">
                          <div class="progress-bar progress-bar-red" :style="{'width':item.post_num_percent+'%'}"></div>
                        </div>
                      </td>
                      <td style="padding-left:10px"><span class="badge bg-blue">{{item.post_num}}</span></td>
                    </tr>
                  </table>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="box">
                <div class="box-header">
                  <h3 class="box-title">公文流转</h3>
                </div>
                <div class="box-body table-responsive no-padding">
                  <!-- <el-table :data="documentArr" style="width: 100%;height:200px">
                    <el-table-column prop="title" label="标题"></el-table-column>
                    <el-table-column prop="type" label="状态" width="100"></el-table-column>
                    <el-table-column prop="address" label="转发量" width="100"></el-table-column>
                    <el-table-column prop="hits" label="点击量" width="100"></el-table-column>
                    <el-table-column prop="create_time" label="发布时间" width="100"></el-table-column>
                  </el-table> -->
                  <el-table :data="documentArr" style="width: 100%;height:200px">
                    <el-table-column label="id" prop="id" width="70"></el-table-column>
                    <el-table-column label="标题" prop="title">
                      <template scope="scope">
                        <el-button @click='go("Document/AdminDocument/mydetail/"+scope.row.id)' type="text"
                        size="small">{{scope.row.title}}
                      </el-button>
                    </template>
                  </el-table-column>
                  <el-table-column label="发布时间" prop="create_time" width="160"></el-table-column>
                  <el-table-column label="点击量" prop="hits" width="90"></el-table-column>
                  <el-table-column label="状态" prop="send_status" width="100">
                    <template scope="scope">
                      <el-tag
                      :type="scope.row.type == 1 ? 'success' : 'warning'"
                      close-transition>{{scope.row.type == 1 ? '已发布' : '未发布'}}
                    </el-tag>
                  </template>
                </el-table-column>
            <!--     <el-table-column label="操作" width="200">
                  <template scope="scope">
                    <el-button size="small" @click='go("Document/AdminDocument/edit/"+scope.row.id)'>编辑</el-button>
                    <el-button size="small" type="danger" data-toggle="modal" data-target="#modalDelete"
                    @click="fuzhi(scope.$index, scope.row)">删除
                  </el-button>
                  <el-button size="small" type="info" @click='go("Document/AdminDocument/feedback/"+scope.row.id)'>反馈</el-button>
                </template>
              </el-table-column> -->
            </el-table>
                </div>
              </div>
            </div>
          </div>

          <div class="row">
        <div class="col-md-4 col-sm-4 col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">我的笔记</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <form style="margin-left:10px;margin-right:20px">
              <div class="form-group" >
                <input type="text" class="form-control" placeholder="请输入标题" v-model.trim="title"></span>
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
                 <div class="form-group" >
                  <input type="text" class="form-control" placeholder="地点" v-model.trim="nowLocation">
                </div>
                <div class="form-group" >
                  <textarea class="form-control" style="resize:none" rows="5" placeholder="请输入内容..." v-model.trim="content"></textarea>
                </div>
              </div>
              <br />
             <!--  <div class="block">
                <el-date-picker
                  style="width: 100%;"
                  v-model="nowTime"
                  type="datetime"
                  placeholder="选择提醒时间">
                </el-date-picker>
              </div><br /> -->
                <div class="form-group" style="text-align:center;margin-bottom:8px">
                  <button type="button" class="btn btn-primary" @click="noteSubmit()" v-loading="loading" :disabled="loading">确定</button>
                  <button type="reset" class="btn btn-default" style="margin-left:30px">重置</button>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div class="col-md-4 col-sm-4 col-xs-12">
          <div class="box">
            <div class="box-header">
              <h3 class="box-title">最近新闻</h3>
            </div>
            <div class="box-body table-responsive no-padding">
              <el-table :data="Latest" style="width: 100%;height:400px" class="myclass">
                <el-table-column  label="标题" show-overflow-tooltip>
                 <template scope="scope">
                   <a :href="'/gxsz_office/index.php?g=gxsz&m=NewsList&a=newsdetail&id='+scope.row.id" target="_blank" type="text" size="small">{{scope.row.post_title}}</a>
                 </template>
               </el-table-column>
               <el-table-column prop="post_modified" label="时间" width="110" show-overflow-tooltip></el-table-column>
             </el-table>
           </div>
         </div>
       </div>
       <div class="col-md-4 col-sm-4 col-xs-12">
        <div class="box">
          <div class="box-header">
            <h3 class="box-title">操作记录</h3>
          </div>
          <div class="box-body table-responsive no-padding">
            <el-table :data="Log" style="width: 100%;height:400px" >
              <el-table-column prop="detail" label="操作" show-overflow-tooltip></el-table-column>
              <el-table-column prop="create_time" label="时间" width="110" show-overflow-tooltip></el-table-column>
            </el-table>
          </div>
        </div>
           </div>
          </div>

        <!--   <div class="row" v-if="DataObj.count==0">
-->
<div class="row" v-if="false">
<div class="col-md-6 col-sm-6 col-xs-12">
              <div class="box">
                <div class="box-header">
                <h3 class="box-title">最近一月新闻投稿量</h3>
                </div>
                <div class="box-body table-responsive no-padding">
                  <div class="chart">
                    <canvas id="lineChart1" style="height:250px;color:#FFBE33;"></canvas>
                  </div>
                </div>
              </div>
            </div>
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="box">
                <div class="box-header">
                <h3 class="box-title">最近一月用户登录量</h3>
                </div>
                <div class="box-body table-responsive no-padding">
                   <div class="chart">
                    <canvas id="lineChart2" style="height:250px;color:#FFBE33;"></canvas>
                  </div>
                </div>
              </div>
            </div>
          </div>


       </div>
    </div>
  </div>
  <!-- 学校详情模态框 -->
  <el-dialog title="排行详情" v-model="show_rank_table" size='tiny' @open='searchSubmit()' v-loading='Loading'>
            <div class="input-group">
            <input type="text" class="form-control" placeholder="请输入高校名称..." @keyup.enter='searchSubmit(searchWord)'
                   v-model.trim="searchWord">
            <span class="input-group-btn">
              <button class="btn btn-default" type="button" @click="searchSubmit(searchWord)"><i
                class="fa fa-search"></i></button>
            </span>
          </div>
  <el-table :data="schRankArr" >
    <el-table-column property="rank" label="排名" width="80"></el-table-column>
    <el-table-column property="sch_name" label="高校名称"></el-table-column>
    <el-table-column property="posts" label="投稿量" width="80"></el-table-column>
  </el-table>
      <el-pagination v-show="allPage>1" layout="prev, pager, next" @current-change="goPage" :current-page="nowPage"
     :page-count="allPage" class="pull-right"></el-pagination>
</el-dialog>

</div>
</template>

<script>
//学校名称查询条件
  const initConfig = {
    "method": "get",
    "url": "/index.php?g=news&m=AdminNewsManager&a=auditList",
    "carrier": "schRankArr",
    "params": {
      "p": 1,
      "sch_name": ''
    },
    "notAlert": true
  };


  import Chart from '../../../static/Chart.min.js';
  export default{
    name:'homepage',
    data(){
      return {
        searchWord:'',
        allPage:2,
        nowPage:1,
        show_rank_table:false,
        DataArr1:[],
        DataArr2:[],
        DataObj:'',
        title:'',
        content:'',
        contentTips:'',
        titleTips:'',
        loading:false,
        Loading:true,
        Noti:0,
        News:0 ,
        Notes:0,
        Files:0,
        Latest:[],
        Log:[],
        schArr:[],
        documentArr:[],
        newsPostArr:[],
        loginNumArr:[],
        chart1_label:[],
        chart1_data:[],
        chart2_label:[],
        chart2_data:[],
        nowExecuteTime: '',
        nowLocation: '',
        nowTime: '',
        schRankArr:[
          {
            'rank':1,
            'sch_name':'思政网团队',
            'posts':242
          },
          {
            'rank':2,
            'sch_name':'武汉科技大学',
            'posts':223
          },
          {
            'rank':3,
            'sch_name':'计算机学院',
            'posts':210
          },
          {
            'rank':4,
            'sch_name':'武汉科技大学4',
            'posts':199
          },
          {
            'rank':5,
            'sch_name':'武汉科技大学5',
            'posts':189
          }
        ]
      }
    },
    methods:{
            goPage(num){
        //页面跳转
        var _this = this;
        //记录当前页面
        _this.nowPage = num;
        //切换路由
        // _this.go(_this.$route.path, num);
        //加载对应页面的列表
        initConfig.params.p = _this.nowPage;
        //重新绑定数据
        _this.myHttp(initConfig, function (res) {
          _this.allPage = res.page;
        });
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
      searchSubmit(str){
         _this.Loading = true;
         initConfig.params.sch_name=str||'';
        //查询学校排行
          _this.myHttp(initConfig)
      },
      noteSubmit(){
        var _this=this;
                //上传添加表单
        var checkResult = _this.checkList([
        {
          "name": "title",
          "reg": ["notnull"]
        },
        {
          "name": "content",
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
              "title": _this.title,
              "content": _this.content,
              // "remind_time": _this.nowTime,
              "execute_time": _this.nowExecuteTime,
              "note_location": _this.nowLocation,
            }
          };
          _this.myHttp(config,function(){
                    _this.Notes++;
                    _this.nowLocation = '';
                    _this.nowExecuteTime = '';
                    _this.nowTime = '';
                    _this.title = '';
                    _this.content = '';
          })
        }
      }
    },
    created(){
      var _this=this;
      //请求权限接口，控制页面局部显示
      var configForAudit= {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=get_index_nav',
        "carrier":"DataObj",
        "notAlert":true
      };
      _this.myHttp(configForAudit);
      //请求全部通知接口，得到全部知数量
      var configForNoti = {
        "method": 'get',
        "url": '/index.php?g=notification&m=AdminNotification&a=lists',
        "notAlert":true
      };
      _this.myHttp(configForNoti,function(res){
        _this.Noti=res.count?res.count:0;
      });

      //请求我的新闻接口，得到我的新闻数量
      var configForNews = {
        "method": 'get',
        "url": '/index.php?g=news&m=AdminNews&a=myNewslist',
        "carrier":"Lastest",
        "notAlert":true
      };
      _this.myHttp(configForNews,function(res){
        _this.News=res.count?res.count:0;
      });

      //请求我的笔记接口，得到我的笔记数量
      var configForNotes = {
        "method": 'get',
        "url": '/index.php?g=office&m=usernote&a=myNotelists',
        "notAlert":true
      };
      _this.myHttp(configForNotes,function(res){
        _this.Notes=res.count?res.count:0;
      });

      //请求我的文件接口，得到我上传文件数量
      var configForFiles = {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=getFileNum',
        "notAlert":true
      };
      _this.myHttp(configForFiles,function(res){
        _this.Files=res.data?res.data:0;
      });

      //请求最近新闻接口，得到最近新闻列表
      var configForLatest = {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=getLatestNews',
        "carrier":"Latest",
        "notAlert":true
      };
      _this.myHttp(configForLatest);

      //请求系统日志接口
      var configForLog = {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=getSystemLog',
        "carrier":"Log",
        "notAlert":true
      };
      _this.myHttp(configForLog);

      //请求高校投稿排行接口
      var configForSch = {
        "method": 'get',
        "url": '/index.php?g=Office&m=Indexadmin&a=schoolPostsLists',
        "carrier":"schArr",
        "notAlert":true
      };
      _this.myHttp(configForSch);

      //请求公文流转接口
      var configForDoc = {
        "method": "get",
        "url": "/index.php?g=document&m=Admindocument&a=myAddList",
        "carrier": "documentArr",
        "notAlert": true
      };
      _this.myHttp(configForDoc);

    },
    // mounted(){
    //   var _this=this;
    //   //请求最近一月新闻投稿量接口
    //   var configForNewsPost = {
    //     "method": 'get',
    //     "url": '/index.php?g=Office&m=Indexadmin&a=newsNum',
    //     "carrier":"newsPostArr",
    //     "notAlert":true
    //   };
    //   _this.myHttp(configForNewsPost,function(){
    //     _this.newsPostArr.forEach(function(item){
    //       _this.chart1_label.push(item.post_date.slice(6,10));
    //       _this.chart1_data.push(item.num-0);
    //   });
    //   //获取曲线dom元素
    //   var ctx = document.getElementById("lineChart1").getContext("2d");
    //   var lineChart1 = new Chart(ctx);
    //   //配置参数
    //   var xArr=_this.chart1_label;
    //   var yArr=_this.chart1_data;
    //   var areaChartData1 = {
    //   labels: xArr,
    //   datasets: [
    //     {
    //       label: "登陆量",
    //       fillColor: "rgb(60, 141, 188)",
    //       strokeColor: "rgb(60, 141, 188)",
    //       pointColor: "rgb(60, 141, 188)",
    //       pointStrokeColor: "rgb(60, 141, 188)",
    //       pointHighlightFill: "#fff",
    //       pointHighlightStroke: "rgba(60,141,188,1)",
    //      data: yArr
    //     }
    //   ]};
    //   //配置选项
    //   var areaChartOptions = {
    //     showScale: true,
    //     scaleShowGridLines: false,
    //     scaleGridLineColor: "rgba(0,0,0,.05)",
    //     scaleGridLineWidth: 1,
    //     scaleShowHorizontalLines: true,
    //     scaleShowVerticalLines: true,
    //     bezierCurve: true,
    //     bezierCurveTension: 0.3,
    //     pointDot: true,
    //     pointDotRadius: 4,
    //     pointDotStrokeWidth: 1,
    //     pointHitDetectionRadius: 20,
    //     datasetStroke: true,
    //     datasetStrokeWidth: 2,
    //     datasetFill: false,
    //     maintainAspectRatio: true,
    //     responsive: true
    //   };
    //   var lineChartOptions= areaChartOptions;
    //   lineChartOptions.datasetFill =  false;
    //   //实例化chart曲线
    //   lineChart1.Line(areaChartData1, lineChartOptions);
    // });

    //  //请求最近一月登录量接口
    //   var configForLoginNum = {
    //     "method": 'get',
    //     "url": '/index.php?g=Office&m=Indexadmin&a=latestVisitNum',
    //     "carrier":"loginNumArr",
    //     "notAlert":true
    //   };

    //   _this.myHttp(configForLoginNum,function(){
    //     _this.loginNumArr.forEach(function(item){
    //       _this.chart2_label.push(item.create_time.slice(6,10));
    //       _this.chart2_data.push(item.num-0);
    //   });
    //   //获取登录量曲线dom元素
    //   var ctx2 = document.getElementById("lineChart2").getContext("2d");
    //   var lineChart2 = new Chart(ctx2);
    //   //配置参数
    //   var xArr=_this.chart2_label;
    //   var yArr=_this.chart2_data;
    //   var areaChartData2 = {
    //   labels: xArr,
    //   datasets: [
    //     {
    //       label: "登陆量",
    //       fillColor: "rgb(60, 141, 188)",
    //       strokeColor: "rgb(60, 141, 188)",
    //       pointColor: "rgb(60, 141, 188)",
    //       pointStrokeColor: "rgb(60, 141, 188)",
    //       pointHighlightFill: "#fff",
    //       pointHighlightStroke: "rgba(60,141,188,1)",
    //      data: yArr
    //     }
    //   ]};
    //   //配置选项
    //   var areaChartOptions = {
    //     showScale: true,
    //     scaleShowGridLines: false,
    //     scaleGridLineColor: "rgba(0,0,0,.05)",
    //     scaleGridLineWidth: 1,
    //     scaleShowHorizontalLines: true,
    //     scaleShowVerticalLines: true,
    //     bezierCurve: true,
    //     bezierCurveTension: 0.3,
    //     pointDot: true,
    //     pointDotRadius: 4,
    //     pointDotStrokeWidth: 1,
    //     pointHitDetectionRadius: 20,
    //     datasetStroke: true,
    //     datasetStrokeWidth: 2,
    //     datasetFill: false,
    //     maintainAspectRatio: true,
    //     responsive: true
    //   };
    //   var lineChartOptions= areaChartOptions;
    //   lineChartOptions.datasetFill =  false;
    //   lineChart2.Line(areaChartData2, lineChartOptions);
    // });

    // }
  }
</script>
<style scoped>
  .box{
    border-top:2px solid #f39c12;
  }
  .myclass th{
    background-color: #3c8dbc;
  }
/*  .fa{
    cursor: default !important;
  }*/
</style>
