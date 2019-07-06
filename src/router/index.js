import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router);

export default new Router({
    mode: 'hash',
    // base: process.env.BASE_URL,
    routes: [
        {
          path:'/',
          redirect:'/login'
        },
        {
            path: '/login',
            name: 'login',
            component: () => import('../views/login.vue'),
            meta: {
                title: '首页'
            }
        },
        {
            path: '/home',
            name: 'home',
            component: () => import('../views/home.vue'),
            children:[
                {path: 'main',name: 'main',
                    component: () => import('../views/main/main.vue'),
                    meta: {
                        title: 'main'
                    }
                },
                {path: 'userinfo',name: 'userinfo',
                    component: () => import('../views/main/userinfo.vue'),
                    meta: {
                        title: 'userinfo'
                    }
                },
                {path: 'indexData',name: 'indexData',
                    component: () => import('../views/main/indexData.vue'),
                    meta: {
                        title: 'indexData'
                    }
                }
            ],
            meta: {
                title: '首页'
            }
        }
        ]
})
