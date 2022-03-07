import * as helpers from '../helpers/_index'
import * as config from '../config/_index'
import * as models from '../../models/_index'

export class ServiceSuperclass {
	constructor () {
		this.linkHelpersModelsAndConfig()
	}

	linkHelpersModelsAndConfig () {
		this.config = config
		this.helpers = helpers
		this.models = models
	}

}
