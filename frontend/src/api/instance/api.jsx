import axios from "axios"

export const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: { "X-Custom-Header": "foobar" },
});