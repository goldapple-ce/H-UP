import { api } from "../instance/api";

export const loginAPI = (userId, password) => {
    const response = api.post(`api/member/login`, { userId, password });
    return response;
}