import axios from "axios";
import {PATH} from "../consts";
import router from "../../router/routes";

export default {
    actions: {
        async signIn(context, params) {
            context.commit('loadingStatus', true)
            axios.post(PATH + '/signIn', JSON.stringify(params))
                .then(async res => {
                    localStorage.setItem('idToken', res.data.token.idToken)
                    localStorage.refreshToken = res.data.token.refreshToken
                    localStorage.setItem('expTime', res.data.exp)
                    await context.commit('signIn', res.data)
                    await router.push('/trello-page')
                    context.commit('loadingStatus', false)
                })
                .catch(() => {
                    context.commit('loadingStatus', false)
                })
        },
    },
    mutations: {
        signIn(state, data) {
            state.userInfo.push(data)
            state.login = true
        },
    },
    state: {
        userInfo: [],
        idToken: String,
        login: Boolean,
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        },
    },
}