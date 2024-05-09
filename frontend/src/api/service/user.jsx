import { api } from "../instance/api";

export const loginAPI = (userId, password) => {
    const response = api.post(`/member/login`, { userId, password });
    return response;
}