<template>
    <div class="search-bar bg-base-200 p-4 rounded-lg mb-6">
      <div class="flex flex-col md:flex-row gap-4 items-center">
        <!-- 검색 타입 선택 -->
        <select 
          v-model="selectedSearchType" 
          class="select select-bordered w-full md:w-auto"
        >
          <option value="title">제목</option>
          <option value="content">내용</option>
          <option value="author">작성자</option>
          <option value="titleContent">제목+내용</option>
        </select>
        
        <!-- 검색어 입력 -->
        <input
          type="text"
          v-model="searchKeyword"
          placeholder="검색어를 입력하세요"
          class="input input-bordered w-full"
          @keyup.enter="handleSearch"
        />
        
        <!-- 검색 버튼 -->
        <button 
          @click="handleSearch" 
          class="btn btn-primary w-full md:w-auto"
        >
          검색
        </button>
        
        <!-- 검색 초기화 버튼 -->
        <button 
          @click="handleReset" 
          class="btn btn-outline w-full md:w-auto"
        >
          초기화
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, watch } from 'vue'
  import { usePostStore } from '../../stores/PostStore'
  import { useRoute, useRouter } from 'vue-router'
  
  const postStore = usePostStore()
  const route = useRoute()
  const router = useRouter()
  
  const selectedSearchType = ref('title')
  const searchKeyword = ref('')
  
  // URL 쿼리 파라미터 변경 감지하여 검색 폼 동기화
  watch(() => route.query, (newQuery) => {
    selectedSearchType.value = newQuery.searchType || 'title'
    searchKeyword.value = newQuery.keyword || ''
  }, { immediate: true })
  
  // 검색 실행 - URL 업데이트
  const handleSearch = async () => {
    if (!searchKeyword.value.trim()) {
      alert('검색어를 입력해주세요.')
      return
    }
  
    try {
      // URL에 검색 조건 추가
      await router.push({
        query: {
          keyword: searchKeyword.value,
          searchType: selectedSearchType.value,
          page: 1
        }
      })
    } catch (err) {
      alert(err.response?.data?.message || "검색 중 오류가 발생했습니다.")
    }
  }
  
  // 검색 조건 초기화 - URL에서 검색 조건 제거
  const handleReset = async () => {
    selectedSearchType.value = 'title'
    searchKeyword.value = ''
    
    try {
      // URL에서 검색 조건 제거
      await router.push({
        query: {
          page: 1
        }
      })
    } catch (err) {
      alert(err.response?.data?.message || "검색 초기화 중 오류가 발생했습니다.")
    }
  }
  </script>
  
  <style lang="scss" scoped>
  .search-bar {
    transition: all 0.3s ease;
  }
  </style>