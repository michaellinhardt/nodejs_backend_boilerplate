const env = process.env.NODE_ENV || 'development'
const envConfigFile = `./src/config/${env}.config.js`
const envConfig = require(envConfigFile)
module.exports = { ...envConfig.knex }
