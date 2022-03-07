import * as models from '../models/_index.js'

export class UsersService {

	constructor (table) {
		this.table = table
	}

	getByUsername (username) {
		return models.users.getFirstWhere({ username })
	}
}
