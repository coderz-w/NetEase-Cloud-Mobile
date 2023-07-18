<template>
  <div class="sideHeader">
    <div class="headerLeft" @click="toUserPage">
      <img
        :src="avatarUrl"
        alt=""
        class="user"
      />
      <div>{{ nickname }}  <i class="iconfont icon-xuanzeqixiayige ic"></i></div>
    </div>
    <div class="headerRight"><i class="iconfont icon-saoma ic"></i></div>
  </div>
</template>

<script setup>
import {useUserStore} from '@/stores/userdata'
import router from "@/router";
import { reactive } from 'vue';
import { storeToRefs } from 'pinia'
let userstore=useUserStore()
let {isLogin,nickname,avatarUrl}=storeToRefs(userstore)
if(userstore.isLogin){
    // 登入逻辑
}
function toUserPage(){
    if(isLogin.value==true){
        router.push('userPages')
    }
    else router.push('login')
}
</script>

<style lang="less" scoped>
.sideHeader {
    position: relative;
  display: flex;
  align-items: center;
  justify-content: space-around;
  margin-top: 2vh;
  width: 100%;
  height: 10vh;
  color: #333333;
  .headerLeft {
    display: flex;
    width: 45vw;
    font-size: 15px;
    align-items: center;
    justify-content: space-around;
    margin-left: -9vw;
    .user {
        width: 40px;
        height: 40px;
        margin-right: 4vw;
        border-radius: 50%;
    }
    div {
      font-size: 16px;
        margin-left: -2vw;
        margin-right: 2vh;
    }
  }
  .headerRight {
    margin-right: -8vw;
  }
}
.ic {
    font-size: 21px;
}
</style>
