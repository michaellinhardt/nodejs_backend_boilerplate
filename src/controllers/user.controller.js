import * as h from '../application/helpers/_index'
import * as s from '../services/_index'

export const UserController

= [[{ POST: '/user', PUBLIC }, function handler () {
	this.payload.get = 'mocha'
	return this.render(200)

}, async function validator () {
	const encryptedToken = this.req.headers.encrypted_token

	h.ajv.isNotEmpty('jwtoken', encryptedToken)
	h.ajv.isJwtoken(encryptedToken)

	const formatedToken = encryptedToken.replace('Bearer ', '')
	const decryptedPayload = await h.encryption.decryptJWT(formatedToken)

	h.ajv.validate('PostUserSchema', decryptedPayload)

	const isUser = s.users.getByUsername(decryptedPayload.username)
	if (isUser)
		throw new h.errors.Conflict('username.conflict')
}]]
