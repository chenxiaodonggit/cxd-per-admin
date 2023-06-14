<!-- 默认的布局 -->
<template>
	<el-container class="layout">
		<el-aside>
			<div class="aside-box">
				<div class="logo flex-center">
					<!-- <img class="logo-img" src="@/assets/images/logo.svg" alt="logo" /> -->
					<span class="logo-text">Per-Admin</span>
				</div>
				<el-scrollbar>
					<el-menu
						:default-active="activeMenu"
						:unique-opened="true"
						:collapse-transition="true"
					>
						<Menu :menuList="menuList" />
					</el-menu>
				</el-scrollbar>
			</div>
		</el-aside>
		<el-container>
			<el-header>
				<LeftHeader />
				<RightHeader />
			</el-header>
			<Main />
		</el-container>
	</el-container>
</template>
<script setup lang="ts">
import { computed } from 'vue';
import { useRoute } from 'vue-router';
import Menu from '../components/Menu/MenuList.vue';
import { authInfoStore } from '@/stores/modules/authStore';
import LeftHeader from '../components/Header/LeftHeader.vue';
import RightHeader from '../components/Header/RightHeader.vue';
import Main from '../components/Main/index.vue';

const route = useRoute();
const authStore = authInfoStore();

const activeMenu: any = computed(() =>
	route.meta.activeMenu ? route.meta.activeMenu : route.meta.path
);

const menuList = computed(() => authStore.showMenuListGet);
</script>

<style scoped>
@import './index.scss';
</style>
