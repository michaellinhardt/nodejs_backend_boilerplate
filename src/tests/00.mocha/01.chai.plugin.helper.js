import { v1 as uuidv1 } from 'uuid'
import * as h from '../../application/mocha/helpers/_index'

h.tools.printCurrentTestFile(__filename)

describe('Testing mocha plugin', () => {

	it('ChaiUuid, is not an uuid', () => {
		const notUuid = 'wefl;knwelfknweklfeqwfwef'
		const willThrow = () => h.expect(notUuid).to.be.a.uuid()
		h.expect(willThrow).to.throw()
	})

	it('ChaiUuid, is an uuid', () => {
		const uuid = uuidv1()
		h.expect(uuid).to.be.a.uuid('v1')
	})

})
