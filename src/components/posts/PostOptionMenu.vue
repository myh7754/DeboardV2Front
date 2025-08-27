<template>
    <!-- 더보기 버튼 -->
    <button @click="toggleMenu">⋮</button>

    <!-- 드롭다운 메뉴 -->
    <div v-if="isOpen">
        <ul>
            <li @click="getEdit">게시글 수정</li>
            <li @click="handleDelete">게시글 삭제</li>
        </ul>
    </div>
</template>

<script setup>
import { useRouter } from 'vue-router';
import { useRequestHandler } from '../../composable/useRequestHandle';
import { usePostStore } from '../../stores/PostStore';
import { ref } from 'vue';
const {handleRequest} =useRequestHandler();

const post = usePostStore();
const isOpen = ref(false);
const router = useRouter();
const props = defineProps({
    postId: { type: Number, required: true }
});

const toggleMenu = () => {
  isOpen.value = !isOpen.value;
};

const handleDelete = async () => {
    await handleRequest(post.deletePost, props.postId , null, "삭제 권한이 없습니다.", "/posts");
}

const getEdit = () => {
  router.push(`/posts/${props.postId}/edit`);
};
</script>

<style lang="scss" scoped></style>