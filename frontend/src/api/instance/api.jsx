import axios from "axios"
import interceptor from "../interceptor/interceptor";

export const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: { 'Content-Type': 'application/json',
     },
});

interceptor(api)