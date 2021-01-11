<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
        <el-select v-model="form.courses" placeholder="请选择课程" class="input">
          <el-option
            v-for="item in courselist"
            :key="item.classes"
            :label="item.classes"
            :value="item.name"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入学号" class="input"></el-input> -->
        <el-select v-model="form.classes" placeholder="请选择班级" class="input">
          <el-option
            v-for="item in classlist"
            :key="item.classes"
            :label="item.classes"
            :value="item.id"
          ></el-option>
        </el-select>
        <!-- <el-input placeholder="请输入学号" v-model="form.studentNum" class="input"></el-input>
        <el-input placeholder="请输入姓名" v-model="form.studentName" class="input"></el-input>-->
        <el-button @click="handleSearch" class="button">查询</el-button>
      </div>
      <div class="right">
        <el-button type="primary" icon="el-icon-folder-add" @click="handleAdd">新建课程</el-button>
        <!-- v-if="role === 'Administrator' || role === 'Supervisor'" -->
        <el-button type="primary" icon="el-icon-folder-remove" @click="handledelete">删除课程</el-button>
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
      <el-table-column label="课程" align="center" width="370">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="学期" width="370" align="center">
        <template slot-scope="scope">{{ scope.row.term }}</template>
      </el-table-column>
      <el-table-column label="班级" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.class }}</span>
        </template>
      </el-table-column>
      <!-- <el-table-column label="学号" width="260" align="center">
        <template slot-scope="scope">
          {{ scope.row.id }}
        </template>
      </el-table-column>
      <el-table-column class-name="status-col" label="姓名" width="260" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag> 
          {{ scope.row.studentname }}
        </template>
      </el-table-column>-->
      <!-- <el-table-column align="center" prop="created_at" label="多">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>-->
    </el-table>
    <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="50%">
      <el-form ref="dataForm" :model="nested">
        <el-form-item label="课程名称" label-width="100px" prop="courses">
          <el-input
            v-model="nested.name"
            :disabled="editDialog.type == 'edit'"
            style="width:400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="学期名称" label-width="100px" prop="terms">
          <el-input
            v-model="nested.term"
            :disabled="editDialog.type == 'edit'"
            style="width:400px;"
          ></el-input>
        </el-form-item>
        <el-form-item label="班级选择" label-width="100px" prop="classes">
          <el-select v-model="nested.classes" multiple placeholder="请选择班级" class="input">
            <el-option
              v-for="item in classlist"
              :key="item.classes"
              :label="item.classes"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" @click="submitEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>

    <el-dialog :title="deleteDialog.title" :visible.sync="deleteDialog.visible" width="50%">
      <el-form>
        <el-form-item>
          <el-select v-model="courses" placeholder="请选择课程" class="input">
            <el-option
              v-for="item in courselist"
              :key="item.classes"
              :label="item.classes"
              :value="item.name"
            ></el-option>
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button style="float: right;" @click="deleteEdit">确认</el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
  </div>
</template>
<script>
import { getList, postList, deleteList } from "@/api/nested";
import { classList, coueseList } from "@/api/menu";
export default {
  name: "Nested",
  data() {
    return {
      list: null,
      listLoading: true,
      nested: {
        name: "",
        term: ""
      },
      form: {
        classes: "",
        courses: ""
      },
      courses: [],
      classlist: [],
      courselist: [],
      editDialog: {
        title: "新建课程",
        visible: false,
        type: ""
      },
      deleteDialog: {
        title: "删除课程",
        visible: false
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handleAdd() {
      this.editDialog = {
        title: "新建课程",
        visible: true,
        type: "add",
        method: "put"
      };
    },
    handledelete() {
      this.deleteDialog = {
        title: "删除课程",
        visible: true
      };
    },
    handleSearch() {
      let odatarout = "";
      if (this.form.classId != null) {
        if (this.form.name != "") {
          if (this.form.id != null) {
            odatarout =
              "classId eq " +
              this.form.classId +
              "&name eq '" +
              this.form.name +
              "'&id eq " +
              this.form.id;
          } else {
            odatarout =
              "classId eq " +
              this.form.classId +
              "name eq '" +
              this.form.name +
              "'";
          }
        } else {
          odatarout = "classId eq " + this.form.classId;
        }
        this.listLoading = true;
        getodataList(odatarout).then(response => {
          this.list = response.value;
          this.listLoading = false;
        });
      }
    },
    submitEdit() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          postList(this.nested).then(() => {
            this.editDialog.visible = false;
            this.fetchData();
            this.$message.success(`添加成功`);
          });
        }
      });
    },
    deleteEdit() {
      deleteList(this.courses).then(() => {
        this.deleteDialog.visible = false;
        this.fetchData();
        this.$message.success(`删除成功`);
      });
    },
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.value;
        this.listLoading = false;
      });
      classList().then(response => {
        this.classlist = response.data;
      });
      coueseList().then(response => {
        this.courselist = response.value;
      });
    }
  }
};
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
