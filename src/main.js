import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import './assets/styles/index.css';
import './assets/styles/element-variables.scss'
import {firebaseConfig} from './config/firebase.config'
import firebase from 'firebase'
// import axios from 'axios'

Vue.config.productionTip = true
firebase.initializeApp(firebaseConfig)

Vue.use(ElementUI);
// Vue.use(axios)

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
