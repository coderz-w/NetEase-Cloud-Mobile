<template>
  <div class="userhome">
    <h1>音乐品味</h1>
    <div>
      <h2>我的喜欢</h2>
      <h3>100首</h3>
    </div>
    <div>
      <h2>累计听歌</h2>
      <h3>{{ listenSongs }}首</h3>
    </div>
    <div>
      <h2>本周关键词</h2>
      <h3>属于你的音乐档案</h3>
    </div>
  </div>
  <userCreate :msg="Msg"></userCreate>
  <div class="usercard">
    <div>
      <div class="jb">基本信息</div>
      <div class="gt">领取村民证</div>
    </div>
    <h2>村龄：{{ getDaysFromNow(userstore.createTime) }}</h2>
    <h3>性别：{{ gender == 1 ? "男" : "女" }}</h3>
    <h4>生日:&nbsp;&nbsp;{{birthday }}</h4>
    <h5>个人简介:{{ signature }}</h5>
  </div>
</template>

<script setup>
import { useUserStore } from "@/stores/userdata.js";
import { getUserSonglist } from "@/services/request/test.js";
import { ref } from "vue";
import userCrete from "@/components/sideways/userCreate.vue";
import { storeToRefs } from "pinia";
import toyear from "@/utils/timetoday.js"
import getDaysFromNow from "@/utils/timetoday.js";
let Msg = ref([]);
const userstore = useUserStore();
let { id, cookie, listenSongs,birthday,signature,gender} = storeToRefs(userstore);
async function getdata() {
  let res = await getUserSonglist(id.value, cookie.value);
  Msg.value = [];
  for (let i = 1; i < res.playlist.length; i++) {
    Msg.value[i - 1] = {
      id: res.playlist[i].id,
      name: res.playlist[i].name,
      coverImgUrl: res.playlist[i].coverImgUrl,
      trackCount: res.playlist[i].trackCount,
      playCount: res.playlist[i].playCount,
      nickname: res.playlist[i].creator.nickname,
    };
  }
  // console.log(Msg)
}
getdata();
</script>

<style lang="less" scoped>
.userhome {
  position: relative;
  margin-top: 2vh;
  margin-left: 3vw;
  margin-bottom: 2vh;
  border-radius: 4vw;
  display: flex;
  justify-content: space-around;
  width: 94vw;
  height: 24vh;
  padding-left: 1vw;
  background-color: #ffffff;
  h1 {
    position: absolute;
    font-size: 5vw;
    font-weight: bolder;
    left: 5vw;
    top: 4vw;
  }
  div {
    box-sizing: border-box;
    margin-top: 12vw;
    width: 26vw;
    height: 15vh;
    border-radius: 3vw;
    color: #808080;
    padding-left: 2vw;
    padding-top: 2vw;
    background: rgb(2, 0, 36);
    background: linear-gradient(
      90deg,
      rgba(2, 0, 36, 1) 0%,
      rgba(0, 255, 255, 0.6906221961440826) 100%
    );
    h2 {
      font-size: 3vw;
      margin-top: 1vw;
    }
    h3 {
      font-size: 5vw;
      margin-top: 4vw;
      margin-left: 2vw;
    }
  }
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
  height:auto;
  margin: 0 auto;
  background-color: white;
  div {
    position: relative;
    top:-1vh;
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

</style>
