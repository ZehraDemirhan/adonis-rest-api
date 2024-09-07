<template>
	<div>
		<div class="d-flex align-items-center justify-content-between">
			<h2>Employees</h2>
			<button
				type="button"
				class="btn btn-primary float-end mb-3"
				data-bs-toggle="modal"
				data-bs-target="#employeeModal"
			>
				Add Employee
			</button>
		</div>

		<div class="mb-3">
			<input
				type="text"
				class="form-control"
				placeholder="Search employees..."
				v-model="searchQuery"
				@input="filterEmployees"
			/>
		</div>

		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th @click="sortTable('firstName')" style="cursor: pointer">
						First Name
						<i v-if="sortKey === 'firstName'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('lastName')" style="cursor: pointer">
						Last Name
						<i v-if="sortKey === 'lastName'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('email')" style="cursor: pointer">
						Email
						<i v-if="sortKey === 'email'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('companyId')" style="cursor: pointer">
						Company
						<i v-if="sortKey === 'companyId'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('phone')" style="cursor: pointer">
						Phone
						<i v-if="sortKey === 'phone'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('createdAt')" style="cursor: pointer">
						Joined
						<i v-if="sortKey === 'createdAt'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="employee in filteredEmployees" :key="employee.id">
					<td>{{ employee.firstName }}</td>
					<td>{{ employee.lastName }}</td>
					<td>{{ employee.email }}</td>
					<td>{{ employee.companyId }}</td>
					<td>{{ employee.phone }}</td>
					<td>{{ formatDate(employee.createdAt) }}</td>
				</tr>
			</tbody>
		</table>

		<div class="d-flex justify-content-center">
			<nav aria-label="Page navigation">
				<ul class="pagination">
					<li class="page-item" :class="{ disabled: page === 1 }">
						<a class="page-link" href="#" @click.prevent="fetchEmployees(page - 1)">Previous</a>
					</li>
					<li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: page === n }">
						<a class="page-link" href="#" @click.prevent="fetchEmployees(n)">{{ n }}</a>
					</li>
					<li class="page-item" :class="{ disabled: page === totalPages }">
						<a class="page-link" href="#" @click.prevent="fetchEmployees(page + 1)">Next</a>
					</li>
				</ul>
			</nav>
		</div>

		<div class="modal fade" id="employeeModal" tabindex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="employeeModalLabel">Add New Employee</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="createEmployee">
							<div class="mb-3">
								<label for="name" class="form-label">Name</label>
								<input type="text" class="form-control" id="name" v-model="name" required />
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">Email</label>
								<input type="email" class="form-control" id="email" v-model="email" required />
							</div>
							<button type="submit" class="btn btn-success">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';

export default {
	data() {
		return {
			employees: [],
			filteredEmployees: [],
			page: 1,
			totalPages: 1,
			name: '',
			email: '',
			searchQuery: '',
			sortKey: '',
			sortOrder: 'asc',
		};
	},
	mounted() {
		this.fetchEmployees();
	},
	methods: {
		async fetchEmployees(page = 1) {
			try {
				const response = await axios.get(`http://localhost:3333/employees?page=${page}`);
				this.employees = response.data.data;
				this.page = page;
				this.totalPages = Math.ceil(response.data.meta.total / 15); // As we return 15 items per page
				this.filterEmployees();
			} catch (error) {
				console.error(error);
			}
		},
		filterEmployees() {
			const query = this.searchQuery.toLowerCase();
			this.filteredEmployees = this.employees.filter((employee) =>
				employee.firstName.toLowerCase().includes(query) ||
				employee.lastName.toLowerCase().includes(query) ||
				employee.email.toLowerCase().includes(query) ||
				employee.phone.toLowerCase().includes(query)
			);
			this.sortEmployees();
		},
		sortTable(key) {
			if (this.sortKey === key) {
				// Toggle sort order
				this.sortOrder = this.sortOrder === 'asc' ? 'desc' : 'asc';
			} else {
				// Set new sort key and default to ascending order
				this.sortKey = key;
				this.sortOrder = 'asc';
			}
			this.sortEmployees();
		},
		sortEmployees() {
			this.filteredEmployees.sort((a, b) => {
				let result = 0;
				if (a[this.sortKey] < b[this.sortKey]) {
					result = -1;
				} else if (a[this.sortKey] > b[this.sortKey]) {
					result = 1;
				}
				return this.sortOrder === 'asc' ? result : -result;
			});
		},
		formatDate(dateString) {
			const options = { year: 'numeric', month: 'long', day: 'numeric' };
			return new Date(dateString).toLocaleDateString(undefined, options);
		},
		async createEmployee() {
			try {
				const newEmployee = {
					name: this.name,
					email: this.email,
				};
				await axios.post('http://localhost:3333/employees', newEmployee);
				this.name = '';
				this.email = '';
				this.fetchEmployees();
			} catch (error) {
				console.error(error);
			}
		},
	},
};
</script>

<style scoped>
.float-end {
	float: right;
}
</style>
