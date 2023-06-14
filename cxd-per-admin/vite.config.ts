import { fileURLToPath, URL } from 'node:url';

import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
import eslintPlugin from 'vite-plugin-eslint';
import AutoImport from 'unplugin-auto-import/vite';
import Components from 'unplugin-vue-components/vite';
import { ElementPlusResolver } from 'unplugin-vue-components/resolvers';

import postCssPxToRem from 'postcss-pxtorem';

// https://vitejs.dev/config/
export default defineConfig({
	plugins: [
		vue(),
		vueJsx(),
		eslintPlugin(),
		AutoImport({
			resolvers: [ElementPlusResolver()],
		}),
		Components({
			// allow auto load markdown components under `./src/components/`
			extensions: ['vue', 'md'],
			// allow auto import and register components used in markdown
			include: [/\.vue$/, /\.vue\?vue/, /\.md$/],
			resolvers: [
				ElementPlusResolver({
					importStyle: 'sass',
				}),
			],
			dts: 'src/components.d.ts',
		}),
	],
	resolve: {
		alias: {
			'@': fileURLToPath(new URL('./src', import.meta.url)),
		},
	},
	server: {
		host: 'localhost',
		port: 8888,
		open: true,
		proxy: {
			'/api': {
				target: 'http://localhost:3000', // 代理目标地址
				changeOrigin: true, // 是否改变请求源
				rewrite: (path) => path.replace(/^\/api/, ''), // 路径重写
			},
			'/per': {
				target: 'http://localhost:8848', // 代理目标地址
				changeOrigin: true, // 是否改变请求源
				rewrite: (path) => path.replace(/^\/per/, ''), // 路径重写
			},
		},
	},
	css: {
		postcss: {
			plugins: [
				postCssPxToRem({
					rootValue: 15, // 1rem，根据 设计稿宽度/10 进行设置
					propList: ['*'], // 需要转换的属性，这里选择全部都进行转换
				}),
			],
		},
		preprocessorOptions: {
			scss: {
				// 自定义的主题色
				additionalData: `@use "@/styles/element/index.scss" as *;`,
			},
		},
	},
});
