import axios from "axios";
import {PATH} from "../consts";
import router from '../../router/routes'

export default {
    actions: {
        signIn(context, params) {
            axios.post(PATH + '/signIn', JSON.stringify(params))
                .then(async res => {
                    await router.push('/trello-page')
                    context.commit('signIn', res.data)
                })
                .catch(() => {
                    console.log('You cannot enter')
                })
        }
    },
    mutations: {
        signIn(state, data) {
            state.userInfo.push(data)
        },
    },
    state: {
        userInfo: [],
    },
    getters: {
        getUserInfo(state) {
            return state.userInfo
        },
    },
}