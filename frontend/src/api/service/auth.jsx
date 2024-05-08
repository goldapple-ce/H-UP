import API_URI from "../../constant/uri"
import { api } from "../instance/api"

export const requestLogin =  (data) => {
    return api.post(`${API_URI.LOGIN}`, data)
}

export const requestSignup = async (data) => {
    return await api.post(`${API_URI.SIGN_UP}`, data)
}

export const requestIdCheck = async (userId) => {
    return await api.get(`${API_URI.ID_CHECK}`, {
        params: {
            userId: userId
        }
    })
}