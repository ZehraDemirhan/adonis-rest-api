import { HttpContext } from "@adonisjs/core/http";

import CompanyService from "../services/companies_service.js";

export default class CompaniesController {
	private companyService = new CompanyService();

	public async index({ request }: HttpContext) {
		const page = request.input('page') || 1;
		return this.companyService.getCompanies(page);
	}

	public async store({ request, response }: HttpContext) {
		const body = request.body();
		const company = await this.companyService.createCompany(body);
		response.status(201);
		return company;
	}

	public async show({ params }: HttpContext) {
		return this.companyService.getCompanyById(params.id);
	}

	public async update({ params, request }: HttpContext) {
		const body = request.body();
		return this.companyService.updateCompany(params.id, body);
	}

	public async destroy({ params, response }: HttpContext) {
		await this.companyService.deleteCompany(params.id);
		response.status(204);
		return;
	}
}
