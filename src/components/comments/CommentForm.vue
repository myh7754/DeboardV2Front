<template>
  <div class="comment-form">
    <textarea v-model="content" placeholder="댓글을 입력하세요..."></textarea>
    <button @click="submitComment" :disabled="loading || !content.trim()">등록</button>
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCommentsStore } from "../../stores/CommentStore";

const props = defineProps({
  postId: { type: Number, required: true },
  parentId: { type: Number, default: null } // 대댓글일 경우 부모 댓글 ID
});

const emit = defineEmits(["saved"]);

const commentsStore = useCommentsStore();
const content = ref("");
const loading = ref(false);

const submitComment = async () => {
  if (!content.value.trim()) return;
  loading.value = true;
  try {
    await commentsStore.saveComment({
      postId: props.postId,
      parentId: props.parentId,
      content: content.value
    });
    content.value = "";
    emit("saved"); // 부모 컴포넌트에게 알림
  } catch (err) {
    alert(err.response?.data?.message || "댓글 작성에 실패했습니다.");
  } finally {
    loading.value = false;
  }
};
</script>

<style scoped lang="scss">
.comment-form {
  display: flex;
  flex-direction: column;
  margin-bottom: 1rem;
  textarea {
    resize: none;
    padding: 0.5rem;
    margin-bottom: 0.5rem;
    width: 100%;
    min-height: 60px;
  }
  button {
    align-self: flex-end;
    padding: 0.3rem 0.8rem;
  }
}
</style>