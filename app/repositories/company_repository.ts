import Company from "#models/company";

export default class CompanyRepository {
	public async paginate(page: number | null, perPage: number) {
		// If page is not provided just return all companies only with their name and id fields
		if (!page) {
			return Company.query().select('id', 'name');
		}
		return Company.query()
			.orderBy('created_at', 'desc')
			.paginate(page, perPage);
	}

	public async findById(id: number) {
		return Company.findOrFail(id);
	}

	public async create(data: any) {
		return Company.create(data);
	}

	public async update(id: number, data: any) {
		const company = await this.findById(id);
		company.merge(data);
		await company.save();
		return company;
	}

	public async delete(id: number) {
		const company = await this.findById(id);
		await company.delete();
		return company;
	}
}
