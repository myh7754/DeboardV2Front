<template>
  <div class="hero min-h-screen bg-gradient-to-br from-primary/10 to-secondary/10">
    <div class="hero-content text-center">
      <div class="max-w-md">
        <!-- 로고/아이콘 -->
        <div class="mb-8">
          <div class="inline-flex items-center justify-center w-20 h-20 bg-primary text-primary-content rounded-full mb-4">
            <svg class="w-10 h-10" fill="currentColor" viewBox="0 0 20 20">
              <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
            </svg>
          </div>
        </div>

        <!-- 메인 타이틀 -->
        <h1 class="text-5xl font-bold text-base-content mb-6">
          Deboard
        </h1>
        
        <!-- 서브 타이틀 -->
        <p class="text-xl text-base-content/80 mb-8">
          백엔드 개발자 포트폴리오를 위한<br>
          현대적인 게시판 플랫폼
        </p>

        <!-- 기술 스택 -->
        <div class="mb-8">
          <p class="text-sm text-base-content/60 mb-3">Built with</p>
          <div class="flex flex-wrap justify-center gap-2">
            <span class="badge badge-primary badge-lg">Vue 3</span>
            <span class="badge badge-secondary badge-lg">Pinia</span>
            <span class="badge badge-accent badge-lg">Tailwind CSS</span>
            <span class="badge badge-info badge-lg">DaisyUI</span>
            <span class="badge badge-success badge-lg">JavaScript</span>
          </div>
        </div>

        <!-- CTA 버튼들 -->
        <div class="flex flex-col sm:flex-row gap-4 justify-center">
          <router-link 
            to="/posts" 
            class="btn btn-primary btn-lg gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
            </svg>
            게시글 보기
          </router-link>
          
          <router-link 
            v-if="!authStore.isLoggedIn"
            to="/login" 
            class="btn btn-outline btn-lg gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
            </svg>
            로그인
          </router-link>
          
          <router-link 
            v-if="authStore.isLoggedIn"
            to="/posts/new" 
            class="btn btn-outline btn-lg gap-2"
          >
            <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
            </svg>
            글쓰기
          </router-link>
        </div>

        <!-- 기능 소개 -->
        <div class="mt-16 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div class="card bg-base-100 shadow-md">
            <div class="card-body text-center">
              <div class="mx-auto mb-3 w-12 h-12 bg-primary/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>
              <h3 class="card-title text-lg justify-center">게시글 관리</h3>
              <p class="text-sm text-base-content/70">CRUD 기능을 통한 완전한 게시글 관리 시스템</p>
            </div>
          </div>

          <div class="card bg-base-100 shadow-md">
            <div class="card-body text-center">
              <div class="mx-auto mb-3 w-12 h-12 bg-secondary/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 class="card-title text-lg justify-center">댓글 시스템</h3>
              <p class="text-sm text-base-content/70">계층형 댓글과 실시간 상호작용</p>
            </div>
          </div>

          <div class="card bg-base-100 shadow-md">
            <div class="card-body text-center">
              <div class="mx-auto mb-3 w-12 h-12 bg-accent/20 rounded-full flex items-center justify-center">
                <svg class="w-6 h-6 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="card-title text-lg justify-center">인증 시스템</h3>
              <p class="text-sm text-base-content/70">JWT 기반 보안과 OAuth 소셜 로그인</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();
</script>
