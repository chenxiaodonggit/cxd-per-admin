import { Ref, onDeactivated, onBeforeUnmount } from 'vue';
import * as echarts from 'echarts';

export const useEcharts = (
	chartRef: Ref<HTMLElement | echarts.ECharts>,
	options: echarts.EChartsCoreOption
) => {
	const chart = echarts.init(chartRef.value as HTMLElement);

	// 设置配置项
	if (options && typeof options === 'object') {
		chart.setOption(options);
	}

	// 页面大小变化时重新渲染 echarts 图表
	const resize = () => {
		chart && chart.resize();
	};
	window.addEventListener('resize', resize);

	// 监听组件的生命周期，在组件失活和卸载时取消事件监听
	onDeactivated(() => {
		window.removeEventListener('resize', resize);
	});
	onBeforeUnmount(() => {
		window.removeEventListener('resize', resize);
	});

	// 将实例赋值给 ref 并返回
	chartRef.value = chart;
};
