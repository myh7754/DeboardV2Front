<template>
  <div class="min-h-screen bg-base-200">
    <!-- 히어로 섹션 -->
    <section class="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary min-h-[85vh] flex items-center">
      <!-- 배경 패턴 -->
      <div class="absolute inset-0 opacity-10">
        <div class="absolute inset-0" style="background-image: radial-gradient(circle at 2px 2px, currentColor 1px, transparent 0); background-size: 40px 40px;"></div>
      </div>
      
      <div class="container mx-auto px-4 py-20 relative z-10">
        <div class="max-w-4xl mx-auto text-center">
          <!-- 메인 타이틀 -->
          <div class="mb-8 animate-fade-in">
            <h1 class="text-6xl md:text-7xl font-extrabold text-base-100 mb-6 tracking-tight">
              Deboard
            </h1>
            <div class="w-24 h-1 bg-base-100 mx-auto rounded-full"></div>
          </div>
          
          <!-- 서브 타이틀 -->
          <p class="text-2xl md:text-3xl text-base-100/90 mb-4 font-light">
            현대적인 커뮤니티 플랫폼
          </p>
          <p class="text-lg md:text-xl text-base-100/70 mb-12 max-w-2xl mx-auto">
            생각을 나누고, 소통하고, 함께 성장하는 공간
          </p>

          <!-- CTA 버튼들 -->
          <div class="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <router-link 
              to="/posts" 
              class="btn btn-lg bg-base-100 text-primary hover:bg-base-100/90 border-0 shadow-xl gap-2 px-8"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
              </svg>
              게시글 둘러보기
            </router-link>
            
            <router-link 
              v-if="!authStore.isLoggedIn"
              to="/login" 
              class="btn btn-lg btn-outline border-2 border-base-100 text-base-100 hover:bg-base-100 hover:text-primary gap-2 px-8"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
              </svg>
              시작하기
            </router-link>
            
            <router-link 
              v-if="authStore.isLoggedIn"
              to="/posts/new" 
              class="btn btn-lg btn-outline border-2 border-base-100 text-base-100 hover:bg-base-100 hover:text-primary gap-2 px-8"
            >
              <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"></path>
              </svg>
              새 글 작성
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- 기능 소개 섹션 -->
    <section class="py-20 bg-base-200">
      <div class="container mx-auto px-4">
        <div class="text-center mb-16">
          <h2 class="text-4xl md:text-5xl font-bold text-base-content mb-4">
            주요 기능
          </h2>
          <p class="text-xl text-base-content/70 max-w-2xl mx-auto">
            간편하고 직관적인 기능으로 당신의 이야기를 자유롭게 나눠보세요
          </p>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          <!-- 게시글 관리 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center p-8">
              <div class="w-16 h-16 bg-primary/10 rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 20H5a2 2 0 01-2-2V6a2 2 0 012-2h10a2 2 0 012 2v1m2 13a2 2 0 01-2-2V7m2 13a2 2 0 002-2V9a2 2 0 00-2-2h-2m-4-3H9M7 16h6M7 8h6v4H7V8z"></path>
                </svg>
              </div>
              <h3 class="card-title text-xl mb-2">게시글 관리</h3>
              <p class="text-base-content/70 text-sm leading-relaxed">
                직관적인 에디터로 쉽게 글을 작성하고, 수정하고, 관리할 수 있습니다
              </p>
            </div>
          </div>

          <!-- 댓글 시스템 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center p-8">
              <div class="w-16 h-16 bg-secondary/10 rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-secondary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"></path>
                </svg>
              </div>
              <h3 class="card-title text-xl mb-2">댓글 시스템</h3>
              <p class="text-base-content/70 text-sm leading-relaxed">
                계층형 댓글 구조로 깊이 있는 토론과 소통이 가능합니다
              </p>
            </div>
          </div>

          <!-- 인증 시스템 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center p-8">
              <div class="w-16 h-16 bg-accent/10 rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path>
                </svg>
              </div>
              <h3 class="card-title text-xl mb-2">보안 인증</h3>
              <p class="text-base-content/70 text-sm leading-relaxed">
                JWT 기반의 안전한 인증 시스템으로 개인정보를 보호합니다
              </p>
            </div>
          </div>

          <!-- RSS 피드 -->
          <div class="card bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
            <div class="card-body items-center text-center p-8">
              <div class="w-16 h-16 bg-info/10 rounded-2xl flex items-center justify-center mb-4">
                <svg class="w-8 h-8 text-info" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 5c7.18 0 13 5.82 13 13M6 11a7 7 0 017 7m-6 0a1 1 0 11-2 0 1 1 0 012 0z"></path>
                </svg>
              </div>
              <h3 class="card-title text-xl mb-2">RSS 피드</h3>
              <p class="text-base-content/70 text-sm leading-relaxed">
                관심 있는 콘텐츠를 RSS로 구독하고 한 곳에서 관리하세요
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- 하단 CTA 섹션 -->
    <section class="py-16 bg-base-100">
      <div class="container mx-auto px-4 text-center">
        <h2 class="text-3xl md:text-4xl font-bold text-base-content mb-4">
          지금 바로 시작해보세요
        </h2>
        <p class="text-lg text-base-content/70 mb-8 max-w-xl mx-auto">
          Deboard와 함께 새로운 커뮤니티 경험을 시작하세요
        </p>
        <router-link 
          v-if="!authStore.isLoggedIn"
          to="/signup" 
          class="btn btn-primary btn-lg gap-2"
        >
          무료로 가입하기
        </router-link>
        <router-link 
          v-else
          to="/posts" 
          class="btn btn-primary btn-lg gap-2"
        >
          게시글 보러가기
        </router-link>
      </div>
    </section>
  </div>
</template>

<script setup>
import { useAuthStore } from '../stores/AuthStore';

const authStore = useAuthStore();
</script>

<style scoped>
@keyframes fade-in {
  from {
    opacity: 0;
    transform: translateY(20px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.animate-fade-in {
  animation: fade-in 0.8s ease-out;
}
</style>
