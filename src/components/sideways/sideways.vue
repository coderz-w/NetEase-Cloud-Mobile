<template>
  <div :class="isshow ? 'shadow' : 'noshadow'"></div>
  <div :class="isshow ? 'sidewaysShow' : 'sideways'" id="side">
    <sideHeader></sideHeader>
    <div class="vip"><img :src="vipsrc" alt=""></div>
    <div class="div1">
      <div>
        <span><i class="iconfont icon-youxiang" id="icon"></i></span>
        <p>我的消息</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-yun" id="icon"></i></span>
        <p>云贝中心</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-linggan" id="icon"></i></span>
        <p>创作者中心</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
    </div>
    <div class="div2">
      <div>
        <span><i class="iconfont icon-tx-liujiaoxingxing" id="icon"></i></span>
        <p>趣测</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-piaoju" id="icon"></i></span>
        <p>云村有票</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-koudai" id="icon"></i></span>
        <p>多多                                                                                                                                    口袋</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-shouye" id="icon"></i></span>
        <p>商城</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-heartbeat" id="icon"></i></span>
        <p>Beat专区</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-lingdang-xianxing" id="icon"></i></span>
        <p>口袋彩铃</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
      <div>
        <span><i class="iconfont icon-youxiyouxiji" id="icon"></i></span>
        <p>游戏专区</p>
        <span><i class="iconfont icon-xuanzeqixiayige" id="nest"></i></span>
      </div>
    </div>
  </div>
</template>

<script setup>
import sideHeader from "./sideHeader.vue";
import { computed, ref } from "vue";
let isshow = ref(false);
let startX = ref(0);
function fn() {
  isshow.value = !isshow.value;
  console.log(isshow.value)
}
window.addEventListener("click", function (e) {
  if (isshow.value == true && e.layerX / this.screen.width > 0.7) {
    isshow.value = !isshow.value;
  }
});

// 屎控制滑动效果
window.addEventListener("touchmove", function (e) {
  if (e.touches[0].pageX - startX.value < 0) {
    document.querySelector("#side").style.left = `${
      (e.touches[0].pageX - startX.value) * 1.3
    }px`;
  }
});
window.addEventListener("touchstart", function (e) {
  startX.value = e.touches[0].pageX;
});
window.addEventListener("touchend", function () {
  let left = parseInt(document.querySelector("#side").style.left);
  if (left + this.screen.width * 0.4 < 0) {
    document.querySelector("#side").className = "sideways";
    document.querySelector("#side").style.left = "0px";
    isshow.value = !isshow.value;
  }
  else {
    document.querySelector("#side").style.left = "0px";
  }
});
let vipsrc=computed(()=>{
  return new URL('@/assets/image/cloudmusicvip.jpg',import.meta.url).href
})
defineExpose({ fn });
</script>

<style lang="less" scoped>
.sideways {
  height: 100vh;
  width: 80%;
  position: absolute;
  z-index: 9;
  top: 0;
  margin-left: -80vw;
  background-color: #f5f5f5;
  transition: 0.5s;
  color: #333333;
}

.sidewaysShow {
  height: 100vh;
  width: 80%;
  position: fixed;
  z-index: 9;
  top: 0;
  left: 0;
  background-color: #f5f5f5;
  transition: 0.5s;
  color: #333333;
}
.vip {
  position: relative;
  display: flex;
  margin: 5px auto;
  border-radius: 20px;
  width: 70vw;
  height: 15vh;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
  }
}
.div1 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  border-radius: 20px;
  width: 70vw;
  height: 15vh;
  background-color: white;
  div {
    display: flex;
    width: 80%;
    height: 33%;
    align-items: center;
    margin-left: 5vw;
    border-bottom: solid 2px #f3f3f3;
    span {
      display: flex;
      align-items: center;
      width: 10vw;
    }
    p {
      width: 20vw;
      margin-left: 2vw;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
.div2 {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  margin: 20px auto;
  border-radius: 20px;
  width: 70vw;
  height: 40vh;
  background-color: #ffffff;
  div {
    display: flex;
    width: 80%;
    height: 13%;
    align-items: center;
    margin-left: 5vw;
    border-bottom: solid 2px #ffffff;
    span {
      display: flex;
      align-items: center;
      width: 10vw;
    }
    p {
      width: 20vw;
      margin-left: 2vw;
      font-size: 15px;
      font-weight: 500;
    }
  }
}
#icon {
  margin-left: 1vw;
  line-height: 100%;
  font-size: 20px;
}
#nest {
  margin-left: 25vw;
}
.shadow {
position: fixed;
top: 0;
z-index: -1;
width: 100vw;
height: 100vh;
animation: show 0.25s linear forwards;
background-color: rgba(0, 0, 0, 0.7);
}
.noshadow {
position: fixed;
top: 0;
z-index: -1;
width: 100vw;
height: 100vh;
 animation: hide 0.25s linear forwards;
}
@keyframes show {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
@keyframes hide {
  from {
    opacity: 1;
  }
  to {
    opacity: 0;
  }
}
</style>
