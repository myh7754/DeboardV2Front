import { defineStore } from 'pinia';
import { ref } from 'vue';
import { registerUserFeed, getUserFeeds, deleteUserFeed } from '../api/rssApi';

export const useRssStore = defineStore('rss', () => {
    const userFeeds = ref([]);
    const loading = ref(false);
    const error = ref(null);

    // 사용자 피드 등록
    const addUserFeed = async (name, url) => {
        loading.value = true;
        error.value = null;
        try {
            const newFeed = await registerUserFeed(name, url);
            // 등록 성공 시 목록에 추가
            userFeeds.value.push(newFeed);
            return newFeed;
        } catch (err) {
            error.value = err.response?.data?.message || "피드 등록 실패";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // 사용자 피드 목록 조회
    const loadUserFeeds = async () => {
        loading.value = true;
        error.value = null;
        try {
            const feeds = await getUserFeeds();
            userFeeds.value = feeds;
            return feeds;
        } catch (err) {
            error.value = err.response?.data?.message || "피드 목록 조회 실패";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    // 사용자 피드 삭제
    const removeUserFeed = async (id) => {
        loading.value = true;
        error.value = null;
        try {
            await deleteUserFeed(id);
            // 삭제 성공 시 목록에서 제거
            userFeeds.value = userFeeds.value.filter(feed => feed.id !== id);
            return true;
        } catch (err) {
            error.value = err.response?.data?.message || "피드 삭제 실패";
            throw err;
        } finally {
            loading.value = false;
        }
    };

    return {
        userFeeds,
        loading,
        error,
        addUserFeed,
        loadUserFeeds,
        removeUserFeed,
    };
});

