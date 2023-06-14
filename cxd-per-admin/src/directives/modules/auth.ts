import type { Directive, DirectiveBinding } from 'vue';
import { authInfoStore } from '@/stores/modules/authStore';

const auth: Directive = {
	mounted(el: HTMLElement, binding: DirectiveBinding) {
		const { value } = binding;
		const authStore = authInfoStore();
		const currentPageRoles =
			authStore.authButtonListGet[authStore.routeName] ?? [];
		if (value instanceof Array && value.length) {
			const hasPermission = value.every((item) =>
				currentPageRoles.includes(item)
			);
			if (!hasPermission) el.remove();
		} else {
			if (!currentPageRoles.includes(value)) el.remove();
		}
	},
};

export default auth;
