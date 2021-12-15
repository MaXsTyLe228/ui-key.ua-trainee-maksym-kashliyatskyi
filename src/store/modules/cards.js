import axios from "axios";
import {PATH} from "../consts";

export default {
    actions: {
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