import * as appHelpers from '../../application/helpers/_index'
import * as h from '../../application/mocha/helpers/_index'

h.tools.printCurrentTestFile(__filename)

const { ajv } = appHelpers

describe('Testing ajv helper', () => {

	it('Test validate() with missing property', () => {
		const schema = {
			type: 'object',
			properties: {
				username: { type: 'string' },
				password: { type: 'string' },
			},
			required: ['username', 'password'],
		}
		ajv.addSchema(schema, 'passwordMissing')

		const shouldThrowFunction = () => ajv.validate('passwordMissing', {
			username: 'michael',
		})

		h.expect(shouldThrowFunction).to.throw('password.missingProperty')
	})

	it('Test validate() with min length error', () => {
		const schema = {
			type: 'object',
			properties: {
				username: { type: 'string', minLength: 3 },
				password: { type: 'string' },
			},
			required: ['username', 'password'],
		}
		ajv.addSchema(schema, 'usernameMinLength')

		const shouldThrowFunction = () => ajv.validate('usernameMinLength', {
			username: 'aa',
			password: '12345678',
		})
		h.expect(shouldThrowFunction).to.throw('username.minLength.3')
	})

	it('Test validate() with existing schema, username', () => {
		const shouldThrowFunction = () => ajv.validate('PostUserSignUpSchema', {
			username: 'michael',
			password: '12',
		})
		h.expect(shouldThrowFunction).to.throw('password.minLength.6')
	})

	it('Test validate() with existing schema, password', () => {
		const shouldThrowFunction = () => ajv.validate('PostUserSignUpSchema', {
			username: 'michael',
			password: '123456789012345678901234567890',
		})
		h.expect(shouldThrowFunction).to.throw('password.maxLength.24')
	})

	it('Test isNotEmpty(), undefined', () => {
		const shouldThrowFunction = () => ajv.isNotEmpty('username', undefined)
		h.expect(shouldThrowFunction).to.throw('username.missingProperty')
	})

	it('Test isNotEmpty() null', () => {
		const shouldThrowFunction = () => ajv.isNotEmpty('username', null)
		h.expect(shouldThrowFunction).to.throw('username.missingProperty')
	})

	it('Test isNotEmpty() 0', () => {
		const shouldThrowFunction = () => ajv.isNotEmpty('username', 0)
		h.expect(shouldThrowFunction).to.not.throw('username.missingProperty')
	})

	it('Test isJwtoken()', () => {
		const shouldThrowFunction = () => ajv.isJwtoken('loikwqefiklowefwef')
		h.expect(shouldThrowFunction).to.throw('jwtoken.invalid')
	})

})
