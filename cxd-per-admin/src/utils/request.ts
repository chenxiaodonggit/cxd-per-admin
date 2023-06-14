import axios, {
	AxiosInstance,
	AxiosRequestConfig,
	AxiosError,
	AxiosResponse,
} from 'axios';
import { ElMessage } from 'element-plus';
import { userInfoStore } from '@/stores/modules/userStore';
import router from '@/router';
import { LOGIN_URL } from '@/config';
import { checkStatus } from './checkStatus';

const config = {
	baseURL: import.meta.env.VITE_API_BASEURL as string,

	timeout: 20000,
	// 跨域时候允许携带凭证
	withCredentials: true,
};
/**
 * @description axios请求
 *通过service创建的实例axios类
 *通过token验证（JWT）
 */
class RequestHttp {
	service: AxiosInstance;

	constructor(config: AxiosRequestConfig) {
		this.service = axios.create(config);
		this.service.interceptors.request.use(
			(config) => {
				const userStore = userInfoStore();
				if (userStore.token) {
					config.headers.Authorization = `Bearer ${userStore.token}`;
				}
				return config;
			},
			(error: AxiosError) => {
				return Promise.reject(error);
			}
		);

		this.service.interceptors.response.use(
			(response: AxiosResponse) => {
				const { data } = response;
				const userStore = userInfoStore();
				// 登陆失效  (这个地方判断401 token失效和密码错误code一样后续优化)
				if (data.code === 401) {
					// userStore.setToken('');
					userStore.token = '';
					console.log(userStore.token);

					router.replace(LOGIN_URL);
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}

				if (data.code && data.code !== 200) {
					ElMessage.error(data.msg);
					return Promise.reject(data);
				}

				return data;
			},
			async (error: AxiosError) => {
				const { response } = error;
				console.log(2134);

				//   tryHideFullScreenLoading();
				// 请求超时 && 网络错误单独判断，没有 response
				if (error.message.indexOf('timeout') !== -1)
					ElMessage.error('请求超时！请您稍后重试');
				if (error.message.indexOf('Network Error') !== -1)
					ElMessage.error('网络错误！请您稍后重试');
				// 根据服务器响应的错误状态码，做不同的处理
				if (response) checkStatus(response.status);
				// 服务器结果都没有返回(可能服务器错误可能客户端断网)，断网处理:可以跳转到断网页面
				if (!window.navigator.onLine) router.replace('/500');
				return Promise.reject(error);
			}
		);
	}
	// 常用的请求

	get<T>(url: string, params?: object, options = {}): Promise<T> {
		return this.service.get(url, { params, ...options });
	}

	post<T>(url: string, data?: object | string, options = {}): Promise<T> {
		return this.service.post(url, data, options);
	}

	put<T>(url: string, data?: object, options = {}): Promise<T> {
		return this.service.put(url, data, options);
	}

	delete<T>(url: string, data?: any, options = {}): Promise<T> {
		return this.service.delete(url, { data, ...options });
	}

	download(url: string, data?: object, options = {}): Promise<BlobPart> {
		return this.service.post(url, data, { ...options, responseType: 'blob' });
	}
}

export default new RequestHttp(config);
