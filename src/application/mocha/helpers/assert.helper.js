import { expect } from 'chai'

export const

	isObject_isntArray = (oVar) => {
		const isObjectOnly = typeof oVar === 'object'
			&& !Array.isArray(oVar)
			&& oVar !== null
			&& !(oVar instanceof Date)

		expect(isObjectOnly).to.be.equal(true)
	}
