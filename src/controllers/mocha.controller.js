export const MochaController

= [[{ GET: '/mocha/get/200', PUBLIC }, function () {
	this.payload.get = 'mocha'
	return this.render(200)

}],
[{ POST: '/mocha/post/201', PUBLIC }, function () {
	this.payload.post = 'mocha'
	return this.render(201)

}],
[{ PUT: '/mocha/put/202', PUBLIC }, function () {
	this.payload.put = 'mocha'
	return this.render(202)

}],
[{ DEL: '/mocha/del/204', PUBLIC }, function () {
	return this.render(204)

}],
[{ GET: '/mocha/get/403' }, function () {
	return this.render(200)

}]]
