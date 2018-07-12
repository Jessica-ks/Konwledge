<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <my-upload field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      url="/gxsz_office/index.php?g=UsersManager&m=AdminUsersManager&a=uploadfile"
      img-format="jpg">
    </my-upload>
    <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
      <div class="box-body">
       <div class="row">
         <div class="col-md-4  col-sm-12  col-xs-12">
           <div class="row"> 
             <div class="form-group" :class="{'has-error':phoneTips}">
               <label>手机号</label>
               <el-input v-model.trim="phone" placeholder="*请输入手机号(默认用户名)"></el-input>
               <!--     <span class="help-block" style="text-align:center" v-show="phoneTips">{{phoneTips}}</span> -->
             </div>
           </div>
           <div class="row"> 
             <div class="form-group" :class="{'has-error':IDcardTips}">
               <label>身份证号</label>
               <el-input v-model.trim="IDcard" placeholder="*请输入身份证号"></el-input>
               <!--    <span class="help-block" style="text-align:center" v-show="IDcardTips">{{IDcardTips}}</span> -->
             </div>
           </div>
           <div class="row"> 
             <div class="form-group" :class="{'has-error':workTypeTips}">
               <label>工作类别</label>
            <el-select v-model.trim="workType" placeholder="*请选择工作类别"  clearable filterable>
            <el-option v-for="item in workType_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
               <!--      <span class="help-block" style="text-align:center" v-show="workTypeTips">{{workTypeTips}}</span> -->
             </div>
           </div>
         </div>
         <div class="col-md-4 col-sm-12  col-xs-12">
           <div class="row">
            <div class="form-group" :class="{'has-error':realNameTips}">
             <label>姓名</label>
             <el-input v-model.trim="realName" placeholder="*请输入姓名"></el-input>
             <!--    <span class="help-block" style="text-align:center" v-show="realNameTips">{{realNameTips}}</span> -->
           </div>
           </div>
           <div class="row"> 
           <div class="form-group" :class="{'has-error':emailTips}">
             <label>邮箱</label>
             <el-input v-model.trim="email" placeholder="*请输入邮箱"></el-input>
             <!--     <span class="help-block" style="text-align:center" v-show="emailTips">{{emailTips}}</span> -->
           </div>
           </div>
           <div class="row"> 
           <div class="form-group" :class="{'has-error':dutyTips}">
           <label>职务</label>
            <el-input v-model.trim="duty" placeholder="*请输入职务"></el-input>
            <!-- <el-select v-model.trim="duty" placeholder="*请选择职务"  clearable filterable>
            <el-option v-for="item in duty_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select> -->
           <!--        <span class="help-block" style="text-align:center" v-show="zhiwuTips">{{zhiwuTips}}</span> -->
           </div>
           </div>
         </div>
         <div class="col-md-4 col-sm-12  col-xs-12">
           <div class="avatar-container">
             <img :src="imgDataUrl" height="200" width="200" alt="用户头像">
             <div class="img-mask" @click="avatarSubmit()">
               <i class="fa fa-pencil-square-o" style="font-size:30px"></i>
             </div>
           </div>
         </div>
       </div>

       <div class="row">
        <div class="col-md-4  col-sm-12  col-xs-12">
          <div class="form-group" :class="{'has-error':schoolTips}">
            <label>所属学校</label>
            <el-select v-model.trim="school" placeholder="*请选择所属学校"  clearable filterable>
            <el-option v-for="item in sch_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
          </div>
        </div>
        <div class="col-md-4  col-sm-12  col-xs-12">
          <div class="form-group" :class="{'has-error':depTips}">
            <label>工作部门</label>
            <el-select v-model.trim="dep" placeholder="*请选择工作部门"  clearable filterable>
              <el-option v-for="item in dep_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <!--    <span class="help-block" style="text-align:center" v-show="depTips">{{depTips}}</span> -->
          </div>
        </div>
        <div class="col-md-4  col-sm-12  col-xs-12">
          <div class="form-group" :class="{'has-error':workTimeTips}">
           <label>参加工作时间</label>
           <el-date-picker v-model.trim="workTime"  clearable type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
           <!--    <span class="help-block" style="text-align:center" v-show="workTimeTips">{{workTimeTips}}</span> -->
         </div>
        </div>
       </div> 

       <div class="row">
         <div class="col-md-4 col-sm-12  col-xs-12">
           <div class="form-group" :class="{'has-error':nationTips}">
             <label>民族</label>
             <el-select v-model.trim="nation" placeholder="*请选择民族"  clearable filterable>
              <el-option v-for="item in nation_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <!--     <span class="help-block" style="text-align:center" v-show="nationTips">{{nationTips}}</span> -->
          </div>
        </div>
        <div class="col-md-4 col-sm-12  col-xs-12">
         <div class="form-group" :class="{'has-error':workNameTips}">
           <label>现任职称</label>
           <el-input v-model.trim="workName" placeholder="*请输入现任职称"></el-input>
           <!-- <el-select v-model.trim="workName" placeholder="*请选择现任职称"  clearable filterable>
            <el-option v-for="item in workName_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select> -->
          <!--   <span class="help-block" style="text-align:center" v-show="workNameTips">{{workNameTips}}</span> -->
          </div>
        </div>
        <div class="col-md-4 col-sm-12  col-xs-12">
          <div class="form-group" :class="{'has-error':titleTimeTips}">
           <label>获得职称时间</label>
           <el-date-picker v-model.trim="titleTime"   clearable type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
           <!--     <span class="help-block" style="text-align:center" v-show="titleTimeTips">{{titleTimeTips}}</span> -->
         </div>
       </div>
      </div>

      <div class="row">
        <div class="col-md-4 col-sm-12  col-xs-12">
         <div class="form-group" :class="{'has-error':politicalTips}">
           <label>政治面貌</label>
           <el-select v-model.trim="political" placeholder="*请选择政治面貌"  clearable filterable>
            <el-option v-for="item in pol_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
          <!--     <span class="help-block" style="text-align:center" v-show="politicalTips">{{politicalTips}}</span> -->
        </div>
      </div>
      <div class="col-md-4 col-sm-12  col-xs-12">
       <div class="form-group" :class="{'has-error':educationTips}">
         <label>学历</label>
         <el-select v-model.trim="education" placeholder="*请选择学历"  clearable filterable>
          <el-option v-for="item in edu_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
        </el-select>
        <!--   <span class="help-block" style="text-align:center" v-show="educationTips">{{educationTips}}</span> -->
      </div>
    </div>
    <div class="col-md-4 col-sm-12  col-xs-12"> 
     <div class="form-group" :class="{'has-error':roleTips}">
       <label>角色</label>
       <el-select v-model.trim="role" placeholder="*请选择角色"  clearable filterable>
        <el-option v-for="item in role_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
      </el-select>
      <!--   <span class="help-block" style="text-align:center" v-show="roleTips">{{roleTips}}</span> -->
    </div>
  </div>
</div>

<div class="row">
  <div class="col-md-4 col-sm-12  col-xs-12">
   <div class="form-group" :class="{'has-error':qqTips}">
     <label>QQ号</label>
     <el-input v-model.trim="qq" placeholder="*请输入QQ号"></el-input>
     <!--      <span class="help-block" style="text-align:center" v-show="qqTips">{{qqTips}}</span> -->
   </div>
 </div>
 <div class="col-md-4 col-sm-12  col-xs-12">
   <div class="form-group" :class="{'has-error':workPhoneTips}">
     <label>工作电话</label>
     <el-input v-model.trim="workPhone" placeholder="*请输入工作电话(例如：027-1236547)"></el-input>
     <!--      <span class="help-block" style="text-align:center" v-show="workPhoneTips">{{workPhoneTips}}</span> -->
   </div>
 </div>
 <div class="col-md-4 col-sm-12  col-xs-12">
  <div class="form-group radio-height">
    <label>性别</label>
    <div class="input-group radio-height">
      <el-radio-group v-model="sex">
        <el-radio label="0">未知</el-radio>
        <el-radio label="1">男</el-radio>
        <el-radio label="2">女</el-radio>
      </el-radio-group>
    </div>
  </div>
</div>
</div>
<div class="row">
 <div class="col-md-12  col-sm-12 col-xs-12">
  <div class="form-group">
   <!-- <label>全日制教育经历</label> -->
<!--    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入全日制教育经历" v-model.trim="eduExperience">
</el-input> -->
</div>
</div>
</div>
<div class="row">
 <div class="col-md-12  col-sm-12 col-xs-12">
  <div class="form-group">
   <!--  <label>出国学习经历</label> -->
 <!--    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入出国学习经历" v-model.trim="studyExperience">
</el-input> -->
</div>
</div>
</div>
<div class="row">
  <div class="col-md-12  col-sm-12 col-xs-12">
    <div class="form-group">
      <!-- <label>培训经历</label> -->
    <!--   <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入培训经历" v-model.trim="trainExperience">
  </el-input> -->
</div>
</div>
</div>
<div class="row">
  <div class="col-md-12  col-sm-12 col-xs-12">
    <div class="form-group">
      <!-- <label>主要荣誉</label> -->
   <!--    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入主要荣誉" v-model.trim="honor">
 </el-input> -->
</div>
</div>
</div>
<div class="row">
  <div class="col-md-12  col-sm-12 col-xs-12">
    <div class="form-group">
      <!-- <label>个人成果</label> -->
   <!--    <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入个人成果" v-model.trim="personSuccess">
 </el-input> -->
</div>
</div>
</div>
<div class="row">
  <div class="col-md-12  col-sm-12 col-xs-12">
    <div class="form-group">
      <!-- <label>工作经验</label> -->
      <!-- <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入工作经验" v-model.trim="workExperience">
    </el-input> -->
  </div>
</div>
</div>
</div>
<div class="button-wrapper" >
  <button  type="button" class="btn btn-primary submit" :disabled="Loading" @click="formSubmit()" style="margin-bottom:20px;">提 交</button>
</div>
</div>
</div>
<!-- <div class="col-md-2 col-sm-12 col-xs-12" style="border:1px solid #3c8dbc">
  <ul class="rightBar">
    <li><el-button size="small" data-toggle="modal" data-target="#education">全日制教育经历</el-button></li>
    <li><el-button size="small" data-toggle="modal" data-target="#education">出国学习经历</el-button></li>
    <li><el-button size="small" data-toggle="modal" data-target="#education">培训经历</el-button></li>
    <li><el-button size="small" data-toggle="modal" data-target="#education">主要荣誉</el-button></li>
    <li><el-button size="small" data-toggle="modal" data-target="#education">个人成果</el-button></li>
    <li><el-button size="small" data-toggle="modal" data-target="#education">工作经验</el-button></li>
  </ul>
</div> -->
<!-- 搜索模态框 -->
<div class="modal fade" id="education" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">全日制教育经历</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入学校..." v-model.trim="eduInfo.schAdr">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入学历..." v-model.trim="eduInfo.edu">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入专业..." v-model.trim="eduInfo.major">
            </div>
          </div>

          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="eduInfo.staTime" type="date" placeholder="起始日期" ></el-date-picker>-
            <el-date-picker v-model="eduInfo.endTime" type="date" placeholder="结束日期" ></el-date-picker>
           </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="eduSubmit()">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
      </div>
    </div>
  </div>
</div>
</div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  export default {
   name: 'addUsers',
   data() {
     return {
      imgDataUrl: '/gxsz_office/data/upload/avatar/default.jpg',
      show: false,
      headers: {
        smail: '*_~'
      },
      Loading:true,
      loading:false,
      optionsObj:'',
      phone:'',
      phoneTips:'',
      realName:'',
      realNameTips:'',
      IDcard:'',
      IDcardTips:'',
      nation:'',
      nation_list:[],
      nationTips:'',
      political:'',
      pol_list:[],
      politicalTips:'',
      school:'',
      sch_list:[],
      schoolTips:'',
      dep:'',
      dep_list:[],
      depTips:'',
      workTime:'',
      workTimeTips:'',
      workType:'',
      workType_list:[],
      workTypeTips:'',
      workName:'',
      workNameTips:'',
      workName_list:[],
      titleTime:'',
      titleTimeTips:'',
      duty:'',
      duty_list:[],
      dutyTips:'',
      education:'',
      edu_list:[],
      educationTips:'',
      role:'',
      role_list:[],
      roleTips:'',
      qq:'',
      qqTips:'',
      email:'',
      emailTips:'',
      workPhone:'',
      workPhoneTips:'',
      sex:"0",
      eduExperience:[],
      eduInfo:{
        schAdr:'',
        edu:'',
        major:'',
        staTime:'',
        endTime:''
      },
      studyExperience:'',
      trainExperience:'',
      honor:'',
      personSuccess:'',
      workExperience:'',
      fileInfo:''
    }
  },
  methods: {
    avatarSubmit(){
      this.show = !this.show;
    },
    cropSuccess(imgDataUrl, field){
      console.log('-------- 裁剪 success --------');
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field){
      console.log('-------- 上传 success --------');
      console.log('field: ' + field);
      this.fileInfo=jsonData.data;
    },
    cropUploadFail(status, field){
      console.log(status,'-------- 上传 fail --------');
      _this.$message({
        "message": "上传头像失败",
        "type": "error"
      });
      console.log('field: ' + field);
    },
    //教育经历
    eduSubmit(){
      
    },
    formSubmit(){
      var _this = this;
      var checkResult = _this.checkList([
      {
        "name": "phone",
        "reg": ["notnull","phone"]
      },          {
        "name": "realName",
        "reg": ["notnull","realname"]
      },
      {
        "name": "IDcard",
        "reg": ["notnull","idcard"]
      },
      {
        "name": "email",
        "reg": ["notnull","email"]
      },
      {
        "name": "nation",
        "reg": ["notnull"]
      },
      {
        "name": "political",
        "reg": ["notnull"]
      },
      {
        "name": "school",
        "reg": ["notnull"]
      },
      {
        "name": "workType",
        "reg": ["notnull"]
      },
      {
        "name": "workName",
        "reg": ["notnull"]
      }
      ,
      {
        "name": "duty",
        "reg": ["notnull"]
      }
      ,
      {
        "name": "education",
        "reg": ["notnull"]
      }
      ,
      {
        "name": "role",
        "reg": ["notnull"]
      }
      ,
      {
        "name": "qq",
        "reg": ["notnull","qq"]
      }
      ,
      {
        "name":"dep",
        "reg":["notnull"]
      } ,
      {
        "name": "workPhone",
        "reg": ["notnull","officephone"]
      }
      ]);
      if (checkResult) {
        _this.Loading = true;
          //发送提交表单请求
          var config = {
            method: 'post',
            url: '/index.php?g=UsersManager&m=AdminUsersManager&a=addPost',
            params: {
              'user_nicename':_this.realName,
              'user_qq' :_this.qq,
              'user_phone' :_this.phone,
              "workPhone":_this.workPhone,
              'role_id' :_this.role,
              'sex' :_this.sex,
              'sch_id':_this.school,
              'workunit':_this.workName,
              'user_email':_this.email,
              'department':_this.dep,
              'user_nation':_this.nation,
              'political_status':_this.political,
              'work_time':_this.formatDate(_this.workTime),
              'fulltime_schooling':_this.eduExperience,   
              'onthejob_education':_this.education,
              "duty":_this.duty,
              'studyabroad_experience':_this.studyExperience,
              'current_title':_this.workName,
              'access_time':_this.formatDate(_this.titleTime),
              'job_category':_this.workType, 
              'training_experience':_this.trainExperience,
              'major_honors':_this.honor,
              'ID_number':_this.IDcard,
              "img_url":_this.fileInfo?_this.fileInfo.url:''
            }
          };
          _this.myHttp(config);
        }else{            
          this.$message({
        "message": "请填写完整信息!",
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
          "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=advanceSearch',
          "carrier": "optionsObj",
          "notAlert": true
        };
        _this.myHttp(config,function(){
          //绑定下拉列表选项数据
          _this.edu_list=_this.optionsObj.education;
          _this.duty_list=_this.optionsObj.duty;
          _this.workType_list=_this.optionsObj.work_type;
          _this.pol_list=_this.optionsObj.political;
          _this.dep_list=_this.optionsObj.dept;
          _this.workName_list=_this.optionsObj.current_title;
          _this.nation_list=_this.optionsObj.user_nation;
          _this.role_list=_this.optionsObj.name;
          _this.status_list=_this.optionsObj.user_status;
          _this.sch_list=_this.optionsObj.sch_name;
        });
      },
      components: {
       'my-upload': myUpload
     }
   }
 </script>
 <style scoped>
   .avatar-container {
    position: relative;
    height: 200px;
    margin-bottom: 20px;
    margin-top: 20px
  }

  .avatar-container .img-mask {
    transition: opacity .4s linear;
    position: absolute;
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
  .form-group .el-input{
    width:100%;
  }
  .rightBar{
    margin-top: 10px
  }
  .rightBar li{
    margin-bottom: 10px
  }
</style>
