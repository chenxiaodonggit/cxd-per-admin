import http from '@/utils/request';
import { Login } from './interface';
import authMenuList from '../assets/json/authMenuList.json';
import authButtonList from '../assets/json/authButtonList.json';

/**
 * 登录接口
 * @param params
 * @returns
 */
export const loginApi = (params: Login.LoginFrom) => {
	return http.post(`/api/users/loginUser`, params);
};

// 这个是获取菜单列表的接口   可用于同过接口获取和本地json获取
export const getAuthMenuListApi = () => {
	return authMenuList;
};

// 获取按钮权限
export const getAuthButtonListApi = () => {
	// 如果想让按钮权限变为本地数据，注释上一行代码，并引入本地 authButtonList.json 数据
	return authButtonList;
};
