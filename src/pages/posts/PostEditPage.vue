<template>
    <h1>게시글 수정</h1>
    <form @submit.prevent="onSubmit">
        <div>
            <label for="title">제목</label>
            <input id="title" v-model="form.title" required />
        </div>

        <div>
            <label for="content">내용</label>
            <textarea id="content" v-model="form.content" required></textarea>
        </div>

        <button type="submit">수정 완료</button>
        <button type="button" @click="goBack">취소</button>
    </form>
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