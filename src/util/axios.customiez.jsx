import axios from "axios";
import { AuthApi } from "@/service";
// Khởi tạo Axios instance
const instance = axios.create({
  baseURL: import.meta.env.VITE_BE_URL,
  withCredentials: true, // gửi cookie chứa refresh_token
});

let isRefreshing = false;
let refreshSubscribers = [];

function onRefreshed(newAccessToken) {
  refreshSubscribers.forEach((callback) => callback(newAccessToken));
  refreshSubscribers = [];
}

function addRefreshSubscriber(callback) {
  refreshSubscribers.push(callback);
}

// Interceptor cho request - đính kèm access_token
instance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("access_token");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Interceptor cho response - xử lý khi access_token hết hạn
instance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Nếu access_token hết hạn và chưa retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      if (!isRefreshing) {
        isRefreshing = true;
        try {
          const res = await AuthApi.refreshToken();
          const newAccessToken = res.data.access_token;
          localStorage.setItem("access_token", newAccessToken);
          isRefreshing = false;
          onRefreshed(newAccessToken);
        } catch (refreshError) {
          isRefreshing = false;
          return Promise.reject(refreshError);
        }
      }

      // Hàng đợi các request cần retry
      return new Promise((resolve) => {
        addRefreshSubscriber((token) => {
          originalRequest.headers.Authorization = `Bearer ${token}`;
          resolve(instance(originalRequest)); // retry request
        });
      });
    }

    return Promise.reject(error);
  }
);

export default instance;
