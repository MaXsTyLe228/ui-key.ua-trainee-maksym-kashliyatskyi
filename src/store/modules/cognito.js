import axios from "axios";
import {PATH} from "../consts";
import router from "../../router/routes";

export default {
    actions: {
        async signIn(context, params) {
            context.commit('loadingStatus', true)
            axios.post(PATH + '/signIn', JSON.stringify(params))
                .then(async res => {
                    //localStorage.accessToken = res.data.token.accessToken
                    //localStorage.refreshToken = res.data.token.refreshToken
                    localStorage.setItem('idToken', res.data.token.idToken)
                    await context.commit('signIn', res.data)
                    await router.push('/trello-page')
                    context.commit('loadingStatus', false)
                })
                .catch(() => {
                    context.commit('loadingStatus', false)
                    console.log('You cannot enter')
                })
        }
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