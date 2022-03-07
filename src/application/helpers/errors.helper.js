class AppError extends Error {
	constructor (error_key = 'server.error', status = 500) {
		super(error_key)
		this.constructor = AppError
		// eslint-disable-next-line no-proto
		this.__proto__ = AppError.prototype
		this.name = this.constructor.name
		Error.captureStackTrace(this, this.constructor)
		this.status = status
		this.payload = { error_key }
	}
	render (res) { return res.status(this.status).json(this.payload) }
}

export const

	BadRequest = class extends AppError {
		constructor (error_key) { super(error_key, 400) }
	},

	Unauthorized = class extends AppError {
		constructor (error_key) { super(error_key, 401) }
	},

	Forbidden = class extends AppError {
		constructor (error_key) { super(error_key, 403) }
	},

	NotFound = class extends AppError {
		constructor (error_key) { super(error_key, 404) }
	},

	Conflict = class extends AppError {
		constructor (error_key) { super(error_key, 409) }
	},

	Service = class extends AppError {
		constructor (error_key) { super(error_key, 503) }
	},

	handler = (res, err) => {
		if (err instanceof AppError) { return err.render(res) }

		process.stdout.write('Internal Server Error\r\n')
		process.stdout.write(`${(err && err.stack) || (err && err.message) || err}\r\n`)

		if (res.headersSent) { return }

		return res.status(500).json({ error_key: 'server.error' })
	}
