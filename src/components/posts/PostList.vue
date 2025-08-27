<template>
    <div v-for="post in posts" :key="post.id">
        <h1 @click="$emit('selectPost', post.id)"> {{ post.title }}</h1>
        <div>작성자 : {{ post.nickname }}</div>
        <PostOptionMenu :postId="post.id"/>
    </div>
</template>

<script setup>
import PostOptionMenu from './PostOptionMenu.vue';

defineProps({
    posts: {
        type: Array,
        required: true
    }
})
defineEmits(['selectPost']);
</script>

<style lang="scss" scoped></style>