<template>
	<div>
		<el-row>
			<el-col :span="24">
				<div class="statistic-card">
					<el-statistic :value="98500">
						<template #title>
							<div style="display: inline-flex; align-items: center">
								活跃人数
								<el-tooltip
									effect="dark"
									content="提示：一天的访问量"
									placement="top"
								>
									<el-icon style="margin-left: 4px" :size="12">
										<Warning />
									</el-icon>
								</el-tooltip>
							</div>
						</template>
					</el-statistic>
					<div class="statistic-footer">
						<div class="footer-item">
							<span>比昨天</span>
							<span class="green">
								24%
								<el-icon>
									<CaretTop />
								</el-icon>
							</span>
						</div>
					</div>
				</div>
			</el-col>
		</el-row>
	</div>
</template>

<script setup lang="ts">
import { CaretTop, Warning } from '@element-plus/icons-vue';
</script>

<style scoped lang="scss">
:global(h2#card-usage ~ .example .example-showcase) {
	background-color: var(--el-fill-color) !important;
}

.el-statistic {
	--el-statistic-content-font-size: 28px;
}

.statistic-card {
	height: 100%;
	padding: 20px;
	border-radius: 4px;
	background-color: var(--el-bg-color-overlay);
}

.statistic-footer {
	display: flex;
	justify-content: space-between;
	align-items: center;
	flex-wrap: wrap;
	font-size: 12px;
	color: var(--el-text-color-regular);
	margin-top: 16px;
}

.statistic-footer .footer-item {
	display: flex;
	justify-content: space-between;
	align-items: center;
}

.statistic-footer .footer-item span:last-child {
	display: inline-flex;
	align-items: center;
	margin-left: 4px;
}

.green {
	color: var(--el-color-success);
}
.red {
	color: var(--el-color-error);
}
</style>
