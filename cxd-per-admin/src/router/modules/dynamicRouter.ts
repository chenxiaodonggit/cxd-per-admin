import { ElNotification } from 'element-plus';
import router from '@/router/index';
import { userInfoStore } from '@/stores/modules/userStore';
import { authInfoStore } from '@/stores/modules/authStore';
import { LOGIN_URL } from '@/config';

const modules = import.meta.glob('@/views/**/*.vue');

/**
 * @description 路由原信息标注
 * @param meta ==> 菜单信息
 * @param meta.icon ==> 菜单图标
 * @param meta.title ==> 菜单标题
 * @param meta.activeMenu ==> 当前路由为详情页时，需要高亮的菜单
 * @param meta.isHide ==> 是否隐藏
 * @param meta.isFull ==> 是否全屏(示例：数据大屏页面)
 * @param meta.isAffix ==> 是否固定在 tabs nav
 * @param meta.isKeepAlive ==> 是否缓存
 * */
export const initDynamicRoutes = async () => {
	const userStore = userInfoStore();
	const authStore = authInfoStore();

	try {
		// 获取菜单列表
		await authStore.getAuthMenuList();

		// 获取按钮权限列表
		await authStore.getAuthButtonList();

		// 判断当前用户有没有菜单权限
		if (!authStore.authMenuListGet.length) {
			ElNotification({
				title: '无权限访问',
				message: '当前账号无任何菜单权限，请联系系统管理员！',
				type: 'warning',
				duration: 3000,
			});
			userStore.setToken('');
			router.replace(LOGIN_URL);

			return Promise.reject('No permission');
		}

		// 添加动态路由
		authStore.flatMenuListGet.forEach((item: any) => {
			item.children && delete item.children;

			if (item.component && typeof item.component === 'string') {
				item.component = modules['/src/views' + item.component + '.vue'];
			}
			if (item.meta.isFull) {
				router.addRoute(item);
			} else {
				router.addRoute('layout', item);
			}
		});

		// console.log(authStore.flatMenuListGet);
	} catch (error) {
		// 当按钮 || 菜单请求出错时，重定向到登陆页
		userStore.setToken('');
		router.replace(LOGIN_URL);
		return Promise.reject(error);
	}
};
