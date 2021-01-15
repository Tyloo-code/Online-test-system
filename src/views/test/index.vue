<template>
  <div>
     <div v-html="this.$route.params.content"></div>
   
  </div>
</template>

<script>
export default {
  name:'test',
 
  data(){
    return{
      nr:null,

    }
  },
  mounted() {
    console.log('################')
    // var nr = this.$route.params.content
    var nr = `<p>测试</p>[问题1]<p>第一题描述</p>[问题2]<p>第二题描述</p>`
    console.log(nr.indexOf('问题1'))
    let insertStr = (soure,start, newStr) => {
      return soure.slice(0, start) + newStr + soure.slice(start)
    }
    var cr = insertStr(nr,nr.indexOf('问题1')-1,`<el-input type="text">字符</el-input>`)
    console.log(cr)
  }
}
</script>

<style>

</style>