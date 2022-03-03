import prettyjson from 'prettyjson'

afterEach(function () {
	const isTestPassed = () =>
		!this
        || !this.currentTest
        || !this.currentTest.state
        || this.currentTest.state === 'passed'

	const isTestFailed_andGotResponseBody = () =>
		this.currentTest.state === 'failed'
        && global.isPendingRequest
        && global.response
        && global.response.body

	if (isTestPassed())
		afterEachTestPassed()

	else if (isTestFailed_andGotResponseBody())
		afterEachTestFailedWithResponseBody()

	global.isPendingRequest = false
})

const afterEachTestPassed = () => true

const afterEachTestFailedWithResponseBody = () => {
	const { body, status } = global.response
	process.stdout.write(`\x1b[36mSTATUS ${status}\x1b[0m\n`)
	process.stdout.write(`${prettyjson.render(body)}\n`)
}
