export const basicRoutes = [
    {
        path: '/',
        name: 'home',
        component: () => import('@/views/layout.vue'),
        meta: {
            title: '首页'
        }
    },
    {
        path: '/article/:post_id',
        name: 'article',
        component: () => import('@/views/layout.vue'),
        meta: {
            title: '文章'
        }
    },
    {
        path: '/404',
        name: '404',
        component: () => import('@/views/NotFound.vue'),
        meta: {
            title: '404'
        }
    },
    {
        path: '/:catchAll(.*)',
        redirect: '/404/'
    },
]