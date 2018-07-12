<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-body">
          <div class="row">
            <div class="col-md-6  col-sm-12  col-xs-12">
              <div class="form-group" :class="{'has-error':termTips}">
                <label>选择栏目</label>
                <el-cascader :options="termArr" @change="termChange" :show-all-levels="false" filterable
                             change-on-select style="width:100%"></el-cascader>
                <span class="help-block" style="text-align:center" v-show="termTips">{{termTips}}</span>
              </div>
            </div>
            <div class="col-md-6  col-sm-12  col-xs-12">
              <div class="form-group" :class="{'has-error':sourceTips}">
                <label>来源</label>
                <el-input v-model.trim="source" placeholder="请输入来源"></el-input>
                <span class="help-block" style="text-align:center" v-show="sourceTips">{{sourceTips}}</span>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group" :class="{'has-error':titleTips}">
                <label>标题</label>
                <el-input v-model.trim="title" placeholder="请输入标题"></el-input>
                <span class="help-block" style="text-align:center" v-show="titleTips">{{titleTips}}</span>
              </div>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <div class="form-group">
                <label>发布日期</label>
                <el-date-picker v-model="date" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </div>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <div class="form-group">
                <label>精确时间</label>
                <el-time-select v-model="time" style="width:100%"
                                :picker-options="{   start: '00:00', step: '00:05', end: '24:00'}" placeholder="选择时间">
                </el-time-select>
              </div>
            </div>
          </div>


          <div class="row">
            <div class="col-md-6  col-sm-12 col-xs-12">
              <div class="form-group" :class="{'has-error':keywordTips}">
                <label>关键词</label>
                <el-input v-model.trim="keyword" placeholder="请输入关键词"></el-input>
                <span class="help-block" style="text-align:center" v-show="keywordTips">{{keywordTips}}</span>
              </div>
            </div>

          </div>
          <div class="row ">

            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="form-group" :class="{'has-error':excerptTips}">
                <label>摘要</label>
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入摘要" v-model.trim="excerpt">
                </el-input>
                <span class="help-block" style="text-align:center" v-show="excerptTips">{{excerptTips}}</span>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <label>相册图集</label>
              <el-upload action="/gxsz_office/index.php?g=news&m=AdminNews&a=uploadfile" ref="imgUpload" list-type="picture-card"
                         :on-success="clearImg" :on-preview="showImg" :on-remove="removeImg" :file-list="fileArr"><i
                class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="图片预览">
              </el-dialog>
            </div>
          </div>
          <div class="row" style="margin-top:18px">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <VueUEditor @ready="editorReady"></VueUEditor>
            </div>
          </div>
          <div class="button-wrapper">
            <button type="button" class="btn btn-primary submit" :disabled="Loading" @click="formSubmit()">提 交</button>
          </div>


        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import VueUEditor from 'vue-ueditor';
  export default {
    name: 'newsPost',
    data() {
      return {
        dialogVisible: false,
        dialogImageUrl: '',
        Loading: true,
        termArr: [],
        term: '',
        termTips: '',
        source: '',
        sourceTips: '',
        title: '',
        titleTips: '',
        date: (new Date()).toISOString().slice(0, 10),
        time: (new Date()).toString().split(' ')[4],
        keyword: '',
        keywordTips: '',
        excerpt: '',
        excerptTips: '',
        content: '',
       fileInfo:'',
        fileArr: [],
      }
    },

    methods: {
      formSubmit(){
        var _this = this;
        //验证所有需要验证的字段
        var checkResult = _this.checkList([{
          "name": "term",
          "reg": ["notnull"]
        },
          {
            "name": "title",
            "reg": ["notnull"]
          },
          {
            "name": "source",
            "reg": ["notnull"]
          },
          {
            "name": "keyword",
            "reg": ["notnull"]
          },
          {
            "name": "excerpt",
            "reg": ["notnull"]
          }
        ]);
        if (checkResult) {
          //通过验证 发送请求
          _this.Loading = true;
          var shijian =_this.formatDate(_this.date)+' '+_this.time;
          var config = {
            "method": "post",
            "url": "/index.php?g=news&m=AdminNews&a=addPost",
            "params": {
              "term_id": _this.term,
              "post_source": _this.source,
              "post_title": _this.title,
              "post_date": shijian,
              "post_keywords": _this.keyword,
              "post_excerpt": _this.excerpt,
              "post_content": _this.content,
              "img_url": _this.fileInfo.url?_this.fileInfo.url:''
            }
          };
          _this.myHttp(config);
        }
        ;
      },
      //选择term里的最后一项
      termChange(val){
        this.term = val[val.length - 1];
      },
      //显示预览图片
      showImg(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传图片时
      clearImg(response, file, fileList){
        var tempFile=[];
        //保存最新上传文件
        tempFile[0] = fileList[fileList.length - 1];
        //调用上传组件自身的清空所有文件
        this.$refs.imgUpload.clearFiles();
        if(response.code==0){
          //重置刚刚保存的文件
          this.fileArr=tempFile;
          //保存上传文件的回调信息
          this.fileInfo =response.data;
        }else{
            //上传出错
          this.$message({
            "message": response.msg,
            "type": "error"
          });
        };
      },
      //删除预览图片
      removeImg(file, fileList) {
        var _this = this;
        var config = {
          method: 'get',
          url: '/index.php?g=news&m=AdminNews&a=deletefile',
          params: {
            "img_id": _this.fileInfo.id
          }
        };
        _this.myHttp(config, function () {
          //删除成功之后,重置fileArr,fileInfo
          _this.fileArr = [];
          _this.fileInfo = '';
        });
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
        "url": "/index.php?g=news&m=AdminNews&a=get_terms",
        "carrier": "termArr",
        "notAlert": true
      };
      _this.myHttp(config);
    },
    components: {
      VueUEditor
    }
  }
</script>
<style scoped>
</style>
