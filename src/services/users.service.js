import { ServiceSuperclass } from '../application/superclass/service.superclass.js'

export class UsersService extends ServiceSuperclass {

	getByUsername (username) {
		return this.models.users.getFirstWhere({ username })
	}
}
