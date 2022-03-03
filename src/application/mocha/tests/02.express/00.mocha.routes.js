import express from 'express'
import * as h from '../../helpers/_index'

h.tools.printCurrentTestFile(__filename)

describe('Import express and use tests routes', () => {

	it('Importing express instance from entry point', () => {
		const { expressInstance } = require('../../../../index')

		const stringifyExpressFunctionUse = express().use.toString()
		const stringifyAppFunctionUse = expressInstance.use.toString()

		h.expect(stringifyExpressFunctionUse).to.be.equal(stringifyAppFunctionUse)
	})

	it('Routes GET /mocha/get/404', async () => {
		await h.chai.get(404, '/mocha/get/404').send()
		h.expect(global.response.body).to.deep.equal({ error_key: '404' })
	})

	it('Routes GET /mocha/get/200', async () => {
		await h.chai.get(200, '/mocha/get/200').send()
		h.expect(global.response.body).to.deep.equal({ get: 'mocha' })
	})

	it('Routes POST /mocha/post/201', async () => {
		await h.chai.post(201, '/mocha/post/201').send()
		h.expect(global.response.body).to.deep.equal({ post: 'mocha' })
	})

	it('Routes PUT /mocha/put/202', async () => {
		await h.chai.put(202, '/mocha/put/202').send()
		h.expect(global.response.body).to.deep.equal({ put: 'mocha' })
	})

	it('Routes DEL /mocha/del/204', async () => {
		await h.chai.del(204, '/mocha/del/204').send()
		h.expect(global.response.body).to.deep.equal({})
	})

})
