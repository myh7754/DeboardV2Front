<template>
    <div class="card bg-base-200 border border-base-300 hover:border-primary transition-colors">
        <div class="card-body p-4">
            <!-- 제목 -->
            <h3 class="card-title text-lg font-semibold text-base-content mb-2">
                <a 
                    v-if="item.link" 
                    :href="item.link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="link link-primary hover:underline"
                >
                    {{ item.title }}
                </a>
                <span v-else>{{ item.title }}</span>
            </h3>

            <!-- 메타 정보 (날짜, 작성자 등) -->
            <div class="flex items-center gap-4 text-sm text-base-content/70 mb-3">
                <span v-if="item.pubDate" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clip-rule="evenodd"></path>
                    </svg>
                    {{ formatDate(item.pubDate) }}
                </span>
                <span v-if="item.author" class="flex items-center gap-1">
                    <svg class="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path>
                    </svg>
                    {{ item.author }}
                </span>
            </div>

            <!-- 게시글 내용 (HTML 렌더링) -->
            <div 
                v-if="item.description || item.content" 
                class="prose prose-sm max-w-none text-base-content/80 feed-content"
                v-html="sanitizedContent"
            ></div>

            <!-- 원본 링크 -->
            <div v-if="item.link" class="mt-3 pt-3 border-t border-base-300">
                <a 
                    :href="item.link" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    class="btn btn-sm btn-outline btn-primary gap-2"
                >
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"></path>
                    </svg>
                    원문 보기
                </a>
            </div>
        </div>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { sanitizeHtml } from '../../utils/htmlSanitizer';
import dayjs from 'dayjs';

const props = defineProps({
    item: {
        type: Object,
        required: true,
        default: () => ({})
    }
});

// HTML 내용을 sanitize하여 안전하게 렌더링
const sanitizedContent = computed(() => {
    const content = props.item.content || props.item.description || '';
    if (!content) return '';
    
    // HTML 태그가 포함된 경우 sanitize
    return sanitizeHtml(content);
});

// 날짜 포맷팅
const formatDate = (dateString) => {
    if (!dateString) return '';
    return dayjs(dateString).format('YYYY년 MM월 DD일 HH:mm');
};
</script>

<style lang="scss" scoped>
// RSS 피드 내용 스타일링
:deep(.feed-content) {
    // 이미지가 컨테이너를 벗어나지 않도록
    img {
        max-width: 100%;
        height: auto;
        border-radius: 0.5rem;
        margin: 1rem 0;
    }

    // 링크 스타일
    a {
        color: hsl(var(--p));
        text-decoration: underline;
        
        &:hover {
            color: hsl(var(--pf));
        }
    }

    // 제목 스타일
    h1, h2, h3, h4, h5, h6 {
        margin-top: 1.5rem;
        margin-bottom: 0.75rem;
        font-weight: 600;
    }

    // 리스트 스타일
    ul, ol {
        margin: 1rem 0;
        padding-left: 1.5rem;
    }

    // 코드 블록 스타일
    code {
        background-color: hsl(var(--b2));
        padding: 0.125rem 0.25rem;
        border-radius: 0.25rem;
        font-size: 0.875em;
    }

    pre {
        background-color: hsl(var(--b2));
        padding: 1rem;
        border-radius: 0.5rem;
        overflow-x: auto;
    }
}
</style>

