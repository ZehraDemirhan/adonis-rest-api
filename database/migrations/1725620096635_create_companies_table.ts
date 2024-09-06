import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
	protected tableName = 'companies';

	async up() {
		this.schema.createTable(this.tableName, (table) => {
			table.increments('id');
			// Name of the company
			table.string('name');
			//Email of the company
			table.string('email');
			// Logo of the company
			table.string('logo');
			// Website of the company
			table.string('website');


			table.timestamp('created_at');
			table.timestamp('updated_at');
		})
	}

	async down() {
		this.schema.dropTable(this.tableName);
	}
}