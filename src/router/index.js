import { createRouter, createWebHistory } from 'vue-router'
import MainLayout from '../layout/MainLayout.vue'
import PostsPage from '../pages/posts/PostsPage.vue'
import SignupPage from '../pages/auth/SignupPage.vue'


const routes = [
    {
        path: '/', component: MainLayout,
        children: [
            // post
            { path: '/posts', component: PostsPage },
            // { path: '/posts/new', component: PostCreate },
            // { path: '/posts/:id', component: PostDetail, props: true },
            // { path: '/posts/:id/edit', component: PostEdit, props: true },
            // { path: '/login', component: Login },
            // { path: '/signup', component: SignUp },
        ],
        path: '/signup', component : SignupPage,
    },
    // 다른 레이아웃으로 변경하고 싶으면 여기서 선택?
]

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router