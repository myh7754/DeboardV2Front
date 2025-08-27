<template>
  <div>게시글 목록 페이지</div>
  <!-- <div v-if="postStore.isLoading">로딩 중... </div>
  <div v-else-if="postStore.error">{{ postStore.error }} </div> -->

  <div>
    <PostList :posts="postStore.posts" @selectPost="handleSelectPost"/>
    <Pagination
      :page="postStore.page"
      :total="postStore.totalPages"
      @changePage="postStore.loadPosts"
      />
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import PostList from '../../components/posts/PostList.vue';
import Pagination from '../../components/posts/Pagination.vue';
import { useRouter } from 'vue-router';

const postStore = usePostStore();
const router = useRouter();
const handleSelectPost = async (postId) => {
  router.push(`/posts/${postId}`)
}

onMounted(async ()=> {
  try {
    await postStore.loadPosts(postStore.page);
  } catch(err) {
    err.value = err.response?.data?.message || "게시글 목록을 불러오지 못했습니다.";
  }
})

</script>

<style lang="scss" scoped>

</style>