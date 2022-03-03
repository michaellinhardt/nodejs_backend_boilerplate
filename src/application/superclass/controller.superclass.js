export class ControllerSuperclass {
	constructor ({ handler, validator, req, res }) {
		this.initializeRessources(req, res)
		this.initializeExternalMethods(handler, validator)
	}

	initializeRessources (req, res) {
		this.payload = {}
		this.body = req.body || {}
		this.params = req.params || {}
		this.req = req
		this.res = res
	}

	initializeExternalMethods (handler, validator) {
		this.handler = handler.bind(this)
		this.validator = validator.bind(this)
	}

	render (status) { this.res.status(status).send(this.payload) }
}
