/* eslint-disable prettier/prettier */
import Vue from 'vue';
import Router from 'vue-router';

const timeline = () => import('@/components/timeline/page.vue');
const login = () => import('@/components/login/page.vue');


Vue.use(Router);
export default new Router({
  mode: 'history',
  routes: [
    // Proposals
    { path: '/', abstract: true, component: login },
    { path: '/timeline', abstract: true, component: timeline },
    { path: '/*', redirect: '/' },
  ]
});
