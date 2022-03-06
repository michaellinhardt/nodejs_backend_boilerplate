global.PUBLIC = true
global.MS_SECOND = 60
global.MS_MINUTE = 60 * global.MS_SECOND
global.MS_HOUR = 60 * global.MS_MINUTE
global.MS_DAY = 24 * global.MS_HOUR
global.MS_WEEK = 7 * global.MS_DAY
global.MS_MONTH = 4 * global.MS_WEEK
global.MS_YEAR = 12 * global.MS_MONTH

process.stdout.write('Global constants initialized\r\n')
