import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/AuthStore'
import MainLayout from '../layout/MainLayout.vue'
import HomePage from '../pages/HomePage.vue'
import PostsPage from '../pages/posts/PostsPage.vue'
import SignupPage from '../pages/auth/SignupPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import PostCreatePage from '../pages/posts/PostCreatePage.vue'
import PostDetail from '../pages/posts/PostDetail.vue'
import PostEditPage from '../pages/posts/PostEditPage.vue'
import UserFeedPage from '../pages/rss/UserFeedPage.vue'
import { authCheck } from '../api/authApi'


const routes = [
    {
        path: '/', component: MainLayout,
        children: [
            // 홈페이지
            { path: '/', component: HomePage },
            // post
            { path: '/posts', component: PostsPage },
            { path: '/posts/new', component: PostCreatePage , meta: { requiresAuth: true }},
            { path: '/posts/:id', component: PostDetail, props: true },
            { path: '/posts/:postId/edit', component: PostEditPage, 
                props:true, 
                meta: { 
                    requiresAuth: true ,
                    requiresOwner: true,
                    entityType: "POST",
                    idParam: 'postId'
                } },
            { path: '/rss/feeds', component: UserFeedPage, meta: { requiresAuth: true } },
            { path: '/login', component: LoginPage },
            { path: '/signup', component: SignupPage },
            // { path: '/signup', component: SignUp },
        ],
    },
    // 다른 레이아웃으로 변경하고 싶으면 여기서 선택
    {
        // path: '경로', component : 컴포넌트,
    },

]

const router = createRouter({
    history: createWebHistory(),
    routes
})


// 글로벌 가드
router.beforeEach(async (to, from, next) => {
  // to: 이동할 라우트 객체
  // from: 현재 라우트 객체
  // next: 이동 허용 / 차단 / 리다이렉트 함수
  const authStore = useAuthStore();
  // 현재 이동할 라우트 객체의 meta정보의 requiresAuth가 true라면 
  if (to.meta.requiresAuth && !authStore.isLoggedIn) {
    alert("로그인이 필요합니다");
    return next({ path: '/login' }); // 로그인 페이지로 리다이렉트
  }

  if (to.meta.requiresOwner) {
    try {
        const entityType = to.meta.entityType;
        const idParam = to.meta.idParam; // postId, commentId 등
        const id = to.params[idParam]; // 이게 진자 id값

        await authCheck(entityType,id);
        return next();
    } catch (err) { 
        alert(err.response?.data?.message)
        return;
    }
  }
  next();
});

export default router