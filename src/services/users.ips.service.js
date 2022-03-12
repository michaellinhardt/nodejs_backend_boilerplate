import { ServiceSuperclass } from '../application/superclass/service.superclass.js'

export class UsersIpsService extends ServiceSuperclass {
	async saveNewUserIP (user_uuid, user_ip) {
		const { models: m } = this

		const isClientIp = await m.usersIps.getFirstWhere({ user_uuid, user_ip })

		return !isClientIp
			? m.usersIps.add({ user_uuid, user_ip })
			: isClientIp
	}

}
