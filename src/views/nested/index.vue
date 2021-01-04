<template>
<div class="app-container">
    <div class="func-list">
      <div class="left search-group">
                <el-select v-model="nested.courses" placeholder="请选择课程" class="input">
                            <el-option
                                v-for="item in coursesList"
                                :key="item.classes"
                                :label="item.classes"
                                :value="item.classes">
                            </el-option>
                </el-select>
                <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
                <el-select v-model="nested.classes" placeholder="请选择课程" class="input">
                            <el-option
                                v-for="item in classList"
                                :key="item.classes"
                                :label="item.classes"
                                :value="item.classes">
                            </el-option>
                </el-select>
                <el-input placeholder="请输入学号" v-model="nested.studentNum" class="input"></el-input>
                <el-input placeholder="请输入姓名" v-model="nested.studentName" class="input"></el-input>
                <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
      <div class="right">
                <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">新建课程</el-button>
                <!-- v-if="role === 'Administrator' || role === 'Supervisor'" -->
                 <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">删除课程</el-button>
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
      <el-table-column align="center" label="课程" width="260">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="学期" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.title }}
        </template>
      </el-table-column>
      <el-table-column label="班级" width="330" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.author }}</span>
        </template>
      </el-table-column>
      <el-table-column label="学号" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.pageviews }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="姓名" width="260" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="多">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>
    </el-table>
      <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%" :before-close="closeEditDialog">
        <el-form>
        <el-form-item label="课程名称" label-width="100px" prop="courses">
          <el-input v-model="nested.courses" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="学期名称" label-width="100px" prop="terms">
          <el-input v-model="nested.terms" :disabled="editDialog.type == 'edit'" style="width:400px;"></el-input>
        </el-form-item>
        <el-form-item label="班级选择" label-width="100px" prop="classes">
          <el-select v-model="nested.courses" multiple placeholder="请选择班级" class="input">
                            <el-option
                                v-for="item in classList"
                                :key="item.classes"
                                :label="item.classes"
                                :value="item.classes">
                            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;">确认</el-button>
        </el-form-item>
      </el-form>
      </el-dialog>
    </div>
</template>
<script>
export default {
  name: 'Nested',
  data() {
    return {
      nested: {
        courses: '',
        classes: '',
        studentNum: '',
        studentName: '',
        terms: ''
      },
      coursesList:[],
      classList: [],
      editDialog: {
        title: '新建课程',
        visible: false,
        type: ''
      }
    }
  },
  methods: {
    handleAdd() {
      this.editDialog = {
                title: '新建课程',
                visible: true,
                type: 'add',
                method: 'put'
            }
    }
    }
}
</script>

<style lang="scss" scoped>
.search-group {
  width: 750px;
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
