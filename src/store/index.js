import Vue from "vue";
import Vuex from "vuex";
import columns from './modules/columns'
import cards from './modules/cards'
import cognito from "./modules/cognito";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        columns,
        cards,
        cognito,
    },
    state: {
        loadingStatus: false
    },
    mutations: {
        loadingStatus(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        }
    },
    getters: {
        loadingStatus(state) {
            return state.loadingStatus
        }
    }
})