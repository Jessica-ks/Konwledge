<template>
  <!--  @crop-upload-fail="cropUploadFail" -->
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <my-upload field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      v-model="show"
      url="/gxsz_office/index.php?g=UsersManager&m=AdminUsersManager&a=uploadfile"
      :params="params"
      img-format="jpg">
    </my-upload>
    <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
      <div class="box-body">
       <div class="row">
         <div class="col-md-4  col-sm-12  col-xs-12">
           <div class="row">
             <div class="form-group" :class="{'has-error':userloginTips}">
               <label>用户名</label>
               <el-input v-model.trim="userlogin" placeholder="请输入用户名"></el-input>
               <!--     <span class="help-block" style="text-align:center" v-show="phoneTips">{{phoneTips}}</span> -->
             </div>
           </div>
           <div class="row">
             <div class="form-group" :class="{'has-error':phoneTips}">
               <label>手机号</label>
               <el-input v-model.trim="phone" placeholder="请输入手机号"></el-input>
               <!--     <span class="help-block" style="text-align:center" v-show="phoneTips">{{phoneTips}}</span> -->
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
               <el-input v-model.trim="realName" placeholder="请输入姓名"></el-input>
               <!--    <span class="help-block" style="text-align:center" v-show="realNameTips">{{realNameTips}}</span> -->
             </div>
           </div>
           <div class="row">
             <div class="form-group" :class="{'has-error':emailTips}">
               <label>邮箱</label>
               <el-input v-model.trim="email" placeholder="请输入邮箱"></el-input>
               <!--     <span class="help-block" style="text-align:center" v-show="emailTips">{{emailTips}}</span> -->
             </div>
           </div>
           <div class="row">
            <div class="form-group" :class="{'has-error':dutyTips}">
             <label>职务</label>
             <el-input v-model.trim="duty" placeholder="请输入职务"></el-input>
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
           <el-select v-model.trim="school"  placeholder="请选择所属学校"  clearable filterable>
            <el-option v-for="item in sch_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
          </el-select>
          <!--     <span class="help-block" style="text-align:center" v-show="schoolTips">{{schoolTips}}</span> -->
        </div>
      </div>
      <div class="col-md-4  col-sm-12  col-xs-12">
       <div class="form-group" :class="{'has-error':depTips}">
         <label>工作部门</label>
         <el-select v-model.trim="dep" placeholder="请选择工作部门"  clearable filterable>
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
     <el-select v-model.trim="nation" placeholder="请选择民族"  clearable filterable>
      <el-option v-for="item in nation_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
    <!--     <span class="help-block" style="text-align:center" v-show="nationTips">{{nationTips}}</span> -->
  </div>
</div>
<div class="col-md-4 col-sm-12  col-xs-12">
 <div class="form-group" :class="{'has-error':workNameTips}">
   <label>现任职称</label>
   <el-input v-model.trim="workName" placeholder="请输入现任职称"></el-input>
   <!-- <el-select v-model.trim="workName" placeholder="请选择现任职称"  clearable filterable>
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
     <el-select v-model.trim="political" placeholder="请选择政治面貌"  clearable filterable>
      <el-option v-for="item in pol_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
    </el-select>
  </div>





</div>
<div class="col-md-4 col-sm-12  col-xs-12">
 <div class="form-group" :class="{'has-error':educationTips}">
   <label>学历</label>
   <el-select v-model.trim="education" placeholder="请选择学历"  clearable filterable>
    <el-option v-for="item in edu_list" :label="item.label" :value="item.value" :key="item.value"></el-option>
  </el-select>
  <!--   <span class="help-block" style="text-align:center" v-show="educationTips">{{educationTips}}</span> -->
</div>
</div>
<div class="col-md-4 col-sm-12  col-xs-12">
 <div class="form-group" :class="{'has-error':roleTips}">
   <label>角色</label>
   <el-select v-model.trim="roleId" placeholder="请选择角色"  clearable filterable>
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
     <el-input v-model.trim="qq" placeholder="请输入QQ号"></el-input>
     <!--      <span class="help-block" style="text-align:center" v-show="qqTips">{{qqTips}}</span> -->
   </div>
 </div>
 <div class="col-md-4 col-sm-12  col-xs-12">
   <div class="form-group" :class="{'has-error':workPhoneTips}">
     <label>工作电话</label>
     <el-input v-model.trim="workPhone" placeholder="请输入工作电话"></el-input>
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
<div class="button-wrapper" >
  <button  type="button" class="btn btn-primary submit" :disabled="Loading" @click="formSubmit()" style="margin-bottom:20px;">提 交</button>
</div>
</div>
</div>
</div>
</template>

<script>
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  export default {
   name: 'editUsers',
   data() {
     return {
       imgDataUrl: '/gxsz_office/data/upload/avatar/default.jpg',
       show: false,
       params: {
         "user_id":this.$route.params.id
      },
      headers: {
        smail: '*_~'
      },
      Loading:true,
       loading:false,
      optionsObj:'',
      DataObj:'',
      phone:'',
      phoneTips:'',
      realName:'',
      realNameTips:'',
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
      this.imgDataUrl = imgDataUrl;
    },
    cropUploadSuccess(jsonData, field){
      this.fileInfo=jsonData.data;
    },
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
    remove(index,arr){
      arr.splice(index,1);
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
    // cropUploadFail(status, field){
    //   console.log('-------- 上传 fail --------');
    //   console.log('field: ' + field);
    // },
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
        "name": "userlogin",
        "reg": ["notnull","onlywords"]
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
        "name": "roleId",
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
      },
      {
        "name": "workPhone",
        "reg": ["notnull","officephone"]
      }

      ]);
      if (checkResult) {
        _this.Loading = true;
        var sch_id=_this.school;
        var role_id;
        var dep_id=_this.dep;
        if(isNaN(_this.school-0)){ // school为默认值的时候,转换成id
          for(var i=0,len=_this.sch_list.length;i<len;i++){
            if(_this.sch_list[i].label==_this.school){
              sch_id=_this.sch_list[i].value;
            }
          };
        }
        if(isNaN(_this.role-0)){
         for(var i=0,len=_this.role_list.length;i<len;i++){
          if(_this.role_list[i].label==_this.role){
            role_id=_this.role_list[i].value;
          }
         }
        }
        if(isNaN(_this.school-0)){ // dep为默认值的时候,转换成id
          for(var i=0,len=_this.dep_list.length;i<len;i++){
            if(_this.dep_list[i].label==_this.dep){
              dep_id=_this.dep_list[i].value;
            }
          };
        }
          //发送提交表单请求
          var config = {
            method: 'post',
            url: '/index.php?g=UsersManager&m=AdminUsersManager&a=editPost',
            params: {
              'role_id' : _this.roleId,
              'sch_id':sch_id,
              "id":_this.$route.params.id,
              'user_nicename':_this.realName,
              'user_qq' :_this.qq,
              'user_phone' :_this.phone,
              'sex' :_this.sex,
              'department':dep_id,
              'user_nation':_this.nation,
              'political_status':_this.political,
              'work_time':_this.formatDate(_this.workTime),
              'fulltime_schooling':_this.eduExperience,
              'onthejob_education':_this.education,
              'studyabroad_experience':_this.studyExperience,
              'current_title':_this.workName,
              'access_time':_this.formatDate(_this.titleTime),
              'job_category':_this.workType,
              'training_experience':_this.trainExperience,
              'major_honors':_this.honor,
              'user_login':_this.userlogin,
              "duty":_this.duty,
              "user_email":_this.email,
              "workPhone":_this.workPhone,
              "img_url":_this.fileInfo?_this.fileInfo.url:'',
              "user_education": _this.eduArr||[],
              "user_study_abroad": _this.stuArr||[],
              "user_training_record": _this.traArr||[],
              "user_work_experience": _this.workArr||[],
              "user_award":  _this.awardArr||[],
              "user_achievement": _this.achArr||[]
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
