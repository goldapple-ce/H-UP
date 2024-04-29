import axios from "axios"

export const loginAPI = (userId, password) => {

    // axios.post(`${window.location.origin}/api/member/login`, { userId, password });
    axios.post(`api/member/login`, { userId, password });
}