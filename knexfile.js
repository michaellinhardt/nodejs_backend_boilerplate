import * as config from './src/config/_index'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'
const env = process.env.NODE_ENV

export default config[env].knex
