<template>
  <div v-if="postStore.postDetail">
    <div>게시글 번호 : {{ postStore.postDetail.id }}</div>
    <h1>제목 : {{ postStore.postDetail.title }}</h1>
    <div>작성자 : {{ postStore.postDetail.nickname }}</div>
    <PostOptionMenu :postId="postStore.postDetail.id" />
    <p>내용 : {{ postStore.postDetail.content }}</p>

    <CommentsSection :postId="postId" />
  </div>

  <div v-else>
    게시글을 불러오는 중...
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import { useCommentsStore } from '../../stores/CommentStore';
import { useRoute } from 'vue-router';
import PostOptionMenu from '../../components/posts/PostOptionMenu.vue';
import CommentsSection from '../comments/CommentsSection.vue';

const postStore = usePostStore();
const commentsStore = useCommentsStore();
const route = useRoute();
const postId = Number(route.params.id);

onMounted(async () => {
  try {
    // 새로고침 시 posts 배열이 비어있어도 무조건 fetch
    await postStore.loadPostById(postId);
    await commentsStore.loadComments(postId, 1);
  } catch (err) {
    alert(err.response?.data?.message || "게시글을 불러오지 못했습니다.");
  }
});
</script>

<style scoped lang="scss"></style>