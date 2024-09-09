import { BaseSeeder } from '@adonisjs/lucid/seeders'

import { faker } from '@faker-js/faker'
import path from 'path'
import { promisify } from 'util'
import fs from 'fs'
import axios from 'axios'

import User from '#models/user'

export default class extends BaseSeeder {
	async run() {
		let fullName = faker.person.fullName();
		const __dirname = import.meta.dirname;

		const dirPath = path.join(__dirname, '../../public/avatar')

		await promisify(fs.mkdir)(dirPath, { recursive: true })
		const response = await axios({
			url: 'https://ui-avatars.com/api/?name=' + fullName + '&size=200&background=random',
			responseType: 'stream',
		})
		
		// Define the file name and the path where the image will be saved
		const fileName = `${faker.string.alphanumeric(10)}.jpg`
		const writer = fs.createWriteStream(path.join(dirPath, fileName))
		response.data.pipe(writer)

		let email = faker.internet.email();
		let password = faker.internet.password();

		// This is a dummy admin account. The credentials will be displayed in the console.
		console.log('PLEASE USE THESE CREDENTIALS TO LOGIN TO THE ADMIN ACCOUNT');
		console.log('Admin Account Credentials:');
		console.log('Email: ' + email);
		console.log('Password: ' + password);
	
		await User.create(
			{
				fullName: fullName,
				email: email,
				password: password,
				is_admin: true,
				profile_picture: `${fileName}`,
			},
		)
	}
}