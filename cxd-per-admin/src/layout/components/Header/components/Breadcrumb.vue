<template>
	<div>
		<div class="breadcrumb-box">
			<el-breadcrumb :separator-icon="ArrowRight">
				<transition-group name="breadcrumb">
					<el-breadcrumb-item
						v-for="(item, index) in breadcrumbList"
						:key="item.path"
					>
						<div
							class="el-breadcrumb__inner is-link"
							@click="onBreadcrumbClick(item, index)"
						>
							<el-icon class="breadcrumb-icon" v-show="item.meta.icon">
								<component :is="item.meta.icon"></component>
							</el-icon>
							<span class="breadcrumb-title">{{ item.meta.title }}</span>
						</div>
					</el-breadcrumb-item>
				</transition-group>
			</el-breadcrumb>
		</div>
	</div>
</template>

<script setup lang="ts">
import { computed, onMounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { ArrowRight } from '@element-plus/icons-vue';

import { authInfoStore } from '@/stores/modules/authStore';

const route = useRoute();
const router = useRouter();
const authStore = authInfoStore();

const breadcrumbList = computed(() => {
	let breadcrumbData =
		authStore.breadcrumbListGet[route.matched[route.matched.length - 1].path] ??
		[];

	return breadcrumbData;
});
console.log(breadcrumbList);

onMounted(() => {
	document.onkeydown = (e: KeyboardEvent) => {
		e = (window.event as KeyboardEvent) || e;
		if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
			console.log(e.code);
		}
	};
});

const onBreadcrumbClick = (item: Menu.MenuOptions, index: number) => {
	if (index !== breadcrumbList.value.length - 1) router.push(item.path);
};
</script>

<style scoped lang="scss">
.breadcrumb-box {
	.el-breadcrumb {
		white-space: nowrap;
		.el-breadcrumb__item {
			position: relative;
			display: inline-block;
			float: none;
			.el-breadcrumb__inner {
				display: inline-flex;
				.breadcrumb-icon {
					margin-top: 2px;
					margin-right: 6px;
					font-size: 16px;
				}
				.breadcrumb-title {
					margin-top: 3px;
				}
			}
		}
	}
}
</style>
