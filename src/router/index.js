import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld' // 왜 ../가 아니고 @/ 인지?
import Apitest1 from '@/components/Apitest1' //
import userInfo from '@/components/userInfo' //
import tutorial from '@/components/tutorial' //
import jointest from '@/components/jointest' //
import visual from '@/components/visual' //
import cnnimg from '@/components/cnnimg' //

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    { //localhost:8080/#/Apitest1 주소에서 보여줄 component(vue 파일)
      path: '/Apitest1',
      name: 'Apitest1',
      component: Apitest1
    },
    {
      path: '/userInfo',
      name: 'userInfo',
      component: userInfo
    },
    {
      path: '/tutorial',
      name: 'tutorial',
      component: tutorial
    },
    {
      path: '/jointest',
      name: 'jointest',
      component: jointest
    },
    {
      path: '/visual',
      name: 'visual',
      component: visual
    },
    {
      path: '/cnnimg',
      name: 'cnnimg',
      component: cnnimg
    }
  ]
})
