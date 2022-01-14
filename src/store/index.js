import Vue from "vue";
import Vuex from "vuex";
import columns from './modules/columns'
import cards from './modules/cards'
import cognito from "./modules/cognito";
import s3 from "./modules/s3";

Vue.use(Vuex)

export default new Vuex.Store({
    modules: {
        s3,
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