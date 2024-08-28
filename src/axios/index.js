import axios from "axios";
import store from "@/store/store.js";
import ip from '/ipBackend.js'

const instance = axios.create({
  baseURL: ip,
});
instance.interceptors.request.use(async (req) => {  
  req.headers.token = store.state.token;
  return req;
});

export default instance;
