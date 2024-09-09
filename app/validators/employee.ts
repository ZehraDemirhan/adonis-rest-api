import vine from '@vinejs/vine'

/**
 * Validates employee adding action
 */
export const createEmployeeValidator = vine.compile(
	vine.object({
		first_name: vine.string().trim().minLength(1).maxLength(15),
		last_name: vine.string().trim().minLength(3),
		email: vine.string().trim().email(),
		company_id: vine.number(),
		phone: vine.string().trim().minLength(3),
	})
)

/**
 * Validates the employee update action
 */
export const updateEmployeeValidator = vine.compile(
	vine.object({
		first_name: vine.string().trim().minLength(1).maxLength(15),
		last_name: vine.string().trim().minLength(3),
		email: vine.string().trim().email(),
		company_id: vine.number(),
		phone: vine.string().trim().minLength(3),
	})
)