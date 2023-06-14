<template>
	<div class="login-form">
		<div class="login-logo">
			<!-- <img class="login-icon" src="@/assets/images/logo.svg" alt="" /> -->
			<h2 class="logo-text">Person-Admin</h2>
		</div>
		<div class="login-form-f">
			<el-form ref="loginFormRef" :rules="loginRules" :model="loginForm">
				<el-form-item label="账号" prop="username">
					<el-input v-model="loginForm.username">
						<template #prefix>
							<el-icon class="el-input__icon"><user /></el-icon>
						</template>
					</el-input>
				</el-form-item>
				<el-form-item label="密码" prop="password">
					<el-input type="password" v-model="loginForm.password">
						<template #prefix>
							<el-icon class="el-input__icon"><lock /></el-icon>
						</template>
					</el-input>
				</el-form-item>
			</el-form>
			<div class="login-btn">
				<el-button round size="large" @click="resetForm(loginFormRef)">
					重置
				</el-button>
				<el-button
					round
					size="large"
					@click="submitForm(loginFormRef)"
					type="primary"
					:loading="loading"
				>
					登录
				</el-button>
			</div>
		</div>
	</div>
</template>

<script setup lang="ts">
import { ref, reactive, onMounted } from 'vue';
import { useRouter } from 'vue-router';

import type { FormInstance, FormRules } from 'element-plus';
import { User, Lock } from '@element-plus/icons-vue';
import { ElNotification } from 'element-plus';
import { Login } from '@/api/interface';
import { loginApi } from '@/api';
import { userInfoStore } from '@/stores/modules/userStore';

import { HOME_URL } from '@/config';
import { getTime } from '@/utils/time';

const router = useRouter();
const loading = ref(false);
const loginForm = reactive<Login.LoginFrom>({
	username: '',
	password: '',
});
const loginRules = reactive<FormRules>({
	username: [{ required: true, message: '请输入用户名', trigger: 'blur' }],
	password: [{ required: true, message: '请输入用户名密码', trigger: 'blur' }],
});

const loginFormRef = ref<FormInstance>();

const submitForm = (formEl: FormInstance | undefined) => {
	console.log(formEl);

	console.log(loginFormRef);

	if (!formEl) return;

	console.log(formEl);
	formEl.validate(async (valid) => {
		console.log(valid);

		if (!valid) return false;

		try {
			const { data }: any = await loginApi(loginForm);

			const userStore = userInfoStore();

			userStore.setToken(data.jwt_token);

			ElNotification({
				title: getTime(),
				message: '欢迎您，主人，尽管吩咐',
				type: 'success',
				duration: 3000,
			});

			router.push(HOME_URL);
		} finally {
			loading.value = false;
		}
	});
};
const resetForm = (formEl: FormInstance | undefined) => {
	if (!formEl) return;
	formEl.resetFields();
};

onMounted(() => {
	document.onkeydown = (e: KeyboardEvent) => {
		e = (window.event as KeyboardEvent) || e;
		if (e.code === 'Enter' || e.code === 'enter' || e.code === 'NumpadEnter') {
			if (loading.value) return;
			submitForm(loginFormRef.value);
		}
	};
});
</script>

<style scoped>
@import './LoginBox.scss';
</style>
