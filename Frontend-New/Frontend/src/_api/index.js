import axios from "axios";

const url = "http://127.0.0.1:8000";

export const API = axios.create({
  baseURL: `${url}/api`,
});

// ✅ Tambahkan interceptor untuk menyisipkan token ke header Authorization
API.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export const SantriImageStorage = `${url}/storage/santri`
export const MudarisImageStorage = `${url}/storage/mudaris`
