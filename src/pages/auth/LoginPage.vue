<template>
    <div class="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <!-- 로그인 헤더 -->
            <div class="text-center">
                <h1 class="text-4xl font-bold text-base-content mb-2">로그인</h1>
                <p class="text-base-content/70">Deboard에 오신 것을 환영합니다</p>
            </div>

            <!-- 로그인 폼 -->
            <div class="bg-base-100 rounded-lg shadow-lg p-8">
                <form @submit.prevent="handleLogin" class="space-y-6">
                    <!-- 이메일 입력 -->
                    <div class="form-control">
                        <label for="email" class="label">
                            <span class="label-text font-semibold">이메일</span>
                        </label>
                        <input 
                            id="email" 
                            type="email" 
                            v-model="form.email" 
                            placeholder="이메일을 입력하세요" 
                            required 
                            class="input input-bordered w-full focus:input-primary"
                        />
                    </div>

                    <!-- 비밀번호 입력 -->
                    <div class="form-control">
                        <label for="password" class="label">
                            <span class="label-text font-semibold">비밀번호</span>
                        </label>
                        <input 
                            id="password" 
                            type="password" 
                            v-model="form.password" 
                            placeholder="비밀번호를 입력하세요" 
                            required 
                            class="input input-bordered w-full focus:input-primary"
                        />
                    </div>

                    <!-- 로그인 버튼 -->
                    <button 
                        type="submit" 
                        :disabled="auth.loading"
                        class="btn btn-primary w-full btn-lg gap-2"
                    >
                        <span v-if="auth.loading" class="loading loading-spinner loading-sm"></span>
                        <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                        </svg>
                        {{ auth.loading ? "로그인 중..." : "로그인" }}
                    </button>
                </form>

                <!-- 구분선 -->
                <div class="divider">또는</div>

                <!-- OAuth 로그인 -->
                <div class="space-y-3">
                    <p class="text-center text-sm text-base-content/70 mb-4">다른 계정으로 로그인</p>
                    
                    <button 
                        @click="auth.handleOauthLogin('google')" 
                        class="btn btn-outline w-full gap-2 hover:bg-red-50 hover:border-red-300 hover:text-red-600"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                            <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                            <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                            <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                        </svg>
                        구글 로그인
                    </button>

                    <button 
                        @click="auth.handleOauthLogin('kakao')" 
                        class="btn btn-outline w-full gap-2 hover:bg-yellow-50 hover:border-yellow-300 hover:text-yellow-600"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M12 3c5.799 0 10.5 3.664 10.5 8.185 0 4.52-4.701 8.184-10.5 8.184a13.5 13.5 0 0 1-1.727-.11L6.5 21.5c-.5.5-1.5.5-2 0s-.5-1.5 0-2l2.5-2.5c-3.5-1.5-6-4.5-6-8.185C1.5 6.664 6.201 3 12 3z"/>
                        </svg>
                        카카오 로그인
                    </button>

                    <button 
                        @click="auth.handleOauthLogin('naver')" 
                        class="btn btn-outline w-full gap-2 hover:bg-green-50 hover:border-green-300 hover:text-green-600"
                    >
                        <svg class="w-5 h-5" viewBox="0 0 24 24">
                            <path fill="currentColor" d="M16.273 12.845L7.376 0H0v24h7.726V11.156L16.624 24H24V0h-7.727v12.845z"/>
                        </svg>
                        네이버 로그인
                    </button>
                </div>
            </div>

            <!-- 회원가입 링크 -->
            <div class="text-center">
                <p class="text-base-content/70">
                    아직 계정이 없으신가요? 
                    <router-link to="/signup" class="link link-primary font-semibold">
                        회원가입
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useAuthStore } from '../../stores/AuthStore';
import { useRouter } from 'vue-router';

const auth = useAuthStore();
const router = useRouter();
const form = reactive({
    email: "",
    password: "",
});

const handleLogin = async () => {
    try {
        await auth.login(form);
        router.push("/");
    } catch (err) {
        console.log(err);
        alert(err.response?.data?.message || "로그인에 실패하였습니다.")
    }
}

</script>

<style lang="scss" scoped></style>