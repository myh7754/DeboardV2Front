import api from "./api";

const API_URL = '/likes';

// 좋아요 토글 요청 API
// - 서버에서 토글 처리만 수행하고, 프론트는 낙관적 업데이트로 UI를 즉시 반영합니다.
export const toggleLikeApi = (postId) => api.post(`${API_URL}/${postId}`);

// 좋아요 상태 조회 API
// - 새로고침이나 상세 페이지 진입 시에만 호출해 실제 상태를 동기화합니다.
export const likesStatus = (postId) => api.get(`${API_URL}/${postId}`).then(res => res.data);




