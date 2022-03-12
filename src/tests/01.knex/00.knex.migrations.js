import _ from 'lodash'
import Knex from 'knex'
import * as config from '../../application/config/_index'
import * as h from '../../application/mocha/helpers/_index'
import * as knexHelper from '../../application/helpers/knex.helper'
import * as knexSeeds from '../../application/knex/seeds'

h.tools.printCurrentTestFile(__filename)

const { knex: knexConfig, mysql } = config.test
let knex

describe('Preparing test', () => {

	it(`Delete database [${mysql.database}] if exists`, async () => {
		delete knexConfig.connection.database
		knex = Knex(knexConfig)
		await knex.raw(`DROP DATABASE IF EXISTS \`${mysql.database}\`;`)
	})

	it(`Create database [${mysql.database}] if not exists`, async () => {
		await knex.raw(`
            CREATE DATABASE IF NOT EXISTS \`${mysql.database}\`
            CHARACTER SET ${mysql.charset}
            COLLATE ${mysql.collate};`)
	})

	it('Verify if database exist', async () => {
		knexConfig.connection.database = mysql.database
		knex = Knex(knexConfig)
		await knex.raw('select 1+1 as result')
	})

})

describe('Using knex helper for migrations', () => {

	it('Obtaining knex instance from helper', () => {
		knex = knexHelper.getInstance()
	})

	it('Runing latest migrations', async () => {
		await knex.migrate.latest()
		const usersDatabase = await knex('users')
			.select('*')

		h.expect(Array.isArray(usersDatabase)).to.be.equal(true)
		h.expect(usersDatabase.length).to.be.equal(knexSeeds.users.length)

		const userOne = usersDatabase[0]

		h.expect(userOne).to.have.property('created_at')
		h.expect(userOne).to.have.property('deleted_at')
		h.expect(userOne).to.have.property('is_deleted')
		h.expect(userOne).to.have.property('updated_at')
		h.expect(userOne).to.have.property('id')
		h.expect(userOne.id).to.be.equal(1)
		h.expect(userOne.is_deleted).to.be.equal(0)

		_.forEach(usersDatabase, user => {
			delete user.created_at
			delete user.deleted_at
			delete user.is_deleted
			delete user.updated_at
			delete user.id
		})

		h.expect(usersDatabase).to.deep.equalInAnyOrder(knexSeeds.users)
	})

	it('Rollback migrations', async () => {
		await knex.migrate.rollback()
		const showTables = await knex.raw('SHOW TABLES LIKE \'%users%\';')
		const tableList = showTables[0]
		h.expect(tableList.length).to.be.equal(0)
	})

})
