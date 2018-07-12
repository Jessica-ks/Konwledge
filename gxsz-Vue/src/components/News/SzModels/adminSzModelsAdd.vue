<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <my-upload field="file"
      @crop-success="cropSuccess"
      @crop-upload-success="cropUploadSuccess"
      @crop-upload-fail="cropUploadFail"
      v-model="show"
      url="/gxsz_office/index.php?g=UsersManager&m=AdminUsersManager&a=uploadfile"
      :params="params"
      img-format="jpg">
    </my-upload>
    <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
      <div class="box-body">
       <div class="row">
         <div class="col-md-6  col-sm-12  col-xs-12">
           <div class="row">
            <div class="form-group" :class="{'has-error':termTips}">
             <label>选择类别</label>
             <el-select v-model.trim="term" placeholder="类别" clearable filterable>
              <el-option v-for="item in termArr" :label="item.label" :value="item.value" :key="item.value"></el-option>
            </el-select>
            <span class="help-block" style="text-align:center" v-show="termTips">{{termTips}}</span>
          </div>
        </div>
         <div class="row"> 
         <div class="form-group" :class="{'has-error':nameTips}">
           <label for="user_nicename">标题</label>
           <el-input v-model.trim="name" placeholder="请输入标题"></el-input>
           <span class="help-block" style="text-align:center" v-show="nameTips">{{nameTips}}</span>
         </div>
       </div>
        <div class="row">
          <div class="form-group" :class="{'has-error':sourceTips}">
           <label>来源</label>
           <el-input v-model.trim="source" placeholder="请输入来源"></el-input>
           <span class="help-block" style="text-align:center" v-show="sourceTips">{{sourceTips}}</span>
         </div>
       </div>
      
     </div>
     <div class="col-md-6  col-sm-12  col-xs-12">
       <div class="avatar-container">
         <img :src="imgDataUrl" height="200" width="200" alt="用户头像">
         <div class="img-mask" @click="avatarSubmit()">
          <i class="fa fa-pencil-square-o" style="font-size:30px"></i>
        </div>
      </div>
    </div>
  </div>
  <div class="row">
   <div class="col-md-3 col-sm-12 col-xs-12">
     <div class="form-group">
       <label>发布日期</label>
       <el-date-picker v-model.trim="date"  type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
     </div>
   </div>  
   <div class="col-md-3 col-sm-12 col-xs-12">
     <div class="form-group" >
       <label>精确时间</label>
       <el-time-select  v-model.trim="time" style="width:100%" :picker-options="{start: '00:00', step: '00:05', end: '24:00'}" placeholder="选择时间">
       </el-time-select>
     </div>
   </div>
 </div>
 <div class="col-md-12  col-sm-12 col-xs-12">
  <div class="form-group" :class="{'has-error':excerptTips}">
   <label>个人简介</label>
   <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入个人简介" v-model="excerpt">
   </el-input>
   <span class="help-block" style="text-align:center" v-show="excerptTips">{{excerptTips}}</span>
 </div>
</div>
</div>
<div class="row" style="margin-top:18px">
  <div class="col-md-12  col-sm-12 col-xs-12">
   <VueUEditor @ready="editorReady" ></VueUEditor>
 </div>
</div>
<div class="button-wrapper" >
  <button  type="button" class="btn btn-primary submit" :disabled="Loading" @click="formSubmit()" style="margin-bottom:20px;">提 交</button>
</div>
</div>
</div>
</div>
</div>
</template>

<script>
  import VueUEditor from 'vue-ueditor';
  import myUpload from 'vue-image-crop-upload/upload-2.vue';
  export default {
      name: 'szModelsPost',
      data() {
          return {
              imgDataUrl: '/gxsz_office/data/upload/avatar/default.jpg',
              show: false,
              params: {
                  name: 'avatar'
              },
              headers: {
                  smail: '*_~'
              },
              dialogVisible: false,
              dialogImageUrl: '',
              Loading: true,
              termArr: [],
              term: '',
              source: '',
              name: '',
              excerpt: '',
              content: '',
              excerptTips: '',
              termTips: '',
              nameTips: '',
              sourceTips: '',
              date: (new Date()).toISOString().slice(0, 10),
              time: (new Date()).toString().split(' ')[4],
              fileInfo:''
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
                  this.fileInfo=jsonData.data;
              },
              cropUploadFail(status, field) {
                  console.log('-------- 上传 fail --------');
                  console.log('field: ' + field);
              },
              formSubmit() {
                  var _this = this;
                  //验证所有需要验证的字段
                  var checkResult = _this.checkList([{
                      "name": "term",
                      "reg": ["notnull"]
                  }, {
                      "name": "name",
                      "reg": ["notnull"]
                  }, {
                      "name": "source",
                      "reg": ["notnull"]
                  }, {
                      "name": "excerpt",
                      "reg": ["notnull"]
                  }]);
                  if (checkResult) {
                      //通过验证 发送请求
                      _this.Loading = true;
                      var shijian = _this.formatDate(_this.date) + ' ' + _this.time;
                      var config = {
                          "method": "post",
                          "url": "/index.php?g=News&m=AdminSzModels&a=addPost",
                          "params": {
                              "model_type": _this.term,
                              "models_source": _this.source,
                              "model_name": _this.name,
                              "time": shijian,
                              "model_info": _this.excerpt,
                              "model_story": _this.content,
                              "model_img":_this.fileInfo?_this.fileInfo.url:''
                          }
                      };
                      _this.myHttp(config);
                  }

              },
              editorReady(editorInstance) {
                  var _this = this;
                  editorInstance.addListener('contentChange', () => {
                      _this.content = editorInstance.getContent()
                  });
              }
      },
      created() {
          var _this = this;
          //初始化栏目选项
          var config = {
              "method": "get",
              "url": "/index.php?g=News&m=AdminSzModels&a=getTermList",
              "carrier": "termArr",
              "notAlert": true
          };
          _this.myHttp(config);
      },
      components: {
          VueUEditor,
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

</style>
