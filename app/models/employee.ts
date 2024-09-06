import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Employee extends BaseModel {
	@column({ isPrimary: true })
	declare id: number

	// First name of the employee
	@column()
	public first_name: string | undefined;

	// Last name of the employee
	@column()
	public last_name: string | undefined;

	// Email of the employee
	@column()
	public email: string | undefined;

	// Company of the employee
	@column()
	public company_id: number | undefined;
	
	// Phone number of the employee
	@column()
	public phone: string | undefined;

	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime
}