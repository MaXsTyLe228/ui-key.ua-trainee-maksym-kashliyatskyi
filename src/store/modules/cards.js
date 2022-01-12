import api from "./../../axios";
import router from "../../router/routes";
import axios from "axios";
//import {PATH} from "../consts";
/*let token = localStorage.getItem('idToken')
{headers: {"Authorization": `Bearer ${token}`}}*/
export default {
    actions: {
        fetchCards(context) {
            context.commit('loadingStatus', true)
            api.get('/cards')
                .then(res => {
                    context.commit('getCards', res.data.Items)
                    context.commit('loadingStatus', false)
                }).catch(async () => {
                console.log('error')
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
            })
        },
        createCard(context, params) {
            context.commit('loadingStatus', true)
            //let token = localStorage.getItem('idToken')
            api.post('/createCard', JSON.stringify(params))
                .then(() => {
                    context.commit('addCard',
                        {
                            id: params.id,
                            title: params.title,
                            index: params.index,
                            description: params.description,
                            idCol: params.idCol,
                        })
                    context.commit('loadingStatus', false)
                }).catch(async () => {
                console.log('error')
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
            })
        },
        deleteCard(context, id) {
            context.commit('loadingStatus', true)
            api.delete('/deleteCard/' + id)
                .then(() => {
                    context.commit('deleteCard', id)
                    context.commit('loadingStatus', false)
                }).catch(async () => {
                console.log('error')
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
            })
        },
        updateCard(context, params) {
            context.commit('updateStatus', true)
            const body = {
                title: params.title,
                index: params.index,
                description: params.description,
                idCol: params.idCol,
            }
            api.put('/updateCard/' + params.id, JSON.stringify(body))
                .then(res => {
                    context.commit('updateCard', res.data.Attributes)
                    context.commit('updateStatus', false)
                }).catch(async () => {
                console.log('error')
                location.reload();
                context.commit('loadingStatus', false)
                await router.push('/trello-page')
            })
        },
        async deleteFile(context, params) {
            axios.post('http://localhost:3000/dev' + '/deleteObject',
                JSON.stringify(params)).then(() => {
                context.commit('deleteFile', params)
            })
        },
        async putFile(context, params) {
            const body = {
                filename: params.filename,
                idCard: params.idCard
            };
            axios.post('http://localhost:3000/dev' + '/putObject',
                JSON.stringify(body)).then(async res => {
                //console.log(res)
                await axios.put(res.data.url, params.file);
                context.commit('putFile', params)
            })
        }
    },
    mutations: {
        getCards(state, cards) {
            state.cards = cards;
        },
        addCard(state, card) {
            state.cards.push(card)
        },
        deleteCard(state, id) {
            state.cards = state.cards.filter(card => card.id !== id)
        },
        updateCard(state, params) {
            let updatedCol = state.cards.findIndex(item => item.id === params.id);
            state.cards[updatedCol].title = params.title;
            state.cards[updatedCol].index = params.index;
            state.cards[updatedCol].description = params.description;
            state.cards[updatedCol].idCol = params.idCol;
        },
        deleteFile(state, params) {
            let updatedCard = state.cards.findIndex(item => item.id === params.idCard);
            delete state.cards[updatedCard].file
        },
        putFile(state, params) {
            let updatedCard = state.cards.findIndex(item => item.id === params.idCard);
            state.cards[updatedCard].file = params.filename
        }
    },
    state: {
        cards: [],
        changeCard: {},
        newCol: Number,
        oldCol: Number,
        newIndex: Number,
        oldIndex: Number,
    },
    getters: {
        allCards(state) {
            return state.cards
        },
        getCardsById: state => idCol => {
            return state.cards.filter(card => card.idCol === idCol).sort((a, b) => {
                if (+a.index > +b.index)
                    return 1;
                if (+a.index < +b.index)
                    return -1;
                // a должно быть равным b
                return 0;
            });
        },
        minCardIndex(state) {
            let min = +state.cards[0].index;
            for (let i in state.cards) {
                if (+state.cards[i].index < min)
                    min = +state.cards[i].index
            }
            return min;
        },
        newCardIndex(state) {
            if (state.cards.length === 0)
                return 0.001
            let max = +state.cards[0].index;
            for (let i in state.cards) {
                if (+state.cards[i].index > max)
                    max = +state.cards[i].index
            }
            return max + 0.00001;
        }
    },
}