import { ControllerSuperclass } from '../application/superclass/controller.superclass'

export const E404Controller

= [[{ PUBLIC, GET: '*' }, class extends ControllerSuperclass {
	handler () {
		return this.renders.notFound('notFound')
	}
}]]
