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
               <el-input v-model="DataArr.user_phone" disabled="" placeholder="未输入手机号(默认用户名)" ></el-input>
             </div>
           </div>
             <div class="row">
             <div class="form-group">
               <label>身份证号</label>
               <el-input v-model="DataArr.id_number" disabled="" placeholder="未输入身份证号"></el-input>
             </div>
           </div>
           <div class="row">
             <div class="form-group">
               <label>民族</label>
               <el-input v-model="DataArr.user_nation" disabled="" placeholder="未选择民族"></el-input>
             </div>
           </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
            <div class="row">
              <div class="form-group">
               <label>姓名</label>
               <el-input v-model="DataArr.user_nicename" disabled="" placeholder="未输入姓名"></el-input>
             </div>
           </div>
           <div class="row">
             <div class="form-group">
             <label>邮箱</label>
               <el-input v-model="DataArr.user_email" disabled="" placeholder="未输入邮箱"></el-input>
             </div>
           </div>
           <div class="row">
             <div class="form-group">
               <label>政治面貌</label>
               <el-input v-model="DataArr.political_status" disabled="" placeholder="未选择政治面貌"></el-input>
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
               <el-input v-model="DataArr.sch_name" disabled="" placeholder="未选择所属学校"></el-input>
             </div>
           </div>
           <div class="col-md-4  col-sm-12  col-xs-12">
               <div class="form-group">
                 <label>工作部门</label>
                 <el-input v-model="DataArr.department" disabled="" placeholder="未选择工作部门"></el-input>
               </div>
           </div>
           <div class="col-md-4  col-sm-12  col-xs-12">
               <div class="form-group">
                 <label>参加工作时间</label>
                 <el-input v-model="DataArr.work_time" disabled="" placeholder="未选择参加工作时间"></el-input>
               </div>
           </div>
         </div>

         <div class="row">
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group" >
               <label>工作类别</label>
               <el-input v-model="DataArr.job_category" disabled="" placeholder="未选择工作类别"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
               <label>现任职称</label>
               <el-input v-model="DataArr.current_title" disabled="" placeholder="未选择现任职称"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
               <label>获得职称时间</label>
               <el-input v-model="DataArr.access_time" disabled="" placeholder="未选择获得职称时间"></el-input>
             </div>
          </div>
         </div>

         <div class="row">
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
             <label>职务</label>
             <el-input v-model="DataArr.duty" disabled="" placeholder="未选择职务"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group" >
             <label>学历</label>
             <el-input v-model="DataArr.onthejob_education" disabled="" placeholder="未选择学历"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
             <label>角色</label>
             <el-input v-model="DataArr.role_name" disabled="" placeholder="未选择角色"></el-input>
             </div>
          </div>
         </div>

         <div class="row">
          <div class="col-md-4 col-sm-12  col-xs-12">
             <div class="form-group">
             <label>qq号</label>
               <el-input v-model="DataArr.user_qq" disabled="" placeholder="未输入qq号"></el-input>
             </div>
          </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
          <div class="form-group">
             <label>工作电话</label>
             <el-input v-model="DataArr.workphone" placeholder="请输入工作电话" disabled=""> </el-input>
           </div>
         </div>
          <div class="col-md-4 col-sm-12  col-xs-12">
            <div class="form-group radio-height">
                  <label>性别</label>
                  <div class="input-group radio-height">
                    <el-radio-group v-model="DataArr.sex" disabled="" >
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
          <div class="exprience">
            <label>教育经历</label><a href="javascript:;" data-toggle="modal" data-target="#user_education" @click='curEdit=""'>添加</a>
            <ul v-for="(item,index) in eduArr" v-show="eduArr.length>0">
              <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.edu}}  &nbsp;&nbsp; {{item.school}}  &nbsp;&nbsp; {{item.major}}
                 <a href="javascript:;" data-toggle="modal" data-target="#user_education" @click="eduEdit(item,index)">编辑</a>
                 <a href="javascript:;" @click="remove(index,eduArr)">删除</a>
              </li>
            </ul>
          </div>
         </div>
      </div>
      <div class="row">
       <div class="col-md-12  col-sm-12 col-xs-12">
          <div class="exprience">
            <label>出国学习</label><a href="javascript:;" data-toggle="modal" data-target="#user_study_abroad" @click='curEdit=""'>添加</a>
            <ul v-for="(item,index) in stuArr" v-show="stuArr.length>0">
              <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.country}}  &nbsp;&nbsp; {{item.school}}  &nbsp;&nbsp; {{item.major}} &nbsp;&nbsp; {{item.description}}
                <a href="javascript:;" data-toggle="modal" data-target="#user_study_abroad" @click="stuEdit(item,index)">编辑</a>
                <a href="javascript:;" @click="remove(index,stuArr)">删除</a>
              </li>
            </ul>
          </div>
       </div>
      </div>
      <div class="row">
        <div class="col-md-12  col-sm-12 col-xs-12">
          <div class="exprience">
          <label>培训经历</label><a href="javascript:;" data-toggle="modal" data-target="#user_training_record" @click='curEdit=""'>添加</a>
            <ul v-for="(item,index) in traArr" v-show="traArr.length>0">
              <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.company}}  &nbsp;&nbsp;  {{item.description}}
                <a href="javascript:;" data-toggle="modal" data-target="#user_training_record" @click="traEdit(item,index)">编辑</a>
                <a href="javascript:;" @click="remove(index,traArr)">删除</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12  col-sm-12 col-xs-12">
          <div class="exprience">
          <label>工作经历</label><a href="javascript:;" data-toggle="modal" data-target="#user_work_experience" @click='curEdit=""'>添加</a>
            <ul v-for="(item,index) in workArr" v-show="workArr.length>0">
              <li>{{item.start+'—'+item.end}} &nbsp;&nbsp; {{item.company}}  &nbsp;&nbsp;  {{item.job}} &nbsp;&nbsp;  {{item.description}}
                <a href="javascript:;" data-toggle="modal" data-target="#user_work_experience" @click="workEdit(item,index)">编辑</a>
                <a href="javascript:;" @click="remove(index,workArr)">删除</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12  col-sm-12 col-xs-12">
          <div class="exprience">
          <label>获奖情况</label><a href="javascript:;" data-toggle="modal" data-target="#user_award" @click='curEdit=""'>添加</a>
            <ul v-for="(item,index) in awardArr" v-show="awardArr.length>0">
              <li>{{item.start}} &nbsp;&nbsp; {{item.name}}&nbsp;&nbsp;{{item.description}}
                <a href="javascript:;" data-toggle="modal" data-target="#user_award" @click="awardEdit(item,index)">编辑</a>
                <a href="javascript:;" @click="remove(index,awardArr)">删除</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-12  col-sm-12 col-xs-12">
          <div class="exprience">
            <label>个人成果</label><a href="javascript:;" data-toggle="modal" data-target="#user_achievement" @click='curEdit=""'>添加</a>
            <ul v-for="(item,index) in achArr" v-show="achArr.length>0">
              <li>{{item.start}} &nbsp;&nbsp;  {{item.description}}
                <a href="javascript:;" data-toggle="modal" data-target="#user_achievement" @click="achEdit(item,index)">编辑</a>
                <a href="javascript:;" @click="remove(index,achArr)">删除</a>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <!--
                  作者：704905123@qq.com
                  时间：2017-05-14
                  描述：提交按钮
    -->
    <div class="button_submit" style="float: right;margin: 15px;">
       <el-button type="primary" @click="userDetailSubmit()" >提交</el-button>
    </div>
   </div>

</div>
</div>
<!-- 教育经历模态框 -->
<div class="modal fade" id="user_education" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">教育经历</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入学校..." v-model.trim="eduInfo.school">
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
            <input type="text" class="form-control" placeholder="描述" v-model.trim="eduInfo.description">
            </div>
          </div>
          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="eduInfo.start" type="date" placeholder="起始日期" ></el-date-picker>-
            <el-date-picker v-model="eduInfo.end" type="date" placeholder="结束日期" ></el-date-picker>
           </div>
          </div>
          <!-- <div class="row">
            <div class="form-group">
              <textarea class="form-control" style="resize:none" rows="5" placeholder="说明" v-model.trim="eduInfo.description"></textarea>
            </div>
          </div> -->
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="eduSubmit()">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
      </div>
    </div>
  </div>
</div>
<!-- 出国学习模态框 -->
<div class="modal fade" id="user_study_abroad" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">出国学习</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入国家..." v-model.trim="stuInfo.country">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入学校..." v-model.trim="stuInfo.school">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入专业..." v-model.trim="stuInfo.major">
            </div>
          </div>

          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="stuInfo.start" type="date" placeholder="起始日期" ></el-date-picker>-
            <el-date-picker v-model="stuInfo.end" type="date" placeholder="结束日期" ></el-date-picker>
           </div>
          </div>
          <div class="row">
            <div class="form-group">
              <textarea class="form-control" style="resize:none" rows="5" placeholder="说明" v-model.trim="stuInfo.description"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="stuSubmit()">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
      </div>
    </div>
  </div>
</div>
<!-- 培训经历模态框 -->
<div class="modal fade" id="user_training_record" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">培训经历</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入公司..." v-model.trim="traInfo.company">
            </div>
          </div>

          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="traInfo.start" type="date" placeholder="起始日期" ></el-date-picker>-
            <el-date-picker v-model="traInfo.end" type="date" placeholder="结束日期" ></el-date-picker>
           </div>
          </div>
          <div class="row">
            <div class="form-group">
              <textarea class="form-control" style="resize:none" rows="5" placeholder="说明" v-model.trim="traInfo.description"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="traSubmit()">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
      </div>
    </div>
  </div>
</div>
<!-- 工作经历模态框 -->
<div class="modal fade" id="user_work_experience" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">工作经历</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入公司..." v-model.trim="workInfo.company">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入职位..." v-model.trim="workInfo.job">
            </div>
          </div>
          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="workInfo.start" type="date" placeholder="起始日期" ></el-date-picker>-
            <el-date-picker v-model="workInfo.end" type="date" placeholder="结束日期" ></el-date-picker>
           </div>
          </div>
          <div class="row">
            <div class="form-group">
              <textarea class="form-control" style="resize:none" rows="5" placeholder="说明" v-model.trim="workInfo.description"></textarea>
            </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="workSubmit()">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
      </div>
    </div>
  </div>
</div>
<!-- 获奖情况模态框 -->
<div class="modal fade" id="user_award" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">获奖情况</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="请输入名称..." v-model.trim="awardInfo.name">
            </div>
          </div>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="描述" v-model.trim="awardInfo.description">
            </div>
          </div>
          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="awardInfo.start" type="date" placeholder="日期" ></el-date-picker>
           </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="awardSubmit()">确定</button>
        <button type="button" class="btn btn-default" data-dismiss="modal" >取消</button>
      </div>
    </div>
  </div>
</div>
<!-- 个人成果模态框 -->
<div class="modal fade" id="user_achievement" tabindex="-1" role="dialog">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
        <h3 class="modal-title">个人成果</h3>
      </div>
      <div class="modal-body">
        <form>
          <div class="row">
            <div class="form-group">
            <input type="text" class="form-control" placeholder="说明..." v-model.trim="achInfo.description">
            </div>
          </div>
          <div class="row">
           <div class="form-group">
            <el-date-picker v-model="achInfo.start" type="date" placeholder="日期" ></el-date-picker>
           </div>
          </div>
        </form>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-primary" v-loading="loading" :disabled="loading" @click="achSubmit()">确定</button>
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
   name: 'usersDetail',
   data() {
     return {
      curEdit:'',
      imgDataUrl: '/gxsz_office/data/upload/avatar/default.jpg',
      show: false,
      headers: {
        smail: '*_~'
      },
      Loading:true,
      loading:false,
      sex:'',
      DataArr: [],
      eduInfo:{
        school:'',
        edu:'',
        start:(new Date()).toISOString().slice(0, 10),
        end:'',
        description:'',
        major:''
      },
      eduArr:[],
      stuInfo:{
        country:'',
        school:'',
        start:(new Date()).toISOString().slice(0, 10),
        end:'',
        description:'',
        major:''
      },
      stuArr:[],
      traInfo:{
        company:'',
        start:(new Date()).toISOString().slice(0, 10),
        end:'',
        description:''
      },
      traArr:[],
      workInfo:{
        company:'',
        job:'',
        start:(new Date()).toISOString().slice(0, 10),
        end:'',
        description:''
      },
      workArr:[],
      awardInfo:{
        name:'',
        start:(new Date()).toISOString().slice(0, 10),
        description: ''
      },
      awardArr:[],
      achInfo:{
        description:'',
        start:(new Date()).toISOString().slice(0, 10)
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
    bindData() {
      var _this=this;
        // _this.Loading=true;
        _this.$http({
          method:'get',
          url:'index.php?g=office&m=usersadmin&a=detail'
        }).then(function (res){
          if(res.data.code===0){
            _this.DataArr=res.data.data;
            _this.eduArr = _this.DataArr.user_education||[];
            _this.stuArr = _this.DataArr.user_study_abroad||[];
            _this.traArr = _this.DataArr.user_training_record||[];
            _this.workArr = _this.DataArr.user_work_experience||[];
            _this.awardArr = _this.DataArr.user_award||[];
            _this.achArr = _this.DataArr.user_achievement||[];
            _this.imgDataUrl='/gxsz_office/'+(_this.DataArr.avatar.url?_this.DataArr.avatar.url:'data/upload/avatar/default.jpg');
            _this.Loading=false;
          }
        },function(err){
          console.log(err);
        });
    },
    remove(index,arr){
      arr.splice(index,1);
    },

    //教育经历
    eduSubmit(){
      var _this=this;
      var obj={};
      obj.school=_this.eduInfo.school;
      obj.edu=_this.eduInfo.edu;
      obj.start=_this.eduInfo.start?_this.formatDate(_this.eduInfo.start):'';
      obj.end=_this.eduInfo.end?_this.formatDate(_this.eduInfo.end):'';
      obj.description=_this.eduInfo.description;
      obj.major=_this.eduInfo.major;
      for(var i in obj){
        if(obj[i]===''&&i!=='description'){
          alert('请填写完整信息!');
          return false;
        }
      }
      if(typeof this.curEdit.index !=='undefined'){
        //编辑
        _this.eduArr.splice(this.curEdit.index,1,obj);
      }
      else{
        //添加
        _this.eduArr.push(obj);
      }
      $('.modal').modal('hide');
    },
    eduEdit(obj,index){
      var temp={};
      temp.school=obj.school;
      temp.edu=obj.edu;
      temp.start=obj.start;
      temp.end=obj.end;
      temp.description=obj.description;
      temp.major=obj.major;
      this.eduInfo=temp;
      this.curEdit={
        obj:obj,
        index:index
      };
    },

    //出国学习
    stuSubmit(){
      var _this=this;
      var obj={};
      obj.school=_this.stuInfo.school;
      obj.country=_this.stuInfo.country;
      obj.major=_this.stuInfo.major;
      obj.start=_this.stuInfo.start?_this.formatDate(_this.stuInfo.start):'';
      obj.end=_this.stuInfo.end?_this.formatDate(_this.stuInfo.end):'';
      obj.description=_this.stuInfo.description;
      for(var i in obj){
        if(obj[i]===''&&i!=='description'){
          alert('请填写完整信息!');
          return false;
        }
      }
      if(typeof this.curEdit.index !=='undefined'){
        _this.stuArr.splice(this.curEdit.index,1,obj);
      }
      else{
        _this.stuArr.push(obj);

      }
      $('.modal').modal('hide');
    },
    stuEdit(obj,index){
      var temp={};
      temp.school=obj.school;
      temp.country=obj.country;
      temp.start=obj.start;
      temp.end=obj.end;
      temp.description=obj.description;
      temp.major=obj.major;
      this.stuInfo=temp;
      this.curEdit={
        obj:obj,
        index:index
      };
    },
    //培训经历
    traSubmit(){
      var _this=this;
      var obj={};
      obj.company=_this.traInfo.company;
      obj.start=_this.traInfo.start?_this.formatDate(_this.traInfo.start):'';
      obj.end=_this.traInfo.end?_this.formatDate(_this.traInfo.end):'';
      obj.description=_this.traInfo.description;
      for(var i in obj){
        if(obj[i]===''&&i!=='description'){
          alert('请填写完整信息!');
          return false;
        }
      }
      if(typeof this.curEdit.index !=='undefined'){
        _this.traArr.splice(this.curEdit.index,1,obj);
      }
      else{
        _this.traArr.push(obj);
      }
      $('.modal').modal('hide');
    },
    traEdit(obj,index){
      var temp={};
      temp.company=obj.company;
      temp.start=obj.start;
      temp.end=obj.end;
      temp.description=obj.description;
      this.traInfo=temp;
      this.curEdit={
        obj:obj,
        index:index
      };
    },
    //工作经历
    workSubmit(){
      var _this=this;
      var obj={};
      obj.company=_this.workInfo.company;
      obj.job=_this.workInfo.job;
      obj.start=_this.workInfo.start?_this.formatDate(_this.workInfo.start):'';
      obj.end=_this.workInfo.end?_this.formatDate(_this.workInfo.end):'';
      obj.description=_this.workInfo.description;
      for(var i in obj){
        if(obj[i]===''&&i!=='description'){
          alert('请填写完整信息!');
          return false;
        }
      }
      if(typeof this.curEdit.index !=='undefined'){
        _this.workArr.splice(this.curEdit.index,1,obj);
      }
      else{
        _this.workArr.push(obj);
      }
      $('.modal').modal('hide');
    },
    workEdit(obj,index){
      var temp={};
      temp.company=obj.company;
      temp.job=obj.job;
      temp.start=obj.start;
      temp.end=obj.end;
      temp.description=obj.description;
      this.workInfo=temp;
      this.curEdit={
        obj:obj,
        index:index
      };
    },
    //获取情况
    awardSubmit(){
      var _this=this;
      var obj={};
      obj.name=_this.awardInfo.name;
      obj.start=_this.awardInfo.start?_this.formatDate(_this.awardInfo.start):'';
      obj.description=_this.awardInfo.description;
      for(var i in obj){
        if(obj[i]===''){
          alert('请填写完整信息!');
          return false;
        }
      }
      if(typeof this.curEdit.index !=='undefined'){
        _this.awardArr.splice(this.curEdit.index,1,obj);
      }
      else{
        _this.awardArr.push(obj);
      }
      $('.modal').modal('hide');
    },
    awardEdit(obj,index){
      var temp={};
      temp.name=obj.name;
      temp.start=obj.start;
      temp.description=obj.description;
      this.awardInfo=temp;
      this.curEdit={
        obj:obj,
        index:index
      };
    },
    //个人成果
    achSubmit(){
      var _this=this;
      var obj={};
      obj.start=_this.achInfo.start?_this.formatDate(_this.achInfo.start):'';
      obj.description=_this.achInfo.description;
      for(var i in obj){
        if(obj[i]===''){
          alert('请填写完整信息!');
          return false;
        }
      }
      if(typeof this.curEdit.index !=='undefined'){
        _this.achArr.splice(this.curEdit.index,1,obj);
      }
      else{
        _this.achArr.push(obj);
      }
      $('.modal').modal('hide');
},
achEdit(obj, index) {
    var temp = {};
    temp.description = obj.description;
    temp.start = obj.start;
    this.achInfo = temp;
    this.curEdit = {
      obj: obj,
      index: index
    };
  },
  userDetailSubmit() {
    var _this = this;
    var config = {
      "method": "post",
      "url": "/index.php?g=office&m=usersadmin&a=userinfo_post",
      "params": {
        "user_login": _this.user_login,
        "user_education": _this.eduArr,
        "user_study_abroad": _this.stuArr,
        "user_training_record": _this.traArr,
        "user_work_experience": _this.workArr,
        "user_award":  _this.awardArr,
        "user_achievement": _this.achArr
      }
    };
    _this.myHttp(config);
  }
},
created() {
    this.bindData();
  },
  mounted() {
    var _this = this;
    $('.modal').on('hidden.bs.modal',
      function() {
        if(_this.curEdit){
          return false;
        }else{
          //模态框消失的时候,重置arr里的数据
          _this.resetObj(["eduInfo","stuInfo","traInfo","workInfo","awardInfo","achInfo"]);
        }
    });
    $('.modal').on('shown.bs.modal',
      function () {
        if(_this.curEdit){
          return false;
        }else{
          _this.resetObj(["eduInfo","stuInfo","traInfo","workInfo","awardInfo","achInfo"]);
        }
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
