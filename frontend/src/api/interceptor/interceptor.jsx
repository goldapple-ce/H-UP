import { api } from "../instance/api";


export default function interceptor(api) {
    addTokenOnRequest(api)
}

function addTokenOnRequest(instance, token) {
    console.log(token);
    instance.interceptors.request.use(
    config => {
        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config
    },
    error => Promise.reject(error.response),
    )
}