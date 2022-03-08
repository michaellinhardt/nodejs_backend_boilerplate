import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const UserController

= [[{ POST: '/user', PUBLIC }, class extends ControllerSuperclass {
	constructor ({ req, res }) { super({ req, res }) }
	handler () {
		this.payload.get = 'newUser'
		return this.renders.created()
	}

	async validator () {
		const decryptedPayload = this.req.decrypted_token

		this.helpers.ajv.validate('PostUserSchema', decryptedPayload)

		const isUser = await this.services.users.getByUsername(decryptedPayload.username)

		if (isUser)
			return this.renders.conflict('username.conflict')
	}
},

]]
