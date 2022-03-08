import _ from 'lodash'
import * as helpers from '../../application/helpers/_index'
import * as config from '../config/_index'

export class ModelSuperclass {

	constructor (table) {
		this.table = table
		this.linkHelpersAndConfig()
	}

	linkHelpersAndConfig () {
		this.config = config
		this.helpers = helpers
	}

	knex () { return this.helpers.knex.getInstance()(this.table) }

	getLastWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
			.orderBy('id', 'desc')
			.first()
	}

	getLastWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			request[method]({
				...where,
				is_deleted: false,
			})
		})

		return request
			.select('*')
			.orderBy('id', 'desc')
			.first()
	}

	getFirstWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
			.first()
	}

	getFirstWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			request[method]({
				is_deleted: false,
				...where,
			})
		})

		return request
			.select('*')
			.first()
	}

	getAllFirstWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
	}

	getAllLastWhere (where) {
		where.is_deleted = false
		return this.knex()
			.select('*')
			.where(where)
			.orderBy('id', 'desc')
	}

	getAllLastWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			request[method]({
				is_deleted: false,
				...where,
			})
		})

		return request
			.select('*')
			.orderBy('id', 'desc')
	}

	getAllWhereOr (...args) {
		const request = this.knex()

		_.forEach(args, (where, index) => {
			const method = index > 0 ? 'orWhere' : 'where'
			request[method]({
				is_deleted: false,
				...where,
			})
		})

		return request
			.select('*')
	}

	getLastWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
			.orderBy('id', 'desc')
			.first()
	}

	getFirstWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
			.first()
	}

	getAllFirstWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	getAllLastWhereIn (field, arrayValue) {
		return this.knex()
			.select('*')
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
			.orderBy('id', 'desc')
	}

	updAllWhere (where, update) {
		where.is_deleted = false
		return this.knex()
			.update(update)
			.where(where)
	}

	updAllWhereIn (field, arrayValue, update) {
		return this.knex()
			.update(update)
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	delAllWhere (where) {
		where.is_deleted = false
		return this.knex()
			.update({
				is_deleted: true,
				deleted_at: this.helpers.date.timestampSql(),
			})
			.where(where)
	}

	delAllWhereIn (field, arrayValue) {
		return this.knex()
			.update({
				is_deleted: true,
				deleted_at: this.helpers.date.timestampSql(),
			})
			.whereIn(field, arrayValue)
			.andWhere({ is_deleted: false })
	}

	async add (entry = {}) {
		entry.uuid = this.helpers.encryption.uuid()
		await this.knex().insert(entry)
		return entry
	}

	async addArray (entries) {
		entries.forEach(entry => { entry.uuid = this.helpers.encryption.uuid() })
		await this.knex().insert(entries)
		return entries
	}

}
