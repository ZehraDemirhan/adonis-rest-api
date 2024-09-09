import User from '#models/user'

import {loginValidator} from '#validators/auth'
import {registerValidator} from '#validators/auth'

export default class AuthController {
	async register ({ request }: HttpContext) {
		const { email, password } = await registerValidator.validate(request.body());

		const user = await User.create({ email, password });
		
		return User.accessTokens.create(user);
	}

	async login({ request }: HttpContext) {
		const { email, password} = await loginValidator.validate(request.body());

		const user = await User.verifyCredentials(email, password);

		return User.accessTokens.create(user);
		
	}

	async logout({ auth }: HttpContext) {
		const user = auth.user!;
		
		await User.accessTokens.delete(user, user.currentAccessToken.identifier );

		return { message: 'Logged out successfully' };
	}
}