/* eslint-disable no-restricted-syntax */
import { createApp } from 'vue';
import * as ElementPlusIconsVue from '@element-plus/icons-vue';

import pinia from './stores';

import App from './App.vue';
import router from './router';
import directives from './directives';

import '@/styles/reset.scss';

import '@/styles/common.scss';

import '@/styles/variable.scss';

import 'element-plus/dist/index.css';

const app = createApp(App);
Object.keys(ElementPlusIconsVue).forEach((key) => {
	app.component(
		key,
		ElementPlusIconsVue[key as keyof typeof ElementPlusIconsVue]
	);
});

app.use(router).use(pinia).use(directives);

app.mount('#app');
