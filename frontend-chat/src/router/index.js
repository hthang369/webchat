import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import Hello from '@/components/Hello'
import BoxChat from '@/components/BoxChat'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/box-chat',
      name: 'BoxChat',
      component: BoxChat
    }
  ]
})
