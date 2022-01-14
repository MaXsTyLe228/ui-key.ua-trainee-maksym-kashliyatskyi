import api from "./../../axios";

export default {
    actions: {
        getFile(context, filename) {
            const body = {filename: filename}
            api.post('/getObject', JSON.stringify(body))
                .then(res => {
                    window.open(res.data)
                })
        },

    },
    mutations: {},
    state: {},
    getters: {}
}