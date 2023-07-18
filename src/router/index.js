import { createRouter, createWebHashHistory } from 'vue-router'
const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'redirect',
      redirect:'/discoverPage'
    },
    {
      path: '/discoverPage',
      name: 'discoverPage',
      component: ()=>import('@/views/discoverPage/discoverPage.vue')
    },
    {
      path: '/userData',
      name: 'userData',
      component: ()=>import('@/views/userData/userData.vue')
    },
    {
      path: '/userPages',
      name: 'userPages',
      redirect:'/userPages/home',
      component:()=>import('@/views/userPages/userPages.vue'),
      children: [
        {
          path: 'home',
          name:'userhome',
          component: ()=>import('@/views/userPages/ccpns/userhome.vue'),
        },
        {
          path: 'active',
          name:'useractive',
          component: ()=>import('@/views/userPages/ccpns/useractive.vue')
        },
        {
          path: 'podcasts',
          name:'Podcasts',
          component: ()=>import('@/views/userPages/ccpns/Podcasts.vue'),
        }
      ],
    },
    {
      path: '/playList/:id',
      name: 'playList',
      component: ()=>import('@/views/playList/playlist.vue')
    },
    {
      path: '/login',
      name: 'login',
      component: ()=>import('@/views/login/login.vue')
    },
    { path: '/:pathMatch(.*)*', name: 'NotFound', component:()=>import('@/views/404/404.vue') },
  ]
})
router.beforeEach((to, from) => {
  // ...
  // 返回 false 以取消导航
  return 
})

export default router
