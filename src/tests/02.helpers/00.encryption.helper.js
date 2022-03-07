import { expect } from 'chai'
import * as appHelpers from '../../application/helpers/_index'
import * as h from '../../application/mocha/helpers/_index'
import * as config from '../../application/config/_index'

h.tools.printCurrentTestFile(__filename)

const { encryption } = appHelpers

describe('Testing encryption helper', () => {

	it(`Generate pair key, algo ${config.encryption.jwtoken.algorithm}`, async () => {
		const { privateKey, publicKey } = await encryption
			.generateKeyPair(config.encryption.jwtoken.algorithm)

		expect(privateKey).to.be.a('string')
		expect(publicKey).to.be.a('string')

		expect(publicKey.startsWith('-----BEGIN RSA PUBLIC KEY-----')).to.be.equal(true)
		expect(publicKey.endsWith('-----END RSA PUBLIC KEY-----\n')).to.be.equal(true)

		expect(privateKey.startsWith('-----BEGIN RSA PRIVATE KEY-----')).to.be.equal(true)
		expect(privateKey.endsWith('-----END RSA PRIVATE KEY-----\n')).to.be.equal(true)
	})

	it('Password hash and compare', async () => {
		const password = '12345678'
		const pwdHashed = await encryption.passwordHash(password)

		const similarPasswordPromise = encryption.passwordCompare(password, pwdHashed)
		const notSimilarPasswordPromise = encryption.passwordCompare('87654321', pwdHashed)

		const [similarPassword, notSimilarPassword]
		= await Promise.all([similarPasswordPromise, notSimilarPasswordPromise])

		expect(similarPassword).to.be.equal(true)
		expect(notSimilarPassword).to.be.equal(false)

	})

	it('Sign and Verify JWT authorisation', async () => {
		const userUuidAuthorisation = 'user_uuid_authorisation'
		const token = await encryption.signJWT('authorisation', userUuidAuthorisation, {})
		const payloadSubject = await encryption.verifyJWT('authorisation', token)
		expect(payloadSubject).to.be.equal(userUuidAuthorisation)
	})

	it('Sign and Verify JWT refresh', async () => {
		const userUuidRefresh = 'user_uuid_refresh'
		const token = await encryption.signJWT('refresh', userUuidRefresh, {})
		const payloadSubject = await encryption.verifyJWT('refresh', token)
		expect(payloadSubject).to.be.equal(userUuidRefresh)
	})

	it('Encrypt and Decrypt JWT', async () => {
		const userUuid = 'user_uuid_encrypt'
		const payload = { password: '12345678' }
		const token = await encryption.encryptJWT(userUuid, payload)
		const decryptedPayload = await encryption.decryptJWT(token)
		expect(decryptedPayload.sub).to.be.equal(userUuid)
		expect(decryptedPayload.password).to.be.equal(payload.password)
	})

})
