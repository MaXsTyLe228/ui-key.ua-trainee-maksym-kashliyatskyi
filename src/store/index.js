import Vue from "vue";
import Vuex from "vuex";
import columns from './modules/columns'
import cards from './modules/cards'

Vue.use(Vuex)

export default new Vuex.Store({
    // actions: {},
    // mutations: {},
    // state: {},
    // getters: {},

    modules: {
        columns,
        cards
    }
})