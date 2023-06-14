<template>
	<div class="dashboard">
		<div class="dashboard-card">
			<el-row :gutter="16">
				<el-col
					v-for="(card, cardIndex) in cardNum"
					:xs="24"
					:sm="12"
					:md="12"
					:lg="12"
					:xl="6"
					:key="card.name"
				>
					<el-card class="box-card">
						<template #header>
							<div class="card-header">
								<span>{{ card.name }}</span>
							</div>
						</template>

						<div class="card-echart">
							<component :is="dashboard[cardIndex]"></component>
						</div>
					</el-card>
				</el-col>
			</el-row>
		</div>
		<div class="dashboard-antv">
			<el-card class="box-card">
				<el-row :span="24">
					<el-col>
						<Antvl7 />
					</el-col>
				</el-row>
			</el-card>
		</div>
		<div></div>
		<div></div>
	</div>
</template>

<script setup lang="ts">
// import { ref, onMounted } from 'vue';
import DashboardCard from './component/DashboardCard.vue';
import DashboardWeek from './component/DashboardWeek.vue';
import DashboardMoon from './component/DashboardMoon.vue';
import DashboardTotal from './component/DashboardTotal.vue';
import Antvl7 from './component/antvl7.vue';

const dashboard = [DashboardCard, DashboardWeek, DashboardMoon, DashboardTotal];

const cardNum = [
	{ name: '日访问量' },
	{ name: '周访问量' },
	{ name: '月访问量' },
	{ name: '年访问量' },
];
</script>

<style scoped>
.el-col {
	border-radius: 4px;
}

.grid-content {
	border-radius: 4px;
	min-height: 36px;
}

.card-echart {
	min-height: 200px;
}
.dashboard-antv {
	height: 80vh;
}
</style>
