<template>
  <div v-if="page && total && total >1">
    <!-- 이전 버튼 -->
    <button :disabled="page <= 1" @click="changePage(page - 1)">
      이전
    </button>

    <!-- 페이지 번호 버튼 -->
    <button
      v-for="p in pageNumbers"
      :key="p"
      @click="changePage(p)"
      :disabled="p === page"
    >
      {{ p }}
    </button>

    <!-- 다음 버튼 -->
    <button :disabled="page >= total" @click="changePage(page + 1)">
      다음
    </button>
  </div>
</template>

<script setup>
import { computed } from "vue";

const props = defineProps({
  page: { type: Number, required: true }, // 현재 페이지
  total: { type: Number, required: true } // 전체 페이지 수
});

const emit = defineEmits(["changePage"]);

const changePage = (newPage) => {
  if (newPage >= 1 && newPage <= props.total) {
    emit("changePage", newPage);
  }
};

// 페이지 번호 범위 계산 (현재 페이지 기준으로 양옆 2개씩, 총 5개 버튼)
const pageNumbers = computed(() => {
  const range = 2; // 현재 페이지 기준 좌우 몇 개 보여줄지
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

<style lang="scss" scoped></style>