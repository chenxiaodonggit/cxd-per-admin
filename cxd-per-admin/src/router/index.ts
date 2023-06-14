import { createRouter, createWebHistory } from 'vue-router';
import { basisRoutes, errorRoutes } from './modules/rootRoutes';
import { userInfoStore } from '@/stores/modules/userStore';
import { authInfoStore } from '@/stores/modules/authStore';
import { initDynamicRoutes } from './modules/dynamicRouter';
import { LOGIN_URL, ROUTER_WHITE_LIST } from '@/config';
import NProgress from '@/config/nprogress';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [...basisRoutes, ...errorRoutes],
	strict: false,
	scrollBehavior: () => ({ left: 0, top: 0 }),
});

/**
 * @description 重置路由
 *
 */

export const resetRouter = () => {
	const authStore = authInfoStore();

	authStore.flatMenuListGet.forEach((route) => {
		const { name } = route;
		if (name && router.hasRoute(name)) router.removeRoute(name);
	});
};

router.beforeEach(async (to, from, next) => {
	const userStore = userInfoStore();
	const authStore = authInfoStore();
	// 加载开始
	NProgress.start();

	const title = import.meta.env.VITE_WEB_TITLE;
	document.title = to.meta.title ? `${to.meta.title}-${title}` : title;

	// 判断是访问登陆页，有 Token 就在当前页面，没有 Token 重置路由到登陆页
	if (to.path.toLocaleLowerCase() === LOGIN_URL) {
		if (userStore.token) return next(from.fullPath);
		resetRouter();
		return next();
	}

	// 判断是否有 Token，没有重定向到 login 页面
	// if (!userStore.token) return router.push(LOGIN_URL);
	if (!userStore.token) return next({ path: LOGIN_URL, replace: true });

	// 500页面直接放行
	if (ROUTER_WHITE_LIST.includes(to.path)) return next();

	// 如果没有菜单列表，就重新请求菜单列表并添加动态路由
	if (!authStore.authMenuListGet.length) {
		await initDynamicRoutes();

		return next({ ...to, replace: true });
	}

	// 7.存储 routerName 做按钮权限筛选
	authStore.setRouteName(to.name as string);

	next();
});

/**
 * @description 路由跳转错误
 * */
router.onError((error) => {
	NProgress.done();
	console.warn('路由错误', error.message);
});

router.afterEach(() => {
	NProgress.done();
});
export default router;
