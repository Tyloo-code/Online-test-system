<template>
  <div>
    这是第{{this.$route.query.id}}页<br>
    <!-- 这是题目{{this.$route.query.name}}<br> -->
    <!-- 这是实验报告{{this.$route.query.markdown}}<br> -->
    <h1>{{getTitle()}}</h1>
    <div v-html="getContent()"></div>

    <div v-for="(item,index) in quizType1" :key="index">
        {{item.questionTypeId}}<el-input class="text" @change="textbox($data[item.input])" :key="index" v-model="$data[item.input]"></el-input>
    </div>
    <div v-for="(item,index) in quizType2" :key="index">
        {{item.questionTypeId}}<el-input class="text" @change="textbox($data[item.input])" :key="index" v-model="$data[item.input]"></el-input>
    </div>
    <div v-for="(item,index) in quizType3" :key="index">
        {{item.questionTypeId}}
        <el-table :data="testDatas" border stripe style="width: 100%">
          <el-table-column
            v-for="(col, idx) in item.column"
            :key="idx">
          </el-table-column>
        </el-table>
    </div>

    <el-table :data="testDatas" border stripe style="width: 100%">
      <el-table-column
        v-for="(col, idx) in quizType3"
        :key="idx">
      </el-table-column>
    </el-table>

    <div v-for="(item,index) in quizType4" :key="index">
        {{item.questionTypeId}}<el-input class="text" type="textarea" :rows="5" :key="index" v-model="textarea">"></el-input>
    </div>
   

  </div>
</template>

<script>
import { getQuestion } from "@/api/xSheng"
export default {
  name:'xSheng',
  data() {
    return{
      list:null,
      listLoading:null,
      quizType1:null,
      quizType2:null,
      quizType3:null,
      quizType4:null,
      textarea:'',
      testDatas:null
    }
  },
  created(){
    this.fetchData()
   
  },
  methods:{
    getTitle(){
      var title = this.$route.query.name
      return title
    },
    getContent(){
      var nr = this.$route.query.markdown
      for (let i=0;i<3;i++){
        // console.log(nr.indexOf(`[问题${i}]`))
      }
      let insertStr = (soure,start, newStr) => {
        return soure.slice(0, start) + newStr + soure.slice(start)
      }
      // console.log(insertStr(nr,nr.indexOf('问题1')-1,`<el-input type="text">字符</el-input>`))
      var nr1 = insertStr(nr,nr.indexOf('问题1')-1,`<input type="text"></input>`)
      var nr2 = insertStr(nr1,nr1.indexOf('问题2')-1,`<input type="text"></input>`)
      var nr3 = insertStr(nr2,nr2.indexOf('问题3')-1,`<table border="1" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>第一列&nbsp; &nbsp;</th><th>第二列</th></tr><tr><td>内容</td><td>内容</td></tr></tbody></table>`)
      return nr3
    },
    fetchData() {
        this.listLoading = true
        getQuestion().then(response => {
          this.list = response.value
          this.listLoading = false
         
          var dataList = this.list
          var dataLength = this.list.length

          // console.log(dataList)
          // console.log(dataLength)
          
          var quizId = this.$route.query.id
          var quizQuestions = []
          for(let i = 0; i < dataLength; i++){
            if(quizId == dataList[i].quizId){
              quizQuestions.push(dataList[i])
              // console.log(dataList[i])
              // console.log(quizQuestions)
            }
          }
          console.log(quizQuestions)
          
          var quizQuestionsType1 = []
          var quizQuestionsType2 = []
          var quizQuestionsType3 = []
          var quizQuestionsType4 = []

          for(let i = 0; i < quizQuestions.length; i++){
            if(quizQuestions[i].questionTypeId == 1){
              quizQuestionsType1.push(quizQuestions[i])
            }
            if(quizQuestions[i].questionTypeId == 2){
              quizQuestionsType2.push(quizQuestions[i])
            }
            if(quizQuestions[i].questionTypeId == 3){
              quizQuestionsType3.push(quizQuestions[i])
            }
            if(quizQuestions[i].questionTypeId == 4){
              quizQuestionsType4.push(quizQuestions[i])
            }
          }
          console.log(quizQuestionsType1)
          console.log(quizQuestionsType2)
          console.log(quizQuestionsType3)
          console.log(quizQuestionsType4)

          var quizQuestionsType1Length = quizQuestionsType1.length
          var quizQuestionsType2Length = quizQuestionsType2.length
          var quizQuestionsType3Length = quizQuestionsType3.length
          var quizQuestionsType4Length = quizQuestionsType4.length

          this.quizType1 = quizQuestionsType1
          this.quizType2 = quizQuestionsType2
          this.quizType3 = quizQuestionsType3
          this.quizType4 = quizQuestionsType4
          
         
          
        })
    },
   
   
     
    
  },
  mounted(){
    // var nr = this.$route.query.markdown
    // for (let i=0;i<3;i++){
    //   console.log(nr.indexOf(`[问题${i}]`))
    // }
    // let insertStr = (soure,start, newStr) => {
    //   return soure.slice(0, start) + newStr + soure.slice(start)
    // }
    // console.log(insertStr(nr,nr.indexOf('问题1')-1,`<el-input type="text">字符</el-input>`))
    // var nr1 = insertStr(nr,nr.indexOf('问题1')-1,`<el-input type="text">字符</el-input>`)
    // console.log(this.$route.query.markdown.indexOf(`[问题1]`))
    // console.log(this.$route.query.markdown.indexOf(`[问题2]`))
    // console.log(this.$route.query.markdown.indexOf(`[问题3]`))
    


  }
}
</script>

<style>

</style>