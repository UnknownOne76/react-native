import axios from "axios";

export const AXIOS = axios.create({
  baseURL: "http://localhost:3030/"
});

export default AXIOS;