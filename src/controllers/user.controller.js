import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const UserController

= [[{ POST: '/user', PUBLIC }, class extends ControllerSuperclass {
	constructor ({ req, res }) { super({ req, res }) }
	handler () {
		this.payload.get = 'mocha'
		return this.renders.created()
	}

	async validator () {
		const encryptedToken = this.req.headers.encrypted_token

		this.helpers.ajv.isNotEmpty('jwtoken', encryptedToken)
		this.helpers.ajv.isJwtoken(encryptedToken)

		const formatedToken = encryptedToken.replace('Bearer ', '')
		const decryptedPayload = await this.helpers.encryption.decryptJWT(formatedToken)

		this.helpers.ajv.validate('PostUserSchema', decryptedPayload)

		const isUser = await this.services.users.getByUsername(decryptedPayload.username)

		if (isUser)
			return this.renders.conflict('username.conflict')
	}
},

]]
