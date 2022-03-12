import { ServiceSuperclass } from '../application/superclass/service.superclass.js'

export class UsersJwtService extends ServiceSuperclass {

	async generateAccessRefreshPair (user_uuid) {
		const { helpers: h } = this

		const [refreshToken, accessToken]
		= await Promise.all([
			h.encryption.signJWT('refresh', user_uuid),
			h.encryption.signJWT('authorisation', user_uuid),
		])
		return { refreshToken, accessToken }
	}

	saveRefreshToken (user_uuid, token_uuid) {
		const { models: m } = this

		const token = { token_uuid, user_uuid }
		return m.usersJwtRefresh.add(token)
	}
}
