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
             <div class="form-group">
               <label>手机号</label>
               <el-input v-model="phone" disabled="" placeholder="未输入手机号(默认用户名)" ></el-input>
             </div>
           </div>
             <div class="row">
             <div class="form-group">
               <label>身份证号</label>
               <el-input v-model="id_number" disabled="" placeholder="未输入身份证号"></el-input>
             </div>
           </div>
           <div class="row">
             <div class="form-group">
               <label>民族</label>
               <el-input v-model="nation" disabled="" placeholder="未选择民族"></el-input>
             </div>
           </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
            <div class="row">
              <div class="form-group">
               <label>姓名</label>
               <el-input v-model="realName" disabled="" placeholder="未输入姓名"></el-input>
             </div>
           </div>
           <div class="row">
             <div class="form-group">
             <label>邮箱</label>
               <el-input v-model="email" disabled="" placeholder="未输入邮箱"></el-input>
             </div>
           </div>
           <div class="row">
             <div class="form-group">
               <label>政治面貌</label>
               <el-input v-model="political" disabled="" placeholder="未选择政治面貌"></el-input>
             </div>
           </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
           <div class="avatar-container">
             <img :src="imgDataUrl" height="200" width="200" alt="用户头像">
            <!--  <div class="img-mask">
               <i class="fa fa-pencil-square-o" style="font-size:30px"></i>
             </div> -->
           </div>
          </div>
         </div>

         <div class="row">
           <div class="col-md-4  col-sm-12  col-xs-12">
             <div class="form-group">
               <label>所属学校</label>
               <el-input v-model="school" disabled="" placeholder="未选择所属学校"></el-input>
             </div>
           </div>
           <div class="col-md-4  col-sm-12  col-xs-12">
               <div class="form-group">
                 <label>工作部门</label>
                 <el-input v-model="dep" disabled="" placeholder="未选择工作部门"></el-input>
               </div>
           </div>
           <div class="col-md-4  col-sm-12  col-xs-12">
               <div class="form-group">
                 <label>参加工作时间</label>
                 <el-input v-model="workTime" disabled="" placeholder="未选择参加工作时间"></el-input>
               </div>
           </div>
         </div>

         <div class="row">
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group" >
               <label>工作类别</label>
              <el-select v-model.trim="workType" placeholder="*请选择工作类别" disabled="" clearable filterable>
            <el-option v-for="item in workType_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
               <label>现任职称</label>
               <el-input v-model="workName" disabled="" placeholder="未选择现任职称"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
               <label>获得职称时间</label>
               <el-input v-model="titleTime" disabled="" placeholder="未选择获得职称时间"></el-input>
             </div>
          </div>
         </div>

         <div class="row">
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
             <label>职务</label>
             <el-select v-model.trim="duty" placeholder="*请选择职务"  disabled="" clearable filterable>
            <el-option v-for="item in duty_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group" >
             <label>学历</label>
             <el-input v-model="education" disabled="" placeholder="未选择学历"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
             <label>角色</label>
             <el-input v-model="role" disabled="" placeholder="未选择角色"></el-input>
             </div>
          </div>
         </div>

         <div class="row">
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
             <label>qq号</label>
               <el-input v-model="qq" disabled="" placeholder="未输入qq号"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
          <div class="form-group">
             <label>工作电话</label>
             <el-input v-model="workPhone" placeholder="请输入工作电话" disabled=""> </el-input>
           </div>
         </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
            <div class="form-group radio-height">
                  <label>性别</label>
                  <div class="input-group radio-height">
                    <el-radio-group v-model="sex" disabled="" >
                      <el-radio label="0">未知</el-radio>
                      <el-radio label="1">男</el-radio>
                      <el-radio label="2">女</el-radio>
                    </el-radio-group>
                  </div>
              </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
 <!--             <div class="form-group">
                <label>导入用户信息</label>
                <div class="input-group">
                <button type="button" class="btn btn-primary">选择Excel文件</button>
              </div>
             </div>  -->
          </div>
         </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="exprience">
                <label>教育经历</label>
                <ul v-for="(item,index) in eduArr" v-show="eduArr.length>0">
                  <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.edu}}  &nbsp;&nbsp; {{item.school}}  &nbsp;&nbsp; {{item.major}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="exprience">
                <label>出国学习</label>
                <ul v-for="(item,index) in stuArr" v-show="stuArr.length>0">
                  <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.country}}  &nbsp;&nbsp; {{item.school}}  &nbsp;&nbsp; {{item.major}} &nbsp;&nbsp; {{item.description}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="exprience"><label>培训经历</label>
                <ul v-for="(item,index) in traArr" v-show="traArr.length>0">
                  <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.company}}  &nbsp;&nbsp;  {{item.description}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="exprience"><label>工作经历</label>
                <ul v-for="(item,index) in workArr" v-show="workArr.length>0">
                  <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.company}}  &nbsp;&nbsp;  {{item.job}} &nbsp;&nbsp;  {{item.description}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="exprience"><label>获奖情况</label>
                <ul v-for="(item,index) in awardArr" v-show="awardArr.length>0">
                  <li>{{item.start}} &nbsp;&nbsp; {{item.name}}&nbsp;&nbsp;{{item.description}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="exprience"><label>个人成果</label>
                <ul v-for="(item,index) in achArr" v-show="achArr.length>0">
                  <li>{{item.start}} &nbsp;&nbsp;  {{item.description}}
                  </li>
                </ul>
              </div>
            </div>
          </div>
   </div>
</div>
</div>
</div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  export default {
   name: 'usersDetail',
   data() {
     return {
       imgDataUrl: '/gxsz_office/data/upload/avatar/default.jpg',
       show: false,
        headers: {
        smail: '*_~'
      },
      Loading:true,
      sex:'',
      DataArr: [],
      // Loading: true
       Loading:true,
       optionsObj:'',
       DataObj:'',
       phone:'',
       phoneTips:'',
       realName:'',
       realNameTips:'',
       id_number:'',
       userlogin:'',
       userloginTips:'',
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
       workTypeTips:'',
       workName:'',
       workNameTips:'',
       workName_list:[],
       titleTime:'',
       titleTimeTips:'',
       education:'',
       duty:'',
       duty_list:[],
       dutyTips:'',
       education:'',
       edu_list:[],
       educationTips:'',
       role:'',
       roleId:'',
       role_list:[],
       roleTips:'',
       qq:'',
       qqTips:'',
       email:'',
       emailTips:'',
       workPhone:'',
       workPhoneTips:'',
       sex:"0",
       eduExperience:'',
       studyExperience:'',
       trainExperience:'',
       honor:'',
       fileInfo:'',
       //教育经历
       eduInfo:{
         edu:'',
         start:'',
         end:'',
         description:''
       },
       eduArr:[],
       //获奖情况
       awardInfo:{
         name:'',
         start:'',
         description: ''
       },
       awardArr:[],
       //出国学习
       stuInfo:{
         country:'',
         school:'',
         start:'',
         end:'',
         description:'',
         major:''
       },
       stuArr:[],
       //培训经历
       traInfo:{
         company:'',
         start:'',
         end:'',
         description:''
       },
       traArr:[],
       //工作经历
       workInfo:{
         company:'',
         job:'',
         start:'',
         end:'',
         description:''
       },
       workArr:[],
       //个人成果
       achInfo:{
         description:'',
         start:''
       },
       achArr:[],
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
      },
      cropUploadFail(status, field){
        console.log('-------- 上传 fail --------');
        console.log('field: ' + field);
      },
      bindData() {
        var _this=this;
        // _this.Loading=true;
        _this.$http({
          method:'get',
          url:'/gxsz_office/index.php?g=usersManager&m=AdminUsersManager&a=userInfo',
          params:{
            "id": _this.$route.params.id
          }
      }).then(function (res){
        if(res.data.code===0){
          _this.DataArr=res.data.data;
          _this.imgDataUrl='/gxsz_office/'+(_this.DataArr.avatar.url?_this.DataArr.avatar.url:'data/upload/avatar/default.jpg');
          _this.Loading=false;
        }
      },function(err){
        console.log(err);
      });
    }
  },
    created() {
      var _this = this;
      //请求接口 获得列表数据
      var configForSelect = {
        "method": 'get',
        "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=advanceSearch',
        "carrier": "optionsObj",
        "notAlert": true
      };
      //获取当前用户的信息
      var configForInfo={
        "method": 'get',
        "url": '/index.php?g=UsersManager&m=AdminUsersManager&a=userInfo',
        "params":{
          "id":_this.$route.params.id
        },
        "carrier": "DataObj",
        "notAlert": true
      };
      _this.myHttp(configForSelect,function(){
        //绑定下拉列表选项数据
        _this.edu_list=_this.optionsObj.education;
        _this.pol_list=_this.optionsObj.political;
        _this.dep_list=_this.optionsObj.dept;
        _this.workName_list=_this.optionsObj.current_title;
        _this.nation_list=_this.optionsObj.user_nation;
        _this.role_list=_this.optionsObj.name;
        _this.status_list=_this.optionsObj.user_status;
        _this.sch_list=_this.optionsObj.sch_name;
        _this.duty_list=_this.optionsObj.duty;
          _this.workType_list=_this.optionsObj.work_type;
      });
      //获取个人信息请求
      _this.myHttp(configForInfo,function(){
        //绑定数据
        _this.titleTime=_this.DataObj.access_time;
        _this.workName=_this.DataObj.current_title;
        _this.dep=_this.DataObj.department;
        _this.duty=_this.DataObj.duty;
        _this.eduExperience=_this.DataObj.fulltime_schooling;
        _this.workType=_this.DataObj.job_category;
        _this.honor=_this.DataObj.major_honors;
        _this.education=_this.DataObj.onthejob_education;
        _this.political=_this.DataObj.political_status;
        _this.role=_this.DataObj.role_name;
        _this.roleId=_this.DataObj.role_id;
        _this.school=_this.DataObj.sch_name;
        _this.sex=_this.DataObj.sex;
        _this.studyExperience=_this.DataObj.studyabroad_experience;
        _this.trainExperience=_this.DataObj.training_experience;
        _this.email=_this.DataObj.user_email;
        _this.userlogin=_this.DataObj.user_login;
        _this.nation=_this.DataObj.user_nation;
        _this.realName=_this.DataObj.user_nicename;
        _this.id_number=_this.DataObj.id_number;
        _this.phone=_this.DataObj.user_phone;
        _this.qq=_this.DataObj.user_qq;
        _this.workPhone=_this.DataObj.workphone;
        _this.workTime=_this.DataObj.work_time;
        _this.eduArr = _this.DataObj.user_education||[];
        _this.stuArr = _this.DataObj.user_study_abroad||[];
        _this.traArr = _this.DataObj.user_training_record||[];
        _this.workArr = _this.DataObj.user_work_experience||[];
        _this.awardArr = _this.DataObj.user_award||[];
        _this.achArr = _this.DataObj.user_achievement||[];
        _this.imgDataUrl='/gxsz_office/'+(_this.DataObj.avatar.url?_this.DataObj.avatar.url:'data/upload/avatar/default.jpg')

      })
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
  .avatar-container img {
    left: 50%;
    transform: translate(-50%);
    position: absolute;
  }
  .form-group .el-input{
    width:100%;
  }
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
   .exprience{
     min-height:80px;
     padding:10px 5px;
     background:#ECF0F5;
   }
   .exprience a{
     float:right;
     margin-right:10px;
     color:#00A65A;
     font-weight: bold;
   }
   .exprience li{
     margin-top: 10px;
   }
   .exprience li a{
     float:right;
     margin-right:10px;
     color:#919294;
     font-weight: bold;
   }
 </style>
