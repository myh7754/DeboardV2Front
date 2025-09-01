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

    <!-- 페이지네이션 -->
    <Pagination :page="postStore.page" :total="postStore.totalPages" @changePage="postStore.loadPosts" />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import PostList from '../../components/posts/PostList.vue';
import { useRouter } from 'vue-router';
import Pagination from '../../components/common/Pagination.vue';

const postStore = usePostStore();
const router = useRouter();
const handleSelectPost = async (postId) => {
  router.push(`/posts/${postId}`)
}

onMounted(async () => {
  try {
    await postStore.loadPosts(postStore.page);
  } catch (err) {
    console.error("게시글 목록 로딩 에러:", err);
    alert(err.response?.data?.message || "게시글 목록을 불러오지 못했습니다.");
  }
})

</script>

<style lang="scss" scoped></style>