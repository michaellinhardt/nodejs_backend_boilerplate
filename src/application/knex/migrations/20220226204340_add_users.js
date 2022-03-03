import { createTableDefaultSetup } from '../../helpers/knex.helper'

const tableName = 'users'

export const

	up = (knex) => {
		return knex.schema.createTable(tableName, table => {
			createTableDefaultSetup(knex, table)

			table.string('user_uuid', 36).notNullable()
			table.unique('user_uuid')

			table.string('username').notNullable()
			table.text('password').defaultTo('')

		}).then(() => {
			const { users } = require('../seeds')
			return knex(tableName).insert(users)
		})
	},

	down = (knex) => {
		return knex.schema.dropTableIfExists(tableName)
	}
