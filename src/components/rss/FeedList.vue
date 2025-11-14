<template>
    <div class="bg-base-100 rounded-lg shadow-lg p-6">
        <div class="flex justify-between items-center mb-6">
            <h2 class="text-2xl font-bold text-base-content flex items-center gap-2">
                <svg class="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z"></path>
                    <path fill-rule="evenodd" d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z" clip-rule="evenodd"></path>
                </svg>
                등록된 피드 목록
            </h2>
            <div class="badge badge-primary badge-lg">
                총 {{ feeds.length }}개
            </div>
        </div>

        <!-- 로딩 상태 -->
        <div v-if="loading" class="flex justify-center items-center py-12">
            <span class="loading loading-spinner loading-lg text-primary"></span>
        </div>

        <!-- 피드 목록 -->
        <div v-else-if="feeds.length > 0" class="space-y-3">
            <div 
                v-for="feed in feeds" 
                :key="feed.id"
                class="card bg-base-200 border border-base-300 hover:border-primary transition-colors"
            >
                <div class="card-body p-4">
                    <div class="flex items-start justify-between gap-4">
                        <div class="flex-1 min-w-0">
                            <h3 class="card-title text-lg font-semibold text-base-content mb-2">
                                {{ feed.siteName }}
                            </h3>
                            <div class="flex items-center gap-2 text-sm text-base-content/70">
                                <svg class="w-4 h-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                                    <path d="M11 3a1 1 0 100 2h2.586l-6.293 6.293a1 1 0 101.414 1.414L15 6.414V9a1 1 0 102 0V4a1 1 0 00-1-1h-5z"></path>
                                    <path d="M5 5a2 2 0 00-2 2v8a2 2 0 002 2h8a2 2 0 002-2v-3a1 1 0 10-2 0v3H5V7h3a1 1 0 000-2H5z"></path>
                                </svg>
                                <a 
                                    :href="feed.feedUrl" 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    class="link link-primary truncate"
                                    :title="feed.feedUrl"
                                >
                                    {{ feed.feedUrl }}
                                </a>
                            </div>
                        </div>
                        <div class="flex items-center gap-2">
                            <div class="badge badge-outline">
                                ID: {{ feed.id }}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- 피드가 없을 때 -->
        <div v-else class="text-center py-12">
            <div class="text-base-content/50">
                <svg class="w-16 h-16 mx-auto mb-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M4 4a2 2 0 00-2 2v4a2 2 0 002 2V6h10a2 2 0 00-2-2H4zm2 6a2 2 0 012-2h8a2 2 0 012 2v4a2 2 0 01-2 2H8a2 2 0 01-2-2v-4zm6 4a2 2 0 100-4 2 2 0 000 4z" clip-rule="evenodd"></path>
                </svg>
                <p class="text-lg font-semibold mb-2">등록된 피드가 없습니다</p>
                <p class="text-sm">위의 폼을 사용하여 RSS 피드를 등록해보세요!</p>
            </div>
        </div>
    </div>
</template>

<script setup>
defineProps({
    feeds: {
        type: Array,
        required: true,
        default: () => []
    },
    loading: {
        type: Boolean,
        default: false
    }
});
</script>

<style lang="scss" scoped></style>

