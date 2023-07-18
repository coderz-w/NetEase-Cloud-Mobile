import request from "../axios/index.js" 
// request.post('localhost:6000/users/').then(res=>{console.log(res)})
export function getQrCodekey(){
    return request.get({
        url:'/login/qr/key',
    })
}
export function getQrCode(key,time){
    return request.get({
        url:`/login/qr/create?key=${key}&qrimg=true&timestamp=${time}`
    })
}
export function checkQrCode(key,time) {
    return request.get({
        url:`/login/qr/check?key=${key}&timestamp=${time}`
    })
  }
export function getUserInfo(cookie){
    return request.get({
        url:`/user/account?cookie=${cookie}`
    })
}
export function getdetailUser(uid,cookie){
    return request.get({
        url:`/user/detail?uid=${uid}&cookie=${cookie}`
    })
}
export function getUserSonglist(uid,cookie){
    return request.get({
        url: `/user/playlist?uid=${uid}&cookie=${cookie}`
    })
}
export function getSonglistDetail(id,cookie){
    return request.get({
        url:`/playlist/detail?id=${id}&cookie=${cookie}`
    })
}
export function getlistAll(id,offset){
    return request.get({
        url:`/playlist/track/all?id=${id}&limit=20&offset=${offset}`
    })
}
export function submitdata(gender,birthday,nickname,signature,cookie){
    return request.get({
        url:`/user/update?gender=${gender}&birthday=${birthday}&nickname=${nickname}&signature=${signature}&cookie=${cookie}`
    })
}
export function submitgender(gender,cookie){
    return request.get({
        url:`/user/update?gender=${gender}&cookie=${cookie}`
    })
}
export function submitbirthday(birthday, cookie) {
    return request.get({
      url: `/user/update?birthday=${birthday}&cookie=${cookie}`
    });
  }
  
  export function submitnickname(nickname, cookie) {
    return request.get({
      url: `/user/update?nickname=${nickname}&cookie=${cookie}`
    });
  }
  
  export function submitsignature(signature, cookie) {
    return request.get({
      url: `/user/update?signature=${signature}&cookie=${cookie}`
    });
  }
export function getactive(id,cookie){
    return request.get({
        url: `/user/event?uid=${id}&cookie=${cookie}`
    })
}