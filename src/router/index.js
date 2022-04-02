/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const timeline = () => import('@/components/timeline/page.vue');
const login = () => import('@/components/login/page.vue');
const termos = () => import('@/components/termos/page.vue');
const errorLogin = () => import('@/components/errorLogin/page.vue');


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // Proposals
    { path: '/', abstract: true, component: login },
    { path: '/timeline', abstract: true, component: timeline },
    { path: '/termos', abstract: true, component: termos },
    { path: '/info', abstract: true, component: errorLogin },
    { path: '/*', redirect: '/' },
  ]
});
