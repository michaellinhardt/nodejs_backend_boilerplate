import * as helpers from '../helpers/_index'
import * as services from '../../services/_index'
import * as config from '../config/_index'

export class ControllerSuperclass {
	constructor ({ req, res }) {
		this.initializeData(req, res)
		this.linkHelpersServicesAndConfig()
	}

	linkHelpersServicesAndConfig () {
		this.config = config
		this.helpers = helpers
		this.services = services
	}

	initializeData (req, res) {
		this.payload = {}
		this.body = req.body || {}
		this.params = req.params || {}
		this.req = req
		this.res = res
	}

	validator () { return true }

	render (status) { this.res.status(status).send(this.payload) }
}
