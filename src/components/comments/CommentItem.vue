<template>
  <div style="margin-bottom: 10px; padding-left: 10px; border-left: 1px solid #ccc;">
    <div>
      <span>{{ comment.author }}</span>
      <span>{{ formatDate(comment.createdAt) }}</span>
    </div>

    <div v-if="!editing">{{ comment.content }}</div>
    <textarea v-else v-model="editContent"></textarea>

    <div>
      <button v-if="!editing" @click="startEdit">수정</button>
      <button v-else @click="confirmEdit">저장</button>
      <button v-else @click="cancelEdit">취소</button>
      <button @click="toggleReply">답글</button>
      <button @click="removeComment">삭제</button>
    </div>

    <!-- 답글 작성 -->
    <CommentForm
      v-if="replying"
      :postId="postId"
      :parentId="comment.commentId"
      @submitted="onReplySubmitted"
    />

    <!-- 대댓글 리스트 재귀 렌더링 -->
    <CommentItem
      v-for="reply in comment.replies || []"
      :key="reply.commentId"
      :comment="reply"
      :postId="postId"
      @refresh="$emit('refresh')"
    />
  </div>
</template>

<script setup>
import { ref } from "vue";
import { useCommentsStore } from "../../stores/CommentStore";
import CommentForm from "./CommentForm.vue";

const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: Number, required: true },
});

const emit = defineEmits(["refresh"]);
const commentsStore = useCommentsStore();

const editing = ref(false);
const replying = ref(false);
const editContent = ref(props.comment.content);

const formatDate = (date) => new Date(date).toLocaleString();

const startEdit = () => { editing.value = true; editContent.value = props.comment.content; };
const cancelEdit = () => { editing.value = false; editContent.value = ""; };
const confirmEdit = async () => {
  await commentsStore.updateComment(props.comment.commentId, { content: editContent.value, postId: props.postId });
  editing.value = false;
  emit("refresh");
};

const toggleReply = () => { replying.value = !replying.value; };

const onReplySubmitted = () => {
  replying.value = false; // 작성 후 폼 닫기
  emit("refresh");
};

const removeComment = async () => {
  if (!confirm("댓글 삭제하시겠습니까?")) return;
  await commentsStore.deleteComment(props.comment.commentId, props.postId);
  emit("refresh");
};
</script>