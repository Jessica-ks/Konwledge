// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import VueResource from 'vue-resource'
import $ from './assets/libs/jquery'
import './assets/base/js/bootstrap.min'
import './assets/base/js/app.min.js'
// import './assets/base/css/bootstrap.min.css'
import './assets/base/css/AdminLTE.min.css'
import './assets/base/css/skin-blue.min.css'
// import './assets/base/css/font-awesome.min.css'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-default/index.css'


//引入自定义css
import './assets/base/css/adjust.css'
Vue.use(ElementUI);
Vue.use(VueResource);

//全局的一个跳转路由方法
Vue.prototype.go = function (url,num) {
  if (url === '#' || null) {
    return false;
  } else if (url) {
    if(num&&num>0){
      var oldPath=this.$route.path.split('/');
      oldPath.pop();
      oldPath.push(num);
      var newPath=oldPath.join('/');
      this.$router.push(newPath);
    }
    else{
      this.$router.push('/' + url);
    }
  }
};

//时间格式转换
Vue.prototype.formatDate=function (time) {
  if(time==='') {return '';}
  if(time.toString().indexOf('-')!==-1){return time;}
    //单个需要转换的时间
    var d = new Date(time);
    if(d.getMonth() + 1<10) {
      var month='0'+(d.getMonth() + 1);

    }else {
      var month=d.getMonth() + 1;
    };

    if(d.getDate()<10){
      var date='0'+d.getDate();
    }else{
      var date=d.getDate();
    }
    return  d.getFullYear() + '-' + month + '-' + date;
  };

//清空数据和对应的Tips
Vue.prototype.resetData=function(arr){
  var _this=this;
  arr.forEach(function(item){
    _this[item]='';
    if(_this[item+'Tips']) {_this[item+'Tips']='';}
  });
};
Vue.prototype.resetObj=function(arr){
  var _this=this;
  arr.forEach(function(item){
    if(_this[item].length>=0){
      //是一个数组
      _this[item]=[];
    }else{
      for(var attr in _this[item]){
        _this[item][attr]='';
      };
    }

  });
};
//验证多个对象方法
//arr=[{"name":user_login,"reg":[notnull,xxx]}]
//必须保证name已经有相应的 Tips
Vue.prototype.checkList = function (arr) {
  var _this = this;

  function test(type, str) {
    var reg = '';
    switch (type) {
      case "qq":
      reg = /^\d{5,10}$/;
      return reg.test(str) ? false : 'qq号格式不正确!';
      case "onlywords":
      reg = /^[\w\s]+$/;
      return reg.test(str) ? false : '不能包含中文!';
      case "username":
      reg = /^[a-zA-z]\w{3,15}$/;
      return reg.test(str) ? false : '用户名格式错误!';
      case "password":
      return str.trim().length > 5 ? false : '密码至少6位!';
      case "email":
      reg = /^([a-zA-Z0-9])+@([a-zA-Z0-9_-])+((\.[a-zA-Z0-9_-]{2,3}){1,2})$/;
      return reg.test(str) ? false : '邮箱格式错误!';
      case "phone":
      reg = /^1\d{10}$/;
      return reg.test(str) ? false : '手机号格式错误!';
      case "officephone":
      reg = /^0\d{2,3}-?\d{7,8}$/;
      return reg.test(str) ? false : '工作电话格式错误!';
      case "notnull":
      return !str? '不能为空' : false;
      case "idcard":
      reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
      return reg.test(str)? false: '身份证号格式不正确!';
      case "realname":
      reg=/[\u4E00-\u9FA5\uF900-\uFA2D]/;
      return reg.test(str) ? false : '姓名格式错误!';
      default:
      return "没有对应的验证格式...";
      // ...
    }
  };
  arr.forEach(function (item) {
    //遍历每个需要核对的对象
    for (var i = 0, len = item.reg.length; i < len; i++) {
      //对每个对象的每个reg规则进行核对
      var checkResult = test(item.reg[i], _this[item.name]);
      if (checkResult) {
        //不符合规则,停止核对,并返回给相应的tips,以便检验
        if (_this[item.name]==='' && item.reg[i] !== 'notnull') {
          //如果这个值为空,且验证规则没有notnull,那么跳过判断
          break;
        }
        _this[item.name+'Tips'] = checkResult;
        break;
      }else{
        //验证通过的时候 把相应的Tips重置
        _this[item.name+'Tips']=''
      }
    }

  });
  //返回所有需要验证对象的验证结果的 与值
  return arr.every(function (item) {
    return !_this[item.name+'Tips']
  });
};
var _ROOT_='';
//发起请求方法
Vue.prototype.myHttp = function (config,fn1,fn2) {
  var _this=this;

  process.env.NODE_ENV === 'production'
  ? _ROOT_='/gxsz_office'
  : _ROOT_='';

  //------config配置参数------
  var method = config.method;
  var url = _ROOT_+config.url;
  var params = config.params||'';
  var notAlert=config.notAlert||false;
  _this.Loading=config.notLoading;
  //设置数据载体
  var carrier=config.carrier?config.carrier:'';
  //------config配置参数------



  if(method.toLowerCase()==="get"){
    var config={
      "method": "get",
      "url":url,
      "params":params
    };
  }
  else if(method.toLowerCase()==="post"){
    var config={
      "method": "post",
      "url":url,
      "body":params,
      "emulateJSON":true
    };
  }

  this.$http(config).then(function (res) {
    if((typeof res.data.code==='undefined')){
      _this.$message({
          "message": '后台出现异常!',
          "type": "warning"
        });
      return false;
    }
    if (res.data.code === 0) {
      //请求成功
      if(notAlert===false){
        _this.$message({
          "message": res.data.msg,
          "type": "success"
        });
      }
      //绑定数据到carrier上

      if(carrier){
        _this[carrier]=res.body.data;
      }

      //清空按钮和界面的loading状态
      _this.loading = false;
      _this.Loading = false;
      //执行回调函数
      if(fn1){fn1(res.body)}
    }
    else if (res.data.code === 1) {
      //失败
      // if(modalId){$('#'+modalId).modal('hide')};
      if(notAlert===false){
        _this.$message({
          "message": res.data.msg,
          "type": "error"
        });
      }
      //清空按钮和界面的loading状态
      _this.loading = false;
      _this.Loading = false;
      if(fn2){fn2(res.body)}
    }
  }, function (err) {
_this.$message({
          "message": '后台出现异常!',
          "type": "warning"
        });
    console.log('错误信息:',err);
  })
};
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: {App}
});

