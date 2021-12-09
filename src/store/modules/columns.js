import axios from "axios";

export default {
    actions: {
        fetchCols(context) {
            axios.get('http://localhost:3000/dev' + '/columns').then(res =>
                context.commit('getCols', res.data.Items)
            );
        },
        createCol(context, params) {
            axios.post('http://localhost:3000/dev' + '/createColumn',
                JSON.stringify(params))
                .then(res => context.commit('addCol', res))
        },
        deleteCol(context, id) {
            axios.delete('http://localhost:3000/dev' + '/deleteCol/' + id)
                .then(res => context.commit('deleteCol', res))
        },
        updateCol(context, params) {
            console.log(params)
            const body={
                title: params.title,
                index: params.index
            }
            axios.put('http://localhost:3000/dev' + '/updateCol/' + params.id,
                JSON.stringify(body))
                .then(res => {
                    console.log(JSON.stringify(body))
                    context.commit('updateCol', res.data.Attributes)
                })
        },
    },

    mutations: {
        getCols(state, cols) {
            state.columns = cols
        },
        addCol(state, col) {
            state.columns.push(col)
        },
        deleteCol(state, id) {
            state.columns = state.columns.filter(col => col.id !== id)
        },
        updateCol(state, params) {
            let updatedCol = state.columns.findIndex(item => item.id === params.id);
            state.columns[updatedCol].title = params.title;
            state.columns[updatedCol].index = params.index;
        }
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