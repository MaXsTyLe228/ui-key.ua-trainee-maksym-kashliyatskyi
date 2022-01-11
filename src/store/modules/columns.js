//import axios from "axios";
import api from "./../../axios";
import router from "../../router/routes";
/*const token = localStorage.getItem('idToken')
* {headers: {"Authorization": `Bearer ${token}`}}*/
export default {
    actions: {
        fetchCols(context) {
            context.commit('loadingStatus', true)
            api.get('/columns')
                .then(res => {
                    context.commit('getCols', res.data.Items)
                    context.commit('loadingStatus', false)
                })
                .catch(() => {
                    context.commit('loadingStatus', false)
                    router.push('/sign-in')
                });
        },
        createCol(context, params) {
            context.commit('loadingStatus', true)
            api.post('/createColumn', JSON.stringify(params))
                .then(() => {
                    context.commit('addCol',
                        {
                            id: params.id,
                            title: params.title,
                            index: params.index,
                        })
                    context.commit('loadingStatus', false)
                }).catch(async () => {
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
            })
        },
        deleteCol(context, id) {
            context.commit('loadingStatus', true)
            api.delete('/deleteCol/' + id)
                .then(() => {
                    context.commit('deleteCol', id)
                    context.commit('loadingStatus', false)
                }).catch(async () => {
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
            })
        },
        updateCol(context, params) {
            context.commit('updateStatus', true)
            const body = {
                title: params.title,
                index: params.index
            }
            api.put('/updateCol/' + params.id,
                JSON.stringify(body))
                .then(res => {
                    context.commit('updateCol', res.data.Attributes)
                    context.commit('updateStatus', false)
                }).catch(async () => {
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
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