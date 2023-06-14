export interface UserState {
	token: string;
	userInfo: {
		name: string;
	};
}

export interface AuthState {
	authButtonList: {
		[key: string]: string[];
	};

	routeName: string;
	authMenuList: Menu.MenuOptions[];
}

export interface KeepAliveState {
	keepAliveName: string[];
}
