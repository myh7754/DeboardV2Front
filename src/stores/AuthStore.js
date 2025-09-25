import { defineStore } from "pinia";
import { ref } from "vue";
import { checkNickname, sendEmailcode, verifyEmailCode, signUp, loginRequest, logout, oauthLoginRequest } from "../api/authApi";
import { usePostStore } from "./PostStore";

export const useAuthStore = defineStore("auth", () => {
    const loading = ref(false);
    const error = ref(null);
    const isLoggedIn = ref(false);

    const signupRequest = async (form) => {
        loading.value = true;
        error.value = null;
        try {
            signUp(form);
        } catch (err) {
            error.value = err.response?.data?.message || "회원가입 실패";
            throw err;
        } finally {
            loading.value = false
        }

    }

    const login = async (form) => {
        await loginRequest(form);
        isLoggedIn.value = true;
    };

    const handleOauthLogin = async (provider) => {
        await oauthLoginRequest(provider);
        isLoggedIn.value = true;
    }
    const handleLogout = async () => {
        const res = await logout();
        isLoggedIn.value = false;
        
        // 로그아웃 시 좋아요 상태 초기화 (새로고침 없이 즉시 반영)
        const postStore = usePostStore();
        if (postStore.postDetail) {
            postStore.postDetail.liked = false;
        }
        // 목록의 모든 게시글 좋아요 상태도 초기화
        postStore.posts.forEach(post => {
            post.liked = false;
        });
    };
    
    // const oauthLogin = async (provider, data) => {
    //     const data = await oauthLoginRequest(provider,data);
    //     user.value = data.user;
    //     isLoggedIn.value = true;
    // }


    return {
        loading,
        error,
        isLoggedIn,
        login,
        handleOauthLogin,
        handleLogout,
        // oauthLogin,
        signupRequest,
        checkNickname,
        sendEmailcode,
        verifyEmailCode,
    };
}, {
    persist: true, // 여기서 새로고침해도 전역적으로 상태 유지
})