import { HttpContext } from "@adonisjs/core/http";

import { createCompanyValidator, updateCompanyValidator } from "#validators/company";
import Company from "#models/company";

export default class CompaniesController {
	public async index({ request }: HttpContext) {
		// Paginate the companies by 15
		const page = request.input('page', 1);
		const companies = await Company.query().paginate(page, 15);
		return companies;
	}

	public async store({ request, response }: HttpContext) {
		const body = request.body();
		const validatedData = await createCompanyValidator.validate(body);
		const company = await Company.create(validatedData); // Create and save
		response.status(201);
		return company;
	}

	public async show({ params }: HttpContext) {
		return Company.findOrFail(params.id) // Find by id or fail, if nothing found throw an exception
	}

	public async update({ params, request }: HttpContext) {
		const body = request.body();
		const validatedData = await updateCompanyValidator.validate(body);
		const company = await Company.findOrFail(params.id);
		company.merge(validatedData);
		await company.save();
		return company;
	}

	public async destroy({ params, response }: HttpContext) {
		const company = await Company.findOrFail(params.id);

		response.status(204);
	
		return company.delete();
		
	}
}