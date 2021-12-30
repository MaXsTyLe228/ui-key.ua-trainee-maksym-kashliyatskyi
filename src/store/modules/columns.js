import axios from "axios";
import {PATH} from "../consts";
import router from "../../router/routes";

export default {
    actions: {
        fetchCols(context) {
            context.commit('loadingStatus', true)
            const token = localStorage.getItem('idToken')
            axios.get(PATH + '/columns', {headers: {"Authorization": `Bearer ${token}`}})
                .then(res => {
                    context.commit('loadingStatus', false)
                    context.commit('getCols', res.data.Items)
                })
                .catch(() => {
                    context.commit('loadingStatus', false)
                    router.push('/sign-in')
                });
        },
        createCol(context, params) {
            context.commit('loadingStatus', true)
            const token = localStorage.getItem('idToken')
            axios.post(PATH + '/createColumn',
                JSON.stringify(params), {headers: {"Authorization": `Bearer ${token}`}})
                .then(() => {
                    context.commit('addCol',
                        {
                            id: params.id,
                            title: params.title,
                            index: params.index,
                        })
                    context.commit('loadingStatus', false)
                })
        },
        deleteCol(context, id) {
            context.commit('loadingStatus', true)
            const token = localStorage.getItem('idToken')
            axios.delete(PATH + '/deleteCol/' + id, {headers: {"Authorization": `Bearer ${token}`}})
                .then(() => {
                    context.commit('loadingStatus', false)
                    context.commit('deleteCol', id)
                })
        },
        updateCol(context, params) {
            context.commit('loadingStatus', true)
            const token = localStorage.getItem('idToken')
            const body = {
                title: params.title,
                index: params.index
            }
            axios.put(PATH + '/updateCol/' + params.id,
                JSON.stringify(body), {headers: {"Authorization": `Bearer ${token}`}})
                .then(res => {
                    //console.log('asd')
                    context.commit('updateCol', res.data.Attributes)
                    context.commit('loadingStatus', false)
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
                    if (+a.index > +b.index)
                        return 1;
                    if (+a.index < +b.index)
                        return -1;
                    // a должно быть равным b
                    return 0;
                });
        },
        allIndexes(state) {
            let indexCols = [];
            for (let i in state.columns) {
                indexCols.push(state.columns[i].index)
            }
            return indexCols
        },
        minColIndex(state) {
            let min = +state.columns[0].index;
            for (let i in state.columns) {
                if (+state.columns[i].index < min)
                    min = +state.columns[i].index
            }
            return min;
        },
        newColIndex(state) {
            if (state.columns.length === 0)
                return 0.001
            let max = +state.columns[0].index;
            for (let i in state.columns) {
                if (+state.columns[i].index > max)
                    max = +state.columns[i].index
            }
            return max + 0.00001;
        }
    },
}