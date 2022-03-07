export const

	string = (minLength = null, maxLength = null) => {
		const schemaString = { type: 'string' }
		if (minLength !== null) { schemaString.minLength = minLength }
		if (maxLength !== null) { schemaString.maxLength = maxLength }
		return schemaString
	},

	pattern = (label, pattern, error) => ({
		type: 'object',
		properties: { [label]: { type: 'string', pattern } },
		errorMessage: error,
	}),

	array = (items) => ({
		type: 'array',
		items,
	}),

	number = (minimum = null, maximum = null) => {
		const schemaNumber = { type: 'number' }
		if (minimum !== null) { schemaNumber.minimum = minimum }
		if (maximum !== null) { schemaNumber.maximum = maximum }
		return schemaNumber
	},

	nested = (label, schema) => ({
		type: 'object',
		properties: {
			[label]: schema,
		},
		required: [label],
	})
