<template>
	<!-- 查询表单 card -->
	<SearchForm :columns="searchColumns" />

	<div class="card table-main">
		<!-- 表格头部 操作按钮 -->
		<div class="table-header">
			<div class="header-button-lf">
				<slot name="tableHeader" />
			</div>

			<!-- <div class="header-button-ri" v-if="toolButton">
				<slot name="toolButton">
					<el-button :icon="Refresh" circle @click="getTableList" />
					<el-button
						:icon="Printer"
						circle
						v-if="columns.length"
						@click="handlePrint"
					/>
					<el-button
						:icon="Operation"
						circle
						v-if="columns.length"
						@click="openColSetting"
					/>
					<el-button
						:icon="Search"
						circle
						v-if="searchColumns.length"
						@click="isShowSearch = !isShowSearch"
					/>
				</slot>
			</div> -->
		</div>

		<!-- 表格主体 -->
		<el-table
			ref="tableRef"
			v-bind="$attrs"
			:data="tableData"
			:border="border"
			:row-key="rowKey"
		>
			<!-- <slot></slot> -->

			<template v-for="item in tableColumns" :key="item">
				<!-- selection || index -->
				<el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					:reserve-selection="item.type == 'selection'"
					v-if="item.type == 'selection' || item.type == 'index'"
				></el-table-column>
				<!-- expand 支持 tsx 语法 && 作用域插槽 (tsx > slot) -->
				<!-- <el-table-column
					v-bind="item"
					:align="item.align ?? 'center'"
					v-if="item.type == 'expand'"
					v-slot="scope"
				>
					<component
						:is="item.render"
						v-bind="scope"
						v-if="item.render"
					></component>
					<slot :name="item.type" v-bind="scope" v-else></slot>
				</el-table-column> -->
				<!-- other 循环递归 -->
				<TableColumn :column="item">
					<template v-for="slot in Object.keys($slots)" #[slot]="scope">
						<slot :name="slot" v-bind="scope"></slot>
					</template>
				</TableColumn>
			</template>
		</el-table>
		<!-- 分页组件 -->
		<!-- <slot name="pagination">
			<Pagination
				v-if="pagination"
				:pageable="pageable"
				:handle-size-change="handleSizeChange"
				:handle-current-change="handleCurrentChange"
			/>
		</slot> -->
	</div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import { TableProps } from 'element-plus';
import SearchForm from './SearchForm.vue';
import TableColumn from './TableColumn.vue';
import { useTable } from '@/hooks/useTable';
import { ColumnProps } from '../interface';
import { handleProp } from '@/utils';

interface ProTableProps extends Partial<Omit<TableProps<any>, 'data'>> {
	columns: ColumnProps[]; // 列配置项
	requestApi: (params: any) => Promise<any> | any; // 请求表格数据的 api ==> 非必传
	requestAuto?: boolean; // 是否自动执行请求 ao-unused-varspi ==> 非必传（默认为true）
	// requestError?: (params: any) => void; // 表格 api 请求错误监听 ==> 非必传
	// dataCallback?: (data: any) => any; // 返回数据的回调函数，可以对数据进行处理 ==> 非必传
	// title?: string; // 表格标题，目前只在打印的时候用到 ==> 非必传
	pagination?: boolean; // 是否需要分页组件 ==> 非必传（默认为true）
	initParam?: any; // 初始化请求参数 ==> 非必传（默认为{}）
	border?: boolean; // 是否带有纵向边框 ==> 非必传（默认为true）
	toolButton?: boolean; // 是否显示表格功能按钮 ==> 非必传（默认为true）
	rowKey?: string; // 行数据的 Key，用来优化 Table 的渲染，当表格数据多选时，所指定的 id ==> 非必传（默认为 id）
	searchCol?: number | Record<BreakPoint, number>; // 表格搜索项 每列占比配置 ==> 非必传 { xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }
}

// 接受父组件参数，配置默认值
const props = withDefaults(defineProps<ProTableProps>(), {
	requestAuto: true,
	columns: () => [],
	pagination: true,
	initParam: {},
	border: true,
	toolButton: true,
	rowKey: 'id',
	searchCol: () => ({ xs: 1, sm: 2, md: 2, lg: 3, xl: 4 }),
});

const tableColumns = ref<ColumnProps[]>(props.columns);

// 表格多选 Hooks
// const { selectionChange, selectedList, selectedListIds, isSelected } =
// 	useSelection(props.rowKey);

const { tableData, getTableList, searchInitParam, searchParam } = useTable(
	props.requestApi,
	props.initParam,
	props.pagination
	// props.dataCallback,
	// protableDataps.requestError
);
onMounted(() => props.requestAuto && getTableList());

// 定义 enumMap 存储 enum 值（避免异步请求无法格式化单元格内容 || 无法填充搜索下拉选择）
const enumMap = ref(new Map<string, { [key: string]: any }[]>());
const setEnumMap = async (col: ColumnProps) => {
	if (!col.enum) return;
	// 如果当前 enum 为后台数据需要请求数据，则调用该请求接口，并存储到 enumMap
	if (typeof col.enum !== 'function')
		return enumMap.value.set(col.prop!, col.enum!);
	const { data } = await col.enum();
	enumMap.value.set(col.prop!, data);
};

// 扁平化 columns
const flatColumnsFunc = (
	columns: ColumnProps[],
	flatArr: ColumnProps[] = []
) => {
	columns.forEach(async (col) => {
		console.log(col);

		if (col.children?.length) flatArr.push(...flatColumnsFunc(col.children));
		flatArr.push(col);

		// 给每一项 column 添加 isShow && isFilterEnum 默认属性
		col.isShow = col.isShow ?? true;
		col.isFilterEnum = col.isFilterEnum ?? true;

		// 设置 enumMap
		setEnumMap(col);
	});
	return flatArr.filter((item) => !item.children?.length);
};

const flatColumns = ref<ColumnProps[]>();
flatColumns.value = flatColumnsFunc(tableColumns.value);

// 过滤需要搜索的配置项
const searchColumns = flatColumns.value.filter((item) => item.search?.el);

// 设置搜索表单排序默认值 && 设置搜索表单项的默认值
searchColumns.forEach((column, index) => {
	column.search!.order = column.search!.order ?? index + 2;
	if (
		column.search?.defaultValue !== undefined &&
		column.search?.defaultValue !== null
	) {
		searchInitParam.value[column.search.key ?? handleProp(column.prop!)] =
			column.search?.defaultValue;
		searchParam.value[column.search.key ?? handleProp(column.prop!)] =
			column.search?.defaultValue;
	}
});

defineExpose({
	// element: tableRef,
	tableData,
	searchParam,
	// pageable,
	getTableList,
	// reset,
	// clearSelection,
	enumMap,
	// isSelected,
	// selectedList,
	// selectedListIds,
});
</script>

<style scoped lang="scss">
.card {
	box-sizing: border-box;
	padding: 20px;
	overflow-x: hidden;
	background-color: var(--el-bg-color);
	border: 1px solid var(--el-border-color-light);
	border-radius: 6px;
	box-shadow: 0 0 12px rgb(0 0 0 / 5%);
}
.table-main {
	display: flex;
	flex: 1;
	flex-direction: column;
	width: 100%;
	height: 100%;
	.table-header {
		.header-button-lf {
			float: left;
		}
		.header-button-ri {
			float: right;
		}
		.el-button {
			margin-bottom: 15px;
		}
	}
}
</style>
