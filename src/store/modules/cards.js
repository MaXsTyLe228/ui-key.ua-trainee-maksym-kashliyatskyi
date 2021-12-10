import axios from "axios";
import {PATH} from "../consts";

export default {
    actions: {
        filterCards(context, idCol){
            context.commit('filter', idCol)
        },
        fetchCards(context) {
            axios.get(PATH + '/cards')
                .then(res => context.commit('getCards', res.data.Items));
        },
        createCard(context, params) {
            axios.post(PATH + '/createCard',
                JSON.stringify(params))
                .then(() => {
                    context.commit('addCard',
                        {
                            id: params.id,
                            title: params.title,
                            index: params.index,
                            description: params.description,
                            idCol: params.idCol,
                        })
                })
        },
        deleteCard(context, id) {
            axios.delete(PATH + '/deleteCard/' + id)
                .then(() => {
                    context.commit('deleteCard', id)
                })
        },
        updateCard(context, params) {
            console.log(params)
            const body = {
                title: params.title,
                index: params.index,
                description: params.description,
                idCol: params.idCol,
            }
            axios.put(PATH + '/updateCard/' + params.id,
                JSON.stringify(body))
                .then(res => {
                    context.commit('updateCard', res.data.Attributes)
                })
        }
    },
    mutations: {
        getCards(state, cards) {
            state.cards = cards;
            //console.log(state.cards)
        },
        addCard(state, card) {
            state.cards.push(card)
            console.log(state.cards)
        },
        deleteCard(state, id) {
            state.cards = state.cards.filter(card => card.id !== id)
            console.log(state.cards)
        },
        filter(state, idCol) {
            state.cards = state.cards.filter(card => card.idCol === idCol)
        },
        updateCard(state, params) {
            let updatedCol = state.cards.findIndex(item => item.id === params.id);
            state.cards[updatedCol].title = params.title;
            state.cards[updatedCol].index = params.index;
            state.cards[updatedCol].description = params.description;
            state.cards[updatedCol].idCol = params.idCol;
            console.log(state.cards)
        },
    },
    state: {
        cards: [],
    },
    getters: {
        allCards(state) {
            console.log(state.cards)
            return state.cards
        },
        /*cardsForCols(state, idCol) {
            let cardsCol = []
            for (let i in state.cards) {
                if (state.cards[i].idCol === idCol) {
                    cardsCol.push(state.cards[i])
                }
            }
            console.log(cardsCol)
            return cardsCol;
        },*/
        getTodoById: state => idCol => {
            return state.cards.filter(card => card.idCol === idCol);
        },
        newCardIndex(state) {
            let max = 0;
            for (let i in state.cards) {
                if (state.cards[i].index > max)
                    max = state.cards[i].index
            }
            return max + 1;
        }
    },
}