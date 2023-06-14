import { PersistedStateOptions } from 'pinia-plugin-persistedstate';

const piniaPersist = (key: string, paths?: string[]) => {
	const persist: PersistedStateOptions = {
		key,
		storage: localStorage,
		paths,
	};
	return persist;
};

export default piniaPersist;
