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
        axios.post(PATH + '/refresh', JSON.stringify({refreshToken: refreshToken}))
            .then(async res => {
                localStorage.refreshToken = res.data.token.refreshToken
                localStorage.setItem('idToken', res.data.token.idToken)
                localStorage.setItem('expTime', res.data.exp)
            })
            .catch(() => {
                router.push('/sign-in')
                console.log('You cannot enter')
            })
    }
}

instance.interceptors.request.use(
    async config => {
        await refresh()
        try {
            const token = getLocalIdToken();
            //console.log(token)
            if (token) {
                config.headers['Authorization'] = `Bearer ${token}`
            }
            return config;
        } catch (e) {
            await refresh()
            console.log(e)
        }
    }
)

instance.interceptors.response.use(async function (response) {
    //console.log(response);
    await refresh()
    // Any status code within the range of 2xx cause this function to trigger
    // Do something with response data

    return response;
}, async function (error) {
    console.log(error);
    // Any status codes outside the range of 2xx cause this function to trigger
    // Do something with response error
    if(error.response.status === 401) {
        await refresh()
        await router.push('/trello-page')
        console.log("You are not authorized");
    }
    return Promise.reject(error);
});

export default instance;