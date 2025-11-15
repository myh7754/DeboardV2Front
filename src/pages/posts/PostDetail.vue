<template>
  <div v-if="postStore.postDetail" class="space-y-6">
    <!-- 뒤로가기 버튼 -->
    <div class="flex items-center gap-4">
      <button 
        @click="$router.go(-1)" 
        class="btn btn-ghost btn-sm gap-2"
      >
        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
        </svg>
        뒤로가기
      </button>
    </div>

    <!-- 게시글 상세 정보 -->
    <div class="bg-base-100 rounded-lg shadow-lg p-8">
      <!-- 게시글 헤더 -->
      <div class="border-b border-base-300 pb-6 mb-6">
        <div class="flex justify-between items-start mb-4">
          <div class="flex-1">
            <h1 class="text-3xl font-bold text-base-content mb-4">
              {{ postStore.postDetail.title }}
            </h1>
            <div class="flex items-center gap-6 text-sm text-base-content/70">
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                </svg>
                <span class="font-medium">{{ postStore.postDetail.nickname }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                </svg>
                <span>{{ formatDate(postStore.postDetail.createdAt) }}</span>
              </div>
              <div class="flex items-center gap-2">
                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fill-rule="evenodd" d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
                <span>게시글 #{{ postStore.postDetail.id }}</span>
              </div>
            </div>
          </div>
          <div class="ml-4 flex items-center gap-2">
            <button 
              class="btn btn-ghost btn-sm gap-1"
              :class="{ 'text-error': postStore.postDetail.liked }"
              :disabled="!authStore.isLoggedIn"
              @click="onClickLike(postStore.postDetail.id)"
              aria-label="좋아요 토글"
            >
              <svg v-if="postStore.postDetail.liked" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" />
              </svg>
              <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 016.364 0L12 7.636l1.318-1.318a4.5 4.5 0 116.364 6.364L12 20.364l-7.682-7.682a4.5 4.5 0 010-6.364z" />
              </svg>
              <span class="text-sm">{{ postStore.postDetail.likeCount || 0 }}</span>
            </button>
            <PostOptionMenu :postId="postStore.postDetail.id" />
          </div>
        </div>
      </div>

      <!-- 게시글 내용 -->
      <div class="prose prose-lg max-w-none">
        <div 
          class="text-base-content leading-relaxed post-content"
          v-html="sanitizedContent"
        ></div>
      </div>
    </div>

    <!-- 댓글 섹션 -->
    <div class="bg-base-100 rounded-lg shadow-lg p-6">
      <h2 class="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
        <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path>
        </svg>
        댓글
      </h2>
      <CommentsSection :postId="postId" />
    </div>
  </div>

  <!-- 로딩 상태 -->
  <div v-else class="flex justify-center items-center py-20">
    <div class="text-center">
      <span class="loading loading-spinner loading-lg text-primary"></span>
      <p class="mt-4 text-base-content/70">게시글을 불러오는 중...</p>
    </div>
  </div>
</template>

<script setup>
import { onMounted, computed } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import { useAuthStore } from '../../stores/AuthStore';
import { useRoute } from 'vue-router';
import PostOptionMenu from '../../components/posts/PostOptionMenu.vue';
import CommentsSection from '../comments/CommentsSection.vue';
import { useDateFormat } from '../../composable/useDateFormat';
import { sanitizeHtml } from '../../utils/htmlSanitizer';

const postStore = usePostStore();
const authStore = useAuthStore();
const route = useRoute();
const postId = Number(route.params.id);
const { formatDate } = useDateFormat();

// 게시글 내용을 HTML로 렌더링 (XSS 방지를 위해 sanitize)
const sanitizedContent = computed(() => {
  const content = postStore.postDetail?.content || '';
  if (!content) return '';
  return sanitizeHtml(content);
});

onMounted(async () => {
  try {
    // 새로고침 시 posts 배열이 비어있어도 무조건 fetch
    await postStore.loadPostById(postId);
    // 댓글 로딩은 CommentsSection 컴포넌트에서 처리
  } catch (err) {
    alert(err.response?.data?.message || "게시글을 불러오지 못했습니다.");
  }
});

const onClickLike = async (postId) => {
  // 로그인 체크
  if (!authStore.isLoggedIn) {
    alert('로그인이 필요합니다.');
    return;
  }
  
  try {
    await postStore.toggleLikes(postId);
  } catch (err) {
    alert(err.response?.data?.message || '좋아요 처리에 실패했습니다.');
  }
}
</script>

<style scoped lang="scss">
// 게시글 내용 스타일링
:deep(.post-content) {
  // 이미지가 컨테이너를 벗어나지 않도록
  img {
    max-width: 100%;
    height: auto;
    border-radius: 0.5rem;
    margin: 1rem 0;
  }

  // 링크 스타일
  a {
    color: hsl(var(--p));
    text-decoration: underline;
    
    &:hover {
      color: hsl(var(--pf));
    }
  }

  // 제목 스타일
  h1, h2, h3, h4, h5, h6 {
    margin-top: 1.5rem;
    margin-bottom: 0.75rem;
    font-weight: 600;
  }

  // 리스트 스타일
  ul, ol {
    margin: 1rem 0;
    padding-left: 1.5rem;
  }

  // 코드 블록 스타일
  code {
    background-color: hsl(var(--b2));
    padding: 0.125rem 0.25rem;
    border-radius: 0.25rem;
    font-size: 0.875em;
  }

  pre {
    background-color: hsl(var(--b2));
    padding: 1rem;
    border-radius: 0.5rem;
    overflow-x: auto;
  }
}
</style>