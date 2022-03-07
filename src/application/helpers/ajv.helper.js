import Ajv from 'ajv'
import _ from 'lodash'

import * as schemaFiles from '../../schemas/_index'
import * as errors from '../helpers/errors.helper'

const ajv = new Ajv({ allErrors: true })
require('ajv-errors')(ajv)

_.forEach(schemaFiles, schemaFile =>
	_.forEach(schemaFile, (schema, name) =>
		ajv.addSchema(schema, name)))

export const

	validate = (schemaName, data) => {
		if (ajv.validate(schemaName, data))
			return true

		const ajvError = (ajv.errors && ajv.errors[0]) || null

		if (!ajvError) throw errors.BadRequest('invalid.data')

		const { keyword, params, message, schemaPath } = ajvError

		if (keyword === 'required') {
			_.forEach(params, (errorData, errorLabel) => {
				throw new errors.BadRequest(`${errorData}.${errorLabel}`)
			})

		} else if (['minLength', 'maxLength'].includes(keyword)) {
			const splitSchemaPath = schemaPath.split('/')
			const errorData = splitSchemaPath[(splitSchemaPath.length - 2)]
			throw new errors.BadRequest(`${errorData}.${keyword}.${params.limit}`)

		} else if (keyword === 'enum') {
			const splitSchemaPath = schemaPath.split('/')
			const errorData = splitSchemaPath[(splitSchemaPath.length - 2)]
			throw new errors.BadRequest(`invalid.${errorData}`)

		} else if (keyword === 'errorMessage') {
			throw new errors.BadRequest(message)
		}

		throw new errors.BadRequest('invalid.data')
	},

	isNotEmpty = (label, value) => {
		if (value === null || value === undefined || value === '')
			throw new errors.BadRequest(`${label}.missingProperty`)
	},

	isJwtoken = (token) => {
		if (!token.startsWith('Bearer '))
			throw new errors.BadRequest('jwtoken.invalid')
	}
