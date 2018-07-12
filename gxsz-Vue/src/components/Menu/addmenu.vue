<template>
 <div>
  <el-row :gutter="20">
    <el-col :span="6" :offset="8">
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="ruleForm">
      <el-form-item label="菜单名称" prop="menuname">
        <el-input class="input-md" v-model="ruleForm.menuname"></el-input>
      </el-form-item>
      <el-form-item label="上级菜单" prop="parent">
        <el-select v-model="ruleForm.parent" placeholder="请选择上级菜单">
          <el-option lable="主菜单" value="0"></el-option>
         <el-option v-for="item in optionsObj"  :key="item" :label="item.name" :value="item.id"></el-option>
        </el-select>
      </el-form-item>
        <el-form-item label="应用" prop="menuapp">
        <el-input class="input-md" v-model="ruleForm.menuapp"></el-input>
      </el-form-item>
      
         <el-form-item label="控制器" prop="menuctrl">
        <el-input class="input-md" v-model="ruleForm.menuctrl"></el-input>
      </el-form-item>
      <el-form-item label="方法" prop="menufunc">
        <el-input class="input-md" v-model="ruleForm.menufunc"></el-input>
      </el-form-item>
      <el-form-item label="参数" prop="menuparam">
        <el-input class="input-md" v-model="ruleForm.menuparam"></el-input>
      </el-form-item>
      <el-form-item label="备注" prop="menuremark">
        <el-input class="input-md" type="textarea" v-model="ruleForm.menuremark"></el-input>
      </el-form-item>
      <el-form-item label="状态" prop="menustatus">
        <el-select v-model="ruleForm.menustatus" placeholder="请选择状态">
          <el-option label="显示" value="1"></el-option>
          <el-option label="隐藏" value="0"></el-option>
        </el-select>
      </el-form-item>  
              <el-form-item label="排序" prop="menulistorder">
        <el-input class="input-md" v-model="ruleForm.menulistorder"></el-input>
      </el-form-item>
      <el-form-item label="图标" prop="menuicon">
        <el-input class="input-md" v-model="ruleForm.menuicon"></el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即创建</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
    </el-col>
  </el-row>

</div>
</template>

<script>
  export default{
    name: 'addmenu',
    data(){
      return {
        loading: true,
        optionsObj:'',
        ruleForm: {
          menuicon: 'fa fa-user',
          menuname: '',
          parent: '',
          menuapp: '',
          menuctrl: '',
          menufunc: '',
          menuparam: '',
          menuremark: '',
          menustatus: '',
          menutype: '',
          menulistorder: ''
        },
        rules: {
          menuname: [
          { required: true, message: '输入菜单名', trigger: 'blur' },
          { min: 2, max: 6, message:'长度在2到5个字符', trigger: 'blur'}
          ],
          parent: [
          { required: true, message: '选择', trigger: 'blur' }
          ],
          menuapp: [
          { required: true, message: '输入应用名', trigger: 'blur' }
          ],
          menuctrl: [
          { required: true, message: '输入控制器名', trigger: 'blur' }
          ],
          menufunc: [
          { required: true, message: '输入方法名', trigger: 'blur' }
          ],
          menustatus: [
          { required: true, message: '选择', trigger: 'blur' }
          ],
          menutype: [
          { required: true, message: '选择', trigger: 'blur' }
          ],
          menulistorder: [
          {
            required: true, message: '不爲空',trigger: 'blur'
          }]
        }
      }
    },
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            this.Loading = true;
            var config = {
              method: 'post',
              url: '/index.php?g=Menu&m=AdminMenu&a=add_Post',
              params:{
                'label': this.ruleForm.menuname,
                'parentid': this.ruleForm.parent,
                'href': this.ruleForm.menuapp + '/' + this.ruleForm.menuctrl + '/' + this.ruleForm.menufunc,
                'menuapp': this.ruleForm.menuapp,
                'menuctrl': this.ruleForm.menuctrl,
                'menufunc': this.ruleForm.menufunc,
                'menuparam': this.ruleForm.menuparam,
                'menuremark': this.ruleForm.menuremark,
                'menustatus': this.ruleForm.menustatus,
                'menutype': this.ruleForm.menutype,
                'icon': this.ruleForm.menuicon,
                'listorder': this.ruleForm.menulistorder
              }
            };
            this.myHttp(config);
            this.ruleForm.menuname = '';
            this.ruleForm.parent = '';
             this.ruleForm.menuapp = '';
             this.ruleForm.menuctrl = '';
             this.ruleForm.menufunc = '';
             this.ruleForm.menuparam = '';
             this.ruleForm.menuremark = '';
             this.ruleForm.menustatus = '';
             this.ruleForm.menutype = '';
             this.ruleForm.menuicon = 'fa fa-user';
             this.ruleForm.menulistorder = '';
          } else {
            this.$message({
              "message": "请填写完整信息!",
              "type": "error"
            });
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    },
    created() {
     var _this = this;
        //请求接口 获得列表数据
        var config = {
          "method": 'get',
          "url": '/index.php?g=Menu&m=AdminMenu&a=index',
          "carrier": "optionsObj",
          "notAlert": true
        };
        _this.myHttp(config);
      }
  }
</script>

<style>
   .el-row {
    margin-bottom: 20px;
    &:last-child {
      margin-bottom: 0;
    }
  }
  .el-col {
    border-radius: 4px;
  }
  .row-bg {
    padding: 10px 0;
    background-color: #f9fafc;
  }
  .ruleForm {
    width: 300px;
  }
</style>