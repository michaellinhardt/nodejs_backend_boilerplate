// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from 'regenerator-runtime'

import express from 'express'

process.env.NODE_ENV = process.env.NODE_ENV || 'development'

export const expressInstance = express()

expressInstance.get('/mocha/get/200', (req, res) =>
	res.status(200).json({ get: 'mocha' }))

expressInstance.post('/mocha/post/201', (req, res) =>
	res.status(201).json({ post: 'mocha' }))

expressInstance.put('/mocha/put/202', (req, res) =>
	res.status(202).json({ put: 'mocha' }))

expressInstance.delete('/mocha/del/204', (req, res) =>
	res.status(204).send())

expressInstance.get('*', (req, res) =>
	res.status(404).json({ error_key: '404' }))

expressInstance.listen(3000)
