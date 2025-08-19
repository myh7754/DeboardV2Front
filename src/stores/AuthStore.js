import { defineStore } from "pinia";
import { ref } from "vue";
import { checkNickname, sendEmailcode, verifyEmailCode, signUp } from "../api/authApi";

export const useAuthStore = defineStore("auth", ()=> {
    const loading = ref(false);
    const error = ref(null);

    const signupRequest = async (form) => {
        loading.value = true;
        error.value = null;
        try {
            signUp(form);
        } catch (err) {
            console.log("처음 회원가입 에러 처리");
            error.value = err.response?.data?.message || "회원가입 실패";
            throw err;
        } finally {
            loading.value = false
        }

    }

    return {
        loading,
        error,
        signupRequest,
        checkNickname,
        sendEmailcode,
        verifyEmailCode,
    }
})