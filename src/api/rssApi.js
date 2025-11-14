import api from "./api";

const API_URL = '/rss';

// 사용자 피드 등록
export const registerUserFeed = (name, url) => 
    api.post(`${API_URL}/user-feed`, null, { 
        params: { name, url } 
    }).then(res => res.data);

// 사용자 피드 목록 조회
export const getUserFeeds = () => 
    api.get(`${API_URL}/user-feed`).then(res => res.data);

