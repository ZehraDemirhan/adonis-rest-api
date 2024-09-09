import { createEmployeeValidator, updateEmployeeValidator } from "#validators/employee";
import EmployeeRepository from '../repositories/employees_repository.js';

export default class EmployeeService {
	private employeeRepo = new EmployeeRepository();

	public async getEmployees(page: number) {
		return this.employeeRepo.paginate(page, 15);
	}

	public async createEmployee(data: any) {
		const validatedData = await createEmployeeValidator.validate(data);
		return this.employeeRepo.create(validatedData);
	}

	public async getEmployeeById(id: number) {
		return this.employeeRepo.findById(id);
	}

	public async updateEmployee(id: number, data: any) {
		const validatedData = await updateEmployeeValidator.validate(data);
		return this.employeeRepo.update(id, validatedData);
	}

	public async deleteEmployee(id: number) {
		return this.employeeRepo.delete(id);
	}
}
