<template>
<div class="userCrete">
    <h1 v-show="props.msg.length>0">你的歌单</h1>
    <h1 v-show="props.msg.length<=0">你的歌单空空如也</h1>
    <template v-for="item in showitem" :key="item.id">
      <div class="item" @click="tosonglist(item)">
        <img :src="item.coverImgUrl" alt="">
        <div class="descrip">
          <h4 class="line">{{ item.name}}</h4>
          <h2>{{ item.trackCount }}首，By&nbsp;&nbsp;{{ item.nickname }}</h2>
        </div>
      </div>
    </template>
    <div class="showmore" v-if="props.msg.length>10">查看全部</div>
</div>
</template>

<script setup>
import { computed, defineProps } from 'vue';
import router from "../../router/index"
import { ref } from 'vue';
let props=defineProps({msg:Array})
console.log(props.msg)
let showitem=computed(()=>{
  return props.msg.slice(0, 10);
})
function tosonglist(item) {
  console.log(item);
  router.push({ name: 'playList', params: { id: item.id } });
}


</script>

<style lang="less" scoped>
 .userCrete {
    position: relative;
  margin-top: 2vh;
  margin-left: 3vw;
  border-radius: 4vw;
  padding-top: 7vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-around;
  width: 94vw;
  min-height: 8vh;
   height: auto;
  padding-left: 5vw;
  background-color: #ffffff;
  overflow-x: hidden;
  h1 {
    position: absolute;
    font-size: 5vw;
    font-weight: bolder;
    left: 5vw;
    top: 4vw;
  }
  .item {
    display: flex;
    align-items: center;
    width: 88%;
    height: 8vh;
    overflow-x: hidden;
    margin-left: -10vw;
    margin-bottom: 2vh;
    img {
      height: 90%;
      border-radius: 16%;
    }
    .descrip {
    position: relative;
    margin-top: 1vh;
    margin-left: 2vw;
    h4 {
      margin-top: -1vh;
      font-size: 4vw;
    }
    h2 {
      margin-top: 1vh;
      font-size: 2vh;
      color: #808080;

    }
    }
  }
}
.line {
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
  .showmore {
   display: flex;
   width: 100%;
   margin-top: 1vh;
   margin-left: -7vw;
   font-size: medium;
   margin-bottom: 3vh;
   font-weight: 600;
   color: #808080;
   align-items: center;
   justify-content: center;
  }

</style>