process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'

import * as config from './config/_index'
const { port } = config[process.env.NODE_ENV]

const ExpressServer = new (class {

	constructor () {
		this.setupInstance()
		this.setupRouter()
		this.startListening()
	}

	setupInstance () {
		this.expressInstance = express()
		this.expressInstance.use(express.json())
		this.expressInstance.use(express.urlencoded({ extended: false }))
	}

	setupRouter () {
		this.expressInstance.get('/mocha/get/200', (req, res) =>
			res.status(200).json({ get: 'mocha' }))

		this.expressInstance.post('/mocha/post/201', (req, res) =>
			res.status(201).json({ post: 'mocha' }))

		this.expressInstance.put('/mocha/put/202', (req, res) =>
			res.status(202).json({ put: 'mocha' }))

		this.expressInstance.delete('/mocha/del/204', (req, res) =>
			res.status(204).send())

		this.expressInstance.get('*', (req, res) =>
			res.status(404).json({ error_key: '404' }))
	}

	startListening () {
		this.expressInstance.listen(port, () =>
			process.stdout.write(
				`Server is running on port ${port}\r\n`))
	}

	getExpressInstance () { return this.expressInstance }

})()

export const expressInstance = ExpressServer.getExpressInstance()
