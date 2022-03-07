import * as config from '../config/_index'
import * as jose from 'jose'
import { v1 as uuidv1 } from 'uuid'
import bcrypt from 'bcrypt'

import * as errors from '../helpers/errors.helper'

const { encryption: { jwtoken, bcrypt: { saltRound } } } = config

export const

	generateKeyPair = async (algorythm = 'RS512') => {
		const { publicKey, privateKey } = await jose.generateKeyPair(algorythm)
		const publicKeyString = publicKey.export({ type: 'pkcs1', format: 'pem' })
		const privateKeyString = privateKey.export({ type: 'pkcs1', format: 'pem' })
		return { privateKey: privateKeyString, publicKey: publicKeyString }
	},

	passwordHash = password => bcrypt.hash(password, saltRound),
	passwordCompare = (pwdToCompare, pwdEncrypted) => bcrypt.compare(pwdToCompare, pwdEncrypted),

	signJWT = (authorisationOrRefresh, userUuidAsSubject, payload = {}) => {
		const type = authorisationOrRefresh === 'refresh' ? 'refresh' : 'authorisation'
		const expireTime = Date.now() + jwtoken.expireTimes[type]
		const tokenUuid = uuidv1()
		const audience = `${jwtoken.audience}:${type}`
		const header = { alg: jwtoken.algorithm, typ: jwtoken.type }

		return new jose.SignJWT(payload)
			.setProtectedHeader(header)
			.setAudience(audience)
			.setExpirationTime(expireTime)
			.setIssuedAt()
			.setIssuer(jwtoken.issuer)
			.setJti(tokenUuid)
			.setSubject(userUuidAsSubject)
			.sign(jwtoken.privateKeyObject)
	},

	encryptJWT = (userUuidAsSubject, payload = {}) => {
		const expireTime = Date.now() + jwtoken.expireTimes.encryption
		const tokenUuid = uuidv1()
		const audience = `${jwtoken.audience}:encryption`
		const header = { alg: jwtoken.headerAlgorithm, enc: jwtoken.headerEncryption }

		return new jose.EncryptJWT(payload)
			.setProtectedHeader(header)
			.setAudience(audience)
			.setExpirationTime(expireTime)
			.setIssuedAt()
			.setIssuer(jwtoken.issuer)
			.setJti(tokenUuid)
			.setSubject(userUuidAsSubject)
			.encrypt(jwtoken.publicKeyObject)
	},

	decryptJWT = async (token) => {
		const verifyExpected = {
			audience: `${jwtoken.audience}:encryption`,
			issuer: jwtoken.issuer,
		}

		try {
			const { payload, protectedHeader }
			= await jose.jwtDecrypt(token, jwtoken.privateKeyObject, verifyExpected)

			if (protectedHeader.alg !== jwtoken.headerAlgorithm
				|| protectedHeader.enc !== jwtoken.headerEncryption)
				throw new errors.BadRequest('jwtoken.invalid')

			return payload

		} catch (error) {
			throw new errors.BadRequest('jwtoken.invalid')
		}
	},

	verifyJWT = async (authorisationOrRefresh, token) => {
		const type = authorisationOrRefresh === 'refresh' ? 'refresh' : 'authorisation'

		const verifyExpected = {
			audience: `${jwtoken.audience}:${type}`,
			issuer: jwtoken.issuer,
		}

		try {
			const { payload, protectedHeader }
			= await jose.jwtVerify(token, jwtoken.publicKeyObject, verifyExpected)

			if (protectedHeader.alg !== jwtoken.algorithm
				|| protectedHeader.typ !== jwtoken.type)
				throw new errors.BadRequest('jwtoken.invalid')

			return payload.sub

		} catch (error) {
			throw new errors.BadRequest('jwtoken.invalid')
		}
	}
