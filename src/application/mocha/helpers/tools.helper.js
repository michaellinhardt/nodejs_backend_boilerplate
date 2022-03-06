export const

	printCurrentTestFile = filename => {
		const fileArray = filename.split('/')
		const fileName = fileArray[fileArray.length - 1]
		const folderArray = filename.split('/mocha')
		const folderName = folderArray[1].replace(`/${fileName}`, '')

		describe(`\x1b[35m### Folder: ${folderName}\x1b[0m`, () => {
			it(`File: \x1b[33m${fileName}\x1b[0m`, () => true)
		})
	}
