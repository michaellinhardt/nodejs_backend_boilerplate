import * as appHelpers from '../../application/helpers/_index'
import * as h from '../../application/mocha/helpers/_index'

h.tools.printCurrentTestFile(__filename)

const { code } = appHelpers

describe('Testing code helper', () => {

	it('Sleep 100 ms', async () => {
		const start = Date.now()
		await code.sleep(100)
		h.expect(Date.now() - start).to.be.above(99)
	})
})
