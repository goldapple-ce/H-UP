import { api } from "../instance/api";

export const loginAPI = (userId, password) => {
    // axios.post(`${window.location.origin}/api/member/login`, { userId, password });
    api.post(`api/member/login`, { userId, password });
}