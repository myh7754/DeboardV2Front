<template>
    <div class="min-h-screen bg-base-200">
        <NavBar v-if="showNavBar"/>
        <main :class="showNavBar ? 'container mx-auto px-4 py-8 max-w-6xl' : ''">
            <router-view/>
        </main>
    </div>
</template>

<script setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import NavBar from '../components/common/NavBar.vue';

const route = useRoute();

// 홈페이지에서는 NavBar 숨기기
const showNavBar = computed(() => {
  return route.path !== '/';
});
</script>

<style lang="scss" scoped>

</style>