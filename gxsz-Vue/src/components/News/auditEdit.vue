<template>
  <div class="row">
    <div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12">
      <div class="box box-primary" v-loading="Loading" element-loading-text="正在加载中...">
        <div class="box-body">
          <div class="row">
            <div class="col-md-6  col-sm-6  col-xs-12">
              <div class="form-group" :class="{'has-error':termTips}">
                <label>已选栏目</label> 
                  <a href="javascript:;" data-toggle="modal" class="pull-right" data-target="#modalTerm" type="text" size="small"><strong>选择栏目</strong></a>
                <el-select v-model.trim="term"  filterable multiple remote placeholder="请在左侧选择栏目...">
                  <el-option v-for="item in termObjArr"  :label="item.label" :value="item.value" :key="item.value" style="display:none;opacity:0"></el-option>
                </el-select>
                <span class="help-block" style="text-align:center" v-show="termTips">{{termTips}}</span>
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
                <el-time-select style="width:100%" v-model="time"
                                :picker-options="{start: '00:00', step: '00:05', end: '24:00'}" placeholder="选择时间">
                </el-time-select>
              </div>
            </div>
      <!--       <div class="col-md-6  col-sm-6  col-xs-12">
              <label>审核选项</label>
              <el-radio-group v-model="audit" style="width:100%;line-height: 31px;">
                <el-radio label="0">正在审核</el-radio>
                <el-radio label="1">审核通过</el-radio>
                <el-radio label="2">审核失败</el-radio>
              </el-radio-group>
            </div> -->
          </div>


          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <div class="form-group" :class="{'has-error':titleTips}">
                <label>标题</label>
                <el-input v-model.trim="title" placeholder="请输入标题"></el-input>
                <span class="help-block" style="text-align:center" v-show="titleTips">{{titleTips}}</span>
              </div>
            </div>
            <div class="col-md-6 col-sm-12 col-xs-12">
              <label>副标题</label>
              <el-input v-model.trim="subtitle" placeholder="请输入副标题"></el-input>
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
            <div class="col-md-6  col-sm-12  col-xs-12">
              <div class="form-group" :class="{'has-error':sourceTips}">
                <label>来源</label>
                <el-input v-model.trim="source" placeholder="请输入内容"></el-input>
                <span class="help-block" style="text-align:center" v-show="sourceTips">{{sourceTips}}</span>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-md-6 col-sm-12 col-xs-12">
              <label>审核选项</label>
              <el-radio-group v-model="audit" style="width:100%;line-height: 31px;">
                <el-radio label="0">正在审核</el-radio>
                <el-radio label="1">审核通过</el-radio>
                <el-radio label="2">审核失败</el-radio>
              </el-radio-group>
            </div>
            <!-- <div class="col-md-3 col-sm-12 col-xs-12">
              <div class="form-group">
                <label>发布日期</label>
                <el-date-picker v-model="date" type="date" placeholder="选择日期" style="width:100%"></el-date-picker>
              </div>
            </div>
            <div class="col-md-3 col-sm-12 col-xs-12">
              <div class="form-group">
                <label>精确时间</label>
                <el-time-select style="width:100%" v-model="time"
                                :picker-options="{start: '00:00', step: '00:05', end: '24:00'}" placeholder="选择时间">
                </el-time-select>
              </div>
            </div> -->
          </div>

          <div class="row ">
            <div class="col-md-12  col-sm-12 col-xs-12">
              <div class="form-group" :class="{'has-error':excerptTips}">
                <label>摘要</label>
                <el-input type="textarea" :autosize="{ minRows: 3, maxRows: 5}" placeholder="请输入摘要"
                          v-model.trim="excerpt">
                </el-input>
                <span class="help-block" style="text-align:center" v-show="excerptTips">{{excerptTips}}</span>
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
              <label>新闻内容</label>
              <VueUEditor v-if="DataObj" @ready="editorReady"></VueUEditor>
            </div>
          </div>


          <div class="button-wrapper">
            <button type="button" class="btn btn-primary submit" @click="formSubmit()">提 交</button>
          </div>

        </div>
      </div>
    </div>

    <!--  编辑模态框 -->
    <div class="modal fade" id="modalTerm" tabindex="-1" role="dialog">
      <div class="modal-dialog"  style="height:300px;" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal"><span>&times;</span></button>
            <h3 class="modal-title">权限设置</h3>
          </div>
          <div class="modal-body">
            <el-tree :data="termMenu" show-checkbox node-key="value" ref="tree" :default-checked-keys='termNum'  :accordion='true'></el-tree>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary" @click="addTerm()" v-loading="loading" :disabled="loading">
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
  import VueUEditor from 'vue-ueditor';
  export default {
    name: 'auditEdit',
    data() {
      return {
        dialogImageUrl: '',
        dialogVisible: false,
        Loading: true,
        loading:false,
        audit: '',
        termArr: [],
        termMenu:[],
        term_label: [],
        term: [],
        termNum:[],
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
      //修改新闻所属栏目
      addTerm(){
         var _this=this;
         var checkedArr=_this.$refs.tree.getCheckedKeys();
         var tempTerm=[];

         checkedArr.forEach(function(item){
             tempTerm.push(item.toString());
         });
         _this.term=tempTerm;
         // checkedArr.forEach(function(item){
         //     item.toString();
         //    _this.term.forEach(function(term){
         //      if(item!=term){
         //        tempTerm.push(item);
         //      }
         //    });
         // });
         // console.log('tempTerm',tempTerm);
         // for(var i=0;i<tempTerm.length;i++){
         //    if(tempTerm[i]!=tempTerm[i+1]){
         //       _this.term.push(tempTerm[i]);
         //    }
         // }
         // console.log('term',_this.term);
         $('#modalTerm').modal('hide');
       },
      // addTerm(val) {
      //   var _this = this;
      //   if (!val) return false;
      //   var termValue = val[val.length - 1];
      //   var labelArr=[];
      //   var valueArr=[];
      //   if (_this.term.indexOf(termValue) != -1) {
      //     //如果选择的栏目已经有了,停止
      //     return false;
      //   };
      //   //term数组中添加新的term,label数组中添加对应的文本
        
      //   // labelArr.push(termValue);
      //  _this.term.push(termValue);
      //   // _this.term=labelArr;
      //   // _this.termObjArr.forEach(function (termObj) {
      //   //   if (termObj.value == termValue) {
      //   //    labelArr.push(termObj.label)
      //   //   }
      //   // });
      //   //  _this.term_label=labelArr;
      // },
      //删除新闻所属栏目
      // removeTerm(labels) {
      //   var _this = this;
      //   //用来暂时保存剩下的栏目
      //   var tempArr=[];
      //   var value;
      //   if (labels.length - _this.term.length < 0) {
      //     //此时栏目减少
      //     labels.forEach(function (label) {
      //       //找出剩下的栏目
      //       _this.termObjArr.forEach(function (termObj) {
      //         if (termObj.label == label) {
      //             value=termObj.value;
      //           //根据得到的VALUE来删除
      //           // _this.termObjArr.forEach(function (termObj) {
      //           //   if (termObj.value == value) {
      //           //     tempArr.push(value);
      //           //   }
      //           // });
      //         }
      //       });
            
      //     });
          
      //     _this.term=tempArr;
      //   }
      // },
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
            "url": "/index.php?g=news&m=AdminNewsManager&a=auditEditPost",
            "params": {
              "id": _this.$route.params.id,
              "term": _this.term,
              "post_source": _this.source,
              "post_title": _this.title,
              "post_subtitle": _this.subtitle,
              "post_date": shijian,
              "post_status":_this.audit,
              "post_keywords": _this.keyword,
              "post_excerpt": _this.excerpt,
              "post_content": _this.content,
              "post_img": _this.fileInfo.url ? _this.fileInfo.url : ''
            }
          };
          _this.myHttp(config);
        };
      },
      //显示预览图片
      showImg(file) {
        this.dialogImageUrl = file.url;
        this.dialogVisible = true;
      },
      //上传图片时
      clearImg(response, file, fileList){
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
        url: '/index.php?g=news&m=AdminNewsManager&a=auditEdit',
        params: {
          "id": _this.$route.params.id
        },
        carrier: "DataObj",
        "notAlert": true
      };
      //请求接口获取栏目列表
      _this.myHttp(configForTerm,
        function () {
          //获取到栏目列表之后,把所有的栏目以对象的形式放到数组里,方便后面操作
          _this.termArr.forEach(function (item) {
            _this.termObjArr.push(item);
            item.children.forEach(function (subitem) {
              _this.termObjArr.push(subitem)
            });
          });
          //获取当前新闻的信息
          _this.myHttp(configForNews, function () {
            //获取其他值
            _this.source = _this.DataObj.post_source;
            _this.title = _this.DataObj.post_title;
            _this.subtitle = _this.DataObj.post_subtitle;
            _this.keyword = _this.DataObj.post_keywords;
            _this.date = _this.DataObj.post_date.slice(0, 10);
            _this.time = _this.DataObj.post_date.slice(11, 16);
            _this.audit = _this.DataObj.post_status;
            _this.content = _this.DataObj.post_content;
            _this.excerpt = _this.DataObj.post_excerpt;
            _this.fileInfo = _this.DataObj.post_img;

            if(_this.fileInfo.url){
                   _this.fileArr.push({"name":'a',"url": '/gxsz_office/'+_this.DataObj.post_img.url});
            }

       
           
            var arr = [];
            var arrNum=[];
            var labels = [];
            //获取已选栏目的值,和文本信息
            _this.DataObj.post_term.forEach(function (item) {
              arr.push(item.value);
              arrNum.push(item.value-0);
              labels.push(item.label);
            });
            _this.term = arr;
            _this.termNum=arrNum;
            _this.term_label = labels;  
            _this.termMenu=_this.termArr;
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
