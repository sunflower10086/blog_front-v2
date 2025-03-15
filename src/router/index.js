import {createRouter, createWebHistory} from 'vue-router'
import {basicRoutes} from "./routes/route.js";
import {routeChange} from "@/utils/initTools.mjs";

export const router = createRouter({
    routes: [...basicRoutes],
    history: createWebHistory(),
})

export function setupRouter(app) {
    router.beforeResolve((to, from) => {
        routeChange("before", to);
    })
    // router.beforeResolve(to => {
    //     routeChange("before", to);
    // })
    router.afterEach((to, from) => {
        routeChange("after", to);
    })

    app.use(router)
}