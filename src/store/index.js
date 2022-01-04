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
        loadingStatus: false,
        updateStatus: false
    },
    mutations: {
        updateStatus(state, newUpdateStatus) {
            state.updateStatus = newUpdateStatus
        },
        loadingStatus(state, newLoadingStatus) {
            state.loadingStatus = newLoadingStatus
        }
    },
    getters: {
        updateStatus(state) {
            return state.updateStatus
        },
        loadingStatus(state) {
            return state.loadingStatus
        }
    }
})