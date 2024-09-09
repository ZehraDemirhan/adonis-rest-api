<template>
	<div class="position">
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

		<table class="table table-striped table-hover">
			<thead>
				<tr>
					<th>Logo</th>
					<th>
						Name
					</th>
					<th >
						Email

					</th>
					<th >
						Website
				
					</th>
				</tr>
			</thead>
			<tbody>
				<tr v-for="company in companies" :key="company.id">
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

		<div v-if="errors.length > 0" id="alert" class="alert-position">
			<div v-for="(error, index) in errors" :key="index" class="alert alert-danger alert-dismissible fade show" role="alert">
				{{ error.message }}
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
		</div>
		<div v-if="successMessages.length > 0" class="alert-position">
			<div v-for="(message, index) in successMessages" :key="index" class="alert alert-success alert-dismissible fade show" role="alert">
				{{ message }}
				<button type="button" class="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
			</div>
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
								<label for="name" class="form-label">Name<span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="name" v-model="name" required />
							</div>
							<div class="mb-3">
								<label for="email" class="form-label">Email <span class="text-danger">*</span></label>
								<input type="email" class="form-control" id="email" v-model="email" required />
							</div>
							<div class="mb-3">
								<label for="website" class="form-label">Website <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="website" v-model="website" required />
							</div>
							<div class="mb-3">
								<label for="logo" class="form-label">Logo Url <span class="text-danger">*</span></label>
								<input type="text" class="form-control" id="logo" v-model="logo" required />
							</div>
							
							<button type="submit" class="btn btn-success" :class="{ disabled: !submitting }">Submit</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import { HttpClientAuth } from '@/utils/httpClient';

export default {
	data() {
		return {
			companies: [],
			page: 1,
			totalPages: 1,
			name: '',
			email: '',
			website: '',
			errors: [],
			successMessages: [],
			logo: '',
			submitting: false,
		};
	},
	mounted() {
		this.page = parseInt(this.$route.query.page, 10) || 1;
		this.fetchCompanies();
	},
	methods: {
		async fetchCompanies(page = this.page) {
			try {
				console.log("page", page);
				const response = await HttpClientAuth.get(`http://localhost:3333/companies?page=${page}`);
				this.companies = response.data.data;
				this.page = page;
				this.totalPages = Math.ceil(response.data.meta.total / 15); // As we return 15 items per page
				console.log(this.companies);
				// Update the query parameter with the current page
				this.$router.push({ path: '/companies', query: { page } });
			} catch (error) {
				console.error(error);
			}
		},
		async createCompany() {
			this.errors = [];
			this.successMessages = [];
			this.submitting = true;
			try {
				const newCompany = {
					name: this.name,
					email: this.email,
					website: this.website,
					logo: this.logo,
				};
				await HttpClientAuth.post('http://localhost:3333/companies', newCompany);
				this.submitting = false;
				this.name = '';
				this.email = '';
				this.website = '';
				this.logo = '';
				this.fetchCompanies();
				this.successMessages.push('Company added successfully');
			} catch (error) {
				this.submitting = false;
				this.errors = error.response.data.errors;
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

	td {
		vertical-align: middle;
		word-break: break-all;
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
