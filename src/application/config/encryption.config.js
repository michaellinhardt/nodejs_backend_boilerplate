import fs from 'fs'
import crypto from 'crypto'

export const

	bcrypt = {
		saltRound: 12,
	},

	jwtoken = {
		expireTimes: {
			authorisation: MS_MINUTE * 5,
			refresh: MS_WEEK,
			encryption: MS_SECOND * 10,
		},

		issuer: 'boilerplate_backend',
		audience: 'boilerplate_backend',
		algorithm: 'RS512',
		headerAlgorithm: 'RSA-OAEP',
		headerEncryption: 'A256GCM',
		type: 'JWT',

		privateKeyObject: crypto
			.createPrivateKey(fs.readFileSync(`${__dirname}/jwtoken/private.jwtoken.key`, 'utf8')),
		publicKeyObject: crypto
			.createPublicKey(fs.readFileSync(`${__dirname}/jwtoken/public.jwtoken.key`, 'utf8')),

	}
