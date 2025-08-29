<template>
  <div class="comments-section">
    <!-- 댓글 입력 -->
    <CommentForm :postId="postId" @saved="refreshComments" />

    <!-- 댓글 리스트 -->
    <div class="comments-list">
      <div v-for="comment in comments" :key="comment.commentsId" class="comment-item">
        <div>
          <b>{{ comment.author }}</b> : {{ comment.content }}
        </div>
        <div class="comment-actions">
          <button @click="toggleReply(comment.commentsId)">답글</button>
          <button @click="removeComment(comment.commentsId)">삭제</button>
        </div>

        <!-- 대댓글 리스트 -->
        <div v-if="showReplies[comment.commentsId]" class="replies">
          <div v-for="reply in replies[comment.commentsId]" :key="reply.commentsId" class="reply-item">
            <b>{{ reply.author }}</b> : {{ reply.content }}
            <div class="reply-actions">
              <button @click="editReply(reply)">수정</button>
              <button @click="removeReply(reply.commentsId, comment.commentsId)">삭제</button>
            </div>
          </div>

          <button
            v-if="replyPage[comment.commentsId] < replyTotalPages[comment.commentsId]"
            @click="loadMoreReplies(comment.commentsId)"
          >
            더보기
          </button>

          <CommentForm
            :postId="postId"
            :parentId="comment.commentsId"
            @saved="refreshReplies(comment.commentsId)"
          />
        </div>
      </div>
    </div>

    <!-- 부모 댓글 페이지네이션 -->
    <Pagination :page="page" :total="totalPages" @changePage="changePage" />
  </div>
</template>

<script setup>
import { ref, reactive, onMounted } from "vue";
import { useCommentsStore } from "../../stores/CommentStore";
import CommentForm from "../../components/comments/CommentForm.vue";
import Pagination from "../../components/common/Pagination.vue";

const props = defineProps({ postId: { type: Number, required: true } });
const commentsStore = useCommentsStore();

// 부모 댓글 상태
const comments = ref([]);
const page = ref(1);
const totalPages = ref(1);

// 대댓글 상태
const replies = reactive({});
const showReplies = reactive({});
const replyPage = reactive({});
const replyTotalPages = reactive({});

// 부모 댓글 로딩
const loadComments = async (newPage = 1) => {
  const res = await commentsStore.loadComments(props.postId, newPage);
  comments.value = res.content;
  page.value = res.page.number + 1;
  totalPages.value = res.page.totalPages;
};

// 부모 댓글 페이지 변경
const changePage = async (newPage) => {
  await loadComments(newPage);
};

// 댓글 저장 후 리로드
const refreshComments = async () => {
  await loadComments(1);
};

// 댓글 삭제
const removeComment = async (commentsId) => {
  await commentsStore.deleteComment(commentsId, props.postId);
  await loadComments(page.value);
};

// 대댓글 토글
const toggleReply = async (parentId) => {
  showReplies[parentId] = !showReplies[parentId];
  if (showReplies[parentId] && !replies[parentId]) {
    await loadReplies(parentId, 1);
  }
};

// 대댓글 로딩
const loadReplies = async (parentId, pageNum = 1) => {
  const res = await commentsStore.loadReplies(parentId, pageNum);
  if (!replies[parentId]) replies[parentId] = [];
  if (pageNum === 1) replies[parentId] = res.content;
  else replies[parentId] = replies[parentId].concat(res.content);
  replyPage[parentId] = res.page.number + 1;
  replyTotalPages[parentId] = res.page.totalPages;
};

// 더보기 클릭
const loadMoreReplies = async (parentId) => {
  await loadReplies(parentId, replyPage[parentId] + 1);
};

// 대댓글 삭제
const removeReply = async (commentsId, parentId) => {
  await commentsStore.deleteComment(commentsId, props.postId);
  await loadReplies(parentId, 1);
};

// 대댓글 수정
const editReply = async (reply) => {
  const newContent = prompt("댓글을 수정하세요", reply.content);
  if (newContent && newContent.trim() !== "") {
    await commentsStore.updateComment(reply.commentsId, { content: newContent });
    await loadReplies(reply.parentId, 1);
  }
};

// 대댓글 저장 후 리로드
const refreshReplies = async (parentId) => {
  await loadReplies(parentId, 1);
};

onMounted(async () => {
  await loadComments(1);
});
</script>

<style scoped lang="scss">
.comments-section { padding: 1rem; }
.comment-item { margin-bottom: 1rem; border-bottom: 1px solid #ccc; padding-bottom: 0.5rem; }
.replies { margin-left: 1.5rem; margin-top: 0.5rem; }
.reply-item { margin-bottom: 0.5rem; }
.comment-actions button, .reply-actions button { margin-right: 0.5rem; }
</style>