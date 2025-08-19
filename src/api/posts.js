import api from "./api";

const API_URL = '/posts';

export const fetchPosts = async (page = 0, size = 10) => {
    try {
        const res = await api.get(API_URL, {
            params: {page,size}
        });
        return res.data;
    } catch (error) {
        throw error;

    }
};

export const fetchPostById = async (id) => {
    try {
        const res = await api.get(`${API_URL}/${id}`);
        return res.data;
    } catch (error) {
        throw error;
    }
}


export const createPostApi = async (postData) => {
    try {
        const res = await api.post(API_URL, postData);
        return res.data;
    } catch (error) {
        throw error;
    }
}

export const updatePost = async (id, postData) => {
    try {
        api.put(`${API_URL}/${id}`, postData)
    } catch (error) {
        throw error;
    }
};

export const deletePostById = async (id) => {
    try {
        api.delete(`${API_URL}/${id}`)
    } catch (error) {
        throw error;
    }
};