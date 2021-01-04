<template>
        <div id="editor">
            <el-form>
                <el-form-item label="课程选择" prop="courses">
                    <!-- label-width="110px"  -->
                        <el-select v-model="value" placeholder="请选择">
                            <el-option
                                v-for="item in courses"
                                :key="item.value"
                                :label="item.label"
                                :value="item.value">
                            </el-option>
                        </el-select>
                    </el-form-item>
            <el-form-item label="题目" prop="topic">
                <el-input type="edit" placeholder="请输入实验题目" v-model="topic" style="width: 600px"></el-input>
            </el-form-item>
            </el-form>
            <el-button @click="addtopic">插入题目</el-button>
            
            <el-form ref="modelForm" rule="rules" :model="modelForm" label-position="right" label-width="100px" >
                <vuedraggable v-model="modelForm.topic" class="wrapper" @end="end">
                   <div v-for="(item, index) in modelForm.topic" :key="index">

            <el-collapse>
                <el-collapse-item>
                    <template slot="title">
                第{{ index+1 }}题答案
              </template>
                    <el-form-item label="题目类型" label-width="110px" prop="fleetNum">
                        <el-radio-group v-model="item.type">
                        <el-radio :label="0">填空</el-radio>
                        <el-radio :label="1">简答</el-radio>
                        <el-radio :label="2">图</el-radio>
                        </el-radio-group>
                    </el-form-item>
                    <el-form-item label="参考答案" label-width="110px" prop="fleetNum">
                        <el-input v-model.trim="item.answer.value" style="width:258px" clearable placeholder="请填写参考答案" />
                    </el-form-item>
                    <el-button @click="removetopic">删除题目</el-button>
                </el-collapse-item>
            </el-collapse>
                   </div>
                </vuedraggable>
            </el-form>
              <editor-bar v-model="report" :isClear="isClear" @change="change" />

            <!-- <mavon-editor style="height: 100%" v-model="report"></mavon-editor> -->
            <div>
            <el-button @click="submit">提交</el-button>
            </div>
            <el-dialog :title="editDialog.title" :visible.sync="editDialog.visible" width="40%" :before-close="closeEditDialog">
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
            </el-dialog>
            <div>
             <button @click="toTest">跳转生成页面</button>
            </div>
        </div>
</template>
<script>
import vuedraggable from 'vuedraggable'
import { mavonEditor } from 'mavon-editor'
import 'mavon-editor/dist/css/index.css'
import EditorBar from '../../components/WangEnduit/index'

const content = ``

export default {
    name: 'Dashboard',
    components: {
        mavonEditor,
        vuedraggable,
        EditorBar
        // or 'mavon-editor': mavonEditor
        },
        data() {
            return {
                isClear: false,
                detail:"",
                report: content,
                topic: '',
                editDialog: {
                    title: '新增题目',
                    visible: false,
                    type: ''
                },
                topictype: 'kong',
                modelForm: {
                    topic: []
                    },
                courses: [{
                    value: '选项1',
                    label: '电子工艺'
                    }, {
                    value: '选项2',
                    label: '电机'
                    }, {
                    value: '选项3',
                    label: '电拖'
                    }, {
                    value: '选项4',
                    label: '电力电子技术'
                    }, {
                    value: '选项5',
                    label: '可编程逻辑控制'
                    }],
                    value: ''
            }
        },
        methods: {
                end(evt) {
                    this.$refs.modelForm.clearValidate()
                },
                addtopic() {
                    this.report=this.report +"(问题)";
                    this.modelForm.topic.push({ type: '', answer: [{value: ''}] })
                    /* this.editDialog = {
                        title: '新增题目',
                        visible: true,
                        type: 'add',
                        method: 'put'
                    } */
                },
                removetopic(index){
                    this.modelForm.topic.splice(index,1)
                },
                addreport() {
                    this.report=this.report +"[填空]"
                },
                addanswer() {
                    
                },
                submit() {

                },
                change(val) {
                    console.log(val)
                   
                },
                closeEditDialog() {

                },
                toTest() {
                  console.log(this.report) 
                  this.$router.push({name:'Test',params:{content:this.report}})
                },
        }
    }
</script>
<style>
    #editor {
        margin: auto;
        width: 80%;
    }
</style>