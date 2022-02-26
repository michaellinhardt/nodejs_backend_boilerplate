import * as config from './src/config/_index'

const env = process.env.NODE_ENV || 'development'

export default config[env].knex
