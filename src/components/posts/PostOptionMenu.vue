<template>
    <div class="relative">
        <!-- 더보기 버튼 -->
        <button 
            @click="toggleMenu" 
            class="btn btn-ghost btn-sm btn-circle"
            title="옵션"
        >
            <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z"></path>
            </svg>
        </button>

        <!-- 드롭다운 메뉴 -->
        <div 
            v-if="isOpen" 
            class="absolute right-0 top-10 z-10 bg-base-100 rounded-lg shadow-lg border border-base-300 min-w-[120px]"
        >
            <ul class="menu menu-sm p-2">
                <li>
                    <button 
                        @click="getEdit" 
                        class="flex items-center gap-2 text-sm hover:bg-base-200"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
                        </svg>
                        수정
                    </button>
                </li>
                <li>
                    <button 
                        @click="handleDelete" 
                        class="flex items-center gap-2 text-sm text-error hover:bg-error hover:text-error-content"
                    >
                        <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path>
                        </svg>
                        삭제
                    </button>
                </li>
            </ul>
        </div>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRequestHandler } from '../../composable/useRequestHandle';
import { usePostStore } from '../../stores/PostStore';
import { ref, onMounted, onUnmounted } from 'vue';

const {handleRequest} = useRequestHandler();
const post = usePostStore();
const isOpen = ref(false);
const router = useRouter();

const props = defineProps({
    postId: { type: Number, required: true }
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const closeMenu = () => {
  isOpen.value = false;
};

const handleDelete = async () => {
    await handleRequest(post.deletePost, props.postId , null, "삭제 권한이 없습니다.", "/posts");
    closeMenu();
}

const getEdit = () => {
  router.push(`/posts/${props.postId}/edit`);
  closeMenu();
};

// 외부 클릭 시 메뉴 닫기
const handleClickOutside = (event) => {
  if (isOpen.value && !event.target.closest('.relative')) {
    closeMenu();
  }
};

onMounted(() => {
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style lang="scss" scoped></style>