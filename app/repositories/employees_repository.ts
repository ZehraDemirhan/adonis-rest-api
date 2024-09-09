import Employee from "#models/employee";
import db from '@adonisjs/lucid/services/db';

export default class EmployeeRepository {
	public async paginate(page: number, perPage: number) {
		return db
			.from('employees')
			.join('companies', 'employees.company_id', 'companies.id') // joining on company_id and id
			.select('employees.*') // select the required fields
			.select('companies.name as company_name')
			.orderBy('employees.created_at', 'desc')
			.paginate(page, perPage);
	}

	public async findById(id: number) {
		return Employee.findOrFail(id);
	}

	public async create(data: any) {
		return Employee.create(data);
	}

	public async update(id: number, data: any) {
		const employee = await this.findById(id);
		employee.merge(data);
		await employee.save();
		return employee;
	}

	public async delete(id: number) {
		const employee = await this.findById(id);
		await employee.delete();
		return employee;
	}
}
