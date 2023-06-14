<template>
	<el-main>
		<router-view v-slot="{ Component, route }">
			<transition appear name="fade-transform" mode="out-in">
				<keep-alive :include="keepAliveName">
					<component
						:is="Component"
						:key="route.fullPath"
						v-if="isRouterShow"
					/>
				</keep-alive>
			</transition>
		</router-view>
	</el-main>
	<!-- <el-footer v-if="footer">
		<Footer />
	</el-footer> -->
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { storeToRefs } from 'pinia';
import { useKeepAliveStore } from '@/stores/modules/keepAlive';

const keepAliveStore = useKeepAliveStore();
const isRouterShow = ref<boolean>(true);

const { keepAliveName } = storeToRefs(keepAliveStore);
</script>

<style scoped>
@import './index.scss';
</style>
