import { api } from "../instance/api";


export default function interceptor(api, token) {
    addTokenOnRequest(api, token)
}

function addTokenOnRequest(instance, token) {
    instance.interceptors.request.use(
    config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token.accessToken}`
        }

        return config;
    },
    error => Promise.reject(error.response),
    )
}