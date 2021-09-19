import axios from "axios";

const BASE_URL = "https://libretranslate.de/";
const API_TIMEOUT = 10000;

const api = axios.create({
    baseURL: BASE_URL,
    timeout: API_TIMEOUT,
    headers: { "content-type": "application/json" },
});

export default api;
