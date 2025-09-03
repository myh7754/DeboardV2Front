import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPostById, fetchPosts, createPostApi, updatePost, deletePostById } from '../api/posts'

export const usePostStore = defineStore('post', () => {
    const posts = ref([])
    const postDetail = ref(null);
    const page = ref(1);
    const totalPages = ref(1);
    const keyword = ref('');
    const searchType = ref('');

    const loadPosts = async (pageNumber = 1) => {
        try {
            const data = await fetchPosts(pageNumber - 1, 10, keyword.value, searchType.value);
            posts.value = data.content;
            totalPages.value = data.page.totalPages;
            page.value = data.page.number + 1;
        } catch (err) {
            throw err;
        }
    };
    const searchPosts = async (type, word, pageNumber = 1) => {
        keyword.value = word;
        searchType.value = type;
        await loadPosts(pageNumber);
    }
    const loadPostById = async (id) => {
        try {
            postDetail.value = await fetchPostById(id);
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
            // postDetail도 업데이트
            if (postDetail.value?.id === id) {
                postDetail.value = { ...postDetail.value, ...postData };
            }
        } catch (err) {
            // error.value = err.response?.data?.message || "게시글 수정 실패";
            throw err;
        }
    };

    const deletePost = async (id) => {
        try {
            await deletePostById(id);

            // 삭제 후 현재 페이지의 게시물 수 확인
            if (posts.value.length === 1) {
                // 현재 페이지가 마지막 페이지이고 유일한 항목을 삭제한 경우
                if (page.value === totalPages.value) {
                    // 이전 페이지가 있는 경우 이전 페이지로 이동
                    if (page.value > 1) {
                        await loadPosts(page.value - 1);
                    } else {
                        // 첫 페이지인 경우 빈 배열로 설정
                        posts.value = [];
                    }
                } else {
                    // 마지막 페이지가 아닌 경우 현재 페이지 유지 (다음 페이지 항목이 올라옴)
                    await loadPosts(page.value);
                }
            } else {
                // 여러 항목이 있는 경우 현재 페이지 다시 로드
                await loadPosts(page.value);
            }
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
        keyword,
        searchType,
        loadPosts,
        loadPostById,
        createPost,
        updatePostById,
        deletePost,
        searchPosts,
    };
})