import * as h from '../../application/mocha/helpers/_index'
import { encryption } from '../../application/helpers/_index'

h.tools.printCurrentTestFile(__filename)
const knex = h.knex.getInstance()
let shared

describe('User Sign In success', () => {

	it('Success login', async () => {
		const missmatchPassword = { username: 'TeazYou', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, missmatchPassword)

		await h.chai.post(200, '/user/signin')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.have.property('accessToken')
		h.expect(global.response.body).to.have.property('refreshToken')
		h.expect(global.response.body.accessToken).to.be.a('string')
		h.expect(global.response.body.refreshToken).to.be.a('string')

		shared = global.response.body
	})

	it('Verify users_jwt_refresh table', async () => {
		const users_jwt_refresh = await knex('users_jwt_refresh').select('*')
		h.expect(users_jwt_refresh.length).to.be.equal(1)

		const userJwtRefresh = users_jwt_refresh[0]
		const { user_uuid } = shared.user
		h.expect(userJwtRefresh.user_uuid).to.be.equal(user_uuid)
	})

	it('Retrieve user in database', async () => {
		const users = await knex('users').select('*')
		h.expect(users.length).to.be.equal(1)
		shared.user = users[0]
	})

	it('Verify access token', async () => {
		const { accessToken, user } = shared
		const verifiedAccessToken = await encryption.verifyJWT('authorisation', accessToken)
		h.expect(verifiedAccessToken).to.be.equal(user.user_uuid)
	})

	it('Verify refresh token', async () => {
		const { refreshToken, user } = shared
		const verifiedAccessToken = await encryption.verifyJWT('refresh', refreshToken)
		h.expect(verifiedAccessToken).to.be.equal(user.user_uuid)
	})

})
