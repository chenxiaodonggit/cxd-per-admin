// 全局的interface
declare namespace Menu {
	interface MenuOptions {
		path: string;
		name?: string;
		component?: string | (() => Promise<unknown>);
		redirect?: string;
		meta: MeteOptions;
		children?: MenuOptions[];
	}
	interface MeteOptions {
		icon: string;
		title: string;
		activeMenu?: string;
		isHide: boolean;
		isFull: boolean;
		isAffix: boolean;
		isKeepAlive: boolean;
	}
}
