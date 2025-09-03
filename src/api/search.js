import axios from 'axios';

const API_URL = 'http://localhost:8080/api/search';

export const searchPost = async (searchType ,keyword, page, size) => {
    const response = await axios.get(`${API_URL}/post`, {
        params: {
            searchType,
            keyword,
            page,
            size
        }
    });
    return response.data;
};