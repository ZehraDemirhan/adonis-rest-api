import { BaseSeeder } from '@adonisjs/lucid/seeders'
import fs from 'fs'
import axios from 'axios'
import path from 'path'
import { promisify } from 'util'

import { faker } from '@faker-js/faker'

import Employee from '#models/employee'
import Company from '#models/company'

export default class extends BaseSeeder {
	async run() {
		// Initialize 50 companies
		for (let i = 0; i < 50; i++) {

			// Define the file name and the path where the logo will be saved
			const fileName = `${faker.string.alphanumeric(10)}.jpg`
		
			// Create a folder in the projects app folder to store the logos
			const __dirname = import.meta.dirname;

			const dirPath = path.join(__dirname, '../../app/uploads/logos')

			await promisify(fs.mkdir)(dirPath, { recursive: true })

			// Download the image using axios and save it to the directory
			const response = await axios({
				url: 'https://picsum.photos/200',
				responseType: 'stream',
			})

			// Pipe the response into the file
			const writer = fs.createWriteStream(path.join(dirPath, fileName))
			response.data.pipe(writer)

			// Create the company record with the path to the logo
			await Company.create({
				name: faker.company.name(),
				email: faker.internet.email(),
				logo: `/uploads/logos/${fileName}`, // Store the path relative to the public directory
				website: faker.internet.url(),
			})
		}

	// Intialize 300 employees, each employee is associated with a company
	for (let i = 0; i < 300; i++) {
		await Employee.create(
		{
			first_name: faker.person.firstName(),
			last_name: faker.person.lastName(),
			email: faker.internet.email(),
			company_id: faker.helpers.rangeToNumber({ min: 1, max: 50 }),
			phone: faker.phone.number(),
		})

	}}
}