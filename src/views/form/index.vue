<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
                <el-select v-model="form.classId" placeholder="请选择班级" class="input">
                            <el-option
                                v-for="item in classlist"
                                :key="item.classes"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                </el-select>
                <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
                <el-input placeholder="请输入学号" v-model="form.id" class="input"></el-input>
                <el-input placeholder="请输入姓名" v-model="form.name" class="input"></el-input>
                <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
      <div class="right">
                <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">新建班级</el-button>
                <!-- v-if="role === 'Administrator' || role === 'Supervisor'" -->
                 <el-button type="primary" icon="el-icon-folder-remove" @click="handledelete">删除班级</el-button>
                <el-button :loading="downloadLoading" type="primary" icon="el-icon-download" @click="handleDownload">导出模板</el-button>
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
          {{ scope.row.class.name }}
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
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="密码" width="260" align="center">
        <template slot-scope="scope">
          <!-- <el-tag :type="scope.row.status">{{ scope.row.status }}</el-tag> -->
          {{ scope.row.userPassword }}
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="修改">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%">
      <el-form ref="dataForm" :model="temp">
        <el-form-item label="班级名称" label-width="100px">
          <el-input v-model="temp.name" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="专业" label-width="100px">
          <el-input v-model="temp.profession" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <!-- <el-form-item label="学号" label-width="100px">
          <el-input v-model="temp.id" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="姓名" label-width="100px">
          <el-input v-model="temp.name" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item> -->
  
        <el-form-item label="上传名单" label-width="100px" prop="fileName">
          <el-input  ref="excel-upload-input" v-model="fileName" :readonly='true' placeholder="文件名" style="width:400px;float: left"></el-input>
          <el-upload class="upload-demo" ref="upload" action="doUpload" :limit="1" :file-list="fileList" :before-upload="beforeUpload">
          <el-button slot="trigger" style="width:120px;float: left;"  type="primary" plain>选取文件</el-button>
                 <!-- <div slot="tip" class="el-upload__tip"> 只能上传excel文件，且不超过100MB</div> 
          <div slot="tip" class="el-upload-list__item-name">{{fileName}}</div>-->
          </el-upload>
        </el-form-item>

        <el-form-item>
          <el-button style="float: right;" @click="submitEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :title="deleteDialog.title" :visible.sync="deleteDialog.visible" width="50%">
      <el-form>
        <el-form-item>
        <el-select v-model="classes" placeholder="请选择班级" class="input">
                            <el-option
                                v-for="item in classlist"
                                :key="item.classes"
                                :label="item.name"
                                :value="item.id">
                            </el-option>
                </el-select>
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
          <el-button style="float: right;" @click="deleteEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
     


     
  </div>
</template>

<script>
import { getList, postList, deleteList, postfile,getodataList } from '@/api/form'
import { classList } from '@/api/menu'
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
      temp: {
        name: '',
        profession: ''
      },
      form: {
        classId: null,
        name: '',
        id: null,
      },
      classes: null,
      classlist:null,
      editDialog: {
        title: '新建班级',
        visible: false,
        type: ''
      },
      deleteDialog: {
        title: '删除班级',
        visible: false
      },
      downloadLoading: false
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
      handleDownload() {
        this.downloadLoading = true
      import('@/components/excel/Export2Excel').then(excel => {
        const tHeader = ['学号', '姓名']
        const data = []
        excel.export_json_to_excel({
          header: tHeader,
          data,
          filename: '学生名单模板'
        })
        this.downloadLoading = false
      })
      },
      /* getClessesList() {
        this.listLoading = true
      getList(this.form).then(response => {
        this.list = response.value
        this.listLoading = false
        console.log(this.list)
      })
      }, */
      handleSearch() {
        console.log(this.form.classId)
        let odatarout = ''
        if(this.form.classId != null) {
          odatarout = '&$filter=' + 'classId eq '+this.form.classId
        }
        if(this.form.name != '') {
          if(odatarout != ''){
            odatarout = odatarout + ' and name eq \'' + this.form.name + '\''
          }
          else {
            odatarout = '&$filter=' + 'name eq \'' + this.form.name + '\''
          }
          
        }
        if(this.form.id != null) {
          if(odatarout != '') {
            odatarout = odatarout + ' and id eq ' + this.form.id
          }
          else {
            odatarout = '&$filter=' + 'id eq ' + this.form.id
          }
        }
        console.log(odatarout)
          this.listLoading = true
        getodataList(odatarout).then(response => {
          this.list = response.value
          this.listLoading = false
        })
        
      },
      handleAdd() {
        this.editDialog = {
            title: '新建班级',
            visible: true,
            type: 'add',
            method: 'put'
        }
      },
      handledelete() {
        this.deleteDialog = {
            title: '删除班级',
            visible: true
        }
      },
      submitEdit() {
          this.$refs['dataForm'].validate(valid => {
              if (valid) {
                  postList(this.temp).then(() => {
                    this.editDialog.visible = false;
                    this.$message.success(`添加成功`);
                    let fileFormData = new FormData();
                    fileFormData.append('file', this.files, this.fileName);  // 上传的文件
                    fileFormData.append('fileName', this.newUploadForm.fileName); // 文件名
                    postfile(fileFormData).then(res => { // 上传请求
                      this.fileName = ''; 
                      this.$message.success(`上传成功`);
                      this.fetchData();
               })
          })
          
              }
              }
              )
      },
      deleteEdit() {
        deleteList(this.classes).then(() => {
          this.deleteDialog.visible = false;
          this.fetchData();
          this.$message.success(`删除成功`);
        }
          )
      },
      fetchData() {
        this.listLoading = true
        getList().then(response => {
          this.list = response.value
          this.listLoading = false
        })
        classList().then(response => {
          this.classlist = response.value
        })
    },
     beforeUpload(file) {
       this.files = file;
       this.fileName = file.name;
            return false
     }
  },
  
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