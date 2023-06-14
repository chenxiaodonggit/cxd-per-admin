<template>
	<div class="dashboard-weather" ref="chartsRef" style="height: 210px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEcharts } from '@/hooks/useEcharts';

const chartsRef = ref();
const weekData = [
	{ value: 30, date: '周一' },
	{ value: 28, date: '周二' },
	{ value: 26, date: '周三' },
	{ value: 24, date: '周四' },
	{ value: 22, date: '周五' },
	{ value: 20, date: '周六' },
	{ value: 18, date: '周日' },
];

onMounted(() => {
	initChart(weekData);
});

const initChart = (data: any) => {
	const option = {
		title: {
			text: '',
			subtext: '',
			left: 'center',
		},
		tooltip: {
			trigger: 'item',
			formatter: '{a} <br/>{b} : {c} ({d}%)',
		},

		toolbox: {
			show: true,
			feature: {
				mark: { show: true },
				dataView: { show: true, readOnly: false },
				restore: { show: true },
				saveAsImage: { show: true },
			},
		},
		series: [
			{
				name: 'Area Mode',
				type: 'pie',
				radius: [20, 140],
				center: ['50%', '50%'],
				roseType: 'area',
				itemStyle: {
					borderRadius: 5,
				},
				data,
			},
		],
	};
	useEcharts(chartsRef, option);
};

defineExpose({
	initChart,
});
</script>

<style scoped lang="scss">
.dashboard-weather {
}
</style>
