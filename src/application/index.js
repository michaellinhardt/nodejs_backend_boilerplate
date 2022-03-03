process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import _ from 'lodash'
import * as config from './config/_index'

import * as controllers from '../controllers/_index'
import { ControllerSuperclass } from './superclass/controller.superclass'
const { port } = config[process.env.NODE_ENV]

const ExpressServer = new (class {

	constructor () {
		this.setupInstance()
		this.setupAllRoute()
		this.startListening()
	}

	setupInstance () {
		this.expressInstance = express()
		this.expressInstance.use(express.json())
		this.expressInstance.use(express.urlencoded({ extended: false }))
	}

	setupAllRoute () {
		this.router = express.Router()

		const setupE404ControllerAtTheEnd = controllers.E404Controller[0]

		_.forEach(controllers, (arrayOfRoutes, controllerName) => {
			if (controllerName !== 'E404Controller')
				_.forEach(arrayOfRoutes, this.setupOneRoute.bind(this))
		})

		this.setupOneRoute(setupE404ControllerAtTheEnd)

		this.expressInstance.use('/', this.router)
	}

	setupOneRoute (routeElementFromController) {
		const [routeParam, handler, validator = () => true] = routeElementFromController
		const [routeMethod, routePath] = this.extractRouteMethodAndPath(routeParam)

		this.router[routeMethod](routePath, async (req, res) => {
			const controller = new ControllerSuperclass({ handler, validator, req, res })

			if (!routeParam.PUBLIC) return res.status(403).send({ error_key: 'unauthorized' })

			await controller.validator()
			await controller.handler()
		})
	}

	extractRouteMethodAndPath (routeParam) {
		if (routeParam.GET) return ['get', routeParam.GET]
		else if (routeParam.POST) return ['post', routeParam.POST]
		else if (routeParam.PUT) return ['put', routeParam.PUT]
		else if (routeParam.DEL) return ['delete', routeParam.DEL]

		throw new Error('Route method should be GET, POST, PUT or DEL')
	}

	startListening () {
		this.expressInstance.listen(port, () =>
			process.stdout.write(
				`Server is running on port ${port}\r\n`))
	}

	getExpressInstance () { return this.expressInstance }

})()

export const expressInstance = ExpressServer.getExpressInstance()
