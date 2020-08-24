import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'
// import firebase from "firebase";

// const db = firebase.firestore()

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentAdmin: null,
        currentMenu: 0,
        currentOption: null,
        isLive: false,
        endLive: false,
        sectionLiveWidth: false,
        secondLive: 0,
        currentChatWithUser: null,
        selectChat: null,
        selectedMessage: null
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
