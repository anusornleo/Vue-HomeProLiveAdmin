import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const StartLivePage = () => import('../views/StartLivePage')
const Setting = () => import('../views/Setting')
const FindProduct = () => import('../views/FindProduct')
const LiveNow = () => import('../views/LiveNow')

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home
    },
    {
        path: '/startlive',
        name: 'StartLivePage',
        component: StartLivePage,
    },
    {
        path: '/setting',
        name: 'Setting',
        component: Setting
    },
    {
        path: '/findproduct',
        name: 'FindProduct',
        component: FindProduct
    },
    {
        path: '/live_now',
        name: 'LiveNow',
        component: LiveNow
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router
