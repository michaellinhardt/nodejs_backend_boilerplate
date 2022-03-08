import * as h from '../helpers/_index'

export const

	decryptJWE = async (req, res, next) => {
		try {
			const encryptedToken = req.headers.encrypted_token

			h.ajv.isNotEmpty('jwtoken', encryptedToken)
			h.ajv.isJwtoken(encryptedToken)

			const formatedToken = encryptedToken.replace('Bearer ', '')
			const decryptedPayload = await h.encryption.decryptJWT(formatedToken)

			req.decrypted_token = decryptedPayload

			return next()

		} catch (error) { h.renders.catchErrorsOrRenders(res, error) }

	}
