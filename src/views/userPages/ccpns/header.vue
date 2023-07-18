<template>
<div class="header">
    <i class="iconfont icon-shangyige" id="icon" @click="back"></i>
    <i class="iconfont icon-androidgengduo" id="icon"></i>

</div>
</template>

<script setup>
import router from '../../../router';
function back(){
    router.push("/")
}

</script>

<style lang="less" scoped>
.header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    left: 4vw;
    width: 92vw;
    position: absolute;
    color: #808080;
}
#icon {
    font-size: 30px;
    z-index: 9;
}
</style>