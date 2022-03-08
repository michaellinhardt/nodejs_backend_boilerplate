import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const MochaController

= [[{ GET: '/mocha/get/200', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.get = 'mocha'
		return this.renders.ok()
	}
}],
[{ POST: '/mocha/post/201', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.post = 'mocha'
		return this.renders.created()
	}
}],
[{ PUT: '/mocha/put/202', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.put = 'mocha'
		return this.renders.accepted()
	}
}],
[{ PATCH: '/mocha/patch/202', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		this.payload.patch = 'mocha'
		return this.renders.accepted()
	}
}],
[{ DEL: '/mocha/del/204', PUBLIC }, class extends ControllerSuperclass {
	handler () {
		return this.renders.noContent()
	}
}],
[{ GET: '/mocha/get/401' }, class extends ControllerSuperclass {
	handler () {
		return this.renders.forbidden('unauthorized')
	}
}]]
