<template>
  <div class="row" v-loading="Loading" element-loading-text="正在加载中...">
    <my-upload field="file"
               @crop-success="cropSuccess"
               @crop-upload-success="cropUploadSuccess"
               @crop-upload-fail="cropUploadFail"
               v-model="show"
               url="/gxsz_office/index.php?g=Office&m=Usersadmin&a=uploadfile"
               :params="params"
               img-format="jpg"></my-upload>
    <div class="col-md-4 col-sm-4 col-xs-12">
      <div class="avatar-container">
        <img :src="imgDataUrl" height="200" width="200" alt="用户头像" class="img-circle">
        <div class="img-mask" @click="avatarSubmit()">
          <i class="fa fa-pencil-square-o" style="font-size:30px"></i>
        </div>
      </div>
    </div>
    <div class="col-md-6 col-sm-7 col-xs-12">
      <div class="userinfo-form">
        <div class="box box-primary">
          <div class="box-body">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>姓名</label>
                  <input type="text" class="form-control" disabled="" v-model="DataObj.user_nicename" >
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>学校</label>
                  <el-select v-model.trim="school"  placeholder="请选择学校" disabled="" clearable filterable>
                     <el-option v-for="item in sch_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
                  </el-select>
                </div>
              </div>
            </div>

            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>部门</label>
                  <el-select v-model.trim="dep" placeholder="请选择工作部门" :disabled="depisdisabled" clearable filterable>
                    <el-option v-for="item in dep_list" :label="item.label" :value="item.value" :key="item.value" ></el-option>
                  </el-select>
                </div>

              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>帐号密码</label>
                  <a href="javascript:;" data-toggle="modal" data-target="#modalPassword">修改密码</a>
                  <input type="text" class="form-control" disabled="" value="********">
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>邮箱</label>
                  <small class="label  bg-green" v-if="DataObj.email_confirm===1">已验证</small>
                  <a href="javascript:;" data-toggle="modal" data-target="#modalEmail">修改邮箱</a>
                  <input type="text" class="form-control" placeholder="请输入邮箱" disabled="" v-model="DataObj.user_email">
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group">
                  <label>手机</label>
                  <small class="label  bg-green" v-if="DataObj.phone_confirm===1">已验证</small>
                  <a href="javascript:;" data-toggle="modal" data-target="#modalPhone">修改手机</a>
                  <input type="text" class="form-control" placeholder="请输入手机号" disabled="" v-model="DataObj.user_phone">
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="box box-primary">
          <div class="box-body">
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group" :class="{'has-error':user_loginTips}">
                  <label for="user_login">用户名</label>
                  <input type="text" class="form-control" id="user_login" placeholder="请输入用户名" v-model.trim="user_login" :disabled="!depisdisabled">
                  <span class="help-block" style="text-align:center" v-show="user_loginTips">{{user_loginTips}}</span>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group radio-height">
                  <label>性别</label>
                  <a href="javascript:;"  @click='go("Users/AdminUsers/usersDetail")' v-show="detailisdisabled">查看更多</a>
                  <div class="input-group radio-height">
                    <el-radio-group v-model="user_sex">
                      <el-radio label="0">未知</el-radio>
                      <el-radio label="1">男</el-radio>
                      <el-radio label="2">女</el-radio>
                    </el-radio-group>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group" :class="{'has-error':user_telTips}">
                  <label>电话</label>
                  <input type="text" class="form-control" v-model.trim="user_tel" id="user_tel" autocomplete="off">
                   <span class="help-block" style="text-align:center" v-show="user_telTips">{{user_telTips}}</span>
                </div>
              </div>
              <div class="col-md-6 col-sm-6 col-xs-12">
                <div class="form-group" :class="{'has-error':user_qqTips}">
                  <label for="user_qq">QQ号</label>
                  <input type="text" class="form-control" v-model.trim="user_qq" id="user_qq" autocomplete="off">
                  <span class="help-block" style="text-align:center" v-show="user_qqTips">{{user_qqTips}}</span>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-md-12 col-sm-12 col-xs-12">
                <div class="form-group">
                  <label>个性签名</label>
                  <textarea class="form-control" style="resize:none" rows="3" placeholder="请输入签名内容..."
                            v-model.trim="user_signature"></textarea>
                </div>
              </div>
            </div>
            <div class="button-wrapper">
              <button type="button" class="btn btn-primary submit"  @click="formSubmit()">提 交
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <div class="col-md-2 col-sm-1 col-xs-12">
    </div>

    <!-- 修改手机模态框 -->
    <div class="modal fade" id="modalPhone" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">修改手机</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':nowPhoneTips,'has-success':!nowPhoneTips}">
                <input type="text" class="form-control" placeholder="请输入手机号" v-model.trim="nowPhone">
                <span class="help-block" style="text-align:center" v-show="nowPhoneTips">{{nowPhoneTips}}</span>
              </div>
              <div class="form-group">
                <input type="text" class="form-control" :style="SMSstyle" placeholder="请输入验证码" v-model.trim="smsCode">
                <input type="button" class="btn  btn-primary" :style="SMSbtn" value="获取短信验证码" v-loading="loading"
                       :disabled="loading" @click="sendSMS()">
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="phoneSubmit()" v-loading="loading"
                    :disabled="loading">确定
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改邮箱模态框 -->
    <div class="modal fade" id="modalEmail" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">修改邮箱</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':nowEmailTips,'has-success':!nowEmailTips}">
                <input type="text" class="form-control" placeholder="请输入邮箱地址" v-model.trim="nowEmail">
                <span class="help-block" style="text-align:center" v-show="nowEmailTips">{{nowEmailTips}}</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="eSubmit()" v-loading="loading" :disabled="loading">
              确定
            </button>
            <button type="button" class="btn btn-default" data-dismiss="modal">取消</button>
          </div>
        </div>
      </div>
    </div>
    <!-- 修改密码模态框 -->
    <div class="modal fade" id="modalPassword" tabindex="-1" role="dialog">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">修改密码</h3>
          </div>
          <div class="modal-body">
            <form>
              <div class="form-group" :class="{'has-error':oldPWTips,'has-success':!oldPWTips}">
                <input type="text" class="form-control" placeholder="请输入原密码" v-model.trim="oldPW">
                <span class="help-block" style="text-align:center" v-show="oldPWTips">{{oldPWTips}}</span>
              </div>
              <div class="form-group" :class="{'has-error':nowPW2Tips,'has-success':!nowPW2Tips}">
                <input type="password" class="form-control" placeholder="请输入新密码" v-model.trim="nowPW1">
              </div>
              <div class="form-group" :class="{'has-error':nowPW2Tips,'has-success':!nowPW2Tips}">
                <input type="password" class="form-control" placeholder="确认新密码" v-model.trim="nowPW2">
                <span class="help-block" style="text-align:center" v-show="nowPW2Tips">{{nowPW2Tips}}</span>
              </div>
            </form>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="pwSubmit()" v-loading="loading" :disabled="loading">
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
  import myUpload from 'vue-image-crop-upload/upload-2.vue';

  export default {
    name:
      'userinfo',
    data() {
      return {
        imgDataUrl:'/gxsz_office/data/upload/avatar/default.jpg',
        show: false,
        params: {
          name: 'avatar'
        },
        headers: {
          smail: '*_~'
        },
        Loading: true,
        loading: false,
        DataObj: '',
        user_login: '',
        user_loginTips: '',
        user_qq: '',
        user_qqTips: '',
        nowPhone: '',
        nowPhoneTips: '',
        smsCode: '',
        nowEmail: '',
        nowEmailTips: '',
        user_tel: '',
        user_telTips:'',
        user_sex: '',
        dep:'',
        dep_list:[],
        depTips:'',
        school:'',
        sch_list:[],
        schoolTips:'',
        oldPW: '',
        oldPWTips: '',
        nowPW1: '',
        nowPW2: '',
        nowPW2Tips: '',
        user_signature: '',
        depisdisabled: false,
        detailisdisabled: true,
        role_id: '',
        SMSstyle: {
          display: 'inline-block',
          width: 'auto'
        },
        SMSbtn: {
          verticalAlign: "baseline"
        }
      }
    },
    methods: {
      avatarSubmit() {
        this.show = !this.show;
      },
      cropSuccess(imgDataUrl, field) {
        console.log('-------- 裁剪 success --------');
        this.imgDataUrl = imgDataUrl;
      },
      cropUploadSuccess(jsonData, field) {
        console.log('-------- 上传 success --------');
        console.log('field: ' + field);
      },
      cropUploadFail(status, field) {
        console.log('-------- 上传 fail --------');
        console.log('field: ' + field);
      },

      //提交个人信息表单
      formSubmit() {
        //验证所有需要验证的input字段
        var _this = this;
        var checkResult = _this.checkList([{
          "name": "user_login",
          "reg": ["notnull", "onlywords"]
        },
          {
            "name": "user_qq",
            "reg": ["qq"]
          },
          {
            "name": "user_tel",
            "reg": ["officephone"]
          }]);
        if (checkResult) {
          //通过验证 发送请求
          _this.Loading = true;
          var config = {
            "method": "post",
            "url": "/index.php?g=office&m=usersadmin&a=setting_post",
            "params": {
              "sch_id" : _this.school,
              "dept_id": _this.dep,
              "user_login": _this.user_login,
              "work_phone":_this.user_tel,
              "sex": _this.user_sex,
              "user_qq": _this.user_qq,
              "signature": _this.user_signature
            }
          };
          _this.myHttp(config);
        };
      },
      //发送短信验证码
      sendSMS() {
        //请求发送对应手机号的验证码
        var _this = this;
        //验证手机号是否合法
        var checkResult = _this.checkList([{
          "name": "nowPhone",
          "reg": ["notnull", "phone"]
        }]);
        if (checkResult) {
          //验证通过之后,发送请求
          var config = {
            "method": "get",
            "url": "/index.php?g=office&m=usersadmin&a=sendSmsCheckCode",
            "params": {
              "phone": _this.nowPhone
            }
          };
          _this.myHttp(config);
        }
      },
      //绑定手机号
      phoneSubmit() {
        //用户收到SMS之后请求绑定相应的手机号
        var _this = this;
        this.loading = true;
        var config = {
          "method": "get",
          "url": "/index.php?g=office&m=usersadmin&a=checkSmsCheckCode",
          "params": {
            "phone": _this.nowPhone,
            "phoneCheckCode": _this.smsCode,
          }
        };
        _this.myHttp(config,
          function() {
            $('.modal').modal('hide');
            _this.DataObj.user_phone=_this.nowPhone;
          })
      },
      //重置密码
      pwSubmit() {
        var _this = this;

        //先单独验证两次新密码是否相同
        if (_this.nowPW1 != _this.nowPW2) {
          _this.nowPW2Tips = "两次密码不等!";
          return false;
        };
        //验证密码格式
        var checkResult = _this.checkList([{
          "name": "oldPW",
          "reg": ["notnull", "password"]
        },
          {
            "name": "nowPW2",
            "reg": ["notnull", "password"]
          }]);
        if (checkResult) {
          _this.loading = true;
          var config = {
            "method": "post",
            "url": "/index.php?g=office&m=usersadmin&a=changePassword",
            "params": {
              "oldPassword": _this.oldPW,
              "newPassword": _this.nowPW2
            }
          };
          _this.myHttp(config,
            function() {
              $('.modal').modal('hide');
            });
        };
      },
      //绑定邮箱
      eSubmit() {
        var _this = this;
        var checkResult = _this.checkList([{
          "name": "nowEmail",
          "reg": ["notnull", "email"]
        }]);
        if (checkResult) {
          _this.loading = true;
          var config = {
            "method": 'post',
            "url": '/index.php?g=office&m=usersadmin&a=emailConfirm',
            "params": {
              "email": _this.nowEmail
            },
          };
          _this.myHttp(config,
            function() {
              $('.modal').modal('hide');
              _this.user_email=_this.nowEmail;
            });
        }
      }
    },
    created() {
      var _this = this;
      var config = {
        "method": "get",
        "url": "/index.php?g=office&m=usersadmin&a=userinfo",
        "carrier": "DataObj",
        "notAlert": true
      };
      _this.myHttp(config,
        function() {
          //初始化数据
          _this.user_login = _this.DataObj.user_login;
          _this.dep_list=_this.DataObj.dept;
          _this.dep=_this.DataObj.dept_id;
          _this.sch_list=_this.DataObj.sch;
          _this.school=_this.DataObj.sch_id;
          _this.user_sex = _this.DataObj.sex;
          _this.user_tel = _this.DataObj.work_phone;
          _this.user_qq = _this.DataObj.user_qq;
          _this.user_signature = _this.DataObj.signature;
          _this.role_id = _this.DataObj.role_id;
          _this.imgDataUrl='/gxsz_office/'+(_this.DataObj.avatar?_this.DataObj.avatar:'data/upload/avatar/default.jpg');
          if( _this.DataObj.change == 1 ){
            _this.depisdisabled = true;
          }else{
            _this.depisdisabled = false;
          }
          if(_this.DataObj.detail == 1){
            _this.detailisdisabled = false;
          }else{
            _this.detailisdisabled = true;
          }
        });
    },
    mounted() {
      var _this = this;
      $('.modal').on('hidden.bs.modal',
        function() {
          //模态框消失的时候,重置arr里的数据
          _this.resetData(["nowEmail", "nowPhone", "nowPW1", "nowPW2"]);
        });
    },
    components: {
      'my-upload': myUpload
    },
  }
</script>
<style scoped>
  .avatar-container {
    position: relative;
    height: 200px;
    margin-bottom: 20px
  }

  .avatar-container .img-mask {
    transition: opacity .4s linear;
    position: absolute;
    border-radius: 50%;
    left: 50%;
    transform: translate(-50%);
    width: 200px;
    height: 200px;
    background-color: black;
    opacity: 0;
    cursor: pointer;
    text-align: center;
  }

  .avatar-container .img-mask i {
    color: white;
    line-height: 200px;
  }

  .avatar-container .img-mask:hover {
    opacity: 0.6;
  }

  .avatar-container img {
    left: 50%;
    transform: translate(-50%);
    position: absolute;
  }

  .userinfo-form label {
    letter-spacing: 2px;
  }

  .userinfo-form .form-group a {
    display: inline-block;
    float: right;
    color: #2D59A2;
  }

  .el-date-editor.el-input {
    display: block;
    width: 100%;
  }
</style>
