import * as h from '../../application/mocha/helpers/_index'
import { encryption } from '../../application/helpers/_index'

h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

const knex = h.knex.getInstance()
let shared

describe('User Sign In errors', () => {

	it('Registering user with JWT encrypted token', async () => {
		const signupPayload = { username: 'User1', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, signupPayload)

		await h.chai.post(201, '/user/signin')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.have.property('accessToken')
		h.expect(global.response.body).to.have.property('refreshToken')
		h.expect(global.response.body.accessToken).to.be.a('string')
		h.expect(global.response.body.refreshToken).to.be.a('string')

		shared = global.response.body
	})

})
