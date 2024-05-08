import axios from "axios";
import interceptor from "../interceptor/interceptor";

export const api = axios.create({
    baseURL: `${process.env.REACT_APP_API_URL}`,
    headers: { 'Content-Type': 'application/json',
    },
});

interceptor(api)