import { HttpContext } from "@adonisjs/core/http";
import EmployeeService from "../services/employees_service.js";

export default class EmployeesController {
	private employeeService = new EmployeeService();

	public async index({ request }: HttpContext) {
		const page = parseInt(request.input('page', '1'), 10) || 1;
		return this.employeeService.getEmployees(page);
	}

	public async store({ request, response }: HttpContext) {
		const body = request.body();
		const employee = await this.employeeService.createEmployee(body);
		response.status(201);
		return employee;
	}

	public async show({ params }: HttpContext) {
		return this.employeeService.getEmployeeById(params.id);
	}

	public async update({ params, request }: HttpContext) {
		const body = request.body();
		return this.employeeService.updateEmployee(params.id, body);
	}

	public async destroy({ params, response }: HttpContext) {
		await this.employeeService.deleteEmployee(params.id);
		response.status(204);
		return;
	}
}
