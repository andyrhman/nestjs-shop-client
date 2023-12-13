import axios from "axios";

const http = axios.create({
    baseURL: "https://api.kitapendidikan.my.id/api/",
    withCredentials: true
});

export default http;