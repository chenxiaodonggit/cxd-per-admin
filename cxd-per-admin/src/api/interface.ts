// 登陆模块 username ,password

export namespace Login {
	export interface LoginFrom {
		username: string;
		password: string;
	}
}

// 分页响应参数
export interface ResPage<T> {
	list: T[];
	pageNum: number;
	pageSize: number;
	total: number;
}

// 分页请求参数
export interface ReqPage {
	pageNum: number;
	pageSize: number;
}

// 用户模块
export namespace User {
	export interface ReqUserParams extends ReqPage {
		username: string;
		gender: number;
		idCard: string;
		email: string;
		address: string;
		createTime: string[];
		status: number;
	}
	export interface ResUserList {
		id: string;
		username: string;
		gender: number;
		user: { detail: { age: number } };
		idCard: string;
		email: string;
		address: string;
		createTime: string;
		status: number;
		avatar: string;
		photo: any[];
		children?: ResUserList[];
	}
}
