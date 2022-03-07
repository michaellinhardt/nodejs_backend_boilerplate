import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const E404Controller

= [[{ PUBLIC, GET: '*' }, class extends ControllerSuperclass {
	handler () {
		this.payload.error_key = 'notFound'
		return this.render(404)
	}
}]]
