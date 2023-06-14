<template>
	<div class="header-right">
		<div class="header-icon">
			<!-- <Language id="language" />
			<Message id="message" /> -->
		</div>
		<span class="username">{{ `username` }}</span>
		<Avatar />
	</div>
</template>

<script setup lang="ts">
import Avatar from './components/Avatar.vue';
</script>

<style scoped lang="scss">
.header-right {
	display: flex;
	align-items: center;
	justify-content: center;
	padding-right: 25px;
	.header-icon {
		display: flex;
		align-items: center;
		& > * {
			margin-left: 21px;
		}
	}
	.username {
		margin: 0 20px;
		font-size: 15px;
	}
}
</style>
