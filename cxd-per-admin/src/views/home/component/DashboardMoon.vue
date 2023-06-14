<template>
	<div class="dashboard-moon" ref="chartsRef" style="height: 210px"></div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { useEcharts } from '@/hooks/useEcharts';

const chartsRef = ref();
const weekData = [
	{ date: '第一周', value: 122 },
	{ date: '第二周', value: 132 },
	{ date: '第三周', value: 101 },
	{ date: '第四周', value: 134 },
	{ date: '余下', value: 230 },
];

onMounted(() => {
	initChart(weekData);
});

const initChart = (data: any) => {
	const option = {
		title: {
			text: '月浏览统计图',
		},
		tooltip: {
			trigger: 'axis',
			axisPointer: {
				type: 'cross',
				label: {
					backgroundColor: '#6a7985',
				},
			},
		},

		toolbox: {
			feature: {
				saveAsImage: {},
			},
		},
		grid: {
			left: '3%',
			right: '4%',
			bottom: '3%',
			containLabel: true,
		},
		xAxis: [
			{
				type: 'category',
				boundaryGap: false,
				data: data.map((itemData: any) => {
					return itemData.date;
				}),
			},
		],
		yAxis: [
			{
				type: 'value',
			},
		],
		series: [
			{
				type: 'line',
				stack: 'Total',
				areaStyle: {},
				emphasis: {
					focus: 'series',
				},
				data: data.map((itemData: any) => {
					return itemData.value;
				}),
			},
		],
	};
	useEcharts(chartsRef, option);
};

// defineExpose({
// 	initChart,
// });
</script>

<style scoped lang="scss"></style>
