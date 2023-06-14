<template>
	<template v-for="subItem in menuList" :key="subItem.path">
		<el-sub-menu v-if="subItem.children?.length" :index="subItem.path">
			<template #title>
				<el-icon class="menu-icon">
					<component :is="subItem.meta.icon"></component>
				</el-icon>
				<span class="sle">{{ subItem.meta.title }}</span>
			</template>
			<MenuList :menuList="subItem.children" />
		</el-sub-menu>
		<el-menu-item
			v-else
			:index="subItem.path"
			@click="handleClickMenu(subItem)"
		>
			<el-icon>
				<component :is="subItem.meta.icon"></component>
			</el-icon>
			<template #title>
				<span class="sle">{{ subItem.meta.title }}</span>
			</template>
		</el-menu-item>
	</template>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router';

defineProps<{ menuList: Menu.MenuOptions[] }>();

const router = useRouter();
const handleClickMenu = (subItem: Menu.MenuOptions) => {
	router.push(subItem.path);
};
</script>

<style lang="scss">
@import './MenuList.scss';
</style>
