import { api } from "../instance/api";
import { useSelector } from "react-redux"


export default function interceptor(api) {
    addTokenOnRequest(api)
}

function addTokenOnRequest(instance, token) {
    instance.interceptors.request.use(
    config => {

        if (token) {
            config.headers.Authorization = `Bearer ${token}`
        }

        return config;
    },
    error => Promise.reject(error.response),
    )
}