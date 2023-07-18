<template>
 <i @click="fc" class="iconfont icon-cebianlan"></i>
 点击展示侧边
 <div v-if="isLogin" id="login" @click="fn">退出</div>
<sideways ref="sidewaysRef"></sideways>
<div class="discoverPage">
    <div class="showSideways"></div>
</div>
</template>

<script setup>
import sideways from '../../components/sideways/sideways.vue';
import { ref } from 'vue';
import {useUserStore}  from "@/stores/userdata.js"
import { storeToRefs } from 'pinia';
let userstore=useUserStore()
let {isLogin}=storeToRefs(userstore)
const sidewaysRef=ref()
function fc(){
sidewaysRef.value.fn()
}
function fn(){
    userstore.isLogin=false,
    userstore.nickname='立即登录',
    userstore.cookie='',
    userstore.id='',
    userstore.userName='',
    userstore.avatarUrl='',
    userstore.backgroundUrl='',
    userstore.level='',
    userstore.listenSongs='',
    userstore.followeds='',
    userstore.follows='',
    userstore.playlistCount='',
    userstore.birthday='',
    userstore.gender='',
    userstore.signature='',
    userstore.createDays=''
}
</script>

<style lang="less" scoped>
.iconfont {
    margin-left: 10vw;
    margin-top: 20vh;
}
#login {
    display: flex;
    margin-top: 20vh;
    align-items: center;
    background-color: pink;
    width: 5vh;
    height: 5vh;
}

</style>