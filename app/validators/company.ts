import vine from '@vinejs/vine'

/**
 * Validates company adding action
 */
export const createCompanyValidator = vine.compile(
	vine.object({
		name: vine.string().trim().minLength(3),
		email: vine.string().trim().email(),
		logo: vine.string().trim().minLength(3),
		website: vine.string().trim().minLength(3),
	})
)

/**
 * Validateds the company update action
 */
export const updateCompanyValidator = vine.compile(
	vine.object({
		name: vine.string().trim().minLength(3),
		email: vine.string().trim().email(),
		logo: vine.string().trim().minLength(3),
		website: vine.string().trim().minLength(3),
	})
)