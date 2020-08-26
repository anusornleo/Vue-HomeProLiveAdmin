import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/styles/index.css';
import './assets/styles/element-variables.scss'
import {firebaseConfig} from './config/firebase.config'
import firebase from 'firebase'
import VueGoogleApi from 'vue-google-api'
// import VueGAPI from 'vue-gapi'
// import '@/cors_upload'

// import axios from 'axios'

const apiConfig = {
    apiKey: 'AIzaSyAfJ0feb6uvIlJmZRhQ_0g8bkHKE9B5nRc',
    clientId: '796362051879-hpugmhq0qvo4knok6lf6kbdk174k2773.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
    scope: 'https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube',

    // works only with `ux_mode: "prompt"`
    refreshToken: true,
}

Vue.config.productionTip = true
firebase.initializeApp(firebaseConfig)

// Vue.use(VueGAPI, apiConfig)
Vue.use(VueGoogleApi, apiConfig)
Vue.use(ElementUI);
// Vue.use(axios)

new
Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
