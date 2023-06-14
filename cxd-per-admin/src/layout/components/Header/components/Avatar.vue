<template>
	<el-dropdown trigger="click">
		<div class="avatar">
			<img src="" alt="avatar" />
		</div>
		<template #dropdown>
			<el-dropdown-menu>
				<el-dropdown-item>
					<el-icon><User /></el-icon>
					用户
				</el-dropdown-item>
				<el-dropdown-item>
					<el-icon><Edit /></el-icon>
					编辑用户
				</el-dropdown-item>
				<el-dropdown-item divided>
					<el-icon><SwitchButton /></el-icon>
					退出
				</el-dropdown-item>
			</el-dropdown-menu>
		</template>
	</el-dropdown>
</template>

<script setup lang="ts"></script>

<style scoped>
.avatar {
	width: 40px;
	height: 40px;
	overflow: hidden;
	cursor: pointer;
	border-radius: 50%;
}
</style>
