<template>
	<div class="login">
		<div>
			<CarModel />
		</div>
		<div>
			<div class="login-box"><LoginBox /></div>
		</div>
	</div>
</template>

<script setup lang="ts">
import CarModel from './component/Car3d.vue';
import LoginBox from './component/LoginBox.vue';
</script>

<style scoped>
@import './index.scss';
</style>
