import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const UserController

= [[{ POST: '/user', PUBLIC }, class extends ControllerSuperclass {
	constructor ({ req, res }) { super({ req, res }) }
	handler () {
		this.payload.get = 'mocha'
		return this.render(200)
	}

	async validator () {
		const encryptedToken = this.req.headers.encrypted_token

		this.helpers.ajv.isNotEmpty('jwtoken', encryptedToken)
		this.helpers.ajv.isJwtoken(encryptedToken)

		const formatedToken = encryptedToken.replace('Bearer ', '')
		const decryptedPayload = await this.helpers.encryption.decryptJWT(formatedToken)

		this.helpers.ajv.validate('PostUserSchema', decryptedPayload)

		const isUser = this.services.users.getByUsername(decryptedPayload.username)

		if (isUser)
			throw new this.helpers.errors.Conflict('username.conflict')
	}
},

]]
