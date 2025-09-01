<template>
    <div class="max-w-4xl mx-auto space-y-6">
        <!-- 페이지 헤더 -->
        <div class="flex items-center gap-4">
            <button 
                @click="$router.go(-1)" 
                class="btn btn-ghost btn-sm gap-2"
            >
                <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7"></path>
                </svg>
                뒤로가기
            </button>
            <h1 class="text-3xl font-bold text-base-content">새 게시글 작성</h1>
        </div>

        <!-- 게시글 작성 폼 -->
        <div class="bg-base-100 rounded-lg shadow-lg p-8">
            <form @submit.prevent="handleCreate" class="space-y-6">
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
                        @click="$router.go(-1)"
                        class="btn btn-ghost btn-lg"
                    >
                        취소
                    </button>
                    <button 
                        type="submit"
                        class="btn btn-primary btn-lg gap-2"
                        :disabled="!form.title.trim() || !form.content.trim()"
                    >
                        <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"></path>
                        </svg>
                        게시글 작성
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script setup>
import { reactive } from 'vue';
import { usePostStore } from '../../stores/PostStore';
import { useRouter } from 'vue-router';
import { useRequestHandler } from '../../composable/useRequestHandle';

const {handleRequest} = useRequestHandler();
const post = usePostStore();
const router = useRouter();
const form = reactive({
    title: "",
    content: "",
});

const handleCreate = async() => {
    await handleRequest(post.createPost, form, "게시글 작성 완료", "게시글 작성 실패", "/posts");
}
</script>

<style lang="scss" scoped></style>