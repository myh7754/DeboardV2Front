import api from "./api";

const API_URL = '/auth';

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