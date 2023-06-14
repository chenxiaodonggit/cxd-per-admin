// module.exports = {
//     "env": {
//         "browser": true,
//         "es2021": true,
//         "node": true
//     },
//     "extends": [
//         "eslint:recommended",
//         "plugin:vue/vue3-essential",
//         "plugin:@typescript-eslint/recommended"
//     ],
//     "overrides": [
//     ],
//     "parser": "@typescript-eslint/parser",
//     "parserOptions": {
//         "ecmaVersion": "latest",
//         "sourceType": "module"
//     },
//     "plugins": [
//         "vue",
//         "@typescript-eslint"
//     ],
//     "rules": {
//     }
// }
module.exports = {
	// 环境:
	env: {
		// 浏览器
		browser: true,
		// 最新es语法
		es2021: true,
		// node环境
		node: true,
	},
	// 扩展的eslint规范语法，可以被继承的规则
	// 字符串数组：每个配置继承它前面的配置
	// 分别是：
	// eslint-plugin-vue提供的
	// eslint-config-airbnb-base提供的
	// eslint-config-prettier提供的
	// 前缀 eslint-config-, 可省略
	extends: ['plugin:vue/vue3-strongly-recommended', 'airbnb-base', 'prettier'],
	// eslint 会对我们的代码进行检验
	// parser的作用是将我们写的代码转换为ESTree（AST）
	// ESLint会对ESTree进行校验
	parser: 'vue-eslint-parser',
	// 解析器的配置项
	parserOptions: {
		// es的版本号，或者年份都可以
		ecmaVersion: 'latest',
		parser: '@typescript-eslint/parser',
		// 源码类型 默认是script，es模块用module
		sourceType: 'module',
		// 额外的语言类型
		ecmaFeatures: {
			tsx: true,
			jsx: true,
		},
	},
	// 全局自定义的宏，这样在源文件中使用全局变量就不会报错或者警告
	globals: {
		defineProps: 'readonly',
		defineEmits: 'readonly',
		defineExpose: 'readonly',
		withDefault: 'readonly',
	},
	// 插件
	// 前缀 eslint-plugin-, 可省略
	// vue官方提供了一个ESLint插件 eslint-plugin-vue，它提供了parser和rules
	// parser为 vue-eslint-parser，放在上面的parsr字段，rules放在extends字段里，选择合适的规则
	plugins: ['vue', '@typescript-eslint'],
	settings: {
		// 设置项目内的别名
		'import/reslover': {
			alias: {
				map: [['@', './src']],
			},
			node: {
				extensions: ['.js', '.jsx', '.ts', '.tsx'],
			},
		},
		// 允许的扩展名
		'import/extensions': ['.js', '.jsx', '.ts', '.tsx', '.mjs'],
	},
	// 自定义规则，覆盖上面extends继承的第三方库的规则，根据组内成员灵活定义
	rules: {
		'import/no-extraneous-dependencies': 0,
		'no-param-reassing': 0,
		'vue/multi-word-commponent-names': 0,
		'vue/attribute-hyphenation': 0,
		'vue/v-on-event-hyphenation': 0,
		'import/no-unresolved': 0,
		'import/extensions': 0,
		'no-console': 0,
		'import/prefer-default-export': 0,
		'vue/multi-word-component-names': 0,
		'no-alert': 0,
		'prefer-promise-reject-errors': 0,
		'consistent-return': 0,
		'no-unused-expressions': 0,
		'no-param-reassign': 0,
		'prefer-template': 0,
		'no-undef': 0,
		'prefer-const': 0,
		'no-shadow': 0,
		'arrow-body-style': 0,
		'no-use-before-define': 0,
		'import/no-self-import': 0,
		'no-lonely-if': 0,
		'no-nested-ternary': 0,
		'no-unused-vars': 0,
		'no-else-return': 0,
		'default-param-last': 0,
		'no-underscore-dangle': 0,
		'no-extra-boolean-cast': 0,
		'vue/no-mutating-props': 0,
		'prefer-destructuring': 0,
		radix: 0,
	},
};
