import Chai from 'chai'
import chaiHttp from 'chai-http'
import deepEqualInAnyOrder from 'deep-equal-in-any-order'
import { expressInstance } from '../../index'

const chai = Chai.use(chaiHttp)
chai.use(deepEqualInAnyOrder)

let chaiAgent = chai.request.agent(expressInstance)

export const

	replaceExpressInstance = otherExpressInstance =>
		chaiAgent = chai.request.agent(otherExpressInstance),
	restoreExpressInstance = () => chaiAgent = chai.request.agent(expressInstance),
	del = (status, path, jwtoken = null) => emitHttpRequest('delete', status, path, jwtoken),
	post = (status, path, jwtoken = null) => emitHttpRequest('post', status, path, jwtoken),
	put = (status, path, jwtoken = null) => emitHttpRequest('put', status, path, jwtoken),
	get = (status, path, jwtoken = null) => emitHttpRequest('get', status, path, jwtoken)

const emitHttpRequest = (method, status, path, jwtoken) => {
	global.response = null
	global.isPendingRequest = true

	const emitMethod = chaiAgent[method](path)
	const callbackAfterEmit = req => listenHttpResponseAfterEmit(req, status)

	return typeof (jwtoken) === 'string'

		? emitMethod.use(callbackAfterEmit)
			.set('x-access-token', `Bearer ${jwtoken}`)

		: emitMethod.use(callbackAfterEmit)
}

const listenHttpResponseAfterEmit = (req, status) =>
	req.on('response', res => onHttpResponse(res, status))

const onHttpResponse = (res, status) => {
	global.response = res
	const { body } = res
	const { expect } = Chai

	expect(res).to.have.status(status)

	if (status < 300)
		expect(body.error_key).to.be.an('undefined')

	else
		expect(body.error_key).to.be.a('string')
}
