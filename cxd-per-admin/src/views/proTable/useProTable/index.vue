<template>
	<div class="table-box">
		<ProTable
			ref="proTable"
			title="用户列表"
			:request-api="getTableList"
			:columns="columns"
			:init-param="initParam"
			:data-callback="dataCallback"
		>
			<template #tableHeader="scope">
				<el-button type="primary" :icon="CirclePlus" v-auth="'add'">
					新增用户
				</el-button>
				<el-button type="primary" :icon="Upload" plain v-auth="'batchAdd'">
					批量添加用户
				</el-button>
				<el-button type="primary" :icon="Download" plain v-auth="'export'">
					导出用户数据
				</el-button>
				<el-button type="primary" plain>To 子集详情页面</el-button>
				<el-button
					type="danger"
					:icon="Delete"
					plain
					:disabled="!scope.isSelected"
				>
					批量删除用户
				</el-button>
			</template>
			<!-- <template #expand="scope">
					{{ scope.row }}
				</template> -->

			<template #usernameHeader="scope">
				<el-button
					type="primary"
					@click="ElMessage.success('我是通过作用域插槽渲染的表头')"
				>
					{{ scope.row.label }}
				</el-button>
			</template>
			<!-- 
				<template #createTime="scope">
					<el-button
						type="primary"
						link
						@click="ElMessage.success('我是通过作用域插槽渲染的内容')"
					>
						{{ scope.row.createTime }}
					</el-button>
				</template> -->
			<!-- <template #operation="scope">
					<el-button
						type="primary"
						link
						:icon="View"
						@click="openDrawer('查看', scope.row)"
					>
						查看
					</el-button>
					<el-button
						type="primary"
						link
						:icon="EditPen"
						@click="openDrawer('编辑', scope.row)"
					>
						编辑
					</el-button>
					<el-button
						type="primary"
						link
						:icon="Refresh"
						@click="resetPass(scope.row)"
					>
						重置密码
					</el-button>
					<el-button
						type="primary"
						link
						:icon="Delete"
						@click="deleteAccount(scope.row)"
					>
						删除
					</el-button>
				</template> -->
		</ProTable>
		<!-- <UserDrawer ref="drawerRef" />
			<ImportExcel ref="dialogRef" /> -->
	</div>
</template>

<script setup lang="tsx">
import { ref, reactive } from 'vue';
import { CirclePlus, Delete, Download, Upload } from '@element-plus/icons-vue';
import { ElMessage } from 'element-plus';

import { User } from '@/api/interface';
import { ColumnProps } from '../interface';

import ProTable from '../component/ProTable.vue';

import { getUserList } from '@/api/modules/user';

const proTable = ref();

const initParam = reactive({ type: 1 });

const dataCallback = (data: any) => {
	return {
		list: data.list,
		total: data.total,
		pageNum: data.pageNum,
		pageSize: data.pageSize,
	};
};
// const drawerRef = ref(null);

// const openDrawer = (title: string, row: Partial<User.ResUserList> = {}) => {
// 	const params = {
// 		title,
// 		isView: title === '查看',
// 		row: { ...row },
// 		// api: title === '新增' ? addUser : title === '编辑' ? editUser : undefined,
// 		getTableList: proTable.value.getTableList,
// 	};
// 	drawerRef.value?.acceptParams(params);
// };
const getTableList = (params: any) => {
	let newParams = JSON.parse(JSON.stringify(params));
	// newParams.username && (newParams.username = 'custom-' + newParams.username);
	return getUserList(newParams);
};

// 表格配置项
const columns: ColumnProps<User.ResUserList>[] = [
	{ type: 'selection', fixed: 'left', width: 80 },
	{ type: 'index', label: '#', width: 80 },
	{ type: 'expand', label: 'Expand', width: 100 },
	{
		prop: 'username',
		label: '用户姓名',
		search: { el: 'input' },
		render: (scope) => {
			return (
				<el-button
					type="primary"
					link
					onClick={() => ElMessage.success('我是通过 tsx 语法渲染的内容')}
				>
					{scope.row.username}
				</el-button>
			);
		},
	},
	{ prop: 'user.detail.age', label: '年龄', search: { el: 'input' } },
	{ prop: 'idCard', label: '身份证号', search: { el: 'input' } },
	{ prop: 'email', label: '邮箱' },
	{ prop: 'address', label: '居住地址' },
	{
		prop: 'status',
		label: '用户状态',
		// enum: getUserStatus,
		search: { el: 'tree-select', props: { filterable: true } },
		fieldNames: { label: 'userLabel', value: 'userStatus' },
		// render: (scope) => {
		// 	return (
		// 		<>
		// 			{BUTTONS.value.status ? (
		// 				<el-switch
		// 					model-value={scope.row.status}
		// 					active-text={scope.row.status ? '启用' : '禁用'}
		// 					active-value={1}
		// 					inactive-value={0}
		// 					onClick={() => changeStatus(scope.row)}
		// 				/>
		// 			) : (
		// 				<el-tag type={scope.row.status ? 'success' : 'danger'}>
		// 					{scope.row.status ? '启用' : '禁用'}
		// 				</el-tag>
		// 			)}
		// 		</>
		// 	);
		// },
	},
	{
		prop: 'createTime',
		label: '创建时间',
		// headerRender,
		width: 180,
		search: {
			el: 'date-picker',
			span: 2,
			props: { type: 'datetimerange', valueFormat: 'YYYY-MM-DD HH:mm:ss' },
			defaultValue: ['2022-11-12 11:35:00', '2022-12-12 11:35:00'],
		},
	},
	{ prop: 'operation', label: '操作', fixed: 'right', width: 330 },
];
</script>

<style scoped></style>
