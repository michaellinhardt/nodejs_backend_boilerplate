import * as h from '../application/helpers/_index'

export const
	username = h.schema.string(3, 24),
	password = h.schema.string(6, 24),

	passwordPattern = h.schema.pattern(
		'password',
		'^\\S+$',
		'password.regExp'),

	usernamePattern = h.schema.pattern(
		'username',
		'^[^0-9]\\w+$',
		'username.regExp')
