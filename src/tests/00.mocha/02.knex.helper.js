import _ from 'lodash'
import * as h from '../../application/mocha/helpers/_index'
import * as knexHelper from '../../application/helpers/knex.helper'
import * as knexSeeds from '../../application/knex/seeds'

h.knex.resetTestDatabase()
h.tools.printCurrentTestFile(__filename)

const knex = knexHelper.getInstance()

describe('Reseting database', () => {

	it('Check migrations', async () => {
		const usersDatabase = await knex('users').select('*')

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

})
