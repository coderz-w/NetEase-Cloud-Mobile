<template>
    <div class="header">
        <i class="iconfont icon-shangyige" id="icon" @click="back"></i>
        <h2>我的资料</h2>
        <i class="iconfont icon-androidgengduo" id="icon"></i>
    
    </div>
    </template>
    
    <script setup>
    import router from '../../../router';
    function back(){
        router.back()
    }
    </script>
    
    <style lang="less" scoped>
    .header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        height: 10vh;
        width: 100vw;
        background-color: white;
        color: black;
        h2 {
            margin-left: -40vw;
            font-size: 20px;
        }
    }
    #icon {
        font-size: 30px;
    }
    </style>