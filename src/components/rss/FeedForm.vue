<template>
    <div class="bg-base-100 rounded-lg shadow-lg p-6">
        <h2 class="text-2xl font-bold text-base-content mb-6 flex items-center gap-2">
            <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z"></path>
            </svg>
            새 RSS 피드 등록
        </h2>
        
        <form @submit.prevent="handleSubmit" class="space-y-4">
            <!-- 피드 이름 입력 -->
            <div class="form-control">
                <label for="feedName" class="label">
                    <span class="label-text font-semibold">피드 이름</span>
                    <span class="label-text-alt text-base-content/60">블로그 이름 또는 별칭</span>
                </label>
                <input 
                    id="feedName" 
                    v-model="form.name" 
                    type="text" 
                    required
                    placeholder="예: 내 기술 블로그"
                    class="input input-bordered w-full focus:input-primary" 
                />
            </div>

            <!-- RSS URL 입력 -->
            <div class="form-control">
                <label for="feedUrl" class="label">
                    <span class="label-text font-semibold">RSS URL</span>
                    <span class="label-text-alt text-base-content/60">RSS 피드 주소를 입력하세요</span>
                </label>
                <input 
                    id="feedUrl" 
                    v-model="form.url" 
                    type="url" 
                    required
                    placeholder="https://velog.io/@username/posts"
                    class="input input-bordered w-full focus:input-primary font-mono text-sm" 
                />
                <label class="label">
                    <span class="label-text-alt text-base-content/50">
                        예시: https://velog.io/@username/posts, https://username.tistory.com
                    </span>
                </label>
            </div>

            <!-- 에러 메시지 -->
            <div v-if="error" class="alert alert-error">
                <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                </svg>
                <span>{{ error }}</span>
            </div>

            <!-- 제출 버튼 -->
            <div class="flex justify-end gap-2 pt-4">
                <button 
                    type="button" 
                    @click="handleReset"
                    class="btn btn-ghost"
                    :disabled="loading"
                >
                    초기화
                </button>
                <button 
                    type="submit"
                    class="btn btn-primary gap-2"
                    :disabled="loading || !form.name.trim() || !form.url.trim()"
                >
                    <span v-if="loading" class="loading loading-spinner loading-sm"></span>
                    <svg v-else class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 4v16m8-8H4"></path>
                    </svg>
                    등록하기
                </button>
            </div>
        </form>
    </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import { useRssStore } from '../../stores/RssStore';

const emit = defineEmits(['success']);

const rssStore = useRssStore();
const loading = ref(false);
const error = ref(null);

const form = reactive({
    name: '',
    url: ''
});

const handleSubmit = async () => {
    loading.value = true;
    error.value = null;
    
    try {
        await rssStore.addUserFeed(form.name.trim(), form.url.trim());
        // 성공 시 폼 초기화 및 이벤트 발생
        handleReset();
        emit('success');
    } catch (err) {
        error.value = err.response?.data?.message || '피드 등록에 실패했습니다.';
    } finally {
        loading.value = false;
    }
};

const handleReset = () => {
    form.name = '';
    form.url = '';
    error.value = null;
};
</script>

<style lang="scss" scoped></style>

