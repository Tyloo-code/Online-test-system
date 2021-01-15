<template>
  <div>
    这是第{{this.$route.params.id}}页
  </div>
</template>

<script>
export default {
  name:'dRouting',
  data(){
    return{
      id:null,
    }
  },

}
</script>

<style>

</style>