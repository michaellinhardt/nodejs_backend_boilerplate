const moment = require('moment')

export const

	timestampSql = (increaseValue = 0, increaseFormat = 'seconds') => {
		const newDate = moment().format('YYYY-MM-DD HH:mm:ss')
		return increaseValue > 0
			? newDate.add(increaseValue, increaseFormat)
			: newDate
	},

	sqlDateToTimestamp = date => parseInt(moment(date).format('X'), 10),

	nowShort = () => moment().format('MM.DD HH:mm:ss'),
	dateShort = date => moment(date).format('MM.DD HH:mm:ss'),

	timestamp = () => parseInt(moment().format('X'), 10),
	timestampMs = () => Date.now()
