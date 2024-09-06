import { DateTime } from 'luxon'
import { BaseModel, column } from '@adonisjs/lucid/orm'

export default class Company extends BaseModel {
	@column({ isPrimary: true })
	declare id: number

	// Name of the company
	@column()
	public name: string | undefined;

	//Email of the company
	@column()
	public email: string | undefined;

	// Logo of the company
	@column()
	public logo: string | undefined;
	
	// Website of the company
	@column()
	public website: string | undefined;


	@column.dateTime({ autoCreate: true })
	declare createdAt: DateTime

	@column.dateTime({ autoCreate: true, autoUpdate: true })
	declare updatedAt: DateTime
}