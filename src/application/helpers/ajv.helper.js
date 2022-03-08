import Ajv from 'ajv'
import _ from 'lodash'

import * as schemaFiles from '../../schemas/_index'
import * as renders from './renders.helper'

const ajv = new Ajv({ allErrors: true })
require('ajv-errors')(ajv)

_.forEach(schemaFiles, schemaFile =>
	_.forEach(schemaFile, (schema, name) =>
		ajv.addSchema(schema, name)))

export const

	addSchema = (schema, name) => ajv.addSchema(schema, name),

	validate = (schemaName, data) => {
		if (ajv.validate(schemaName, data))
			return true

		const ajvError = (ajv.errors && ajv.errors[0]) || null

		if (!ajvError) return renders.badRequest('invalid.data')

		const { keyword, params, message, schemaPath } = ajvError

		if (keyword === 'required') {
			_.forEach(params, (errorData, errorLabel) => {
				return renders.badRequest(`${errorData}.${errorLabel}`)
			})

		} else if (['minLength', 'maxLength'].includes(keyword)) {
			const splitSchemaPath = schemaPath.split('/')
			const errorData = splitSchemaPath[(splitSchemaPath.length - 2)]
			return renders.badRequest(`${errorData}.${keyword}.${params.limit}`)

		} else if (keyword === 'enum') {
			const splitSchemaPath = schemaPath.split('/')
			const errorData = splitSchemaPath[(splitSchemaPath.length - 2)]
			return renders.badRequest(`invalid.${errorData}`)

		} else if (keyword === 'errorMessage') {
			return renders.badRequest(message)
		}

		return renders.badRequest('invalid.data')
	},

	isNotEmpty = (label, value) => {
		if (value === null || value === undefined || value === '')
			return renders.badRequest(`${label}.missingProperty`)
	},

	isJwtoken = (token) => {
		if (!token.startsWith('Bearer '))
			return renders.badRequest('jwtoken.invalid')
	}
