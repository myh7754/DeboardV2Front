import api from "./api";

const API_URL = '/auth';
const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080';

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
    const res =await api.post(`${API_URL}/signin`, signInRequest);
}

export const logout = async () => {
    await api.post(`${API_URL}/refresh/logout`);
}

export const oauthLoginRequest = async (provider) => {
    window.location.href = `${baseURL}/oauth2/authorization/${provider}`;
}