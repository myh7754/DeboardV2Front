<template>
  <div>
    <CommentItem
      v-for="comment in comments"
      :key="comment.commentId"
      :comment="comment"
      :postId="postId"
      @refresh="reloadComments"
    />
  </div>
</template>

<script setup>
import CommentItem from "./CommentItem.vue";

const props = defineProps({
  comments: { type: Array, required: true },
  postId: { type: Number, required: true },
});

const emit = defineEmits(["refresh"]);
const reloadComments = () => emit("refresh");
</script>