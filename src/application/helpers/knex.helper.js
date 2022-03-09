import Knex from 'knex'
import * as config from '../config/_index'

let knexInstance = null
const { knex: knexConfig, mysql } = config[process.env.NODE_ENV]

export const

	getInstance = () => {
		if (!knexInstance)
			knexInstance = Knex(knexConfig)

		return knexInstance
	},

	createTableDefaultSetup = (knex, table) => {
		table.charset(mysql.charset)
		table.collate(mysql.collate)
		table.increments('id').primary()

		table.timestamp('created_at').defaultTo(knex.fn.now())
		table.timestamp('updated_at')
			.defaultTo(knex.raw('CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP'))

		table.timestamp('deleted_at')
		table.boolean('is_deleted').notNullable().defaultTo(false)
	}
