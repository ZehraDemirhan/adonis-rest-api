// import type { HttpContext } from '@adonisjs/core/http'

import User from '#models/user'

export default class UsersController {
	public async getAdmins({ response }: HttpContext) {
		const admins = await User.query().where('is_admin', true)
		return response.json(admins)
	}
}