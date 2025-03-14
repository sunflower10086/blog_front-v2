import {createRouter, createWebHistory} from 'vue-router'
// import {basicRoutes} from "./routes/base.js";

export const router = createRouter({
    routes: [],
    history: createWebHistory(),
})

export function setupRouter(app) {
    app.use(router)
}