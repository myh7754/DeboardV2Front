<template>
  <div class="comment-item mb-4">
    <!-- 댓글 카드 -->
    <div class="bg-base-100 rounded-lg p-4 border border-base-300 shadow-sm">
      <!-- 댓글 헤더 -->
      <div class="flex justify-between items-start mb-3">
        <div class="flex items-center gap-3">
          <div class="avatar placeholder">
            <div class="bg-primary text-primary-content rounded-full w-8">
              <span class="text-xs">{{ comment.author?.charAt(0) || '?' }}</span>
            </div>
          </div>
          <div>
            <div class="font-semibold text-sm">{{ comment.author }}</div>
            <div class="text-xs text-base-content/60">{{ formatDate(comment.createdAt) }}</div>
          </div>
        </div>
        
        <!-- 댓글 액션 버튼들 -->
        <div class="flex gap-1">
          <button 
            v-if="!editing" 
            @click="startEdit"
            class="btn btn-ghost btn-xs"
            title="수정"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
            </svg>
          </button>
          <button 
            @click="toggleReply"
            class="btn btn-ghost btn-xs"
            title="답글"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 10h10a8 8 0 018 8v2M3 10l6 6m-6-6l6-6"></path>
            </svg>
          </button>
          <button 
            @click="removeComment"
            class="btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content"
            title="삭제"
          >
            <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
            </svg>
          </button>
        </div>
      </div>

      <!-- 댓글 내용 -->
      <div class="mb-3">
        <div v-if="!editing" class="text-base-content whitespace-pre-wrap">
          {{ comment.content }}
        </div>
        <div v-else class="space-y-3">
          <textarea 
            v-model="editContent" 
            class="textarea textarea-bordered w-full focus:textarea-primary resize-none"
            rows="3"
          ></textarea>
          <div class="flex justify-end gap-2">
            <button @click="cancelEdit" class="btn btn-ghost btn-sm">취소</button>
            <button @click="confirmEdit" class="btn btn-primary btn-sm">저장</button>
          </div>
        </div>
      </div>
    </div>

    <!-- 답글 작성 폼 -->
    <div v-if="replying" class="ml-8 mt-3">
      <CommentForm
        :postId="postId"
        :parentId="comment.commentsId || comment.commentId"
        @saved="onReplySubmitted"
      />
    </div>

    <!-- 대댓글 토글 버튼 (대댓글이 있을 때만 표시) -->
    <div v-if="!replying && hasReplies" class="ml-8 mt-2">
      <button 
        @click="toggleReplies"
        class="btn btn-ghost btn-xs text-primary"
      >
        <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7"></path>
        </svg>
        <span v-if="!showReplies">더보기 ({{ replies.length }}개)</span>
        <span v-else>답글 숨기기 </span>
      </button>
    </div>

    <!-- 대댓글 리스트 (2단계 계층 구조) -->
    <div v-if="showReplies && replies.length > 0" class="ml-8 mt-3 space-y-3">
      <!-- 대댓글들은 평면적으로 표시 (재귀 없음) -->
      <div 
        v-for="reply in replies" 
        :key="reply.commentsId || reply.commentId"
        class="bg-base-100 rounded-lg p-4 border border-base-300 shadow-sm"
      >
        <!-- 대댓글 헤더 -->
        <div class="flex justify-between items-start mb-3">
          <div class="flex items-center gap-3">
            <div class="avatar placeholder">
              <div class="bg-secondary text-secondary-content rounded-full w-6">
                <span class="text-xs">{{ reply.author?.charAt(0) || '?' }}</span>
              </div>
            </div>
            <div>
              <div class="font-semibold text-sm">{{ reply.author }}</div>
              <div class="text-xs text-base-content/60">{{ formatDate(reply.createdAt) }}</div>
            </div>
          </div>
          
          <!-- 대댓글 액션 버튼들 -->
          <div class="flex gap-1">
            <button 
              @click="editReply(reply)"
              class="btn btn-ghost btn-xs"
              title="수정"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
              </svg>
            </button>
            <button 
              @click="removeReply(reply)"
              class="btn btn-ghost btn-xs text-error hover:bg-error hover:text-error-content"
              title="삭제"
            >
              <svg class="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
              </svg>
            </button>
          </div>
        </div>

        <!-- 대댓글 내용 -->
        <div class="text-base-content whitespace-pre-wrap">
          {{ reply.content }}
        </div>
      </div>
      
      <!-- 더보기 버튼 -->
      <button 
        v-if="replyPage < replyTotalPages"
        @click="loadMoreReplies"
        class="btn btn-ghost btn-xs text-primary ml-8"
      >
        더보기
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from "vue";
import { useCommentsStore } from "../../stores/CommentStore";
import CommentForm from "./CommentForm.vue";
import { useDateFormat } from "../../composable/useDateFormat";

const props = defineProps({
  comment: { type: Object, required: true },
  postId: { type: Number, required: true },
});

const emit = defineEmits(["refresh"]);
const commentsStore = useCommentsStore();
const { formatDate } = useDateFormat();

const editing = ref(false);
const replying = ref(false);
const editContent = ref(props.comment.content);

// 대댓글 관련 상태
const replies = ref([]);
const showReplies = ref(false);
const replyPage = ref(1);
const replyTotalPages = ref(1);
const hasReplies = ref(false);

// 컴포넌트 마운트 시 대댓글 개수 확인
const checkRepliesCount = async () => {
  try {
    // const commentId = props.comment.commentsId || props.comment.commentId;
    // const res = await commentsStore.loadReplies(commentId, 1);
    hasReplies.value = props.comment.repliesCount > 0;
  } catch (err) {
    console.error("대댓글 개수 확인 에러:", err);
  }
};

const startEdit = () => { 
  editing.value = true; 
  editContent.value = props.comment.content; 
};

const cancelEdit = () => { 
  editing.value = false; 
  editContent.value = ""; 
};

const confirmEdit = async () => {
  try {
    console.log("댓글 데이터:", props.comment);
    console.log("댓글 ID:", props.comment.commentsId || props.comment.commentId);
    
    const commentId = props.comment.commentsId || props.comment.commentId;
    await commentsStore.updateComment(
      commentId, 
      { content: editContent.value }
    );
    editing.value = false;
    emit("refresh");
  } catch (err) {
    alert(err.response?.data?.message || "댓글 수정 중 오류가 발생했습니다.");
  }
};

const toggleReply = () => { 
  replying.value = !replying.value; 
};

const onReplySubmitted = () => {
  replying.value = false; 
  hasReplies.value = true; // 대댓글이 추가되면 hasReplies를 true로 설정
  emit("refresh");
};

// 대댓글 토글
const toggleReplies = async () => {
  if (!showReplies.value) {
    await loadReplies();
  }
  showReplies.value = !showReplies.value;
};

// 대댓글 로딩
const loadReplies = async (pageNum = 1) => {
  try {
    const commentId = props.comment.commentsId || props.comment.commentId;
    const res = await commentsStore.loadReplies(commentId, pageNum);
    
    // 백엔드에서 이미 특정 댓글의 대댓글만 반환하므로 필터링 불필요
    if (pageNum === 1) {
      replies.value = res.content;
    } else {
      replies.value = [...replies.value, ...res.content];
    }
    
    replyPage.value = res.page.number + 1;
    replyTotalPages.value = res.page.totalPages;
    hasReplies.value = res.content.length > 0;
  } catch (err) {
    console.error("대댓글 로딩 에러:", err);
  }
};

// 더보기 클릭
const loadMoreReplies = async () => {
  await loadReplies(replyPage.value + 1);
};

// 대댓글 수정
const editReply = async (reply) => {
  const newContent = prompt("댓글을 수정하세요", reply.content);
  if (newContent && newContent.trim() !== "") {
    try {
      await commentsStore.updateComment(reply.commentsId || reply.commentId, { content: newContent });
      await loadReplies(1); // 대댓글 목록 새로고침
    } catch (err) {
      alert(err.response?.data?.message || "대댓글 수정 중 오류가 발생했습니다.");
    }
  }
};

// 대댓글 삭제
const removeReply = async (reply) => {
  if (!confirm("대댓글을 삭제하시겠습니까?")) return;
  try {
    await commentsStore.deleteComment(reply.commentsId || reply.commentId, props.postId);
    await loadReplies(1); // 대댓글 목록 새로고침
    
    // 대댓글이 모두 삭제되면 hasReplies를 false로 설정
    if (replies.value.length === 0) {
      hasReplies.value = false;
    }
  } catch (err) {
    alert(err.response?.data?.message || "대댓글 삭제 중 오류가 발생했습니다.");
  }
};

const removeComment = async () => {
  if (!confirm("댓글 삭제하시겠습니까?")) return;
  try {
    const commentId = props.comment.commentsId || props.comment.commentId;
    await commentsStore.deleteComment(commentId, props.postId);
    emit("refresh");
  } catch (err) {
    alert(err.response?.data?.message || "댓글 삭제 중 오류가 발생했습니다.");
  }
};

// 컴포넌트 마운트 시 대댓글 개수 확인
onMounted(() => {
  checkRepliesCount();
});
</script>