//import api from "./../../axios";
import axios from "axios";
// import {PATH} from "../consts";
// import router from "../../router/routes";

export default {
    actions: {
        async getFile(context, filename) {
            const body = {filename: filename}
            axios.post('http://localhost:3000/dev' + '/getObject', JSON.stringify(body))
                .then(async res => {
                    window.open(res.data)
                })
        },

    },
    mutations: {},
    state: {},
    getters: {}
}