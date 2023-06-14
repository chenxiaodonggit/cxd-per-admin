import { RouteRecordRaw } from 'vue-router';
import { HOME_URL, LOGIN_URL } from '@/config';

export const basisRoutes: RouteRecordRaw[] = [
	{
		path: '/',
		redirect: HOME_URL,
	},
	{
		path: LOGIN_URL,
		name: 'login',
		component: () => import('@/views/login/index.vue'),
		meta: {
			title: '登录',
		},
	},
	// {
	// 	path: HOME_URL,
	// 	name: '首页',
	// 	component: () => import('@/views/home/index.vue'),
	// 	meta: {
	// 		title: '首页',
	// 	},
	// },
	{
		path: '/layout',
		name: 'layout',
		component: () => import('@/layout/index.vue'),
		redirect: HOME_URL,
		children: [],
	},
];
export const errorRoutes: RouteRecordRaw[] = [
	{
		path: '/400',
		name: '400',
		component: () => import('@/components/ErrorPage/400.vue'),
		meta: {
			title: '400',
		},
	},
	{
		path: '/403',
		name: '403',
		component: () => import('@/components/ErrorPage/403.vue'),
		meta: {
			title: '403',
		},
	},
	{
		path: '/500',
		name: '500',
		component: () => import('@/components/ErrorPage/500.vue'),
		meta: {
			title: '500',
		},
	},
	{
		path: '/:pathMatch(.*)*',
		component: () => import('@/components/ErrorPage/404.vue'),
	},
];
