<script setup>
// App.vue는 단순히 라우터 뷰만 렌더링
</script>

<template>
  <div id="app" class="min-h-screen">
    <router-view />
  </div>
</template>

<style>
/* 전역 스타일 */
html {
  scroll-behavior: smooth;
}

body {
  font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
}

/* 커스텀 스크롤바 */
::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: hsl(var(--b2));
}

::-webkit-scrollbar-thumb {
  background: hsl(var(--bc) / 0.3);
  border-radius: 4px;
}

::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--bc) / 0.5);
}
</style>
