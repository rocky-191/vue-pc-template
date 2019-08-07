<template>
  <div>
    登录页
  </div>
</template>

<script>
  import userApi from "@/api/userApi";
  export default {
    name:'Login',
    mounted(){
      this.getUser();
    },
    methods:{
      async getUser(){
        let res=await userApi._getUserInfo();
        if(res){
          console.log(res)
        }
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>