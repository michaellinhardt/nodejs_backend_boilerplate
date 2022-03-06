import prettyjson from 'prettyjson'

const printTerminal = message => process.stdout.write(`${message}\n`)

export const

	printHTTPResponse = (req, res, next) => {
		req.timestampReceived = Date.now()
		const realResStatusMethod = res.status.bind(res)
		const realResJsonMethod = res.json.bind(res)

		function replaceResStatusMethod (status) {
			printTerminal(`\n=== [ ${req.method} ] ${req.path} ===`)

			if (req.body)
				printTerminal(`- body:\n${prettyjson.render(req.body)}`)

			const execTime = Date.now() - req.timestampReceived

			printTerminal(`- status [${status}] in ${execTime} ms`)
			return realResStatusMethod(status)
		}

		function replaceResJsonMethod (obj, ...args) {
			printTerminal(`- payload:\n${prettyjson.render(obj)}`)
			return realResJsonMethod(obj, ...args)
		}

		res.json = replaceResJsonMethod
		res.status = replaceResStatusMethod

		return next()
	}
