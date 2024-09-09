import vine from '@vinejs/vine'

export const registerValidator = vine.compile(
	vine.object({
		email: vine.string().trim().email().normalizeEmail().unique(async (db, value ) => {
			const match = await db.from('users')
				.select('id')
				.where('email', value)
				.first();

			return !match;
		}),
		password: vine.string().trim().minLength(6),
	})
)

export const loginValidator = vine.compile(
	vine.object({
		email: vine.string().trim().email(),
		password: vine.string().trim().minLength(6),
	})
)