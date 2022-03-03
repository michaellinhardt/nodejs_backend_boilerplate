export const

	port = 4242,

	mysql = {
		host: '127.0.0.1',
		user: 'root',
		password: '23455678',
		database: 'backend_dev',
		multipleStatements: true,
		charset: 'utf8mb4',
		collate: 'utf8mb4_unicode_ci',
	},

	knex = {
		client: 'mysql',
		connection: {
			host: mysql.host,
			user: mysql.user,
			password: mysql.password,
			database: mysql.database,
			multipleStatements: mysql.multipleStatements,
			charset: mysql.charset,
		},
		pool: { min: 0, max: 7 },
		migrations: {
			directory: `${__dirname}/../knex/migrations`,
		},
	}
