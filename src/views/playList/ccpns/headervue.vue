<template>
    <div class="header">
        <i class="iconfont icon-shangyige" id="icon" @click="back"></i><div class="mygd">我的歌单</div>
        <i class="iconfont icon-androidgengduo" id="icon"></i>
    
    </div>
    </template>
    
    <script setup>
    import router from '../../../router';
    function back(){
        let audio=document.querySelector('audio')
        audio.style.display='none'
        router.back()
    }
    
    </script>
    
    <style lang="less" scoped>
    .header {
        display: flex;
        align-items: center;
        position: relative;
        justify-content: space-between;
        height: 10vh;
        left: 4vw;
        width: 92vw;
        color: #ffffff;
    }
    #icon {
        font-size: 30px;
        color: #ffffff;
    }
    .mygd {
        position: relative;
        left: -13vh;
        font-size: 3vh;
    }
    </style>