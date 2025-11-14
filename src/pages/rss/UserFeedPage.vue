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
            <h1 class="text-3xl font-bold text-base-content">내 피드 관리</h1>
        </div>

        <!-- 피드 등록 폼 -->
        <FeedForm @success="handleFeedAdded" />

        <!-- 피드 목록 -->
        <FeedList :feeds="rssStore.userFeeds" :loading="rssStore.loading" />
    </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useRssStore } from '../../stores/RssStore';
import FeedForm from '../../components/rss/FeedForm.vue';
import FeedList from '../../components/rss/FeedList.vue';

const rssStore = useRssStore();

// 컴포넌트 마운트 시 피드 목록 로드
onMounted(async () => {
    try {
        await rssStore.loadUserFeeds();
    } catch (err) {
        alert(err.response?.data?.message || '피드 목록을 불러오는데 실패했습니다.');
    }
});

// 피드 추가 성공 시 목록 새로고침
const handleFeedAdded = async () => {
    try {
        await rssStore.loadUserFeeds();
    } catch (err) {
        console.error('피드 목록 새로고침 실패:', err);
    }
};
</script>

<style lang="scss" scoped></style>

