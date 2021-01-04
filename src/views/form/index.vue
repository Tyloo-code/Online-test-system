<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
                <el-select v-model="form.classes" placeholder="请选择班级" class="input">
                            <el-option
                                v-for="item in classList"
                                :key="item.classes"
                                :label="item.classes"
                                :value="item.classes">
                            </el-option>
                </el-select>
                <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
                <el-input placeholder="请输入学号" v-model="form.studentNum" class="input"></el-input>
                <el-input placeholder="请输入姓名" v-model="form.studentName" class="input"></el-input>
                <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
      <div class="right">
                <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">新建班级</el-button>
                <!-- v-if="role === 'Administrator' || role === 'Supervisor'" -->
                 <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">删除班级</el-button>
                <!-- <el-button type="primary" icon="el-icon-download" @click="handleDownload">导出</el-button> -->
      </div>
    </div>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row
    >
      <el-table-column align="center" label="班级" width="260">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="姓名" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="学号" width="330" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column label="用户名" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.grade }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="密码" width="260" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%" :before-close="closeEditDialog">
      <el-form ref="dataform">
        <el-form-item label="班级名称" label-width="100px" prop="classes">
          <el-input v-model="form.classes" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="学号" label-width="100px">
          <el-input v-model="form.id" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="form.name" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="上传名单" label-width="100px" prop="fileName">
          <el-input  ref="excel-upload-input" v-model="fileName" :readonly='true' placeholder="文件名" style="width:400px;float: left"></el-input>
          <el-upload class="upload-demo" ref="upload" action="doUpload" :limit="1" :file-list="fileList" :before-upload="beforeUpload">
          <el-button slot="trigger" style="width:120px;float: left;"  type="primary" @click="handleUpload">选取文件</el-button>
                // <div slot="tip" class="el-upload__tip"> 只能上传excel文件，且不超过100MB</div>
          <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>
          </el-upload>
        </el-form-item> -->
        <el-form-item>
          <el-button style="float: right;" @click="submitEdit(dataform)">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     


     
  </div>
</template>

<script>
import { getList } from '@/api/form'
export default {
  name: 'Form',
  data() {
    return {
      list: null,
      listLoading: true,
      fileList:[],
      fileName:'', 
      newUploadForm: {
      password:'',
      fileName:''
      },
      form: {
        studentName: '',
        classes: '',
        studentNum: '',
        username: '',
      },
      classList:[],
      editDialog: {
        title: '新建班级',
        visible: false,
        type: ''
      }
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
      onSubmit() {
        this.$message('submit!')
      },
      onCancel() {
        this.$message({
          message: 'cancel!',
          type: 'warning'
        })
      },
      addtopic() {

      },
      handleCreate() {
      },
      handleSearch() {
        this.getClessesList(this.form);
      },
      handleAdd() {
        this.editDialog = {
            title: '新建班级',
            visible: true,
            type: 'add',
            method: 'put'
        }
      },
      submitEdit(formName) {
          this.$refs[formName].validate(valid => {
              if (valid) {
                  http({
                      method: this.editDialog.method,
                      url: apis.Classes.api,
                      data: this.form
                  })
                  .then(res => {
                      this.form = {};
                      this.editDialog.visible = false;
                      this.handleSearch();
                  }).catch(error => {
                      this.$message({
                          showClose: true,
                          message: error,
                          type: 'error'
                      });
                      console.log(error);
                  });
              } else {
                  console.log('error submit!!');
                  return false;
              }
          });
      },
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.value
          this.listLoading = false
        })
    },
    closeEditDialog(){

    }
  }
}
</script>
<style lang="scss" scoped>
.search-group {
  width: 600px;
    .input {
        width: 150px;
        float: left !important;
        margin-right: 5px;
    }
    .button {
        color: #fff;
        background-color: #409eff;
    }
}
.func-list {
  margin-bottom: 20px;
  .left {
    display: inline-block;
  }
  .right {
    float: right;
  }
}
.pagination {
  margin-top: 20px;
  text-align: right;
}
.upload-demo {
  display: inline-block;
  color: white;
}
</style>