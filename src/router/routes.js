import VueRouter from 'vue-router'
import Trello from "../Pages/Trello";
import Authorization from "../Pages/Authorization";

export default new VueRouter({
    mode: 'history',
    routes: [
        {
            path: '/trello-page',
            name: 'trello',
            component: Trello
        },
        {
            path: '/sign-in',
            name: 'auth',
            component: Authorization
        },
        {
            path: '*',
            redirect: {name: 'auth'}
        },
    ]
})