<template>
  <div class="active">
    <div class="tip" v-if="!more > 0">你还没有动态哦</div>
    <template v-for="item in list" :key="item.eventTime">
      <div class="item">
        <div class="lf"><img :src="avatarUrl" alt="" /></div>
        <div class="r">
          <h2>{{ nickname }}</h2>
          <h3>{{ item.eventTime }}</h3>
          <h4>{{ JSON.parse(item.data).msg }}</h4>
          <template v-for="img in item.pics" :key="img.originUrl">
            <div class="imgbox">
              <img
                :src="img.originUrl"
                alt=""
                class="talkimg"
                :style="`width:${img.width / 50}vw;height:${
                  img.height / 50
                }vw`"
              />
            </div>
          </template>
          <div>
            <i class="iconfont icon-fenxiang"></i
            ><i class="iconfont icon-pinglun"></i
            ><i class="iconfont icon-dianzan"></i>
          </div>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup>
import { getactive } from "@/services/request/test.js";
import { useUserStore } from "@/stores/userdata.js";
import formatTime from "@/utils/timetonow.js";
import { storeToRefs } from "pinia";
import { ref } from "vue";
let userstore = useUserStore();
let { id, cookie, nickname, avatarUrl } = storeToRefs(userstore);
let list = ref([]);
let more = ref(false);
let res = "";
async function loadactive() {
  res = await getactive(id.value, cookie.value);
  console.log(res);
  more.value = res.events.length;
  list.value = res.events.map((event) => {
    return {
      eventTime: formatTime(event.eventTime),
      data: event.json,
      pics: event.pics,
    };
  });
  console.log(list.value);
}
loadactive();
</script>

<style lang="less" scoped>
.active {
  position: relative;
  margin-top: 2vh;
  margin-left: 3vw;
  border-radius: 4vw;
  padding-bottom: 5vh;
  display: flex;
  flex-wrap: wrap;
  width: 94vw;
  padding-left: 1vw;
  background-color: #ffffff;
  .item {
    display: flex;
    padding-top: 5vh;
    padding-left: 3vh;
    padding-bottom: 3vh;
    border-bottom: solid 2px #f5f5f5;
    .lf {
      img {
        position: relative;
        top: -1vh;
        width: 5vh;
        height: 5vh;
        border-radius: 50%;
      }
    }
    .r {
      margin-left: 2vh;
      h2 {
        position: relative;
        font-size: 15px;
        font-weight: 600;
        top: -1vh;
      }
      h3 {
        position: relative;
        color: #808080;
        font-size: 12px;
        top: 1px;
      }
      h4 {
        position: relative;
        max-width: 63vw;
        line-height: 5vw;
        margin-bottom: 5vh;
        top: 2vh;
        left: 0vw;
      }
      div {
        display: flex;
        margin-top: 6vh;
        width: 45vw;
        align-items: center;
        justify-content: space-around;
        .iconfont {
          font-size: 18px;
        }
      }
    }
  }
}
.tip {
  margin-top: 4vw;
  width: 100%;
  display: flex;
  font-size: 4vw;
  align-items: center;
  justify-content: center;
  text-align: center;
}
// .usercard {
//   box-sizing: border-box;
//   display: flex;
//   position: relative;
//   flex-wrap: wrap;
//   width: 90%;
//   top: 3vh;
//   padding: 2vh;
//   padding-top: 4vh;
//   height: auto;
//   margin: 0 auto;
//   background-color: white;
//   div {
//     position: relative;
//     top: -1vh;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     width: 100%;
//     .jb {
//       position: relative;
//       font-size: 20px;
//       font-weight: 600;
//     }
//     .gt {
//       display: flex;
//       position: relative;
//       align-items: center;
//       justify-content: center;
//       width: 16vh;
//       padding: 4px 2px;
//       border-radius: 2vh;
//       font-size: 13px;
//       border: #808080 solid 1px;
//     }
//   }
//   h5 {
//     width: 60%;
//     margin-top: 2vh;
//     color: #808080;
//   }
//   h2 {
//     width: 100%;
//     margin-top: 2vh;
//     color: #808080;
//   }
//   h3 {
//     width: 100%;
//     margin-top: 2vh;
//     color: #808080;
//   }
//   h4 {
//     width: 100%;
//     margin-top: 2vh;
//     color: #808080;
//   }
// }
.imgbox {
  width: 100%;
  display: flex;
  justify-content: center;
  .talkimg {
    position: relative;
  }
}
</style>
