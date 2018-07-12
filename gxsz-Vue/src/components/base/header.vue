<template>
 <header class="main-header">
    <input type="hidden" id="UserInfoId" :value="userid">
   <input type="hidden" id="UserInfoName" :value="username">
   <input type="hidden" id="UserLogin" :value="userlogin">
   <input type="hidden" id="UserAvatar" :value="avatar">
   <input type="hidden" id="UserSign" :value="sign">
  <!-- Logo -->
  <a href="#" class="logo">
    <!-- mini logo for sidebar mini 50x50 pixels -->
    <span class="logo-mini"><img src="../../assets/logo.png"  width="50" alt="logo"></span>
    <!-- logo for regular state and mobile devices -->
    <span class="logo-lg"><img src="../../assets/logo.png"  width="40" alt="logo"> <b>办公自动化平台</b></span>
  </a>
  <!-- Header Navbar: style can be found in header.less -->
  <nav class="navbar navbar-static-top">
    <!-- Sidebar toggle button-->
    <a href="#" class="sidebar-toggle" data-toggle="offcanvas" role="button"></a>
    <span class="slogan">上网不涉密，涉密不上网</span>
    <div class="navbar-custom-menu">
      <ul class="nav navbar-nav">
       <li @click='go("/")'>
        <a href="#"  >
          <i class="fa fa-home"></i>
        </a>
      </li>
      <!-- Messages: style can be found in dropdown.less-->
      <li @click='go("Notification/AdminNotification/unReadList/1")'>
        <a href="javascript:;" >
          <i class="fa fa-bell-o"></i>
          <span v-show="NotiCount" class="label label-success">{{NotiCount}}</span>
        </a>
      </li>
      <!-- Notifications: style can be found in dropdown.less -->
      <li @click='go("Message/AdminMessage/unReadList/1")'>
        <a href="javascript:;" >
          <i class="fa fa-envelope-o"></i>
          <span  v-show="MsgCount"  class="label label-warning">{{MsgCount}}</span>
        </a>
      </li>
      <!-- Tasks: style can be found in dropdown.less -->

      <!-- User Account: style can be found in dropdown.less -->
      <li class="dropdown user user-menu">
        <a href="#" class="dropdown-toggle" data-toggle="dropdown">
          <img :src="avatar"  width="160" class="user-image" alt="用户头像">
          <span class="hidden-xs">{{username}}</span>
        </a>
        <ul class="dropdown-menu">
          <!-- User image -->
          <li class="user-header">
            <img :src="avatar" width="160" class="img-circle" alt="用户头像">
            <p>
              <b>{{username}}</b> <br><small>{{name}}</small>
              <small>上次登录时间: {{login_time}}</small>
            </p>
          </li>
          <!-- Menu Footer-->
          <li class="user-footer" >
            <div class="pull-left" @click='go("Users/AdminUsers/userinfo")'>
              <a  href="javascript:;" class="btn btn-info btn-flat">个人设置</a>
            </div>
            <div class="pull-right">
              <a href="/gxsz_office/index.php?g=Admin&m=public&a=logout" class="btn btn-default btn-flat">注销</a>
            </div>
          </li>
        </ul>
      </li>
      <!-- Control Sidebar Toggle Button -->
      <li>
        <a href="#" data-toggle="control-sidebar"><i class="fa fa-gears"></i></a>
      </li>
    </ul>
  </div>
</nav>
    <aside class="control-sidebar control-sidebar-dark" >
      <div class="tab-content">
        <div class="tab-pane active" id="control-sidebar-home-tab">
          <ul class="control-sidebar-menu">
            <li style="margin-top: 0" >
              <a href="http://www.nmc.cn/publish/forecast/AHB/wuhan.html" target="_blank" data-toggle="tooltip" data-placement="top" title="天气">
                <i class="menu-icon fa fa-thermometer-full bg-blue" style="font-size: 22px;"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" @click='go("Privilege/AdminPrivilege/calender")' target="_blank"  title="日历">
                <i class="menu-icon fa fa-calendar bg-blue" style="font-size: 22px;"></i>
              </a>
            </li>
            <li>
              <a href="javascript:;" @click='go("Privilege/AdminPrivilege/calculator")' target="_blank"  title="计算器">
                <i class="menu-icon fa fa-calculator bg-blue" style="font-size: 22px;"></i>
              </a>
            </li>

            <li>
              <a href="http://www.12306.cn/mormhweb/" target="_blank"  title="时刻表">
                <i class="menu-icon fa fa-subway bg-blue" style="font-size: 22px;"></i>
              </a>
            </li>
            <li >
              <a href="http://www.kuaidi100.com/?from=openv" target="_blank"  title="快递">
                <i class="menu-icon fa fa-truck bg-blue" style="font-size: 22px;"></i>
              </a>
            </li>
            <li >
              <a href="http://map.baidu.com/" target="_blank" data-toggle="tooltip" data-placement="bottom" title="地图">
                <i class="menu-icon fa fa-map-marker bg-blue" style="font-size: 22px;"></i>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </aside>
</header>
</template>

<script>
  import io from '../../../static/sockit.js';
  export default{
   name:'main-header',
   data(){
    return {
      DataArr:[],
      username:'',
      name:'',
      login_time:'',
      avatar:'',
      NotiCount:'',
      MsgCount:'',
      userid:'',
      userlogin:'',
      sign:''
    }
  },
  created(){
    var _this=this;
    var configForInfo = {
      "method": 'get',
      "url": '/index.php?g=Office&m=Indexadmin&a=userhead_info',
      "carrier":"DataArr",
      "notAlert":true
    };
    _this.myHttp(configForInfo,function(){
      _this.username=_this.DataArr[0].user_nicename;
      _this.name=_this.DataArr[0].name;
      _this.login_time=_this.DataArr[0].last_login_time;
      _this.userid=_this.DataArr[0].id;
      _this.avatar='/gxsz_office/'+_this.DataArr[0].avatar;
      _this.userlogin=_this.DataArr[0].user_login;
      _this.sign=_this.DataArr[0].sign;
       // var socket = io('http://'+document.domain+':2120');
      var socket = io('http://202.114.255.79:2124');
       // uid可以是自己网站的用户id，以便针对uid推送以及统计在线人数
      var uid = _this.userid;
       // socket连接后以uid登录
      socket.on('connect', function(){
        console.log('登录成功,id是'+uid);
          socket.emit('login', uid);
      });
      // 后端推送来消息时
      socket.on('new_msg', function(msg){
         console.log('收到新的消息',msg);
         _this.MsgCount++;
      // var configForNotiCount = {
      //   "method": 'get',
      //   "url": '/index.php?g=Notification&m=AdminNotification&a=notificationCount',
      //   "notAlert":true
      // };
      // _this.myHttp(configForNotiCount,function(res){
      //   _this.NotiCount=res.data-0;
      // });
      // var configForMsgCount = {
      //   "method": 'get',
      //   "url": '/index.php?g=Message&m=AdminMessage&a=unReadCount',
      //   "notAlert":true
      // };
      // _this.myHttp(configForMsgCount,function(res){
      //   _this.MsgCount=res.data-0;
      // });
      });
      // 后端推送来在线数据时
      socket.on('update_online_count', function(online_stat){
         console.log('在线数据'+online_stat);
      });
      socket.on('publish',function(){
        //后台推送未读公告时
        console.log('收到新的未读公告!');
          _this.NotiCount++;
      });
    });
    var configForNotiCount = {
      "method": 'get',
      "url": '/index.php?g=Notification&m=AdminNotification&a=notificationCount',
      "notAlert":true
    };
    _this.myHttp(configForNotiCount,function(res){
      _this.NotiCount=res.data-0;
    });
    var configForMsgCount = {
      "method": 'get',
      "url": '/index.php?g=Message&m=AdminMessage&a=unReadCount',
      "notAlert":true
    };
    _this.myHttp(configForMsgCount,function(res){
      _this.MsgCount=res.data-0;
    });
  }

}
</script>
<style scoped>
.control-sidebar-menu>li>a {
    display: block;
    padding: 10px 5px;
}
.slogan {
  line-height: 45px;
  color: #fff;
  font-size: 18px;
  font-family: 'Microsoft Yahei';
}
</style>
