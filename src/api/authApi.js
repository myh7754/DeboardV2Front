import api from "./api";

const API_URL = '/auth';
const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;


export const checkNickname = async (nickname) => {
    await api.get(`${API_URL}/valid/nickname`, { params: { nickname } });
}

export const sendEmailcode = async (email) => {

    await api.get(`${API_URL}/email/code`, { params: { email } });

}

export const verifyEmailCode = async (email, code) => {
    await api.post(`${API_URL}/email/verify?email=${email}`, code, {
        headers: { "Content-Type": "text/plain" }
    });

}

export const signUp = async (data) => {
    await api.post(`${API_URL}/signup`, data)
}

export const loginRequest = async (signInRequest) => {
    const res =await api.post(`${API_URL}/signin`, signInRequest, {
        skipAuthRefresh: true
    });
}

export const logout = async () => {
    await api.post(`${API_URL}/refresh/logout`);
}

export const oauthLoginRequest = async (provider) => {
    // OAuth 리다이렉트도 프록시를 통해 백엔드로 전달
    window.location.href = `${BACKEND_URL}/oauth2/authorization/${provider}`;
}

export const authCheck = async (entityType, id) => {
    await api.get(`${API_URL}/${entityType}/${id}`);
}