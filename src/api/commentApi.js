import api from "./api";

const API_URL = '/comments';

export const loadCommentsApi = async (postId, newPage = 1) => {
    const res = await api.get(`${API_URL}/${postId}`, {
        params: { page: newPage, size: 5 },
    });
    return res.data;
};

export const loadRepliesApi = async (commentsId, newPage = 1) => {
    // 백엔드 API: /api/comments/{commentsId}/replies
    // 특정 댓글의 대댓글을 조회
    const res = await api.get(`${API_URL}/${commentsId}/replies`, {
        params: { page: newPage - 1, size: 5 }
    });
    return res.data;
};

export const saveCommentApi = async (form) => {
    await api.post(`${API_URL}`, form);
}

export const deleteCommentApi = async (id) => {
    await api.delete(`${API_URL}/${id}`);
}

export const updateCommentApi = async (id, form) => {
    await api.put(`${API_URL}/${id}`, form);
}