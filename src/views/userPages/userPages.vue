<template>
  <div class="userPages">
    <div class="background">
      <headervue></headervue>
      <img :src="bgpic" alt=""  class="bgpic"/>
    </div>
    <div class="userCard">
      <img :src="avatarUrl" alt="" />
      <div class="nickname">{{ nickname }}</div>
      <div class="account1">
        <div>{{ follows }}&nbsp;&nbsp;关注</div>
        <div>{{ followeds }}&nbsp;&nbsp;粉丝</div>
        <div>Lv.{{ level }}</div>
      </div>
      <div class="account2">
        <div>IP:重庆</div>
        <div>未知&nbsp;&nbsp;未知</div>
        <div>村龄{{ getDaysFromNow(userstore.createTime) }}</div>
      </div>
      <div class="more">
        <div class="change">
          <router-link :to="{ name: 'userData' }" class="rl"
            >编辑资料</router-link
          >
        </div>
        <div><i class="iconfont icon-xiangxiajiantou"></i></div>
      </div>
    </div>
    <!-- 主页，动态 -->
    <div class="router">
      <div><router-link :to="{ name: 'userhome' }">主页</router-link></div>
      <div><router-link :to="{ name: 'useractive' }">动态</router-link></div>
      <div><router-link :to="{ name: 'Podcasts' }">播客</router-link></div>
    </div>
    <router-view></router-view>
    <!-- <div class="usercard">
      <div>
        <div class="jb">基本信息</div>
        <div class="gt">领取村民证</div>
      </div>
      <h2>村龄：{{ getDaysFromNow(userstore.createTime) }}</h2>
      <h3>性别：{{ gender==1?'男':"女" }}</h3>
      <h4>年龄:&nbsp;&nbsp;{{ toyear(birthday) }}</h4>
      <h5>个人简介:{{signature}}</h5>
    </div> -->
  </div>
</template>

<script setup>
import headervue from "./ccpns/header.vue";
import { computed } from "vue";
import { getdetailUser } from "@/services/request/test.js";
import { useUserStore } from "@/stores/userdata.js";
import { storeToRefs } from "pinia";
// import toyear from "@/utils/timetoday.js"
import getDaysFromNow from "@/utils/timetoday.js";
let userstore = useUserStore();
let {
  nickname,
  cookie,
  avatarUrl,
  backgroundUrl,
  level,
  gender,
  birthday,
  listenSongs,
  followeds,
  follows,
  playlistCount,
  signature,
} = storeToRefs(userstore);
async function getdata() {
  let res = await getdetailUser(userstore.id, cookie.value);
  userstore.createTime = res.profile.createTime;
  userstore.level = res.level;
  userstore.listenSongs = res.listenSongs;
  userstore.follows = res.profile.follows;
  userstore.followeds = res.profile.followeds;
  userstore.playlistCount = res.profile.playlistCount;
}

getdata();
let bgpic=computed(()=>{
  return new URL('@/assets/image/pic.jpg',import.meta.url).href
})
</script>

<style lang="less" scoped>
.userPages {
  position: relative;
  background-color: #f5f5f5;
  overflow-x: hidden;
  .background {
    width: 100%;
    height: 40vh;
    overflow: hidden;
    image {
      height: 100%;
      width: 100%;
    }
  }
  .userCard {
    z-index: 9;
    position: relative;
    margin-top: -5vh;
    margin-left: 3vw;
    border-radius: 4vw;
    width: 94vw;
    height: 27vh;
    background-color: #ffffff;
    img {
      position: absolute;
      width: 20vw;
      height: 20vw;
      border-radius: 50%;
      left: 38vw;
      top: -7vh;
    }
    .nickname {
      position: absolute;
      display: flex;
      justify-content: center;
      width: 100%;
      text-align: center;
      top: 6vh;
      font-weight: 600;
      font-size: 20px;
    }
    .account1 {
      position: absolute;
      display: flex;
      justify-content: space-around;
      width: 50vw;
      top: 11vh;
      left: 23vw;
      color: #808080;
    }
    .account2 {
      position: absolute;
      display: flex;
      justify-content: space-around;
      width: 65vw;
      top: 15vh;
      left: 16vw;
      font-size: 15px;
      font-weight: bold;
      color: #808080;
      div {
        border: solid #e3e3e3 1px;
        border-radius: 2vw;
        padding: 5px 7px;
      }
    }
    .more {
      position: absolute;
      display: flex;
      align-items: center;
      width: 40%;
      top: 21vh;
      left: 30%;
      justify-content: space-around;
      div {
        border-radius: 50%;
        padding: 5px;
        border: #e3e3e3 solid 1px;
      }
      .change {
        font-size: 14px;
        font-weight: 600;
        border-radius: 5vw;
        padding: 7px 10px;
      }
    }
  }
}

.router {
  margin-top: 2vh;
  margin-left: 20vw;
  border-radius: 4vw;
  display: flex;
  justify-content: space-around;
  align-items: center;
  width: 60vw;
  height: 5vh;
  div {
    display: flex;
    font-size: 15px;
    color: #808080;
    align-items: center;
    height: 5vh;
    width: 10vw;
    a {
      color: #808080;
    }
  }
}
.router-link-active {
  font-size: 18px;
  font-weight: 600;
}
.rl {
  color: #808080;
}
.usercard {
  box-sizing: border-box;
  display: flex;
  position: relative;
  flex-wrap: wrap;
  width: 90%;
  top: 3vh;
  padding: 2vh;
  padding-top: 4vh;
  height: auto;
  margin: 0 auto;
  background-color: white;
  div {
    position: relative;
    top: -1vh;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    .jb {
      position: relative;
      font-size: 20px;
      font-weight: 600;
    }
    .gt {
      display: flex;
      position: relative;
      align-items: center;
      justify-content: center;
      width: 16vh;
      padding: 4px 2px;
      border-radius: 2vh;
      font-size: 13px;
      border: #808080 solid 1px;
    }
  }
  h5 {
    width: 60%;
    margin-top: 2vh;
    color: #808080;
  }
  h2 {
    width: 100%;
    margin-top: 2vh;
    color: #808080;
  }
  h3 {
    width: 100%;
    margin-top: 2vh;
    color: #808080;
  }
  h4 {
    width: 100%;
    margin-top: 2vh;
    color: #808080;
  }
}
.bgpic {
  z-index: -100;
  width: 100%;
  filter: blur(30px);
}
</style>
