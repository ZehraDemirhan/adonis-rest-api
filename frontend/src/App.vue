<script>
	import axios from 'axios';
	import CompanyTable from './components/CompanyTable.vue';
	import EmployeeTable from './components/EmployeeTable.vue';

	export default {
		data() {
			return {
				view: 'companies',
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
					const response = await axios.get('http://localhost:3333/users/admins');
					// Right now we only have one admin user
					this.admin = response.data[0];
				} catch (error) {
					console.error('Failed to fetch admin data:', error);
				}
			},
		},
	};
</script>

<template>
	<div class="d-flex">
		<div class="sidebar bg-dark border-right text-white">
			<div class="admin-info p-3 text-center">
				<img v-if="admin" :src="`http://localhost:3333/avatar/${admin.profilePicture}`" alt="Admin Avatar" class="rounded-circle mb-3" style="width: 100px; height: 100px;" />
				<h2 v-if="admin">{{ admin.fullName }}</h2>
				<small v-if="admin">{{ admin.email }}</small>
				<p v-else>Loading admin data...</p>
			</div>
			<ul class="nav flex-column p-3 custom-height">
				<li class="nav-item mb-3">
					<a class="nav-link d-flex align-items-center text-white" @click="view = 'companies'">
						<i class="bi bi-building me-2"></i>
						<span>Company List</span>
					</a>
				</li>
				<li class="nav-item mb-3">
					<a class="nav-link d-flex align-items-center text-white" @click="view = 'employees'">
						<i class="bi bi-people-fill me-2"></i>
						<span>Employee List</span>
					</a>
				</li>
				<li class="nav-item mt-auto">
					<a class="nav-link d-flex align-items-center text-white" @click="logout">
						<i class="bi bi-box-arrow-right me-2"></i>
						<span>Logout</span>
					</a>
				</li>
			</ul>
		</div>

		<!-- Main content -->
		<div class="content p-4 w-100">
			<div v-if="view === 'companies'">
				<CompanyTable />
			</div>
			<div v-if="view === 'employees'">
				<EmployeeTable />
			</div>
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

	.custom-height {
		height: 78%;
	}
</style>
