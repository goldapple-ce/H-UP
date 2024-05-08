import axios from "axios"
import interceptor from "../interceptor/interceptor";
import { useSelector } from "react-redux";

export const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: { 'Content-Type': 'application/json',
     },
});

export function initializeAxios(token) {
    interceptor(api, token);
}