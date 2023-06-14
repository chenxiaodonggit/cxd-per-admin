import { reactive, computed, toRefs } from 'vue';

import { Table } from './interface';
/**
 *
 * @param api
 * @param initParam
 * @param isPageTable
 * @param dataCallBack
 * @param requestError
 * @returns
 */
export const useTable = (
	api: (params: any) => Promise<any> | any,
	initParam: object = {},
	isPageTable: boolean = true,
	dataCallBack?: (data: any) => any,
	requestError?: (error: any) => void
) => {
	const state = reactive<Table.TableStateProps>({
		// 表格数据
		tableData: [],
		// 分页数据
		pageTable: {
			// 当前页数
			pageNum: 1,
			// 每页显示条数
			pageSize: 10,
			// 总条数
			total: 0,
		},
		// 查询参数(只包括查询)
		searchParam: {},
		// 初始化默认的查询参数
		searchInitParam: {},
		// 总参数(包含分页和查询参数)
		totalParam: {},
	});

	const pageParam = computed({
		get: () => {
			return {
				pageNum: state.pageTable.pageNum,
				pageSize: state.pageTable.pageSize,
			};
		},
		set: (newVal: any) => {
			console.log('我是分页更新之后的值', newVal);
		},
	});

	const updatePageable = (resPageable: Table.Pageable) => {
		Object.assign(state.pageTable, resPageable);
	};

	const getTableList = async () => {
		try {
			// 把初始化参数和分页参数放到总参数里面
			Object.assign(
				state.totalParam,
				initParam,
				isPageTable ? pageParam.value : {}
			);

			//  调取接口
			let { data } = await api({
				...state.searchInitParam,
				...state.totalParam,
			});

			// dataCallBack && (data = dataCallBack(data));
			state.tableData = isPageTable ? data.list : data;
			// 解构后台返回的分页数据 (如果有分页更新分页信息)
			const { pageNum, pageSize, total } = data;
			isPageTable && updatePageable({ pageNum, pageSize, total });
		} catch (error) {
			requestError && requestError(error);
		}
	};

	return {
		...toRefs(state),
		getTableList,
	};
};
