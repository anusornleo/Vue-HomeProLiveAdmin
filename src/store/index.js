import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import firebase from "firebase";

// const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        host: `${window.location.protocol}//${window.location.hostname}`,
        currentAdmin: null,
        currentMenu: 0,
        currentOption: null,
        isLive: false,
        endLive: false,
        sectionLiveWidth: false,
        secondLive: 0,
        currentChatWithUser: null,
        selectChat: null,
        selectedMessage: null,
        isLoading: false,
        isUserReadCurrentChat: false,
        isAdminReadCurrentChat: false,
        recordedVideo: null,
        googleApiUserProfile: null,
        googleApiUserAuth: null,
        productSelected: []
    },
    mutations: {
        setCurrentOption(state, option) {
            state.currentOption = option
        },
        setIsLive(state, status) {
            state.isLive = status
        },
        setCurrentAdmin(state, email) {
            state.currentAdmin = email
        },
        setSelectChat(state, room) {
            state.selectChat = room
        },
        setSelectedMessage(state, message) {
            state.selectedMessage = message
        },
        setGoogleApiUserProfile(state, data) {
            state.googleApiUserProfile = data
        },
        setGoogleApiUserAuth(state, data) {
            state.googleApiUserAuth = data
        }
    },
    actions: {
        // loadUserChats(context) {
        //     let chat = context.state.selectChat
        //     db.collection('')
        // }
    },
    modules: {},
    plugins: [new VuexPersistence().plugin]

})
