import { HttpContext } from "@adonisjs/core/http";

import { createEmployeeValidator, updateEmployeeValidator } from "#validators/employee";
import Employee from "#models/employee";

export default class EmployeesController {
	public async index({ request }: HttpContext) {
		// Paginate the employees by 15
		const page = request.input('page', 1);
		const employees = await Employee.query().paginate(page, 15);
		return employees;
	}

	public async store({ request, response }: HttpContext) {
		const body = request.body();
		const validatedData = await createEmployeeValidator.validate(body);
		const employee = await Employee.create(validatedData); // Create and save
		response.status(201);
		return employee
	}
			
	public async show({ params }: HttpContext) {
		return Employee.findOrFail(params.id) // Find by id or fail, if nothing found throw an exception
	}

	public async update({ params, request }: HttpContext) {
		const body = request.body();
		const validatedData = await updateEmployeeValidator.validate(body);
		const employee = await Employee.findOrFail(params.id);
		employee.merge(validatedData);
		await employee.save();
		return employee;
	}

	public async destroy({ params, response }: HttpContext) {
		const employee = await Employee.findOrFail(params.id);

		response.status(204);
	
		return employee.delete();
	
	}
}