<script setup lang="ts">
import { ElConfigProvider } from 'element-plus';
</script>

<template>
	<el-config-provider size="default">
		<router-view></router-view>
	</el-config-provider>
</template>

<style scoped></style>
