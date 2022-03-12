import { createTableDefaultSetup } from '../../helpers/knex.helper'

const tableName = 'users_jwt_refresh'

export const

	up = (knex) => {
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			table.string('token_uuid').notNullable()
			table.unique('token_uuid')

			table.string('user_uuid', 36).notNullable()
		})
	},

	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
