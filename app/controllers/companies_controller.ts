import { HttpContext } from "@adonisjs/core/http";
import { faker } from '@faker-js/faker';
import { promisify } from 'util';
import axios from 'axios';
import path from 'path';
import fs from 'fs';

import CompanyService from "../services/companies_service.js";

export default class CompaniesController {
	private companyService = new CompanyService();

	public async index({ request }: HttpContext) {
		const page = request.input('page') || null;
		return this.companyService.getCompanies(page);
	}

	public async store({ request, response }: HttpContext) {
		const body = request.body();
		
		const __dirname = import.meta.dirname;

		const dirPath = path.join(__dirname, '../../public/logos')

		await promisify(fs.mkdir)(dirPath, { recursive: true })
		try {
			// Take the logo from the request and send a request to fetch the image from the URL and write it to public/logos
			let logoURL = body.logo;
			const image = await axios({
				url: logoURL,
				responseType: 'stream',
			})

			if (!image.headers['content-type'].includes('image')) {
				return response.status(400).json({ message: 'Invalid URL' });
			}
			
			const fileName = `${faker.string.alphanumeric(10)}.jpg`
			body.logo = fileName;

			const writer = fs.createWriteStream(path.join(dirPath, fileName))
			image.data.pipe(writer);

			const company = await this.companyService.createCompany(body);
			
			response.status(201);
			return company;
		} catch (error) {
			return response.status(400).json({ message: 'Invalid URL' });
		}
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
