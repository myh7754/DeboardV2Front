import { defineStore } from 'pinia'
import { ref } from 'vue'
import { fetchPostById, fetchPosts, createPostApi, updatePost, deletePostById, fetchPostsByLike } from '../api/posts'
import { likesStatus, toggleLikeApi } from '../api/likes'

export const usePostStore = defineStore('post', () => {
    const posts = ref([])
    const postDetail = ref(null);
    const page = ref(1);
    const totalPages = ref(1);
    const totalElements = ref(0); // 전체 게시글 개수
    const keyword = ref('');
    const searchType = ref('');

    const loadPosts = async (pageNumber = 1) => {
        try {
            const data = await fetchPosts(pageNumber - 1, 10, keyword.value, searchType.value);
            posts.value = data.content || [];
            
            // 응답 구조 확인: 백엔드가 래핑했을 수도 있고 직접 반환했을 수도 있음
            // 래핑된 경우: { content: [], page: { totalPages, totalElements, number, ... } }
            // 직접 반환: { content: [], totalPages, totalElements, number, ... }
            
            // 디버깅: 실제 응답 구조 확인 (개발 환경에서만)
            if (process.env.NODE_ENV === 'development') {
                console.log('게시글 응답 데이터 구조:', {
                    hasPage: !!data.page,
                    hasTotalPages: !!data.totalPages,
                    hasTotalElements: !!data.totalElements,
                    pageKeys: data.page ? Object.keys(data.page) : null,
                    dataKeys: Object.keys(data)
                });
            }
            
            if (data.page) {
                // 래핑된 경우
                totalPages.value = data.page.totalPages || 1;
                totalElements.value = data.page.totalElements || 0;
                page.value = (data.page.number || 0) + 1;
            } else {
                // 직접 반환된 경우
                totalPages.value = data.totalPages || 1;
                totalElements.value = data.totalElements || 0;
                page.value = (data.number || 0) + 1;
            }
        } catch (err) {
            console.error('게시글 로딩 에러:', err);
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
            // 1) 상세 데이터 불러오기 (기본값 보정)
            const detail = await fetchPostById(id);
            postDetail.value = { likeCount: 0, liked: false, ...detail };

            // 2) 상세 진입/새로고침 시에만 서버 좋아요 상태 동기화
            //    실패해도 화면 표시에는 문제 없으므로 조용히 무시
            likesStatus(id)
                .then((status) => {
                    if (!postDetail.value || postDetail.value.id !== id) return;
                    // 서버가 boolean(true/false)만 반환하는 경우에 맞춰 처리
                    if (typeof status === 'boolean') {
                        postDetail.value.liked = status;
                    } else if (status && typeof status.liked === 'boolean') {
                        // 혹시 객체로 { liked, likeCount }를 반환하는 백엔드라면 안전 처리
                        postDetail.value.liked = status.liked;
                        if (typeof status.likeCount === 'number') {
                            postDetail.value.likeCount = status.likeCount;
                        }
                    }
                })
                .catch(() => {});
        } catch (err) {
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

    const toggleLikes = async (postId) => {
        // 간단한 낙관적 업데이트: 한 번 계산 → 리스트/상세 동시에 반영
        const listIndex = posts.value.findIndex((p) => p.id === postId);
        const listItem = listIndex !== -1 ? posts.value[listIndex] : null;
        const isDetailTarget = postDetail.value?.id === postId;
        const currentLiked = (isDetailTarget ? !!postDetail.value.liked : !!listItem?.liked) || false;

        const nextLiked = !currentLiked;
        const delta = nextLiked ? 1 : -1;

        // 낙관적 적용
        if (listItem) {
            posts.value[listIndex] = {
                ...listItem,
                liked: nextLiked,
                likeCount: Math.max(0, (listItem.likeCount || 0) + delta),
            };
        }
        if (isDetailTarget) {
            postDetail.value = {
                ...postDetail.value,
                liked: nextLiked,
                likeCount: Math.max(0, (postDetail.value.likeCount || 0) + delta),
            };
        }

        // 서버 요청 (실패 시 롤백)
        try {
            await toggleLikeApi(postId);
        } catch (err) {
            if (listItem) {
                const after = posts.value[listIndex];
                posts.value[listIndex] = {
                    ...after,
                    liked: currentLiked,
                    likeCount: Math.max(0, (after.likeCount || 0) - delta),
                };
            }
            if (isDetailTarget) {
                const after = postDetail.value;
                postDetail.value = {
                    ...after,
                    liked: currentLiked,
                    likeCount: Math.max(0, (after.likeCount || 0) - delta),
                };
            }
            throw err;
        }
    }

    const likesStatusByPost = async(postId) => {
        try {
            // 필요 시 외부에서 강제 동기화할 때 사용
            const status = await likesStatus(postId);
            const listIndex = posts.value.findIndex((p) => p.id === postId);
            if (listIndex !== -1) {
                posts.value[listIndex] = {
                    ...posts.value[listIndex],
                    liked: !!status?.liked,
                    likeCount: typeof status?.likeCount === 'number' ? status.likeCount : (posts.value[listIndex].likeCount || 0)
                };
            }
            if (postDetail.value?.id === postId) {
                postDetail.value = {
                    ...postDetail.value,
                    liked: !!status?.liked,
                    likeCount: typeof status?.likeCount === 'number' ? status.likeCount : (postDetail.value.likeCount || 0)
                };
            }
        } catch (err) {
            throw err;
        }
    }

    const loadLikedPosts = async (pageNumber = 1, keyword ='', searchType = '') => {
        try {
            const data = await fetchPostsByLike(pageNumber - 1, 10, keyword, searchType);
            // response shape: { content: [...], page: { number, totalPages, totalElements, size } }
            posts.value = data.content || [];
            // use nested page object
            const pageInfo = data.page || {};
            totalPages.value = pageInfo.totalPages ?? 1;
            totalElements.value = pageInfo.totalElements ?? 0;
            page.value = (pageInfo.number ?? 0) + 1;
                
        } catch (err) {
            console.error('좋아요한 게시글 로딩 에러:', err);
            throw err;
        }
    };




    return {
        posts,
        postDetail,
        // isLoading,
        // error,
        totalPages,
        totalElements, // 전체 게시글 개수 추가
        page,
        keyword,
        searchType,
        loadPosts,
        loadPostById,
        createPost,
        updatePostById,
        deletePost,
        searchPosts,
        toggleLikes,
        likesStatusByPost,
        loadLikedPosts
    };
})