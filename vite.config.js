import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

// https://vite.dev/config/
// 환경변수 로드
export default defineConfig(({ mode }) => {
  // 환경변수 로드
  const env = loadEnv(mode, process.cwd(), '')
  
  return {
    plugins: [vue()],
    build: {
      // Disable sourcemaps in production so minified code can't be reverse-mapped
      sourcemap: false
    },
    server: {
      proxy: {
        '/api': {
          target: env.VITE_BACKEND_URL,  // 환경변수 사용
          changeOrigin: true
        }
      }
    }
  }
})