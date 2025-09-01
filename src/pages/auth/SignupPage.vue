<template>
    <div class="min-h-screen flex items-center justify-center bg-base-200 py-12 px-4 sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8">
            <!-- 회원가입 헤더 -->
            <div class="text-center">
                <h1 class="text-4xl font-bold text-base-content mb-2">회원가입</h1>
                <p class="text-base-content/70">Deboard에 가입하고 시작하세요</p>
            </div>

            <!-- 회원가입 폼 -->
            <div class="bg-base-100 rounded-lg shadow-lg p-8">
                <form @submit.prevent="onSubmit" class="space-y-6">
                    <!-- 닉네임 -->
                    <div class="form-control">
                        <label for="nickname" class="label">
                            <span class="label-text font-semibold">닉네임</span>
                        </label>
                        <div class="flex gap-2">
                            <input 
                                id="nickname"
                                v-model="form.nickname" 
                                type="text" 
                                required 
                                placeholder="닉네임을 입력하세요"
                                class="input input-bordered flex-1 focus:input-primary"
                            />
                            <button 
                                type="button" 
                                @click="checkNicknameDup" 
                                :disabled="loading.nickname || !form.nickname.trim()"
                                class="btn btn-outline btn-sm"
                            >
                                <span v-if="loading.nickname" class="loading loading-spinner loading-xs"></span>
                                {{ loading.nickname ? '확인중' : '중복확인' }}
                            </button>
                        </div>
                        <div v-if="nicknameCheckMessage" class="label">
                            <span class="label-text-alt" :class="verify.nickname ? 'text-success' : 'text-error'">
                                {{ nicknameCheckMessage }}
                            </span>
                        </div>
                    </div>

                    <!-- 이메일 -->
                    <div class="form-control">
                        <label for="email" class="label">
                            <span class="label-text font-semibold">이메일</span>
                        </label>
                        <div class="flex gap-2">
                            <input 
                                id="email"
                                v-model="form.email" 
                                type="email" 
                                required 
                                placeholder="이메일을 입력하세요"
                                class="input input-bordered flex-1 focus:input-primary"
                            />
                            <button 
                                type="button" 
                                @click="checkEmailDup" 
                                :disabled="loading.email || !form.email.trim()"
                                class="btn btn-outline btn-sm"
                            >
                                <span v-if="loading.email" class="loading loading-spinner loading-xs"></span>
                                {{ loading.email ? '발송중' : '인증발송' }}
                            </button>
                        </div>
                        <div v-if="emailCheckMessage" class="label">
                            <span class="label-text-alt" :class="verify.email ? 'text-success' : 'text-error'">
                                {{ emailCheckMessage }}
                            </span>
                        </div>
                    </div>

                    <!-- 이메일 인증 코드 -->
                    <div v-if="emailSent && verify.email !== true" class="form-control">
                        <label for="code" class="label">
                            <span class="label-text font-semibold">이메일 인증 코드</span>
                            <span class="label-text-alt text-warning font-mono">{{ timerText }}</span>
                        </label>
                        <div class="flex gap-2">
                            <input 
                                id="code" 
                                v-model="emailCode" 
                                type="text" 
                                placeholder="인증 코드를 입력하세요"
                                class="input input-bordered flex-1 focus:input-primary"
                            />
                            <button 
                                type="button" 
                                @click="verifyCode" 
                                :disabled="loading.verifyCode || !emailCode.trim()"
                                class="btn btn-primary btn-sm"
                            >
                                <span v-if="loading.verifyCode" class="loading loading-spinner loading-xs"></span>
                                {{ loading.verifyCode ? '확인중' : '인증확인' }}
                            </button>
                        </div>
                        <div v-if="emailVerifyMessage" class="label">
                            <span class="label-text-alt" :class="verify.email ? 'text-success' : 'text-error'">
                                {{ emailVerifyMessage }}
                            </span>
                        </div>
                    </div>

                    <!-- 비밀번호 -->
                    <div class="form-control">
                        <label for="password" class="label">
                            <span class="label-text font-semibold">비밀번호</span>
                        </label>
                        <input 
                            id="password" 
                            v-model="form.password" 
                            type="password" 
                            required 
                            placeholder="비밀번호를 입력하세요"
                            class="input input-bordered w-full focus:input-primary"
                        />
                    </div>

                    <!-- 회원가입 버튼 -->
                    <button 
                        type="submit"
                        :disabled="!verify.nickname || !verify.email || !form.password.trim()"
                        class="btn btn-primary w-full btn-lg gap-2"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path>
                        </svg>
                        회원가입
                    </button>
                </form>
            </div>

            <!-- 로그인 링크 -->
            <div class="text-center">
                <p class="text-base-content/70">
                    이미 계정이 있으신가요? 
                    <router-link to="/login" class="link link-primary font-semibold">
                        로그인
                    </router-link>
                </p>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref, reactive, computed,watch, onUnmounted } from "vue";
import { useAuthStore } from "../../stores/AuthStore";
import { useRouter } from "vue-router"

const authStore = useAuthStore();
const router = useRouter();
const form = reactive({
    email: "",
    nickname: "",
    password: ""
});

const loading = reactive({
    email: false,
    nickname: false,
    verifyCode: false,
})

const verify = reactive({
    nickname: false,
    email: false,
})

const emailCode = ref("");
const emailSent = ref(false);
const timer = ref(0);
let timerInterval = null;

const emailCheckMessage = ref("");
const nicknameCheckMessage = ref("");
const emailVerifyMessage = ref("");

// const loading = computed(() => authStore.loading);
// const error = computed(() => authStore.error);

// 닉네임 중복확인
const checkNicknameDup = async () => {
    loading.nickname = true
    try {
        await authStore.checkNickname(form.nickname);
        nicknameCheckMessage.value = "사용 가능한 닉네임 입니다.";
        verify.nickname = true;
    } catch (err) {
        nicknameCheckMessage.value = err.response?.data?.message || "중복된 닉네임 입니다.";
    } finally {
        loading.nickname = false;
    }
}
// 이메일 정규식
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// 이메일 중복확인
const checkEmailDup = async () => {

    if (!emailRegex.test(form.email)) {
        emailCheckMessage.value = "올바른 이메일 형식이 아닙니다.";
        return;
    }
    loading.email = true
    emailCheckMessage.value = "";
    try {
        await authStore.sendEmailcode(form.email);
        emailCheckMessage.value = "인증번호가 발송되었습니다.";
        emailSent.value = true;
        startTimer();
    } catch (err) {
        emailCheckMessage.value = err.response?.data?.message || "중복된 이메일 입니다.";
    } finally {
        loading.email = false;
    }
}

const verifyCode = async () => {
    loading.verifyCode = true;
    try {
        await authStore.verifyEmailCode(form.email, emailCode.value);
        emailVerifyMessage.value = "이메일 인증 완료!";
        verify.email = true;
        clearInterval(timerInterval);
    } catch (err) {
        emailVerifyMessage.value = err.response?.data?.message || "인증 실패";
    } finally {
        loading.verifyCode = false;
    }
}

// 인증 타이머
const timerText = computed(() => {
    const min = Math.floor(timer.value / 60);
    const sec = timer.value % 60;
    const secStr = sec < 10 ? `0${sec}` : sec;
    return `${min}:${secStr}`;
});
const startTimer = () => {
    timer.value = 180; // 3분
    if (timerInterval) clearInterval(timerInterval);
    timerInterval = setInterval(() => {
        timer.value--;
        if (timer.value <= 0) {
            clearInterval(timerInterval);
            emailSent.value = false;
        }
    }, 1000);
};

// 회원가입
const onSubmit = async () => {
    if (!verify.nickname) {
        alert("닉네임 중복검사를 완료해주세요.");
        return;
    }

    if (!verify.email) {
        alert("이메일 인증을 완료해주세요.");
        return;
    }

    try {
        await authStore.signupRequest(form);
        alert("회원가입이 완료되었습니다!");
        router.push("/login");
    } catch (err) {
        alert(err.response?.data?.message || "회원가입 실패");
    }
}

// 이메일/닉네임 값이 바뀌면 인증 상태 초기화
watch(() => form.email, () => {
  verify.email = false;
  emailSent.value = false;
  emailCode.value = "";
  emailVerifyMessage.value = "";
  emailCheckMessage.value = "";
  if (timerInterval) clearInterval(timerInterval);
});

watch(() => form.nickname, () => {
  verify.nickname = false;
  nicknameCheckMessage.value = "";
});

// 페이지 로딩시 시간이 안돌아가도록 초기화
onUnmounted(() => {
    if (timerInterval) clearInterval(timerInterval);
});

</script>

<style lang="scss" scoped></style>