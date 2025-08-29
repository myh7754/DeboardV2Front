import api from "./api";

const API_URL = '/comments';

export const loadCommentsApi = async (postId, newPage = 1) => {
    const res = await api.get(`${API_URL}/${postId}`, {
        params: { page: newPage, size: 5 },
    });
    return res.data;
};

export const loadReplies = async (parentId, newPage = 1) => {
    const res = await api.get(`${API_URL}/${parentId}/replies`, {
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