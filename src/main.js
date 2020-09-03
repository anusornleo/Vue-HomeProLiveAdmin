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
import Moment from 'moment'
// import VueGAPI from 'vue-gapi'
// import '@/cors_upload'

// import axios from 'axios'

const apiConfig = {
    apiKey: 'AIzaSyBAsktJZgIrrvYzhRt2sC_euUPFNXHUeMs',
    clientId: '438699126931-ummkmmpttktk3kqbqvj7rids4lthg99m.apps.googleusercontent.com',
    discoveryDocs: ['https://www.googleapis.com/discovery/v1/apis/youtube/v3/rest'],
    // see all available scopes here: https://developers.google.com/identity/protocols/googlescopes'
    scope: "https://www.googleapis.com/auth/youtube.upload https://www.googleapis.com/auth/youtube https://www.googleapis.com/auth/youtubepartner https://www.googleapis.com/auth/youtube.force-ssl",

    // works only with `ux_mode: "prompt"`
    refreshToken: true,
}

Vue.config.productionTip = true
firebase.initializeApp(firebaseConfig)

// Vue.use(VueGAPI, apiConfig)
Vue.use(VueGoogleApi, apiConfig)
Vue.use(ElementUI);
Vue.use(Moment)
// Vue.use(axios)

new
Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
