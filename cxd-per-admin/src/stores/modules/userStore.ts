import { defineStore } from 'pinia';
import piniaPersist from '@/config/piniaPersist';
import { UserState } from '../interface';

export const userInfoStore = defineStore({
	id: 'user-cxd',
	state: (): UserState => ({
		token: '',
		userInfo: {
			name: 'CXD',
		},
	}),
	getters: {},
	actions: {
		setToken(token: string) {
			this.token = token;
		},
		setUserInfo(userInfo: UserState['userInfo']) {
			this.userInfo = userInfo;
		},
	},
	persist: piniaPersist('user-cxd'),
});
