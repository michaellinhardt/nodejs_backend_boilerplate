import { createTableDefaultSetup } from '../../helpers/knex.helper'

const tableName = 'users_ips'

export const

	up = (knex) => {
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			table.string('user_uuid', 36).notNullable()
			table.string('user_ip').notNullable()
		})
	},

	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
