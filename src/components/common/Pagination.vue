<template>
  <div v-if="page && total && total > 1" class="flex justify-center mt-8">
    <div class="join shadow-lg rounded-box">
      <!-- 맨 처음 -->
      <button
        class="join-item btn btn-sm md:btn-md"
        :class="{ 'btn-disabled': page === 1, 'btn-ghost': page !== 1 }"
        @click="changePage(1)"
      >
        «
      </button>

      <!-- 이전 -->
      <button 
        class="join-item btn btn-sm md:btn-md"
        :class="{ 'btn-disabled': page <= 1, 'btn-outline': page > 1 }"
        @click="changePage(page - 1)"
      >
        ‹
      </button>

      <!-- 페이지 번호 -->
      <button
        v-for="p in pageNumbers"
        :key="p"
        class="join-item btn btn-sm md:btn-md"
        :class="{
          'btn-primary': p === page,
          'btn-ghost': p !== page
        }"
        @click="changePage(p)"
      >
        {{ p }}
      </button>

      <!-- 다음 -->
      <button 
        class="join-item btn btn-sm md:btn-md"
        :class="{ 'btn-disabled': page >= total, 'btn-outline': page < total }"
        @click="changePage(page + 1)"
      >
        ›
      </button>

      <!-- 맨 끝 -->
      <button
        class="join-item btn btn-sm md:btn-md"
        :class="{ 'btn-disabled': page === total, 'btn-ghost': page !== total }"
        @click="changePage(total)"
      >
        »
      </button>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  page: { type: Number, required: true },
  total: { type: Number, required: true }
});

const emit = defineEmits(["changePage"]);

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= props.total) {
    emit("changePage", newPage);
  }
};

const pageNumbers = computed(() => {
  const range = 2;
  let start = Math.max(1, props.page - range);
  let end = Math.min(props.total, props.page + range);

  if (end - start < range * 2) {
    if (start === 1) {
      end = Math.min(props.total, start + range * 2);
    } else if (end === props.total) {
      start = Math.max(1, end - range * 2);
    }
  }

  const pages = [];
  for (let i = start; i <= end; i++) {
    pages.push(i);
  }
  return pages;
});
</script>