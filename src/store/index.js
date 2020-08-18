import Vue from 'vue'
import Vuex from 'vuex'
import VuexPersistence from 'vuex-persist'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        currentAdmin: null,
        currentMenu: 0,
        currentOption: null,
        isLive: false,
        endLive: false,
        sectionLiveWidth: false,
        secondLive: 0
    },
    mutations: {
        setCurrentOption(state, option) {
            state.currentOption = option
        },
        setIsLive(state, status) {
            state.isLive = status
        }
    },
    actions: {},
    modules: {},
    plugins: [new VuexPersistence().plugin]

})
