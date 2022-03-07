import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const MochaController

= [[{ GET: '/mocha/get/200', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.get = 'mocha'
		return this.render(200)
	}
}],
[{ POST: '/mocha/post/201', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.post = 'mocha'
		return this.render(201)
	}
}],
[{ PUT: '/mocha/put/202', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.put = 'mocha'
		return this.render(202)
	}
}],
[{ PATCH: '/mocha/patch/202', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.patch = 'mocha'
		return this.render(202)
	}
}],
[{ DEL: '/mocha/del/204', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		return this.render(204)
	}
}],
[{ GET: '/mocha/get/401' }, class extends ControllerSuperclass {
	handler () {
		return this.helpers.errors.Forbidden('unauthorized')
	}
}]]
