import _ from 'lodash'
import * as h from '../../application/mocha/helpers/_index'
import * as knexHelper from '../../application/helpers/knex.helper'
import * as knexSeeds from '../../application/knex/seeds'
import { expect } from 'chai'

h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

const knex = knexHelper.getInstance()

describe('Reseting database', () => {

	it('Check migrations', async () => {
		const usersDatabase = await knex('users').select('*')

		expect(Array.isArray(usersDatabase)).to.be.equal(true)
		expect(usersDatabase.length).to.be.equal(knexSeeds.users.length)

		const userOne = usersDatabase[0]

		expect(userOne).to.have.property('created_at')
		expect(userOne).to.have.property('deleted_at')
		expect(userOne).to.have.property('is_deleted')
		expect(userOne).to.have.property('updated_at')
		expect(userOne).to.have.property('id')
		expect(userOne.id).to.be.equal(1)
		expect(userOne.is_deleted).to.be.equal(0)

		_.forEach(usersDatabase, user => {
			delete user.created_at
			delete user.deleted_at
			delete user.is_deleted
			delete user.updated_at
			delete user.id
		})

		expect(usersDatabase).to.deep.equalInAnyOrder(knexSeeds.users)
	})

})
