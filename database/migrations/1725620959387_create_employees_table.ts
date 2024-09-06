import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
	protected tableName = 'employees'

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id')

			// First name of the employee
			table.string('first_name');

			// Last name of the employee
			table.string('last_name');

			// Email of the employee
			table.string('email');

			// Phone number of the employee
			table.string('phone');

			// Company of the employee
			table.integer('company_id').unsigned().references('id').inTable('companies').onDelete('CASCADE')
			
			table.timestamp('created_at')
			table.timestamp('updated_at')
		})
	}

	async down() {
		this.schema.dropTable(this.tableName)
	}
}