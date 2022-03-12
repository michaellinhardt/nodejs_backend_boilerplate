import Knex from 'knex'

import * as config from '../../../application/config/_index'
import * as knexHelper from '../../../application/helpers/knex.helper'

const { knex: knexConfig, mysql } = config.test
let knex

export const

	getInstance = () => {
		knexConfig.connection.database = mysql.database
		knex = Knex(knexConfig)
		return knex
	},

	resetTestDatabase = () => {

		describe('\x1b[36m### Reseting Database\x1b[0m', () => {

			it('Drop database if exists', async () => {
				delete knexConfig.connection.database
				knex = Knex(knexConfig)
				await knex.raw(`DROP DATABASE IF EXISTS \`${mysql.database}\`;`)
			})

			it('Create database test if not exists', async () => {
				await knex.raw(`
					CREATE DATABASE IF NOT EXISTS \`${mysql.database}\`
					CHARACTER SET ${mysql.charset}
					COLLATE ${mysql.collate};`)
				knexConfig.connection.database = mysql.database
				knex = knexHelper.getInstance()
			})

			it('Runing latest migrations', async () => {
				await knex.migrate.latest()
			})

		})

	}
