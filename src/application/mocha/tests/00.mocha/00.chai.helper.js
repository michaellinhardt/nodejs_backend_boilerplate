import express from 'express'
import * as h from '../../helpers/_index'

h.tools.printCurrentTestFile(__filename)

const expressInstance = express()

describe('Testing http agent', () => {

	it('Setup express routes', () => {

		expressInstance.get('/', (req, res) =>
			res.status(200).json({ hello: 'world' }))

		expressInstance.post('/', (req, res) =>
			res.status(201).json({ hello: 'world' }))

		expressInstance.put('/', (req, res) =>
			res.status(202).json({ hello: 'world' }))

		expressInstance.patch('/', (req, res) =>
			res.status(202).json({ hello: 'world' }))

		expressInstance.delete('/', (req, res) =>
			res.status(203).json({ hello: 'world' }))

		expressInstance.get('*', (req, res) =>
			res.status(404).json({ error_key: '404' }))
	})

	it('Replace helper express instance, only for this test file', async () => {
		h.chai.replaceExpressInstance(expressInstance)
		await h.chai.get(404, '/mocha/get/200').send()
		h.expect(global.response).to.have.status(404)
	})

	it('h.chai.get "/e404", check status and error_key', async () => {
		const res = await h.chai.get(404, '/e404').send()

		h.expect(res).to.have.status(404)
		h.expect(res.body.error_key)
			.to.be.a('string')
			.and.equal('404')
	})

	it('h.chai.get "/", check status', async () => {
		const res = await h.chai.get(200, '/').send()
		h.expect(res).to.have.status(200)
	})

	it('global.response have proper object reference', async () => {
		const res = await h.chai.get(200, '/').send()
		h.expect(res === global.response).to.be.equal(true)
	})

	it('h.chai.post "/", check status', async () => {
		await h.chai.post(201, '/').send()
		h.expect(global.response).to.have.status(201)
	})

	it('h.chai.patch "/", check status', async () => {
		await h.chai.patch(202, '/').send()
		h.expect(global.response).to.have.status(202)
	})

	it('h.chai.put "/", check status', async () => {
		await h.chai.put(202, '/').send()
		h.expect(global.response).to.have.status(202)
	})

	it('h.chai.del "/", check status', async () => {
		await h.chai.del(203, '/').send()
		h.expect(global.response).to.have.status(203)
	})

	it('Restoring expressInstance from backend', async () => {
		h.chai.restoreExpressInstance()
		await h.chai.get(200, '/mocha/get/200').send()
		h.expect(global.response).to.have.status(200)
	})

})
