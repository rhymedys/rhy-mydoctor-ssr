import Vue from 'vue';

import VueRouter from 'vue-router';
Vue.use(VueRouter);

export default function createRouter() {
    return new VueRouter({
        mode: 'history',
        base: '/doctor/',
        routes: [{
            path: '*',
            component: () => import('../view/notFound/index.vue')
        }]
    });
}