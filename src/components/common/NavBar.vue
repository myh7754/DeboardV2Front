<template>
    <nav class="navbar bg-base-100 shadow-lg rounded-box mb-8">
      <div class="navbar-start">
        <router-link to="/" class="btn btn-ghost text-xl">Deboard</router-link>
      </div>
      
      <div class="navbar-center hidden lg:flex">
        <ul class="menu menu-horizontal px-1 space-x-2">
          <li>
            <router-link 
              to="/posts" 
              class="btn btn-ghost hover:btn-primary transition-all"
              active-class="btn-primary"
            >
              게시글 목록
            </router-link>
          </li>
          <li>
            <router-link 
              to="/posts/new" 
              class="btn btn-ghost hover:btn-secondary transition-all"
              active-class="btn-secondary"
            >
              게시글 생성
            </router-link>
          </li>
        </ul>
      </div>
  
      <div class="navbar-end space-x-2">
        <li v-if="!auth.isLoggedIn">
            <router-link 
              to="/signup" 
              class="btn btn-ghost hover:btn-accent transition-all"
              active-class="btn-accent"
            >
            회원가입
            </router-link>
          </li>
        <router-link 
          v-if="!auth.isLoggedIn"
          to="/login" 
          class="btn btn-primary hover:btn-primary-focus"
        >
          로그인
        </router-link>
        
        <button 
          v-if="auth.isLoggedIn"
          @click="auth.handleLogout"
          class="btn btn-outline btn-error hover:btn-error-focus"
        >
          로그아웃
        </button>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useAuthStore } from '../../stores/AuthStore';
  const auth = useAuthStore();
  </script>
