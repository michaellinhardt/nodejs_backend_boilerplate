import * as appHelpers from '../../application/helpers/_index'
import * as h from '../../application/mocha/helpers/_index'
import * as config from '../../application/config/_index'

h.tools.printCurrentTestFile(__filename)

const { encryption } = appHelpers

describe('Testing encryption helper', () => {

	it(`Generate pair key, algo ${config.encryption.jwtoken.algorithm}`, async () => {
		const { privateKey, publicKey } = await encryption
			.generateKeyPair(config.encryption.jwtoken.algorithm)

		h.expect(privateKey).to.be.a('string')
		h.expect(publicKey).to.be.a('string')

		h.expect(publicKey.startsWith('-----BEGIN RSA PUBLIC KEY-----')).to.be.equal(true)
		h.expect(publicKey.endsWith('-----END RSA PUBLIC KEY-----\n')).to.be.equal(true)

		h.expect(privateKey.startsWith('-----BEGIN RSA PRIVATE KEY-----')).to.be.equal(true)
		h.expect(privateKey.endsWith('-----END RSA PRIVATE KEY-----\n')).to.be.equal(true)
	})

	it('Password hash and compare', async () => {
		const password = '12345678'
		const pwdHashed = await encryption.passwordHash(password)

		const similarPasswordPromise = encryption.passwordCompare(password, pwdHashed)
		const notSimilarPasswordPromise = encryption.passwordCompare('87654321', pwdHashed)

		const [similarPassword, notSimilarPassword]
		= await Promise.all([similarPasswordPromise, notSimilarPasswordPromise])

		h.expect(similarPassword).to.be.equal(true)
		h.expect(notSimilarPassword).to.be.equal(false)

	})

	it('Sign and Verify JWT authorisation', async () => {
		const userUuidAuthorisation = 'user_uuid_authorisation'
		const signedJWT = await encryption.signJWT('authorisation', userUuidAuthorisation, {})
		const { token, tokenUuid } = signedJWT

		const payloadSubject = await encryption.verifyJWT('authorisation', token)
		h.expect(payloadSubject).to.be.equal(userUuidAuthorisation)
		h.expect(tokenUuid).to.be.uuid('v1')
	})

	it('Sign and Verify JWT refresh', async () => {
		const userUuidRefresh = 'user_uuid_refresh'
		const signedJWT = await encryption.signJWT('refresh', userUuidRefresh, {})
		const { token, tokenUuid } = signedJWT

		const payloadSubject = await encryption.verifyJWT('refresh', token)
		h.expect(payloadSubject).to.be.equal(userUuidRefresh)
		h.expect(tokenUuid).to.be.uuid('v1')
	})

	it('Encrypt and Decrypt JWT', async () => {
		const userUuid = 'user_uuid_encrypt'
		const payload = { password: '12345678' }
		const encryptedJWT = await encryption.encryptJWT(userUuid, payload)
		const { token, tokenUuid } = encryptedJWT

		const decryptedPayload = await encryption.decryptJWT(token)
		h.expect(decryptedPayload.sub).to.be.equal(userUuid)
		h.expect(decryptedPayload.password).to.be.equal(payload.password)
		h.expect(tokenUuid).to.be.uuid('v1')
	})

})
