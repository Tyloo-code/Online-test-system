<template>
  <div id="editor">
    <el-form>
      <el-form-item label="课程选择">
        <!-- label-width="110px"  -->
        <el-select v-model="dashboard.courses" placeholder="请选择">
          <el-option
            v-for="item in courses"
            :key="item.name"
            :label="item.label"
            :value="item.name"
          ></el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="题目">
        <el-input type="edit" placeholder="请输入实验题目" v-model="topic" style="width: 600px"></el-input>
      </el-form-item>
    </el-form>
    <el-button @click="addtopic">插入题目</el-button>

    <el-form ref="modelForm" :model="modelForm" label-position="right" label-width="100px">
      <vuedraggable v-model="modelForm.topic" class="wrapper" @end="end">
        <div v-for="(item, index) in modelForm.topic" :key="index">
          <el-collapse>
            <el-collapse-item>
              <template slot="title">第{{ index+1 }}题答案</template>
              <el-form-item label="题目类型" label-width="110px">
                <el-radio-group v-model="item.type">
                  <el-radio label="填空">填空</el-radio>
                  <el-radio label="简答">简答</el-radio>
                  <el-radio label="图">图</el-radio>
                  <el-radio label="表格">表格</el-radio>
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="item.type=='表格'">
                <el-input placeholder="请输入表格行数" />
                <el-input placeholder="请输入表格列数" />
              </el-form-item>
              <el-form-item
                v-show="item.type!='图'"
                label="参考答案"
                label-width="110px"
                prop="fleetNum"
              >
                <el-input
                  v-model="item.answer"
                  type="edit"
                  style="width:258px"
                  placeholder="请填写参考答案"
                />
              </el-form-item>
              <el-form-item
                v-show="item.type=='图'"
                label="参考答案"
                label-width="110px"
                prop="fleetNum"
              >
                <el-input
                  v-model="item.answer"
                  type="edit"
                  style="width:258px"
                  placeholder="请填写参考答案"
                />
              </el-form-item>
              <el-button @click="removetopic">删除题目</el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vuedraggable>
    </el-form>
    <editor-bar v-model="report" :isClear="isClear" @change="change" />

    <!-- <mavon-editor style="height: 100%" v-model="report"></mavon-editor> -->
    <div>
      <el-button @click="submit">提交</el-button>
    </div>
    <!-- <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="40%">
                <el-form>
                    <el-form-item label="题目类型" label-width="110px" prop="fleetNum">
                        <el-radio-group v-model="topictype">
                        <el-radio-button label="kong">填空</el-radio-button>
                        <el-radio-button label="da">简答</el-radio-button>
                        <el-radio-button label="tu">图</el-radio-button>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="参考答案" label-width="110px" :model="topictype" prop="fleetNum">
                        <el-input v-model="topictype.kong" style="width:258px" clearable placeholder="请填写问题" />
                    </el-form-item>
                </el-form>
                
                <div>
                    <el-button @click="addanswer">确认</el-button>
                </div>
    </el-dialog>-->
    <div>
      <button @click="toTest">跳转生成页面</button>
    </div>
  </div>
</template>
<script>
import vuedraggable from "vuedraggable";
import { mavonEditor } from "mavon-editor";
import "mavon-editor/dist/css/index.css";
import EditorBar from "../../components/WangEnduit/index";
import { coueseList } from "@/api/menu";

const content = ``;

export default {
  name: "Dashboard",
  components: {
    mavonEditor,
    vuedraggable,
    EditorBar
    // or 'mavon-editor': mavonEditor
  },
  data() {
    return {
      quiz: {
        type: "",
        answer: ""
      },
      isClear: false,
      detail: "",
      report: content,
      topic: "",
      dashboard: {
        courses: "",
        topic: "",
        report: ""
      },
      topictype: "kong",
      modelForm: {
        topic: []
      },
      courses: [],
      value: ""
    };
  },
  created() {
    this.fetchData();
  },
  methods: {
    end(evt) {
      this.$refs.modelForm.clearValidate();
    },
    addtopic() {
      this.report = this.report + "(问题)";
      this.modelForm.topic.push({ type: "", answer: "" });
      /* this.editDialog = {
                        title: '新增题目',
                        visible: true,
                        type: 'add',
                        method: 'put'
                    } */
    },
    removetopic(index) {
      this.modelForm.topic.splice(index, 1);
    },
    addreport() {
      this.report = this.report + "[填空]";
    },
    addanswer() {},
    submit() {
      console.log(this.modelForm);
    },
    change(val) {
      console.log(val);
    },
    closeEditDialog() {},
    toTest() {
      console.log(this.report);
      this.$router.push({ name: "Test", params: { content: this.report } });
    },
    fetchData() {
      coueseList().then(response => {
        this.courses = response.value;
      });
    }
  }
};
</script>
<style>
#editor {
  margin: auto;
  width: 80%;
}
</style>