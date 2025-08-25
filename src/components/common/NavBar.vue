<template>
    <nav>
        <router-link to="/posts">게시글 목록</router-link>
        <router-link to="/posts/new">게시글 생성</router-link>
        <router-link to="/signup">회원가입</router-link>
        <router-link v-if="!auth.isLoggedIn" to="/login">로그인</router-link>
        <button v-if="auth.isLoggedIn" @click="auth.handleLogout">로그아웃</button>
    </nav>
</template>

<script setup>
import { useAuthStore } from '../../stores/AuthStore';
const auth= useAuthStore();

</script>

<style lang="scss" scoped>

</style>