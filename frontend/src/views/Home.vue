<script>
	import CompanyTable from '@/components/CompanyTable.vue';
	import EmployeeTable from '@/components/EmployeeTable.vue';

	import AuthService from '../services/auth_service';

	import { HttpClientAuth } from '@/utils/httpClient'

	const authService = new AuthService('http://localhost:3333');

	export default {
		data() {
			return {
				view: this.$route.path.split('/')[1].trim(),
				admin: null,
			};
		},
		components: {
			CompanyTable,
			EmployeeTable,
		},
		mounted() {
			this.fetchAdminData();
		},
		methods: {
			async fetchAdminData() {
				try {
					const response = await HttpClientAuth.get('http://localhost:3333/users/admins');
					// Right now we only have one admin user
					this.admin = response.data[0];
				} catch (error) {
					console.error('Failed to fetch admin data:', error);
				}
			},
			logout() {
				authService.logout();
				this.$router.push('/login');
			},
		},
	};
</script>

<template>
	<div class="d-flex position-relative">
		<div class="sidebar bg-dark border-right text-white">
			<div class="admin-info p-3 text-center">
				<img v-if="admin" :src="`http://localhost:3333/avatar/${admin.profilePicture}`" alt="Admin Avatar" class="rounded-circle mb-3" style="width: 100px; height: 100px;" />
				<h2 v-if="admin">{{ admin.fullName }}</h2>
				<small v-if="admin">{{ admin.email }}</small>
				<p v-else>Loading admin data...</p>
			</div>
			<ul class="nav flex-column p-3">
				<li class="nav-item mb-3 list-item-hover" :class="{'active-item': view == 'companies'}">
					<router-link class="nav-link d-flex align-items-center text-white" @click="view = 'companies'" to="/companies">
						<i class="bi bi-building me-2"></i>
						<span>Company Table</span>
					</router-link>
				</li>
				<li class="nav-item mb-3 list-item-hover" :class="{'active-item': view == 'employees'}">
					<router-link class="nav-link d-flex align-items-center text-white" @click="view = 'employees'" to="/employees">
						<i class="bi bi-people-fill me-2"></i>
						<span>Employee Table</span>
					</router-link>
				</li>
				<li class="nav-item mt-auto list-item-hover position-absolute">
					<a class="nav-link d-flex align-items-center text-white" @click="logout">
						<i class="bi bi-box-arrow-right me-2"></i>
						<span>Logout</span>
					</a>
				</li>
			</ul>
		</div>

		<div class="content p-4 w-100 overflow-x">
			<router-view/>
		</div>
	</div>
</template>

<style scoped>
	.sidebar {
		width: 250px;
		height: 100vh;
		position: fixed;
		top: 0;
		left: 0;
		background-color: #f8f9fa;
	}

	.content {
		margin-left: 250px;
		width: calc(100% - 250px);
	}

	.nav-link {
		cursor: pointer;
	}

	.position-relative {
		position: relative;
	}

	.list-item-hover:hover {
		background-color: #343a40;
	}

	.overflow-x {
		overflow-x: scroll;
	}

	.active-item {
		background-color: #343a40;
	}

	.position-absolute {
		position: absolute;
		bottom: 15px;
	}
</style>
