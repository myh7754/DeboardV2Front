<template>
  <div class="space-y-6">
    <!-- 페이지 헤더 -->
    <div class="flex justify-between items-center">
      <h1 class="text-3xl font-bold text-base-content">좋아요한 게시글</h1>
      <div class="text-sm text-base-content/70" v-if="posts.length > 0">
        총 {{ totalElements }}개의 게시글
      </div>
    </div>

    <!-- 게시글 목록 -->
    <div v-if="posts.length>0" class="bg-base-100 rounded-lg shadow-lg p-6">
      <PostList :posts="posts" @selectPost="handleSelectPost" />
    </div>

    <!-- 게시글이 없을 때 -->
    <div v-if="posts.length === 0" class="text-center py-12">
      <div class="text-base-content/50">
        <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clip-rule="evenodd"></path>
        </svg>
        <p class="text-lg">아직 좋아요한 게시글이 없습니다.</p>
        <p class="text-sm">마음에 드는 게시글에 좋아요를 눌러보세요!</p>
      </div>
    </div>

    <!-- 검색창 컴포넌트 -->
    <SearchBar @search="handleSearch" />

    <!-- 페이지네이션 -->
    <Pagination 
      v-if="posts.length > 0"
      :page="currentPage" 
      :total="totalPages" 
      @changePage="handlePageChange" 
    />
  </div>
</template>

<script setup>
import { ref, onMounted, watch } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { usePostStore } from '../../stores/PostStore';
import PostList from '../../components/posts/PostList.vue';
import Pagination from '../../components/common/Pagination.vue';
import SearchBar from '../../components/common/SearchBar.vue';

const postStore = usePostStore();
const router = useRouter();
const route = useRoute();

const currentPage = ref(1);
const totalPages = ref(1);
const totalElements = ref(0);
const posts = ref([]);

// 검색 처리
const handleSearch = (searchParams) => {
  const query = { ...route.query, ...searchParams, page: 1 };
  router.push({ query });
};

// 페이지 변경 처리
const handlePageChange = (page) => {
  const query = { ...route.query, page };
  router.push({ query });
};

// URL 쿼리 파라미터 변경 감지
watch(() => route.query, async (newQuery) => {
  const page = parseInt(newQuery.page) || 1;
  const keyword = newQuery.keyword || '';
  const searchType = newQuery.searchType || 'title';

  try {
    if (keyword && searchType) {
      // 검색 로직이 필요한 경우 여기에 추가
      await postStore.loadLikedPosts(page ,keyword, searchType);
    } else {
      await postStore.loadLikedPosts(page);
    }
    
    // 스토어에서 데이터 가져오기
    posts.value = [...postStore.posts];
    totalPages.value = postStore.totalPages;
    totalElements.value = postStore.totalElements;
    currentPage.value = postStore.page;
  } catch (error) {
    console.error('게시글을 불러오는 중 오류가 발생했습니다.', error);
  }
}, { immediate: true });

const handleSelectPost = (postId) => {
  router.push(`/posts/${postId}`);
};
</script>