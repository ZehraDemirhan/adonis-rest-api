<template>
	<div class="container">
		<div class="row justify-content-center">
			<div class="col-md-4">
				<h3 class="text-center mb-4">Login</h3>
				<div v-if="errorMessage" class="alert alert-danger">{{ errorMessage }}</div>
				<form @submit.prevent="handleLogin">
					<div class="mb-3">
						<label for="email" class="form-label">Email address</label>
						<input
							type="email"
							class="form-control"
							id="email"
							v-model="email"
							required
						/>
					</div>
					<div class="mb-3">
						<label for="password" class="form-label">Password</label>
						<input
							type="password"
							class="form-control"
							id="password"
							v-model="password"
							required
						/>
					</div>
					<button type="submit" class="btn btn-primary w-100">Login</button>
				</form>
			</div>
		</div>
	</div>
</template>

<script>
import AuthService from '../services/auth_service';

const authService = new AuthService('http://localhost:3333');


export default {
	data() {
		return {
			email: '',
			password: '',
			errorMessage: ''
		};
	},
	methods: {
		async handleLogin() {
			try {
				const response = await authService.login(this.email, this.password);

				if (response) {
					localStorage.setItem('user', JSON.stringify(response));
					this.$router.push('/companies');
				}
			} catch (error) {
				this.errorMessage = error.errors[0].message;
			}
			
		}
	}
};
</script>

<style>
.container {
	margin-top: 100px;
}
</style>
