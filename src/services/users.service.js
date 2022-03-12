import { ServiceSuperclass } from '../application/superclass/service.superclass.js'

export class UsersService extends ServiceSuperclass {

	async hashUserPassword (password) {
		const { helpers: h } = this
		const encryptedPassword = await h.encryption.passwordHash(password)
		return encryptedPassword
	}

	getByUsername (username) {
		const { models: m } = this

		return m.users.getFirstWhere({ username })
	}

	saveNewUser (username, encryptedPassword) {
		const { models: m } = this

		const newUser = {
			user_uuid: this.helpers.encryption.uuid(),
			username,
			password: encryptedPassword,
		}
		return m.users.add(newUser)
	}
}
