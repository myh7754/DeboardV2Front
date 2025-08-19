<template>
  <div>게시글 목록 페이지</div>
  <div v-if="postStore.isLoading">로딩 중... </div>
  <div v-else-if="postStore.error">{{ postStore.error }} </div>

  <div v-else>
    <PostList :posts="postStore.posts" @selectPost="handleSelectPost"/>
    <Pagination
      :page="postStore.page"
      :total="postStore.totalPages"
      @changePage="postStore.loadPosts"
      />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { usePostStore } from '../../stores/PostStore';
// import PostList from '../../components/posts/PostList.vue';

const postStore = usePostStore();
const handleSelectPost = async (postId) => {
  await postStore.loadPostById(postId);
}

onMounted(()=> {
  postStore.loadPosts(postStore.page);
})

</script>

<style lang="scss" scoped>

</style>