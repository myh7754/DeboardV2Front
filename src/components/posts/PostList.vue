<template>
    <div class="space-y-4">
        <div 
            v-for="post in posts" 
            :key="post.id"
            class="card bg-base-100 shadow-md hover:shadow-lg transition-all duration-200 cursor-pointer border border-base-300"
            @click="$emit('selectPost', post.id)"
        >
            <div class="card-body p-6">
                <div class="flex justify-between items-start">
                    <div class="flex-1">
                        <h2 class="card-title text-lg font-semibold text-base-content hover:text-primary transition-colors">
                            {{ post.title }}
                        </h2>
                        <div class="flex items-center gap-4 mt-2 text-sm text-base-content/70">
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                                </svg>
                                {{ post.nickname }}
                            </div>
                            <div class="flex items-center gap-1">
                                <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                                    <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                                </svg>
                                {{ formatDate(post.createdAt) }}
                            </div>
                        </div>
                    </div>
                    <div class="ml-4" @click.stop>
                        <PostOptionMenu :postId="post.id"/>
                    </div>
                </div>
            </div>
        </div>
        
        <!-- 게시글이 없을 때 -->
        <div v-if="posts.length === 0" class="text-center py-12">
            <div class="text-base-content/50">
                <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-lg">아직 게시글이 없습니다.</p>
                <p class="text-sm">첫 번째 게시글을 작성해보세요!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
import PostOptionMenu from './PostOptionMenu.vue';
import { useDateFormat } from '../../composable/useDateFormat';

defineProps({
    posts: {
        type: Array,
        required: true
    }
})
defineEmits(['selectPost']);

const { formatDate } = useDateFormat();
</script>

<style lang="scss" scoped>

</style>