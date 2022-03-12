import * as h from '../../application/mocha/helpers/_index'
import { encryption } from '../../application/helpers/_index'

h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

describe('User Sign In errors', () => {

	it('Missing encrypted_token in HTTP payload', async () => {
		await h.chai.post(400, '/user/signin').send()
		h.expect(global.response.body).to.deep.equal({
			error_key: 'jwtoken.missingProperty',
		})
	})

	it('Invalid encrypted_token in HTTP payload', async () => {
		await h.chai.post(400, '/user/signin')
			.set('encrypted_token', 'Bearer qwdqwdqwdqwdQWFWQwfqw')
			.send()
		h.expect(global.response.body).to.deep.equal({
			error_key: 'jwtoken.invalid',
		})
	})

	it('Missing username in encryptedToken', async () => {
		const noUsernamePayload = { password: '12345678' }
		const { token } = await encryption.encryptJWT(null, noUsernamePayload)

		await h.chai.post(400, '/user/signin')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'username.missingProperty',
		})
	})

	it('Missing password in encryptedToken', async () => {
		const noPasswordPayload = { username: 'TeazYou' }
		const { token } = await encryption.encryptJWT(null, noPasswordPayload)

		await h.chai.post(400, '/user/signin')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'password.missingProperty',
		})
	})

	it('No matching username', async () => {
		const noMatchingUsername = { username: 'TeazMe', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, noMatchingUsername)

		await h.chai.post(400, '/user/signin')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'usernameOrPassword.invalid',
		})
	})

	it('Missmatch password', async () => {
		const missmatchPassword = { username: 'TeazYou', password: '87654321' }
		const { token } = await encryption.encryptJWT(null, missmatchPassword)

		await h.chai.post(400, '/user/signin')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'usernameOrPassword.invalid',
		})
	})

})
