<template>
	<div class="position">
		<div class="d-flex align-items-center justify-content-between">
			<h2>Employees</h2>
			<button
				@click="isEditMode = false; clearForm()"
				type="button"
				class="btn btn-primary float-end"
				data-bs-toggle="modal"
				data-bs-target="#employeeModal"
			>
				Add Employee
			</button>
		</div>

		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>
						First Name
					</th>
					<th>
						Last Name
					</th>
					<th>
						Email
					</th>
					<th>
						Company
					</th>
					<th>
						Phone
					</th>
					<th>
						Joined
					</th>
					<th>Actions</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="employee in employees" :key="employee.id">
					<td>{{ employee.first_name }}</td>
					<td>{{ employee.last_name }}</td>
					<td>{{ employee.email }}</td>
					<td>{{employee.company_name}}</td>
					<td>{{ employee.phone }}</td>
					<td>{{ formatDate(employee.created_at) }}</td>
					<td class="actions-td">
						<button @click="isEditMode = true; setEmployeeData(employee)"
							class="btn btn-sm btn-warning text-white ms-1"
							data-bs-toggle="modal"
							data-bs-target="#employeeModal">
							<i class="bi bi-pencil-square"></i>
						</button>
						<button @click="deleteEmployee(employee.id)" class="btn btn-sm btn-danger ms-2">
							<i class="bi bi-trash"></i>
						</button>
					</td>
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

		<div v-if="errors.length > 0" id="alert" class="alert-position">
			<div v-for="(error, index) in errors" :key="index" class="alert alert-danger alert-dismissible fade show" role="alert">
				{{ error.message }}
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		</div>
		<div v-if="successMessages.length > 0" class="alert-position">
			<div v-for="(message, index) in successMessages" :key="index" class="alert alert-success alert-dismissible fade show" role="alert">
				{{ message.message }}
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		</div>

		<div class="modal fade" id="employeeModal" tabindex="-1" aria-labelledby="employeeModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="employeeModalLabel">{{isEditMode ? 'Edit Employee' : 'Add New Employee'}}</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="takeEmployeeAction">
							<div class="mb-3">
								<label for="firstName" class="form-label">First Name <span class="text-danger">*</span></label>
								<input
									type="text"
									class="form-control"
									id="firstName"
									v-model="firstName"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="lastName" class="form-label">Last Name <span class="text-danger">*</span></label>
								<input
									type="text"
									class="form-control"
									id="lastName"
									v-model="lastName"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">Email <span class="text-danger">*</span></label>
								<input
									type="email"
									class="form-control"
									id="email"
									v-model="email"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="phone" class="form-label">Phone <span class="text-danger">*</span></label>
								<input
									type="tel"
									class="form-control"
									id="phone"
									v-model="phone"
									required
								/>
							</div>
							<div class="mb-3">
								<label for="company" class="form-label">Company <span class="text-danger">*</span></label>
								<select
									class="form-select"
									id="company"
									v-model="companyId"
									required
								>
									<option value="" disabled>Select a company</option>
									<option v-for="company in allCompanies" :key="company.id" :value="company.id">
										{{ company.name }}
									</option>
								</select>
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
import Swal from 'sweetalert2';

export default {
	data() {
		return {
			employees: [],
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			companyId: '',
			page: 1,
			totalPages: 1,
			allCompanies: [],
			isEditMode: false,
			employeeId: null,
			errors: [],
			successMessages: [],
		};
	},
	mounted() {
		this.fetchEmployees();
		this.getAllCompanies();
	},
	methods: {
		async fetchEmployees(page = 1) {
			try {
				const response = await axios.get(`http://localhost:3333/employees?page=${page}`);
				this.employees = response.data.data;
				this.page = page;
				this.totalPages = Math.ceil(response.data.meta.total / 15);
				console.log(this.employees);
			} catch (error) {
				console.error(error);
			}
		},
		async getAllCompanies() {
			try {
				const response = await axios.get('http://localhost:3333/companies');
				console.log(response);
				this.allCompanies = response.data;
				console.log(this.allCompanies);
			} catch (error) {
				console.error("Error fetching companies:", error);
			}	
		},
		async deleteEmployee(id) {
			try {
				const result = await Swal.fire({
					title: 'Are you sure?',
					text: 'You will not be able to recover this employee!',
					icon: 'warning',
					showCancelButton: true,
					confirmButtonText: 'Yes',
					cancelButtonText: 'No',
				});

				if (result.isConfirmed) {
					await axios.delete(`http://localhost:3333/employees/${id}`);
					this.fetchEmployees();
					Swal.fire('Deleted!', 'Employee has been deleted.', 'success');
				}
			} catch (error) {
				console.error("Error deleting employee:", error);
			}
			
		},
		setEmployeeData(employee) {
			this.firstName = employee.firstName;
			this.lastName = employee.lastName;
			this.email = employee.email;
			this.phone = employee.phone;
			this.companyId = employee.companyId;
			this.employeeId = employee.id;
		},
		formatDate(dateString) {
			const date = new Date(dateString);
			return `${date.getDate()}/${date.getMonth() + 1}/${date.getFullYear()}`;
		},
		takeEmployeeAction() {
			this.errors = [];
			this.successMessages = [];
			if (this.isEditMode) {
				this.updateEmployee();
			} else {
				this.createEmployee();
			}
		},
		async updateEmployee() {
			console.log(this.companyId);
			try {
				const employeeData = {
					first_name: this.firstName,
					last_name: this.lastName,
					email: this.email,
					phone: this.phone,
					company_id: this.companyId,
				};

				await axios.put(`http://localhost:3333/employees/${this.employeeId}`, employeeData);
				// Update the current employee in the employees array
				console.log(this.employees);
				const employeeIndex = this.employees.findIndex(employee => employee.id === this.employeeId);
				console.log(employeeIndex);
				if (employeeIndex !== -1) {
					this.employees[employeeIndex] = {
						...this.employees[employeeIndex],
						firstName: this.firstName,
						lastName: this.lastName,
						email: this.email,
						phone: this.phone,
						companyId: this.companyId,
					};
				}
				console.log(this.employees);
				this.clearForm();
				this.successMessages = [{ message: 'Employee updated successfully' }];
				console.log(this.successMessages);
			} catch (error) {
				this.errors = error.response.data.errors;
				console.error("Error updating employee:", error);
			}
		},
		async createEmployee() {
			try {
				const employeeData = {
					first_name: this.firstName,
					last_name: this.lastName,
					email: this.email,
					phone: this.phone,
					company_id: this.companyId,
				};

				console.log(employeeData);
				await axios.post('http://localhost:3333/employees', employeeData);
				this.fetchEmployees();
				this.clearForm();
				this.successMessages = [{ message: 'Employee created successfully' }];
			} catch (error) {
				this.errors = error.response.data.errors;
				console.error("Error creating employee:", error);
			}
		},
		clearForm() {
			this.firstName = '';
			this.lastName = '';
			this.email = '';
			this.phone = '';
			this.companyId = '';
		}
	}
};
</script>

<style>
.actions-td {
	width: 100px;
}

td {
	vertical-align: middle;
}

.alert-position {
	position: absolute;
	top: 0;
	right: 0;
}

.position {
	position: relative;
}
</style>
