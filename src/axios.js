import axios from "axios";
import store from "./store";

const axiosClient = axios.create({
  baseURL: "http://127.0.0.1:8000/api",
});

axiosClient.interceptors.request.use((config) => {
  config.headers.Authorization = `Bearer ${store.state.user.token}`;
  return config;
});
// تنفّذ تلقائيًا قبل إرسال كل طلب
// config إعدادات الطلب (مثل headers, url, method, data...).
export default axiosClient;
