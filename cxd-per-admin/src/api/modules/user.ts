import http from '@/utils/request';
import { User, ResPage } from '@/api/interface';

const PORT1 = '/per/api/geeker';
// 新增用户
// export const addUser = (params: { id: string }) => {
// 	return 1;
// 	// return http.post(PORT1 + `/user/add`, params);
// };

// 获取用户列表
export const getUserList = (params: User.ReqUserParams) => {
	return http.post<ResPage<User.ResUserList>>(PORT1 + `/user/list`, params);
};
