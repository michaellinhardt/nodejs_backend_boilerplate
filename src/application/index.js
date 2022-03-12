process.env.NODE_ENV = process.env.NODE_ENV || 'development'
import 'core-js/stable'
import 'regenerator-runtime/runtime'
import express from 'express'
import _ from 'lodash'
import * as config from './config/_index'

import * as controllers from '../controllers/_index'
import * as middlewares from '../application/middlewares/_index'
import * as h from '../application/helpers/_index'

const ExpressServer = new (class {

	constructor () {
		this.setupInstance()
		this.setupMiddlewares()
		this.setupAllRoute()
		this.startListening()
	}

	setupInstance () {
		this.expressInstance = express()
		this.expressInstance.use(express.json())
		this.expressInstance.use(express.urlencoded({ extended: false }))
	}

	setupMiddlewares () {
		if (config[process.env.NODE_ENV].printHTTPResponse) {
			this.expressInstance.use('/', middlewares.debug.printHTTPResponse)
		}
		this.expressInstance.post('/user/signup', middlewares.jwe.decryptJWE)
	}

	setupAllRoute () {
		this.router = express.Router()

		const setupE404ControllerLast = controllers.E404Controller[0]

		_.forEach(controllers, (arrayOfRoutes, controllerName) => {
			if (controllerName !== 'E404Controller')
				_.forEach(arrayOfRoutes, this.setupOneRoute.bind(this))
		})

		this.setupOneRoute(setupE404ControllerLast)

		this.expressInstance.use('/', this.router)
	}

	setupOneRoute (routeElementFromController) {
		const [routeParam, RouteController] = routeElementFromController
		const [routeMethod, routePath] = this.extractRouteMethodAndPath(routeParam)

		this.router[routeMethod](routePath, async (req, res) => {
			const controller = new RouteController({ req, res })

			try {
				if (!routeParam.PUBLIC)
					return h.renders.unauthorized('unauthorized')

				await controller.validator()
				await controller.handler()

			} catch (error) { h.renders.catchErrorsOrRenders(res, error, controller.payload) }
		})
	}

	extractRouteMethodAndPath (routeParam) {
		if (routeParam.GET) return ['get', routeParam.GET]
		else if (routeParam.POST) return ['post', routeParam.POST]
		else if (routeParam.PUT) return ['put', routeParam.PUT]
		else if (routeParam.DEL) return ['delete', routeParam.DEL]
		else if (routeParam.PATCH) return ['patch', routeParam.PATCH]

		throw new Error('Route method should be GET, POST, PUT, PATCH or DEL')
	}

	startListening () {
		const { port } = config[process.env.NODE_ENV]
		this.expressInstance.listen(port, () =>
			process.stdout.write(
				`Server is running on port ${port}\r\n`))
	}

	getExpressInstance () { return this.expressInstance }

})()

export const expressInstance = ExpressServer.getExpressInstance()
