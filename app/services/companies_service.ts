import { createCompanyValidator, updateCompanyValidator } from "#validators/company";
import CompanyRepository from '../repositories/company_repository.js';

export default class CompanyService {
	private companyRepo = new CompanyRepository();

	public async getCompanies(page: number | null) {
		return this.companyRepo.paginate(page, 15);
	}

	public async createCompany(data: any) {
		const validatedData = await createCompanyValidator.validate(data);
		return this.companyRepo.create(validatedData);
	}
			
	public async getCompanyById(id: number) {
		return this.companyRepo.findById(id);
	}

	public async updateCompany(id: number, data: any) {
		const validatedData = await updateCompanyValidator.validate(data);
		return this.companyRepo.update(id, validatedData);
	}

	public async deleteCompany(id: number) {
		return this.companyRepo.delete(id);
	}
}
