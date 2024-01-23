import { createRouter, createWebHistory } from 'vue-router';
const routes = [
	{
		path: '/',
		name: 'main',
		component: () => import('../pages/Main/mainPage.vue'),
	},
	{
		path: '/edit',
		name: 'edit',
		component: () => import('../pages/Edit/editPage.vue'),
	},
	{
		path: '/search',
		name: 'search',
		component: () => import('../pages/Search/searchPage.vue'),
	},
];

const router = createRouter({
	history: createWebHistory(),
	routes,
});

export default router;
