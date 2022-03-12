import { UsersIpsService } from './users.ips.service'
import { UsersJwtService } from './users.jwt.service'
import { UsersService } from './users.service'

export const

	users = new UsersService(),
	usersJwt = new UsersJwtService(),
	usersIps = new UsersIpsService()

