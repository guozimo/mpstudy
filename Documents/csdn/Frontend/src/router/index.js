import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            name: 'HomePage',
            component: () => import('@/pages/home/home')
        },
        {
            path: '/metadata',
            name: '/metadata',
            component: () => import('@/views/app'),
            children: [
                {
                    name: '/',
                    path: '/',
                    component: () => import('@/views/home/index')
                },
                {
                    path: '/query',
                    name: 'query',
                    component:  () => import('@/views/query/query')
                },
                {
                    path: '/detail',
                    name: 'detail',
                    component: () => import('@/views/detail/detail')
                }
            ]
        },
        {
            path: '/intelligence/bigscreen',
            name: 'Bigscreen',
            component: () => import('@/pages/smartManage/wholeCountry/bigscreen')
        },
        {
            path: '/intelligence/watch',
            name: 'watch',
            component: () => import('@/pages/smartManage/intelligence/watch')
        },
        {
            path: '/intelligence/playback',
            name: "Playback",
            component: () => import('@/pages/smartManage/playback/playback')
        },
        {
            path: '/intelligence/analysis',
            name: "analysis",
            component: () => import('@/pages/smartManage/analysis/analysis')
        }
    ]
})
