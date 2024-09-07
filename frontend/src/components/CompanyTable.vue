<template>
	<div>
		<div class="d-flex align-items-center justify-content-between">
			<h2>Companies</h2>
			<button
				type="button"
				class="btn btn-primary float-end mb-3 d-flex align-items-center justify-content-center"
				data-bs-toggle="modal"
				data-bs-target="#companyModal"
			>
				Add Company
			</button>
		</div>

		<div class="mb-3">
			<input
				type="text"
				class="form-control"
				placeholder="Search companies..."
				v-model="searchQuery"
				@input="filterCompanies"
			/>
		</div>

		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Logo</th>
					<th @click="sortTable('name')" style="cursor: pointer">
						Name
						<i v-if="sortKey === 'name'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('email')" style="cursor: pointer">
						Email
						<i v-if="sortKey === 'email'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
					<th @click="sortTable('website')" style="cursor: pointer">
						Website
						<i v-if="sortKey === 'website'" :class="sortOrder === 'asc' ? 'bi bi-caret-up-fill' : 'bi bi-caret-down-fill'" class="sort-icon"></i>
						<i v-else class="bi bi-caret-up-down sort-icon"></i>
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="company in filteredCompanies" :key="company.id">
					<td>
						<img :src="`http://localhost:3333/logos/${company.logo}`" alt="logo" class="round-logo" />
					</td>
					<td>{{ company.name }}</td>
					<td>{{ company.email }}</td>
					<td><a :href="company.website" target="_blank">{{ company.website }}</a></td>
				</tr>
			</tbody>
		</table>

		<div class="d-flex justify-content-center">
			<nav aria-label="Page navigation">
				<ul class="pagination">
					<li class="page-item" :class="{ disabled: page === 1 }">
						<a class="page-link" href="#" @click.prevent="fetchCompanies(page - 1)">Previous</a>
					</li>
					<li class="page-item" v-for="n in totalPages" :key="n" :class="{ active: page === n }">
						<a class="page-link" href="#" @click.prevent="fetchCompanies(n)">{{ n }}</a>
					</li>
					<li class="page-item" :class="{ disabled: page === totalPages }">
						<a class="page-link" href="#" @click.prevent="fetchCompanies(page + 1)">Next</a>
					</li>
				</ul>
			</nav>
		</div>

		<div class="modal fade" id="companyModal" tabindex="-1" aria-labelledby="companyModalLabel" aria-hidden="true">
			<div class="modal-dialog">
				<div class="modal-content">
					<div class="modal-header">
						<h5 class="modal-title" id="companyModalLabel">Add New Company</h5>
						<button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
					</div>
					<div class="modal-body">
						<form @submit.prevent="createCompany">
							<div class="mb-3">
								<label for="name" class="form-label">Name</label>
								<input type="text" class="form-control" id="name" v-model="name" required />
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">Email</label>
								<input type="email" class="form-control" id="email" v-model="email" required />
							</div>
							<div class="mb-3">
								<label for="website" class="form-label">Website</label>
								<input type="text" class="form-control" id="website" v-model="website" required />
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
			companies: [],
			filteredCompanies: [],
			page: 1,
			totalPages: 1,
			name: '',
			email: '',
			website: '',
			searchQuery: '',
			sortKey: '',
			sortOrder: 'asc',
		};
	},
	mounted() {
		this.fetchCompanies();
	},
	methods: {
		async fetchCompanies(page = 1) {
			try {
				const response = await axios.get(`http://localhost:3333/companies?page=${page}`);
				this.companies = response.data.data;
				this.page = page;
				this.totalPages = Math.ceil(response.data.meta.total / 15); // As we return 15 items per page
				this.filterCompanies();
				console.log(this.companies);
			} catch (error) {
				console.error(error);
			}
		},
		filterCompanies() {
			const query = this.searchQuery.toLowerCase();
			this.filteredCompanies = this.companies.filter((company) =>
				company.name.toLowerCase().includes(query) ||
				company.email.toLowerCase().includes(query) ||
				company.website.toLowerCase().includes(query)
			);
			this.sortCompanies();
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
			this.sortCompanies();
		},
		sortCompanies() {
			this.filteredCompanies.sort((a, b) => {
				let result = 0;
				if (a[this.sortKey] < b[this.sortKey]) {
					result = -1;
				} else if (a[this.sortKey] > b[this.sortKey]) {
					result = 1;
				}
				return this.sortOrder === 'asc' ? result : -result;
			});
		},
		async createCompany() {
			try {
				const newCompany = {
					name: this.name,
					email: this.email,
					website: this.website,
				};
				await axios.post('http://localhost:3333/companies', newCompany);
				this.name = '';
				this.email = '';
				this.website = '';
				this.fetchCompanies();
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

	.round-logo {
		width: 50px;
		border-radius: 50%;
	}

	th:hover .sort-icon {
		display: inline;
	}

	td {
		vertical-align: middle;
	}
</style>
