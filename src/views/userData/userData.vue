<template>
  <headervue></headervue>
  <div class="userData">
    <div class="d1">
      <div class="item">
        <div class="lf">头像</div>
        <div class="r">
          <input
            type="file"
            accept="image/*"
            class="none"
            @change="tchange($event)"
          /><img :src="avatarUrl" alt="" class="ava" @click="changeimg" />
        </div>
      </div>
      <div class="item">
        <div class="lf">昵称</div>
        <div class="r">
          <input type="text" :value="nickname" class="nc" @change="dechangen($event)" />
        </div>
      </div>
      <div class="item">
        <div class="lf">性别</div>
        <div class="r">
          <select name="sex" id="" @change="changesex($event)" v-model="gender">
            <option value="1">男</option>
            <option value="2">女</option>
          </select>
        </div>
      </div>
      <div class="item">
        <div class="lf">二维码</div>
        <div class="r"></div>
      </div>
    </div>
    <div class="d2">
      <div class="item">
        <div class="lf">生日</div>
        <div class="r">
          <div class="on">{{ formattedBirthday }}</div>
          <input
            type="date"
            class="date"
            v-model="birthday"
            @change="changedate($event)"
          />
        </div>
      </div>
      <div class="item">
        <div class="lf">地区</div>
        <div class="r"></div>
      </div>
      <div class="item">
        <div class="lf">大学</div>
        <div class="r"></div>
      </div>
      <div class="item">
        <div class="lf">音乐标签</div>
        <div class="r"></div>
      </div>
      <div class="item">
        <div class="lf">简介</div>
        <div class="r">
          <input
            type="text"
            :value="signature"
            placeholder="还没有简介"
            class="descrition"
            @change="dechangej($event)"
          />
        </div>
      </div>
    </div>
    <div class="d3">
      <div class="item">
        <div class="lf">个人主页隐私设置</div>
        <div class="r"></div>
      </div>
      <div class="item">
        <div class="lf">主页模块顺序设置</div>
        <div class="r"></div>
      </div>
    </div>
    <div class="d4">
      <div class="item">
        <div class="lf">账号和绑定设置</div>
        <div class="r"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
import headervue from "./ccpns/headervue.vue";
import { useUserStore } from "@/stores/userdata.js";
import {debounces} from "@/utils/debounce.js"
import { computed, ref } from "vue";
import axios from "axios";
import { storeToRefs } from "pinia";
import router from "../../router";
import {
  submitdata,
  getdetailUser,
  getUserInfo,
  submitgender,
  submitnickname,
  submitbirthday,
  submitsignature
} from "@/services/request/test.js";
let userstore = useUserStore();
let { nickname, cookie, avatarUrl, gender, birthday, signature, id } =
  storeToRefs(userstore);
let n = gender.value; //gender
let i = nickname.value; //nickname
let s = signature.value; //signature
let formattedBirthday = computed(() => {
  const date = new Date(birthday.value);

  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, "0");
  const day = String(date.getDate()).padStart(2, "0");

  const formattedDate = `${year}-${month}-${day}`;
  birthday.value = formattedDate;
  return formattedDate;
});
function changeimg() {
  let input = document.querySelector(".none");
  input.click();
}
async function changedate(e) {
  console.log(formattedBirthday.value);
  let bir = convertToTimestamp(formattedBirthday.value);
  let res=await submitbirthday(bir,cookie.value)
  console.log(res)
}
async function changesex(e) {
  n = e.target.value;
  userstore.birthday=n
  let res=await submitgender(n,cookie.value)
  console.log(res)
}
async function changen(e) {
  i = e.target.value;
  let res=await submitnickname(i,cookie.value)
}
let dechangen=debounces(changen,500)
async function changej(e) {
  s = e.target.value;
  let res=await submitsignature(e.target.value,cookie.value)
}
let dechangej=debounces(changej,500)
async function tchange(e) {
  let file = await e.target.files[0];
  console.log(file);
  let imgSize = await getImgSize(file);
  let formData = new FormData();
  formData.append("imgFile", file);
  console.log(formData);
  const res = await axios({
    method: "post",
    url: `https://api.hanling.space/avatar/upload?cookie=${
      cookie.value
    }&imgSize=${imgSize.width}&imgX=0&imgY=0&timestamp=${Date.now()}`,
    headers: {
      "Content-Type": "multipart/form-data",
    },
    data: formData,
  });
  console.log(res);
  let res1 = await getUserInfo(cookie.value);
  userstore.avatarUrl = res1.profile.avatarUrl;
}

// 时间转化
function convertToTimestamp(dateString) {
  const dateParts = dateString.split("-");
  const year = parseInt(dateParts[0]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[2]);

  const date = new Date(year, month, day);
  const timestamp = date.getTime();

  return timestamp;
}
// 图片信息
function getImgSize(file) {
  return new Promise((resolve, reject) => {
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function (theFile) {
      let image = new Image();
      image.src = theFile.target.result;
      image.onload = function () {
        resolve({
          width: this.width,
          height: this.height,
        });
      };
    };
  });
}

router.beforeEach(async (to, from) => {
  if (from.fullPath == "/userData") {
    // console.log(formattedBirthday.value)
    // console.log(from.fullPath)
    // console.log(to.fullPath)
    // let bir = convertToTimestamp(formattedBirthday.value);
    // let res = await submitdata(n, bir, i, s, cookie.value);
    let res1 = await getdetailUser(id.value, cookie.value);
    console.log(res1)
    userstore.nickname = res1.profile.nickname;
    userstore.signature = res1.profile.signature;
    userstore.gender = res1.profile.gender;
    // userstore.birthday = res1.profile.birthday;
    userstore.avatarUrl = res1.profile.avatarUrl;
  }
  return;
});
</script>

<style lang="less" scoped>
.userData {
  box-sizing: border-box;
  width: 100vw;
  height: 90vh;
  overflow: hidden;

  padding: 3vh 2vh;
  background-color: #f5f5f5;
  .d1 {
    position: relative;
    background-color: white;
    .item {
      display: flex;
      height: 6vh;
      align-items: center;
      justify-content: space-between;
      .lf {
        width: 15vh;
        margin-left: 2vh;
        font-size: larger;
        font-weight: 500;
      }
      .r {
        margin-right: 2vh;
      }
    }
  }
  .d2 {
    margin-top: 2vh;
    background-color: white;
    .item {
      display: flex;
      position: relative;
      height: 6vh;
      align-items: center;
      justify-content: space-between;
      .lf {
        margin-left: 2vh;
        font-size: larger;
        font-weight: 500;
      }
      .r {
        position: relative;
        margin-right: 2vh;
      }
    }
  }
  .d3 {
    margin-top: 2vh;
    background-color: white;
    .item {
      display: flex;
      height: 6vh;
      align-items: center;
      justify-content: space-between;
      .lf {
        margin-left: 2vh;
        font-size: larger;
        font-weight: 500;
      }
      .r {
        margin-right: 2vh;
      }
    }
  }
  .d4 {
    margin-top: 2vh;
    background-color: white;
    .item {
      display: flex;
      height: 6vh;
      align-items: center;
      justify-content: space-between;
      .lf {
        margin-left: 2vh;
        font-size: larger;
        font-weight: 500;
      }
      .r {
        margin-right: 2vh;
      }
    }
  }
}
.none {
  margin-top: -50vh;
  opacity: 1;
}
.ava {
  position: absolute;
  border-radius: 50%;
  right: 1vh;
  top: 1vw;
  width: 7vh;
}
.date {
  font-size: 13px;
  opacity: 1;
}
.nc {
  text-align: right;
}
.descrition {
  text-align: right;
}
.on {
  position: absolute;
  z-index: 99;
  top: 1vw;
  left: -3vw;
  font-size: 18px;
  font-weight: 300;
  background-color: white;
}
input[type="date"] {
  border: none;
  outline: none;
  color: #f5f5f5;
  border: #f5f5f5 0px solid;
}

</style>
