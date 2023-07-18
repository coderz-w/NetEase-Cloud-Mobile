<template>
  <div class="playList">
    <div class="background">
      <img :src="data.img" alt="" class="bg" />
      <headervue></headervue>
      <div class="midel">
        <div class="img"><img :src="data.img" alt="" /></div>
        <div class="det">
          <div class="d1">{{ data.name }}</div>
          <div class="d2">
            <img :src="data.cimg" alt="" />{{ data.creater }}
          </div>
          <div class="d3">{{ data.tags.join(" ") }}</div>
        </div>
      </div>
      <h2 class="line">{{ data.description }}</h2>
      <div class="tbut">
        <div class="share">
          <i class="iconfont icon-zuijinbofang"></i>&nbsp;&nbsp;{{
            data.shareCount
          }}
        </div>
        <div class="message">
          <i class="iconfont icon-heartbeat"></i>&nbsp;&nbsp;{{
            data.commentCount
          }}
        </div>
        <div class="keep">
          <i class="iconfont icon-wodeshoucang"></i>&nbsp;&nbsp;{{
            data.subscribedCount > 10000
              ? Math.floor(data.subscribedCount / 10000) + "万"
              : data.subscribedCount
          }}
        </div>
      </div>
    </div>
    <!-- 歌曲列表 -->
    <div class="mainbox">
      <div class="mainheader">
        <div class="le">
          <i class="iconfont icon-24gl-playCircle"></i>
          <p>播放全部</p>
        </div>
        <div class="ri">
          <i class="iconfont icon-xiazai"></i
          ><i class="iconfont icon-bofanggedan"></i>
        </div>
      </div>
      <!-- 歌曲列表 -->
      <div class="mianlist">
        <div class="tem" v-for="(item, index) in songs" :key="item.name">
          <div class="num">{{ index + 1 }}</div>
          <div class="listm">
            <h4>{{ item.name }}</h4>

            <h2>{{ item.ar[0].name }}</h2>
          </div>
          <div class="listr">
            <i class="iconfont icon-androidgengduo micon"></i>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import headervue from "./ccpns/headervue.vue";
import router from "../../router";
import { computed, reactive, ref, withDirectives } from "vue";
import { getSonglistDetail, getlistAll } from "@/services/request/test.js";
import { useUserStore } from "@/stores/userdata.js";
import { storeToRefs } from "pinia";
let current = 0;
let id = ref();
let data = reactive({});
let songs = ref([]);
let userstore = useUserStore();
let { cookie } = storeToRefs(userstore);
id = router.currentRoute.value.params.id;
async function getdata() {
  let res = await getSonglistDetail(id, cookie.value);
  data.name = res.playlist.name;
  data.description = res.playlist.description;
  data.creater = res.playlist.creator.nickname;
  data.img = res.playlist.coverImgUrl;
  data.cimg = res.playlist.creator.avatarUrl;
  data.commentCount = res.playlist.commentCount;
  data.subscribedCount = res.playlist.subscribedCount;
  data.shareCount = res.playlist.shareCount;
  data.tags = res.playlist.tags;
}
async function getsongs() {
  let res = await getlistAll(id, current * 20);
  console.log(res);
  songs.value = songs.value.concat(res.songs);
  current++;
  window.addEventListener("scroll", handleScroll);
}
getdata();
getsongs();
// 滚动加载
function handleScroll() {
  let ch = document.documentElement.clientHeight;
  let stp = document.documentElement.scrollTop;
  let sht = document.documentElement.scrollHeight;
  if (ch + stp >= sht - 100) {
    getsongs();
    window.removeEventListener("scroll", handleScroll);
  }
}
</script>

<style lang="less" scoped>
.playList {
  position: relative;
  overflow-x: hidden;
  .background {
    position: relative;
    overflow: hidden;
    width: 100%;
    height: 43vh;
    overflow: hidden;
    // 三个按钮样式
    .tbut {
      display: flex;
      margin: 3vh auto;
      width: 90%;
      height: 5vh;
      color: #808080;
      justify-content: space-between;
      font-size: 15px;
      font-weight: 600;
      .share {
        box-sizing: border-box;
        padding: 0 5vw;
        display: flex;
        align-items: center;
        justify-content: space-around;
        width: 28%;
        margin-right: 5%;
        height: 100%;
        border-radius: 5vh;
        background-color: aliceblue;
        opacity: 0.5;
      }
      .message {
        display: flex;
        box-sizing: border-box;
        padding: 0 5vw;
        align-items: center;
        width: 28%;
        height: 100%;
        margin-right: 5%;
        border-radius: 5vh;
        background-color: aliceblue;
        opacity: 0.5;
      }
      .keep {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        padding: 0 3vw;
        width: 28%;
        height: 100%;
        border-radius: 5vh;
        background-color: aliceblue;
        opacity: 0.5;
      }
    }
    image {
      height: 100%;
      width: 100%;
    }
    .midel {
      display: flex;
      margin-top: 0;
      width: 90%;
      margin-left: 6%;
      align-items: center;
      justify-content: space-around;
      .img {
        border-radius: 4vw;
        width: 19vh;
        height: 19vh;
        img {
          width: 100%;
          border-radius: 2vh;
        }
      }
      .det {
        margin-left: 3vh;
        margin-top: -2vw;
        color: #f5f5f5;
        .d1 {
          position: relative;
          margin-top: -2vh;
          width: 100%;
          font-size: 18px;
          font-weight: 600;
        }
        .d2 {
          display: flex;
          margin-top: 3vw;
          width: 100%;
          margin-left: -1vh;
          align-items: center;
          justify-content: space-around;
          img {
            width: 4vh;
            border-radius: 50%;
          }
        }
        .d3 {
          margin-top: 3vw;
          font-weight: 500;
        }
      }
    }
    h2 {
      margin-left: 6%;
      color: #f5f5f5;
      font-size: 15px;
      font-weight: 500;
    }
  }
  .mainbox {
    margin-top: -2vh;
    border-radius: 3vh;
    width: 100%;
    background-color: white;
    // list body
    .mianlist {
      display: flex;
      flex-wrap: wrap;
      align-items: center;
      margin: 0 auto;
      width: 90vw;
      background-color: white;
      .tem {
        box-sizing: border-box;
        display: flex;
        padding-left: 1vh;
        align-items: center;
        margin-bottom: 2vh;
        .num {
          width: 3vh;
          display: flex;
          font-size: 20px;
          justify-content: center;
          font-weight: 600;
          color: #808080;
        }
        .listm {
          box-sizing: border-box;
          width: 55vw;
          height: 6vh;
          margin-left: 6vw;
          h2 {
            color: #808080;
            margin-top: 1vh;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
          h4 {
            font-size: 17px;
            font-weight: 500;
            color: #808080;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
          }
        }
        .listr {
          box-sizing: border-box;
          margin-left: 5vw;
        }
      }
    }
    // list头
    .mainheader {
      display: flex;
      align-items: center;
      width: 100%;
      padding-top: 1vh;
      justify-content: space-between;
      height: 6vh;
      border-radius: 3vh;
      .le {
        margin-left: 3vh;
        display: flex;
        width: 30%;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          color: red;
          font-size: 4vh;
        }
        p {
          font-size: 16px;
          font-weight: 600;
        }
      }
      .ri {
        display: flex;
        width: 20%;
        margin-right: 3vw;
        justify-content: space-between;
        align-items: center;
        .iconfont {
          font-size: 6vw;
        }
      }
    }
  }
}
.line {
  width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}
.bg {
  position: absolute;
  width: 100%;
  height: 100%;
  filter: blur(35px);
  z-index: -9;
}
.micon {
  margin-left: 14vw;
  font-size: 20px;
  color: #808080;
}
</style>
