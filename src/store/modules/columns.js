import axios from "axios";
import {PATH} from "../consts";

export default {
    actions: {
        fetchCols(context) {
            axios.get(PATH + '/columns')
                .then(res => context.commit('getCols', res.data.Items));
        },
        createCol(context, params) {
            axios.post(PATH + '/createColumn',
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
            axios.delete(PATH + '/deleteCol/' + id)
                .then(() => {
                    context.commit('deleteCol', id)
                })
        },
        updateCol(context, params) {
            const body = {
                title: params.title,
                index: params.index
            }
            axios.put(PATH + '/updateCol/' + params.id,
                JSON.stringify(body))
                .then(res => {
                    context.commit('updateCol', res.data.Attributes)
                })
        },
    },

    mutations: {
        getCols(state, cols) {
            state.columns = cols;
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
                .sort((a, b) => {
                    if (a.index > b.index)
                        return 1;
                    if (a.index < b.index)
                        return -1;
                    // a должно быть равным b
                    return 0;
                });
        },
        allIndexes(state){
            let indexCols =[];
            for (let i in state.columns){
                indexCols.push(state.columns[i].index)
            }
            return indexCols
        },
        newColIndex(state) {
            let max = 0;
            for (let i in state.columns) {
                if (state.columns[i].index > max)
                    max = state.columns[i].index
            }
            return max + 1;
        }
    },
}