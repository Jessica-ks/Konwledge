<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-body">
          <div class="row">
            <div class="col-md-6  col-sm-12  col-xs-12">
              <div class="form-group" :class="{'has-error':termTips}">
                <label>选择栏目</label>
                <el-cascader :options="termArr" @change="addTerm" v-model.trim="term" :show-all-levels="false"
                             filterable change-on-select style="width:100%"></el-cascader>
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
                <el-input type="textarea" :autosize="{ minRows: 4, maxRows: 6}" placeholder="请输入摘要"
                          v-model.trim="excerpt">
                </el-input>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <label>相册图集</label>
              <el-upload action="/gxsz_office/index.php?g=news&m=AdminNews&a=uploadfile" :data="{'post_id':this.$route.params.id}" list-type="picture-card" ref="imgUpload"
                         :on-preview="showImg" :file-list="fileArr" :on-success="clearImg" :on-remove="removeImg"><i
                class="el-icon-plus"></i>
              </el-upload>
              <el-dialog v-model="dialogVisible" size="tiny">
                <img width="100%" :src="dialogImageUrl" alt="图片预览">
              </el-dialog>
            </div>
          </div>

          <div class="row" style="margin-top:18px">
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
    name: 'myNewsEdit',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        Loading: true,
        audit: '',
        termArr: [],
        term_label: [],
        term: [],
        termTips: '',
        title: '',
        titleTips: '',
        excerpt: '',
        excerptTips: '',
        date: '',
        time: '',
        source: '',
        sourceTips: '',
        subtitle: '',
        keyword: '',
        keywordTips: '',
        content: '',

        termObjArr: [],
        DataObj: '',

        fileArr: [],
        fileInfo: ''
      }
    },
    methods: {
      formSubmit() {
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
          var shijian = _this.formatDate(_this.date) + ' ' + _this.time;
          var config = {
            "method": "post",
            "url": "/index.php?g=news&m=AdminNews&a=editPost",
            params: {
              "id": _this.$route.params.id,
              "term_id": _this.term[_this.term.length-1],
              "post_source": _this.source,
              "post_title": _this.title,
              "post_date": shijian,
              "post_keywords": _this.keyword,
              "post_excerpt": _this.excerpt,
              "post_content": _this.content,
              "post_img": _this.fileInfo.url ? _this.fileInfo.url : ''
            }
          };
          _this.myHttp(config);
        };
      },
      //修改新闻所属栏目
      addTerm(val) {
        var _this = this;
        if (!val) return false;
        var termValue = val[val.length - 1];
        if (_this.term.indexOf(termValue) != -1) {
          //如果选择的栏目已经有了,停止
          return false;
        };
        //term数组中添加新的term
        _this.term[0]=(termValue);
      },

      //显示预览图片
      showImg(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传图片成功时
      clearImg(response, file, fileList) {
        var tempFile = [];
        //保存最新上传文件
        tempFile[0] = fileList[fileList.length - 1];
        //调用上传组件自身的清空所有文件
        this.$refs.imgUpload.clearFiles();
        if (response.code == 0) {
          //重置刚刚保存的文件
          this.fileArr = tempFile;
          //保存上传文件的回调信息
          this.fileInfo = response.data;
        } else {
          //上传出错
          this.$message({
            "message": response.msg,
            "type": "error"
          });
        }
      },
      //删除预览图片
      removeImg(file, fileList) {
        var _this = this;
        _this.fileArr = [];
        _this.fileInfo = '';
      },
      editorReady(editorInstance) {
        var _this=this; 
        // var unwatch = _this.$watch('content', function(val){
        //   editorInstance.setContent(val); unwatch();
        // });
        editorInstance.setContent(_this.content); 
        editorInstance.addListener('contentChange',function(){
          _this.content = editorInstance.getContent();
        });
      }
    },
    created() {
      var _this = this;
      var configForTerm = {
        "method": 'get',
        "url": '/index.php?g=news&m=AdminNews&a=get_terms',
        "carrier": "termArr",
        "notAlert": true
      };
      var configForNews = {
        method: 'get',
        url: '/index.php?g=news&m=AdminNews&a=edit',
        params: {
          "id": _this.$route.params.id
        },
        carrier: "DataObj",
        "notAlert": true
      };
      //请求接口获取栏目列表
      _this.myHttp(configForTerm,
        function () {
          //获取当前新闻的信息
          _this.myHttp(configForNews, function () {
            //获取其他值
            _this.term = _this.DataObj.term_id;
            _this.title = _this.DataObj.post_title;
            _this.source = _this.DataObj.post_source;
            _this.keyword = _this.DataObj.post_keywords;
            _this.excerpt = _this.DataObj.post_excerpt;
            _this.content = _this.DataObj.post_content;
            _this.fileInfo= _this.DataObj.post_img;
            
         if(_this.fileInfo.url){
             //如果图片信息存在的话,初始化图片
           _this.fileArr.push({
             'name': 'a',
             'url':'/gxsz_office/'+ _this.DataObj.post_img.url
           });
         };

            _this.date = _this.DataObj.post_date.slice(0, 10);
            _this.time = _this.DataObj.post_date.slice(11, 16);
          });
        });
    },
    components: {
      VueUEditor
    }

  }
</script>
<style scoped>
</style>
