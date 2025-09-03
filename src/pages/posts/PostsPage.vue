<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-base-content">게시글 목록</h1>
      <div class="text-sm text-base-content/70">
        총 {{ postStore.totalPages * 10 }}개의 게시글
      </div>
    </div>

    <!-- 게시글 목록 -->
    <div class="bg-base-100 rounded-lg shadow-lg p-6">
      <PostList :posts="postStore.posts" @selectPost="handleSelectPost" />
    </div>

    <!-- 검색창 컴포넌트 -->
    <SearchBar />

    <!-- 페이지네이션 -->
    <Pagination :page="postStore.page" :total="postStore.totalPages" @changePage="handlePageChange" />
  </div>
</template>

<script setup>
import { onMounted, watch } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import PostList from '../../components/posts/PostList.vue';
import { useRoute, useRouter } from 'vue-router';
import Pagination from '../../components/common/Pagination.vue';
import SearchBar from '../../components/common/SearchBar.vue';

const postStore = usePostStore();
const router = useRouter();
const route = useRoute();

const handleSelectPost = async (postId) => {
  router.push(`/posts/${postId}`)
}

// 페이지 변경 시 URL 업데이트
const handlePageChange = async (pageNumber) => {
  const query = { ...route.query, page: pageNumber };
  await router.push({ query });
}

// URL 쿼리 파라미터 변경 감지
watch(() => route.query, async (newQuery) => {
  const page = parseInt(newQuery.page) || 1;
  const keyword = newQuery.keyword || '';
  const searchType = newQuery.searchType || '';

  if (keyword && searchType) {
    // 검색 조건이 있는 경우
    await postStore.searchPosts(searchType, keyword, page);
  } else {
    // 전체 목록 로드
    postStore.keyword = '';
    postStore.searchType = '';
    await postStore.loadPosts(page);
  }
}, { immediate: true });

onMounted(async () => {
  // URL에서 쿼리 파라미터 읽어오기
  const page = parseInt(route.query.page) || 1;
  const keyword = route.query.keyword || '';
  const searchType = route.query.searchType || '';

  try {
    if (keyword && searchType) {
      // 검색 조건이 있는 경우 검색 실행
      await postStore.searchPosts(searchType, keyword, page);
    } else {
      // 전체 목록 로드
      await postStore.loadPosts(page);
    }
  } catch (err) {
    console.error("게시글 목록 로딩 에러:", err);
    alert(err.response?.data?.message || "게시글 목록을 불러오지 못했습니다.");
  }
})
</script>

<style lang="scss" scoped></style>