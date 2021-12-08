import axios from "axios";

export default {
    actions: {
        fetchCols(context) {
            axios.get('http://localhost:3000/dev' + '/columns').then(response =>
                context.commit('updateCols', response.data.Items)
            );
        },
        createCol(context, params) {
            axios.post('http://localhost:3000/dev' + '/createColumn', JSON.stringify(params))
                .then(res => context.commit('addCol', res))
        },
        deleteCol(context, id) {
            axios.delete('http://localhost:3000/dev' + '/deleteCol/' + id)
                .then(res => context.commit('deleteCol', res))
        },
    },

    mutations: {
        updateCols(state, cols) {
            state.columns = cols
        },
        addCol(state, col) {
            state.columns.push(col)
        },
        deleteCol(state, id) {
            state.columns = state.columns.filter(col => col.id !== id)
        },
    },

    state: {
        columns: []
    },

    getters: {
        allCol(state) {
            return state.columns
        },
        colsLength(state) {
            return state.columns.length
        }
    },
}