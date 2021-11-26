import VueRouter from 'vue-router'
import Trello from "../components/Trello";
import Main from "../components/Main";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: Main
        },
        {
            path: '/trello-page',
            component: Trello
        },
    ]
})