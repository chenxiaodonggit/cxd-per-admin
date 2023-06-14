<template>
	<div class="left-bar">
		<Breadcrumb id="breadcrumb" />
	</div>
</template>

<script setup lang="ts">
import Breadcrumb from './components/Breadcrumb.vue';
</script>

<style scoped>
.left-bar {
	display: flex;
	align-items: center;
	justify-content: center;
	overflow: hidden;
	white-space: nowrap;
}
</style>
