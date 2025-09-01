import { defineStore } from "pinia";
import { ref } from "vue";
import { loadCommentsApi, saveCommentApi, deleteCommentApi, updateCommentApi, loadRepliesApi } from "../api/commentApi";

export const useCommentsStore = defineStore("comments", () => {
  const comments = ref([]);
  const page = ref(1);
  const totalPages = ref(1);

  const loadComments = async (postId, newPage = 1) => {
    const res = await loadCommentsApi(postId, newPage - 1);
    comments.value = res.content;
    page.value = res.page.number + 1;
    totalPages.value = res.page.totalPages;
    return res;
  };

  const saveComment = async (form) => {
    await saveCommentApi(form);
  };

  const deleteComment = async (id, postId) => {
    await deleteCommentApi(id);
    await loadComments(postId, 1);
  };

  const updateComment = async (id, form) => {
    await updateCommentApi(id, form);
  };

  const loadReplies = async (commentsId, pageNum = 1) => {
    const res = await loadRepliesApi(commentsId, pageNum);
    return res;
  };

  return { comments, page, totalPages, loadComments, loadReplies, saveComment, deleteComment, updateComment };
});