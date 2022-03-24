import * as h from '../../application/mocha/helpers/_index'
import { encryption } from '../../application/helpers/_index'

h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

describe('User Sign Up errors', () => {

	it('Missing encrypted_token in HTTP payload', async () => {
		await h.chai.post(400, '/user/signup').send()
		h.expect(global.response.body).to.deep.equal({
			error_key: 'jwtoken.missingProperty',
		})
	})

	it('Invalid encrypted_token in HTTP payload', async () => {
		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', 'Bearer qwdqwdqwdqwdQWFWQwfqw')
			.send()
		h.expect(global.response.body).to.deep.equal({
			error_key: 'jwtoken.invalid',
		})
	})

	it('Missing username in encryptedToken', async () => {
		const noUsernamePayload = { password: '12345678' }
		const { token } = await encryption.encryptJWT(null, noUsernamePayload)

		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'username.missingProperty',
		})
	})

	it('Missing password in encryptedToken', async () => {
		const noPasswordPayload = { username: 'Michael' }
		const { token } = await encryption.encryptJWT(null, noPasswordPayload)

		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'password.missingProperty',
		})
	})

	it('Too short username', async () => {
		const tooShortUsername = { username: 'te', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, tooShortUsername)

		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'username.minLength.3',
		})
	})

	it('Too long username', async () => {
		const tooLongPassword = {
			username: 'michael',
			password: '1234567812345678123456780',
		}
		const { token } = await encryption.encryptJWT(null, tooLongPassword)

		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'password.maxLength.24',
		})
	})

	it('Already used username', async () => {
		const alreadyUsedPayload = { username: 'teazyou', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, alreadyUsedPayload)

		await h.chai.post(409, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'username.conflict',
		})
	})

	it('Empty username', async () => {
		const emptyUsernamePayload = { username: '', password: '12345678' }
		const { token } = await encryption.encryptJWT(null, emptyUsernamePayload)

		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'username.minLength.3',
		})
	})

	it('Empty password', async () => {
		const emptyPasswordPayload = { username: 'michael', password: '' }
		const { token } = await encryption.encryptJWT(null, emptyPasswordPayload)

		await h.chai.post(400, '/user/signup')
			.set('encrypted_token', `Bearer ${token}`)
			.send()

		h.expect(global.response.body).to.deep.equal({
			error_key: 'password.minLength.6',
		})
	})

})
