import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "http://192.168.1.36:3030/"
});

export default AXIOS;