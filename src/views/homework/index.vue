<template>
  <div class="app-container">
    <div class="func-list">
      <div class="left search-group">
        <el-select v-model="table.courses" placeholder="请选择课程" class="input">
          <el-option
            v-for="item in courselist"
            :key="item.classes"
            :label="item.classes"
            :value="item.name"
          ></el-option>
        </el-select>
        <el-button @click="handleSearch" class="button">查询</el-button>
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
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">{{ scope.$index }}</template>
      </el-table-column>
      <el-table-column label="课程" width="110" align="center">
        <template slot-scope="scope">{{ scope.row.courses }}</template>
      </el-table-column>
      <el-table-column label="题目" width="210">
        <template slot-scope="scope">{{ scope.row.name }}</template>
      </el-table-column>
      <el-table-column label="实验报告" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.markdown }}</span>
        </template>
      </el-table-column>
      <el-table-column label="操作" align="center">
        <template slot-scope="scope">
          <!-- <router-link :to="'/example/edit/'+scope.row.id"> -->
          <el-button @click="dRouting(scope.row)">编辑</el-button>
          <!-- </router-link> -->
          <el-button @click="handledelete(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
      <!-- <el-table-column class-name="status-col" label="Status" width="110" align="center">
        <template slot-scope="scope">
          <el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" prop="created_at" label="Display_time" width="200">
        <template slot-scope="scope">
          <i class="el-icon-time" />
          <span>{{ scope.row.display_time }}</span>
        </template>
      </el-table-column>-->
    </el-table>
  </div>
</template>

<script>
import { getList, deletequiz } from "@/api/table";
import { classList, coueseList } from "@/api/menu";
export default {
  name:'homework',
  /*filters: {
     statusFilter(status) {
      const statusMap = {
        published: 'success',
        draft: 'gray',
        deleted: 'danger'
      }
      return statusMap[status]
    }
  }, */
  data() {
    return {
      id:null,
      courselist: null,
      list: null,
      listLoading: true,
      table: {
        courses: ""
      }
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    handledelete(id) {
      deletequiz(id).then(response => {
        this.$message.success(`删除成功`)
        this.fetchData()
      })
    },
    dRouting(scope){
      console.log(scope)
     
      this.$router.push({path:`/xSheng/${scope.id}`,query:{id:scope.id,markdown:scope.markdown,name:scope.name}})
    },
    handleSearch() {},
    fetchData() {
      this.listLoading = true;
      getList().then(response => {
        this.list = response.value;
        this.listLoading = false;
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