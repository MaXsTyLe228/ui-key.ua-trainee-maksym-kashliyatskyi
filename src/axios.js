import axios from 'axios';
import {PATH} from "./store/consts";
import router from "./router/routes";

const instance = axios.create({
    baseURL: 'https://v2hl01gc6g.execute-api.us-east-2.amazonaws.com/dev',
})

function getLocalIdToken() {
    const idToken = localStorage.getItem("idToken");
    return idToken;
}

const refresh = async () => {
    const expTime = +localStorage.getItem('expTime')
    if ((expTime - Math.floor(Date.now() / 1000)) < 1000) {
        const refreshToken = localStorage.getItem('refreshToken')
        await axios.post(PATH + '/refresh', JSON.stringify({refreshToken: refreshToken}))
            .then(res => {
                localStorage.refreshToken = res.data.token.refreshToken
                localStorage.setItem('idToken', res.data.token.idToken)
                localStorage.setItem('expTime', res.data.exp)
            })
    }
}

instance.interceptors.request.use(
    async config => {
        await refresh()
        const token = getLocalIdToken();
        if (token) {
            config.headers['Authorization'] = `Bearer ${token}`
        }
        return config;
    }
)

instance.interceptors.response.use(async function (response) {
    return response;
}, async function (error) {
    await router.push('/sign-in')
    return Promise.reject(error);
});

export default instance;