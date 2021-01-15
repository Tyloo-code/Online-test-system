<template>
  <div>
    这是第{{this.$route.query.id}}页<br>
    <!-- 这是题目{{this.$route.query.name}}<br> -->
    <!-- 这是实验报告{{this.$route.query.markdown}}<br> -->
    <h1>{{getTitle()}}</h1>
    <div v-html="getContent()"></div>
    

  </div>
</template>

<script>
export default {
  name:'xSheng',
  data() {
    return{
      
    }
  },
  
  methods:{
    getTitle(){
      var title = this.$route.query.name
      return title
    },
    getContent(){
      var nr = this.$route.query.markdown
      for (let i=0;i<3;i++){
        console.log(nr.indexOf(`[问题${i}]`))
      }
      let insertStr = (soure,start, newStr) => {
        return soure.slice(0, start) + newStr + soure.slice(start)
      }
      console.log(insertStr(nr,nr.indexOf('问题1')-1,`<el-input type="text">字符</el-input>`))
      var nr1 = insertStr(nr,nr.indexOf('问题1')-1,`<input type="text"></input>`)
      var nr2 = insertStr(nr1,nr1.indexOf('问题2')-1,`<input type="text"></input>`)
      var nr3 = insertStr(nr2,nr2.indexOf('问题3')-1,`<table border="1" width="100%" cellpadding="0" cellspacing="0"><tbody><tr><th>第一列&nbsp; &nbsp;</th><th>第二列</th></tr><tr><td>内容</td><td>内容</td></tr></tbody></table>`)
      return nr3
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