import api from "./api";

const API_URL = '/posts';

export const fetchPosts = (page = 0, size = 10, keyword ='', searchType ='') => api.get(API_URL, { params: { page, size, keyword, searchType } }).then(res => res.data);

export const fetchPostById = (id) => api.get(`${API_URL}/${id}`).then(res => res.data);

export const createPostApi = (postData) => api.post(API_URL, postData).then(res => res.data);

export const updatePost = (id, postData) => api.put(`${API_URL}/${id}`, postData);

export const deletePostById = (id) => api.delete(`${API_URL}/${id}`);

export const fetchPostsByLike = (page = 0, size = 10, keyword ='', searchType ='') => api.get(`${API_URL}/liked`, { params: { page, size, keyword, searchType } }).then(res => res.data);