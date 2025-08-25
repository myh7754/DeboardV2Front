import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import PostsPage from '../pages/posts/PostsPage.vue'
import SignupPage from '../pages/auth/SignupPage.vue'
import LoginPage from '../pages/auth/LoginPage.vue'
import PostCreatePage from '../pages/posts/PostCreatePage.vue'
import PostDetail from '../pages/posts/PostDetail.vue'


const routes = [
    {
        path: '/', component: MainLayout,
        children: [
            // post
            { path: '/posts', component: PostsPage },
            { path: '/posts/new', component: PostCreatePage },
            { path: '/posts/:id', component: PostDetail, props: true },
            // { path: '/posts/:id/edit', component: PostEdit, props: true },
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

export default router