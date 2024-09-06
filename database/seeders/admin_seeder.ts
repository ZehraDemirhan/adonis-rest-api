import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { faker } from '@faker-js/faker'

import User from '#models/user'

export default class extends BaseSeeder {
	async run() {
		await User.create(
			{
				fullName: faker.person.fullName(),
				email: faker.internet.email(),
				password: faker.internet.password(),
				is_admin: true,
			},
		)
	}
}