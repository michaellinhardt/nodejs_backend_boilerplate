import * as helpers from '../helpers/_index'
import * as services from '../../services/_index'
import * as config from '../config/_index'

export class ControllerSuperclass {
	constructor ({ req, res }) {
		this.initializeData(req, res)
		this.linkHelpersServicesAndConfig()
		this.linkHelperRenders()
	}

	initializeData (req, res) {
		this.data = {}
		this.payload = {}
		this.body = req.body || {}
		this.params = req.params || {}
		this.req = req
		this.res = res
	}

	linkHelpersServicesAndConfig () {
		this.config = config
		this.helpers = helpers
		this.services = services
	}

	linkHelperRenders () { this.renders = helpers.renders }

	validator () { return true }
}
