import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const UserController

= [[{ POST: '/user/signup', PUBLIC }, class UserSignUp extends ControllerSuperclass {
	async validator () {
		const { services: s, helpers: h } = this
		const { decrypted_token } = this.req

		h.ajv.validate('PostUserSchema', decrypted_token)

		const { username } = decrypted_token
		const isUser = await s.users.getByUsername(username)

		if (isUser)
			return this.renders.conflict('username.conflict')
	}

	async handler () {
		const { services: s, helpers: h } = this
		const { password, username } = this.req.decrypted_token

		const encryptedPassword = await s.users.hashUserPassword(password)

		const newUser = await s.users.saveNewUser(username, encryptedPassword)
		const { user_uuid } = newUser

		const user_ip = h.ip.getClientIp(this.req)

		const [, { refreshToken, accessToken }]
		= await Promise.all([
			s.usersIps.saveNewUserIP(user_uuid, user_ip),
			s.usersJwt.generateAccessRefreshPair(user_uuid),
		])

		await s.usersJwt.saveRefreshToken(user_uuid, refreshToken.tokenUuid)

		this.payload = {
			refreshToken: refreshToken.token,
			accessToken: accessToken.token,
		}
		return this.renders.created()
	}
},

]]
