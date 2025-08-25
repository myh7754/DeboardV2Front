import api from "./api";

const API_URL = '/posts';

export const fetchPosts = (page = 0, size = 10) => api.get(API_URL, { params: { page, size } }).then(res => res.data);

export const fetchPostById = (id) => api.get(`${API_URL}/${id}`).then(res => res.data);

export const createPostApi = (postData) => api.post(API_URL, postData).then(res => res.data);

export const updatePost = (id, postData) => api.put(`${API_URL}/${id}`, postData);

export const deletePostById = (id) => api.delete(`${API_URL}/${id}`);

// export const fetchPosts = async (page = 0, size = 10) => {
//     try {
//         const res = await api.get(API_URL, {
//             params: {page,size}
//         });
//         return res.data;
//     } catch (error) {
//         throw error;

//     }
// };

// export const fetchPostById = async (id) => {
//     try {
//         const res = await api.get(`${API_URL}/${id}`);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// }


// export const createPostApi = async (postData) => {
//     try {
//         const res = await api.post(API_URL, postData);
//         return res.data;
//     } catch (error) {
//         throw error;
//     }
// }

// export const updatePost = async (id, postData) => {
//     try {
//         api.put(`${API_URL}/${id}`, postData)
//     } catch (error) {
//         throw error;
//     }
// };

// export const deletePostById = async (id) => {
//     try {
//         api.delete(`${API_URL}/${id}`)
//     } catch (error) {
//         throw error;
//     }
// };