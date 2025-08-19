<template>
    <div>
        <h1>회원가입</h1>
        <form @submit.prevent="onSubmit">

            <!-- 닉네임 -->
            <div>
                <label for="nickname">닉네임</label>
                <input v-model="form.nickname" type="text" required />
                <button type="button" @click="checkNicknameDup" :disabled="loading.nickname">중복확인</button>
                <span v-if="nicknameCheckMessage">{{ nicknameCheckMessage }}</span>
            </div>

            <!-- 이메일 -->
            <div>
                <label for="email">이메일</label>
                <input v-model="form.email" type="email" required />
                <button type="button" @click="checkEmailDup" :disabled="loading.email">중복확인</button>
                <span v-if="emailCheckMessage && verify.email===false">{{ emailCheckMessage }}</span>
                <span v-else-if="verify.email">{{ emailVerifyMessage }}</span>
            </div>

            <!-- 이메일 인증 -->
            <div v-if="emailSent && verify.email !== true">
                <label for="code">이메일 인증 코드</label>
                <input id="code" v-model="emailCode" type="text" />
                <div>
                    {{ timerText }}
                </div>
                <button type="button" @click="verifyCode" :disabled="loading.verifyCode">인증 확인</button>
                <span v-if="emailVerifyMessage">{{ emailVerifyMessage }}</span>
            </div>

            <!-- 비밀번호 -->
            <div>
                <label for="password">비밀번호</label>
                <input id="password" v-model="form.password" type="password" required />
            </div>

            <button type="submit">회원가입</button>
        </form>
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