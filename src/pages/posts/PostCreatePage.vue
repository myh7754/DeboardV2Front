<template>
    <div>
        <h1>게시글 생성</h1>
        <form @submit.prevent="handleCreate">
            <!-- 제목 -->
            <div>
                <label for="title" class="block font-medium">제목</label>
                <input id="title" v-model="form.title" type="text" required
                    class="w-full border rounded-lg px-3 py-2" />
            </div>

            <!-- 내용 -->
            <div>
                <label for="content" class="block font-medium">내용</label>
                <textarea id="content" v-model="form.content" rows="6" required
                    class="w-full border rounded-lg px-3 py-2"></textarea>
            </div>
            <button>제출</button>
        </form>
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