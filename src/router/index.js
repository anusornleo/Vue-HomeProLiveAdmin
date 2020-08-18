import Vue from 'vue'
import VueRouter from 'vue-router'

const Home = () => import('../views/Home')
const StartLivePage = () => import('../views/StartLivePage')
const Setting = () => import('../views/Setting')
const FindProduct = () => import('../views/FindProduct')
const LiveNow = () => import('../views/LiveNow')
const ChatPage = () => import('../views/ChatPage')
const LoginPage = () => import('../views/LoginPage')
const RegisterPage = () => import('../views/RegisterPage')

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
    },
    {
        path: '/chat',
        name: 'ChatPage',
        component: ChatPage
    },
    {
        path: '/login',
        name: 'LoginPage',
        component: LoginPage
    },
    {
        path: '/register',
        name: 'RegisterPage',
        component: RegisterPage
    }
]

const router = new VueRouter({
    mode: 'history',
    // base: process.env.BASE_URL,
    routes
})

export default router
