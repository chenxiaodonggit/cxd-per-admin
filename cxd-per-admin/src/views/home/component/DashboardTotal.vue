<template>
	<div class="demo-progress">
		<el-progress type="dashboard" :percentage="percentage2" :color="colors" />
	</div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

const percentage2 = ref(0);

const colors = [
	{ color: '#f56c6c', percentage: 20 },
	{ color: '#e6a23c', percentage: 40 },
	{ color: '#5cb87a', percentage: 60 },
	{ color: '#1989fa', percentage: 80 },
	{ color: '#6f7ad3', percentage: 100 },
];

const percentage = setInterval(() => {
	percentage2.value = (percentage2.value % 100) + 10;
	if (percentage2.value === 80) {
		clearInterval(percentage);
	}
}, 500);

onMounted(() => {
	percentage;
});
</script>

<style scoped lang="scss">
.demo-progress {
	text-align: center;
	:deep .el-progress-circle {
		width: 200px !important;
		height: 200px !important;
	}
}
.demo-progress::deep .el-progress-circle {
	width: 200px !important;
	height: 200px !important;
}
</style>
