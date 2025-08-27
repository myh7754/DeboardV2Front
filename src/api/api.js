import axios from "axios";
import createAuthRefreshInterceptor from "axios-auth-refresh";
import { useAuthStore } from "../stores/AuthStore";
import router from "../router";

const base = "http://localhost:8080/api";
const api = axios.create({
  baseURL: base,
  withCredentials: true, // 쿠키 자동 포함
});

const refreshAuthLogic = async (failedRequest) => {
  const authStore = useAuthStore();
  try {
    // refresh 요청 → 쿠키 기반이라 body 필요 없음
    await api.post("/auth/refresh");
    // refresh 성공 → failedRequest 재시도 가능
    return Promise.resolve();
  } catch (err) {
    axios.post(`${base}/auth/refresh/logout`);
    authStore.isLoggedIn = false;
    router.push("/");
    return Promise.reject(err);
  }
}

createAuthRefreshInterceptor(api, refreshAuthLogic, {
  statusCodes: [401],                // 기본값
  pauseInstanceWhileRefreshing: true // refresh 중에는 다른 요청 큐 대기
});

export default api;
