import {
	username, password, passwordPattern, usernamePattern,
} from './_property'

export const

	PostUserSchema = {
		type: 'object',
		properties: { username, password },
		required: ['username', 'password'],
	},

	PasswordPattern = passwordPattern,

	UsernamePattern = usernamePattern
