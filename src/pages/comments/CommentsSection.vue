<template>
  <div class="space-y-6">
    <!-- 댓글 입력 폼 -->
    <div>
      <h3 class="text-lg font-semibold text-base-content mb-3">댓글 작성</h3>
      <CommentForm :postId="postId" @saved="refreshComments" />
    </div>

    <!-- 댓글 목록 -->
    <div v-if="comments.length > 0" class="space-y-4">
      <h3 class="text-lg font-semibold text-base-content">댓글 ({{ comments.length }}개)</h3>
      
      <!-- 댓글 아이템들 -->
      <div v-for="comment in comments" :key="comment.commentsId || comment.commentId" class="space-y-3">
        <CommentItem
          :comment="comment"
          :postId="postId"
          @refresh="refreshComments"
        />
      </div>
    </div>

    <!-- 댓글이 없을 때 -->
    <div v-else class="text-center py-8">
      <div class="text-base-content/50">
        <svg class="w-12 h-12 mx-auto mb-3" fill="currentColor" viewBox="0 0 20 20">
          <path fill-rule="evenodd" d="M18 10c0 3.866-3.582 7-8 7a8.841 8.841 0 01-4.083-.98L2 17l1.338-3.123C2.493 12.767 2 11.434 2 10c0-3.866 3.582-7 8-7s8 3.134 8 7zM7 9H5v2h2V9zm8 0h-2v2h2V9zM9 9h2v2H9V9z" clip-rule="evenodd"></path>
        </svg>
        <p class="text-base-content/70">아직 댓글이 없습니다.</p>
        <p class="text-sm text-base-content/50">첫 번째 댓글을 작성해보세요!</p>
      </div>
    </div>

    <!-- 페이지네이션 -->
    <div v-if="totalPages > 1">
      <Pagination :page="page" :total="totalPages" @changePage="changePage" />
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCommentsStore } from "../../stores/CommentStore";
import CommentForm from "../../components/comments/CommentForm.vue";
import CommentItem from "../../components/comments/CommentItem.vue";
import Pagination from "../../components/common/Pagination.vue";

const props = defineProps({ postId: { type: Number, required: true } });
const commentsStore = useCommentsStore();

// 댓글 상태
const comments = ref([]);
const page = ref(1);
const totalPages = ref(1);

// 댓글 로딩
const loadComments = async (newPage = 1) => {
  try {
    const res = await commentsStore.loadComments(props.postId, newPage);
    comments.value = res.content;
    page.value = res.page.number + 1;
    totalPages.value = res.page.totalPages;
  } catch (err) {
    alert(err.response?.data?.message || "댓글 불러오는 중 오류가 발생했습니다.");
  }
};

// 페이지 변경
const changePage = async (newPage) => {
  try {
    await loadComments(newPage);
  } catch (err) {
    alert("페이지 이동 중 오류가 발생했습니다.");
  }
};

// 댓글 저장 후 리로드
const refreshComments = async () => {
  try {
    await loadComments(1);
  } catch (err) {
    alert("댓글 새로고침 중 오류가 발생했습니다.");
  }
};

onMounted(async () => {
  await loadComments(1);
});
</script>

