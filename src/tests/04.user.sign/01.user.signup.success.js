import * as h from '../../application/mocha/helpers/_index'
import { encryption } from '../../application/helpers/_index'

h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

const knex = h.knex.getInstance()
let shared

describe('User Sign Up success', () => {

	it('Registering user with JWT encrypted token', async () => {
		const signupPayload = { username: 'User1', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, signupPayload)

		await h.chai.post(201, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.have.property('accessToken')
		h.expect(global.response.body).to.have.property('refreshToken')
		h.expect(global.response.body.accessToken).to.be.a('string')
		h.expect(global.response.body.refreshToken).to.be.a('string')

		shared = global.response.body
	})

	it('Already used username', async () => {
		const signupPayload = { username: 'User1', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, signupPayload)

		await h.chai.post(409, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'username.conflict',
		})
	})

	it('Verify users table', async () => {
		const users = await knex('users').select('*')
		h.expect(users.length).to.be.equal(2)
		shared.user = users.find(e => e.username === 'User1')
	})

	it('Verify users_ips table', async () => {
		const users_ips = await knex('users_ips').select('*')
		h.expect(users_ips.length).to.be.equal(1)

		const userIp = users_ips[0]
		const { user_uuid } = shared.user
		h.expect(userIp.user_uuid).to.be.equal(user_uuid)
	})

	it('Verify users_jwt_refresh table', async () => {
		const users_jwt_refresh = await knex('users_jwt_refresh').select('*')
		h.expect(users_jwt_refresh.length).to.be.equal(1)

		const userJwtRefresh = users_jwt_refresh[0]
		const { user_uuid } = shared.user
		h.expect(userJwtRefresh.user_uuid).to.be.equal(user_uuid)
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
