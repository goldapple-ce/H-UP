import axios from "axios"

const api = axios.create({
    // baseURL: process.env.NEXT_PUBLIC_SERVER_URL,
    headers: { "X-Custom-Header": "foobar" },
});