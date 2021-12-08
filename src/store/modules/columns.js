import axios from "axios";

export default {
    actions: {
        fetchCols(context) {
            axios.get('http://localhost:3000/dev' + '/columns')
                .then(res => context.commit('getCols', res.data.Items));
        },
        createCol(context, params) {
            axios.post('http://localhost:3000/dev' + '/createColumn',
                JSON.stringify(params))
                .then(() => {
                    context.commit('addCol',
                        {
                            id: params.id,
                            title: params.title,
                            index: params.index,
                        })
                })
        },
        deleteCol(context, id) {
            axios.delete('http://localhost:3000/dev' + '/deleteCol/' + id)
                .then(() => {
                    context.commit('deleteCol', id)
                })
        },
        updateCol(context, params) {
            const body = {
                title: params.title,
                index: params.index
            }
            axios.put('http://localhost:3000/dev' + '/updateCol/' + params.id,
                JSON.stringify(body))
                .then(res => {
                    context.commit('updateCol', res.data.Attributes)
                })
        },
    },

    mutations: {
        getCols(state, cols) {
            state.columns = cols;
            //console.log(state.columns)
        },
        addCol(state, col) {
            state.columns.push(col)
            //console.log(state.columns)
        },
        deleteCol(state, id) {
            state.columns = state.columns.filter(col => col.id !== id)
            //console.log(state.columns)
        },
        updateCol(state, params) {
            let updatedCol = state.columns.findIndex(item => item.id === params.id);
            state.columns[updatedCol].title = params.title;
            state.columns[updatedCol].index = params.index;
            //console.log(state.columns)
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
        },
        getMaxOfArray(state) {
            let max = 0;
            for (let i in state.columns) {
                if (state.columns[i].index > max)
                    max = state.columns[i].index
            }
            return max + 1;
        }
    },
}