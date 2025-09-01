<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <!-- 페이지 헤더 -->
        <div class="flex items-center gap-4">
            <button 
                @click="goBack" 
                class="btn btn-ghost btn-sm gap-2"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                뒤로가기
            </button>
            <h1 class="text-3xl font-bold text-base-content">게시글 수정</h1>
        </div>

        <!-- 게시글 수정 폼 -->
        <div class="bg-base-100 rounded-lg shadow-lg p-8">
            <form @submit.prevent="onSubmit" class="space-y-6">
                <!-- 제목 입력 -->
                <div class="form-control">
                    <label for="title" class="label">
                        <span class="label-text text-lg font-semibold">제목</span>
                    </label>
                    <input 
                        id="title" 
                        v-model="form.title" 
                        type="text" 
                        required
                        placeholder="게시글 제목을 입력하세요"
                        class="input input-bordered input-lg w-full focus:input-primary" 
                    />
                </div>

                <!-- 내용 입력 -->
                <div class="form-control">
                    <label for="content" class="label">
                        <span class="label-text text-lg font-semibold">내용</span>
                    </label>
                    <textarea 
                        id="content" 
                        v-model="form.content" 
                        rows="12" 
                        required
                        placeholder="게시글 내용을 입력하세요"
                        class="textarea textarea-bordered textarea-lg w-full focus:textarea-primary resize-none"
                    ></textarea>
                </div>

                <!-- 버튼 그룹 -->
                <div class="flex justify-end gap-4 pt-6 border-t border-base-300">
                    <button 
                        type="button" 
                        @click="goBack"
                        class="btn btn-ghost btn-lg"
                    >
                        취소
                    </button>
                    <button 
                        type="submit"
                        class="btn btn-warning btn-lg gap-2"
                        :disabled="!form.title.trim() || !form.content.trim()"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        수정 완료
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive, onMounted } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import { useRouter } from 'vue-router';
import { useRequestHandler } from '../../composable/useRequestHandle';

const postStore = usePostStore();
const { handleRequest } = useRequestHandler();
const router = useRouter();
const props = defineProps({
    postId: { type: Number, required: true }
});

const postId = Number(props.postId);
const form = reactive({
    title: '',
    content: ''
});

onMounted(async () => {
    let post = postStore.posts.find(p => p.id === postId);
    if (post) {
        form.title = post.title;
        form.content = post.content;
    } else {
        try {
            await postStore.loadPostById(postId);
            form.title = postStore.postDetail.title;
            form.content = postStore.postDetail.content;
        } catch (err) {
            alert(err.response?.data?.message || '게시글을 불러오지 못했습니다.');
            router.back();
        }
    }
})

// 제출 핸들러
const onSubmit = async () => {
  await handleRequest(
    // method
    (data) => postStore.updatePostById(postId, data),
    // form
    { ...form },
    '게시글 수정 완료',
    '수정 권한이 없습니다.',
    `/posts/${postId}` // 완료 후 상세페이지로 이동
  );
};

// 취소 버튼
const goBack = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>