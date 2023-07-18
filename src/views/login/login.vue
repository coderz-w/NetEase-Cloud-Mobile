<template>
  <div class="login">
    <img :src="qrimg" alt="" @click="fn" />
    <div v-if="code == 803">登入成功，等待跳转</div>
    <div v-if="code == 800">登入失败，点击二维码重新获取</div>
    <div v-if="code == 801">等待扫码</div>
  </div>
</template>

<script setup>
import {
  getQrCodekey,
  getQrCode,
  checkQrCode,
  getUserInfo,
} from "../../services/request/test";
import { getCurrentTimestamp } from "@/utils/time.js";
import { useUserStore } from "@/stores/userdata.js";
import { ref } from "vue";
import { storeToRefs } from "pinia";
import router from "../../router";
let code = ref(0);
let userstore = useUserStore();
let unikey = ref();
let qrimg = ref();
let { isLogin } = storeToRefs(userstore);
async function getdata() {
  let res = await getQrCodekey();
  console.log(res);
  unikey.value = res.data.unikey;
  let data = await getQrCode(unikey.value, getCurrentTimestamp());
  console.log(data);
  qrimg.value = data.data.qrimg;
  let timer = setInterval(async () => {
    if (!timer || isLogin.value) return;
    const res = await checkQrCode(unikey.value, getCurrentTimestamp());
    if (res.code === 800) {
      // 二维码过期
      code.value = 800;
      console.log(res);
      clearInterval(timer);
    }
    if (res.code == 801) {
      code.value = 801;
    } else if (res.code === 803) {
      // 授权成功
      code.value = 803;
      console.log(res);
      clearInterval(timer);
      userstore.isLogin = true;
      userstore.cookie = res.cookie;
      let user = await getUserInfo(userstore.cookie);
      console.log(user);
      userstore.id = user.account.id;
      userstore.userName = user.account.userName;
      userstore.nickname = user.profile.nickname;
      userstore.avatarUrl = user.profile.avatarUrl;
      userstore.backgroundUrl = user.profile.backgroundUrl;
      userstore.gender = user.profile.gender;
      userstore.signature = user.profile.signature;
      userstore.birthday = user.profile.birthday;
      userstore.createDays = user.createDays;
      router.push("discoverPage");
    }
  }, 2000);
}

function fn() {
  getdata();
}
getdata();
</script>

<style lang="less" scoped>
.login {
  position: relative;
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  top: 15vh;
  justify-content: center;
}
img {
  width: 60vw;
  height: 60vw;
}
div {
  text-align: center;
  width: 100vw;
  font-size: large;
  margin-top: 5vh;
}
</style>
{ "code": 803, "message": "授权登陆成功", "cookie": "MUSIC_R_T=1673524305645;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT;
Path=/weapi/clientlog; HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647;
Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/eapi/feedback;
HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/wapi/feedback;
HTTPOnly;__csrf=51a04e92b61a6a54e5ebe84c9df6d27c; Max-Age=1296010; Expires=Mon,
31 Jul 2023 15:35:09 GMT; Path=/;;MUSIC_A_T=1673524305450; Max-Age=2147483647;
Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/eapi/clientlog;
HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/wapi/clientlog; HTTPOnly;MUSIC_A_T=1673524305450;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/api/clientlog;
HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_R_T=1673524305645;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT;
Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1673524305450; Max-Age=2147483647;
Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/weapi/clientlog;
HTTPOnly;MUSIC_A_T=1673524305450; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/neapi/clientlog; HTTPOnly;MUSIC_A_T=1673524305450;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/wapi/clientlog;
HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/eapi/clientlog; HTTPOnly;MUSIC_A_T=1673524305450;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/eapi/feedback;
HTTPOnly;MUSIC_A_T=1673524305450; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/weapi/feedback; HTTPOnly;MUSIC_A_T=1673524305450;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/api/feedback;
HTTPOnly;MUSIC_SNS=; Max-Age=0; Expires=Sun, 16 Jul 2023 15:34:59 GMT;
Path=/;MUSIC_A_T=1673524305450; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/wapi/feedback;
HTTPOnly;MUSIC_U=0068C4565CD7912B493EB1D79667F86505EB2DB1F6CC3D58A240B2F1BBAFC602ECAF637EAD8A33F5846D404B322218C8BBA76D43E559A18C7726C959CFCA82B88A9434C87D4117D9DFFD3D3463468E123E6C74F26C91C85BFF59FE4F87BA5C86DFBCFBCAEAAB4D5781EEE71118C8E64FCA33BA7D23CD500CF807928C59E7CC5552558F90EC59A255C4BC833848A5ED2757F7EF01745CDF4FEF0AA5490CE2C079195C45306FD27145B23C0CE283EEA5096E713A47AEB4435CE7D0D4C213A3574F1C860909CB3ACE078D120D61ECBFB29E37A5F6758CD3A6EDF323D9F6A07D4B0C1FF8F3778293E777A061B6C466A026D32E0C1487F4FD53A214F54E7D8377BD873F596F0ECC78C926B664C86E1C0E1F1E6496124B6E7B4D0E484AB48A4448ED2DE1DDA928E56F5C241D505CE20A49CD7530C290E366B62C2522FAAB2365DB088F21;
Max-Age=15552000; Expires=Fri, 12 Jan 2024 15:34:59 GMT; Path=/;
HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/neapi/feedback; HTTPOnly;MUSIC_R_T=1673524305645;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/api/clientlog;
HTTPOnly;MUSIC_R_T=1673524305645; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/api/feedback; HTTPOnly;MUSIC_A_T=1673524305450;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT; Path=/neapi/feedback;
HTTPOnly;MUSIC_A_T=1673524305450; Max-Age=2147483647; Expires=Fri, 03 Aug 2091
18:49:06 GMT; Path=/openapi/clientlog; HTTPOnly;MUSIC_R_T=1673524305645;
Max-Age=2147483647; Expires=Fri, 03 Aug 2091 18:49:06 GMT;
Path=/openapi/clientlog; HTTPOnly" }
