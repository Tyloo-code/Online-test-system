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
        <el-input type="edit" placeholder="请输入实验题目" v-model="quiz.name" style="width: 600px"></el-input>
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
                <el-radio v-for="(items) in questiontype" :key="items.id" :label="items.id">{{items.type}}</el-radio>
                  <!-- <el-radio label="填空">填空</el-radio>
                  <el-radio label="简答">简答</el-radio>
                  <el-radio label="图">图</el-radio>
                  <el-radio label="表格">表格</el-radio> -->
                </el-radio-group>
              </el-form-item>
              <el-form-item v-show="item.type==3" label="表格行列数">
                <el-input v-model="item.row" style="width:258px" placeholder="请输入表格行数" />
                <el-input v-model="item.column" style="width:258px" placeholder="请输入表格列数" />
              </el-form-item>
              <el-form-item
                v-show="item.type!=2"
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
                v-show="item.type==2"
                label="参考答案"
                label-width="110px"
                prop="fleetNum"
              >
              <el-button>上传图片</el-button>
              </el-form-item>
              <el-button @click="removetopic">删除题目</el-button>
            </el-collapse-item>
          </el-collapse>
        </div>
      </vuedraggable>
    </el-form>
    <editor-bar v-model="quiz.markdown" :isClear="isClear" @change="change" />

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
import { coueseList, questiontype } from "@/api/menu";
import { putquizzes,getquizzes,putquestions } from '@/api/dashboard'

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
      i:Number,
      quiz: {
        name:'',
        markdown: ''
      },
      question: {
        standardAnswer:'',
        questionTypeId:null,
        quizId:null,
        row: null,
        column: null
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
      this.modelForm.topic.push({ type: "", answer: "" });
      var inde = this.modelForm.topic.length 
      this.quiz.markdown = this.quiz.markdown + '[问题' + inde + ']';
      
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
    getquizid(odatamark) {
      getquizzes(odatamark).then(response => {
        this.ceshi = response.value[0]
        console.log('guoyi')
        for (let j in this.ceshi) {
          this.question.quizId = this.ceshi[j]
          console.log(this.question.quizId)
          break
        }
      console.log(this.question.quizId)
      if(this.modelForm.topic[0].type==3) {
        this.question.row = this.modelForm.topic[0].row
        this.question.column = this.modelForm.topic[0].column
      }
      this.question.questionTypeId = this.modelForm.topic[0].type
      this.question.standardAnswer = this.modelForm.topic[0].answer
      this.i = 0
      this.submitquestion()
      })
    },
    submitquestion() {
        putquestions(this.question).then(response => {
        this.$message.success(`问题保存成功`);
        if(this.i<this.modelForm.topic.length){
          this.i=this.i+1;
          if(this.modelForm.topic[this.i].type==3) {
          this.question.row = this.modelForm.topic[this.i].row
          this.question.column = this.modelForm.topic[this.i].column
      }
          console.log(this.i)
          this.question.questionTypeId = this.modelForm.topic[this.i].type
          this.question.standardAnswer = this.modelForm.topic[this.i].answer
          console.log(this.question.questionTypeId)
          console.log(this.question.standardAnswer)
          console.log(this.question.quizId)
          this.submitquestion()
        }
      })
      
    },
    submit() {
      console.log(this.modelForm);
      putquizzes(this.quiz).then(response => {
        this.$message.success(`保存成功`);
        let odatamark = this.quiz.markdown
      this.getquizid(odatamark)
      })
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
      questiontype().then(response => {
        this.questiontype = response.value;
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