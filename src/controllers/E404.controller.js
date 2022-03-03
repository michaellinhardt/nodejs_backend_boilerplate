export const E404Controller

= [[{ PUBLIC, GET: '*' }, function () {
	this.payload.error_key = 'notFound'
	return this.render(404)

}]]
