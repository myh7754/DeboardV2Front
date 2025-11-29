import api from './api';

const API_URL = '/search';

export const searchPost = async (searchType ,keyword, page, size) => {
    const response = await api.get(`${API_URL}/post`, {
        params: {
            searchType,
            keyword,
            page,
            size
        }
    });
    return response.data;
};