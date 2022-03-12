import requestIp from 'request-ip'

export const

	getClientIp = req => requestIp.getClientIp(req)
