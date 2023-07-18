import { ref, computed } from "vue";
import { defineStore } from "pinia";
import { loadRouteLocation } from "vue-router";

export const useUserStore = defineStore("user",{
  state: () => ({
      isLogin :false,
      nickname:'立即登录',
      cookie:'',
      id:'',
      userName:'',
      avatarUrl:'',
      backgroundUrl:'',
      level:'',
      listenSongs:'',
      followeds:'',
      follows:'',
      playlistCount:'',
      birthday:'',
      gender:'',
      signature:'',
      createDays:''
  }),
  persist: true,
  actions: {
    

  }
});
