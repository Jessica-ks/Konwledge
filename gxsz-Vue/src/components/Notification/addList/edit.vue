<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-body">
          <div class="row">
            <div class="col-md-6 col-sm-6 col-xs-12">
              <div class="form-group" :class="{'has-error':oldTitleTips}">
                <label for="title">标题</label>
                <input type="text" class="form-control" id="title" v-model.trim="oldTitle">
                <span class="help-block" style="text-align:center" v-show="oldTitleTips">{{oldTitleTips}}</span>
              </div>
            </div>
            <div class="col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2 col-xs-12">
              <!-- <div class="form-group">
                <label>需要反馈</label>
                <div class="input-group radio-height">
                  <el-switch  v-model="isFB" on-color="#13ce66" off-color="#ff4949" on-text="是"
                             off-text="否"></el-switch>
                </div>
              </div> -->
            </div>
          </div>
          <div class="row">
            <div class="col-md-6  col-sm-6 col-xs-12">
              <label>已选学校</label>
              <el-select v-model="sch_label" filterable placeholder="未选择发布学校..." multiple disabled></el-select>
            </div>
            <div class="col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2 col-xs-12">
              <div class="form-group">
                <label>短信通知</label>
                <div class="input-group radio-height">
                  <el-switch  v-model="isSMS" on-color="#13ce66" off-color="#ff4949" on-text="是"
                             off-text="否"></el-switch>
                </div>
              </div>
            </div>
          </div>
          <div class="row ">
            <div class="col-md-6  col-sm-6 col-xs-12">
              <div class="form-group">
                <label>已选部门</label>
                <el-select v-model="dep_label" filterable placeholder="未选择发布部门..." multiple disabled></el-select>
              </div>
            </div>
            <div class="col-md-4 col-md-offset-2 col-sm-4 col-sm-offset-2 col-xs-12">
              <div class="form-group">
                <label>直接发送</label>
                <div class="input-group radio-height">
                  <el-switch v-model="isSave" on-color="#13ce66" off-color="#ff4949" on-text="是"
                             off-text="否"></el-switch>
                </div>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6  col-sm-6  col-xs-12">
              <div class="form-group">
                <label>已选人员</label>
                <el-select disabled v-model="per_label" multiple placeholder="未选择发布人员..."></el-select>
              </div>
            </div>
            <div class="col-md-6  col-sm-6  col-xs-12"></div>
          </div>
          <div class="row">
            <div class="col-md-6  col-sm-6  col-xs-12">
              <span>已上传附件:</span><span style="margin-left:10px">{{fileName?fileName:'无'}}</span>
            </div>
          </div>
          <div class="row rich-textarea">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <VueUEditor v-if="DataObj" @ready="editorReady"></VueUEditor>
            </div>
          </div>
          <div class="button-wrapper">
            <button type="button" class="btn btn-primary submit" @click="formSubmit()">提 交</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueUEditor from 'vue-ueditor';
  export default {
    name: 'myPostEdit',
    data() {
      return {
        DataObj: '',
        oldTitle: '',
        oldTitleTips:'',
        oldContent: '',
        sch_label: [],
        dep_label: [],
        per_label: [],
        // isFB: false,
        isSMS: false,
        isSave: false,
        Loading: true,
        loading: false,
        fileName: ''
      }
    },
    methods: {
      //公告表单提交
      formSubmit() {
        //验证所有需要验证的input字段
        var _this = this;
        var checkResult = _this.checkList([{
          "name": "oldTitle",
          "reg": ["notnull"]
        }]);
        if (checkResult) {
          //通过验证 发送请求
          _this.Loading = true;
          _this.loading = true;
          var config = {
            "method": "post",
            "url": "/index.php?g=notification&m=AdminNotification&a=editPost",
            "params": {
              "id": _this.$route.params.id,
              "title": _this.oldTitle,
              "content": _this.oldContent,
              "type": _this.isSave ? 1 : 0,
              "note": _this.isSMS ? 1 : 0
            }
          };
          _this.myHttp(config);
        };
      },
      editorReady(editorInstance) {
        var _this=this; 
        // var unwatch = _this.$watch('oldContent', function(val){
        //   console.log(val);
        //   editorInstance.setContent(val); unwatch();
        // });
        editorInstance.setContent(_this.oldContent); 
        editorInstance.addListener('contentChange',function(){
          _this.oldContent = editorInstance.getContent();
        });
      }
    },
    created() {
      var _this = this;
      var config = {
        "method": "get",
        "url": "/index.php?g=notification&m=AdminNotification&a=edit",
        "params": {
          "id": _this.$route.params.id
        },
        "carrier": "DataObj",
        "notAlert": true
      };
      _this.myHttp(config,
        function () {
          //初始化数据
          _this.oldTitle = _this.DataObj.title;
          _this.oldContent = _this.DataObj.content;
          // _this.isFB = _this.DataObj.feedback_type == 1;
          _this.isSMS = _this.DataObj.note == 1;
          _this.isSave = _this.DataObj.type == 1;
          _this.sch_label = _this.DataObj.school ? _this.DataObj.school : [];
          _this.dep_label = _this.DataObj.dept ? _this.DataObj.dept : [];
          _this.per_label=_this.DataObj.mem ? _this.DataObj.mem : [];
          _this.fileName = _this.DataObj.file_name;
        });
    },
    components: {
      VueUEditor
    }
  }
</script>
<style scoped>
  .button-wrapper {
    margin-top: 15px;
    text-align: center;
  }

  .rich-textarea {
    margin-top: 30px;
  }

  .el-select {
    display: block;
  }
</style>
