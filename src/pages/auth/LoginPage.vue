<template>
    <!-- 로그인 -->
    <div class="login-page">
        <h1>로그인</h1>

        <!-- 일반 로그인 -->
        <form @submit.prevent="handleLogin" class="login-form">
            <div class="form-group">
                <label for="email">이메일</label>
                <input id="email" type="email" v-model="form.email" placeholder="이메일을 입력하세요" required />
            </div>

            <div class="form-group">
                <label for="password">비밀번호</label>
                <input id="password" type="password" v-model="form.password" placeholder="비밀번호를 입력하세요" required />
            </div>

            <button type="submit" :disabled="auth.loading">
                {{ auth.loading ? "로그인 중..." : "로그인" }}
            </button>
        </form>
        <!-- oauth 로그인 -->
        <div class="oauth-section">
            <p>다른 계정으로 로그인</p>
            <button @click="auth.handleOauthLogin('google')" class="oauth google">
                구글 로그인
            </button>
            <button @click="auth.handleOauthLogin('kakao')" class="oauth kakao">
                카카오 로그인
            </button>
            <button @click="auth.handleOauthLogin('naver')" class="oauth naver">
                네이버 로그인
            </button>
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