import VueRouter from 'vue-router'
import Trello from "../Pages/Trello";

export default new VueRouter({
    mode: 'history',
    routes: [

        {
            path: '/trello-page',
            name: 'trello',
            component: Trello
        },
        {
            path: '*',
            redirect: {name: 'trello'}
        },
    ]
})