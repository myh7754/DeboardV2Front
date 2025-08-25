import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPostById, fetchPosts, createPostApi, updatePost, deletePostById } from '../api/posts'

export const usePostStore = defineStore('post', () => {
    const posts = ref([])
    const postDetail = ref(null);
    const page = ref(1);
    const totalPages = ref(1);

    const loadPosts = async (pageNumber = 0) => {
        try {
            const data = await fetchPosts(pageNumber,10);
            posts.value = data.content;
            totalPages.value = data.totalPages;
            page.value = data.number;
        } catch (err) {
            throw err;
        } 
    };

    const loadPostById = async (id) => {
        try {
            selectedPost.value = await fetchPostById(id);
        } catch (err) {
            // error.value = err.response?.data?.message || "게시글을 불러오지 못했습니다.";
            throw err;
        }
    }

    const createPost = async (postData) => {
        try {
            const newPost = await createPostApi(postData);
            posts.value.push(newPost); // 즉시 반영
        } catch (err) {
            // error.value = err.response?.data?.message || "게시글 작성 실패";
            throw err; // UI에서 추가 처리 가능
        }
    };

    const updatePostById = async (id, postData) => {
        try {
            await updatePost(id, postData);
            // posts 배열에서 해당 게시글 찾아 업데이트
            const idx = posts.value.findIndex((p) => p.id === id);
            if (idx !== -1) {
                posts.value[idx] = { ...posts.value[idx], ...postData };
            }
        } catch (err) {
            // error.value = err.response?.data?.message || "게시글 수정 실패";
            throw err;
        }
    };

    const deletePost = async (id) => {
        try {
            await deletePostById(id);
            posts.value = posts.value.filter((p) => p.id !== id);
        } catch (err) {
            // error.value = err.response?.data?.message || "게시글 삭제 실패";
            throw err;
        }

    }

    return {
        posts,
        postDetail,
        // isLoading,
        // error,
        totalPages,
        page,
        loadPosts,
        loadPostById,
        createPost,
        updatePostById,
        deletePost,
    };
})