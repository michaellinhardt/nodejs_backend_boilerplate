module.exports = {
    timeout: 5000,

    // Stop after first test fail
    bail: true,

    require: [
        'env-test',
        '@babel/register',
        '@babel/polyfill',
    ],

    global: [
        'response',
        'isPendingRequest',
    ],

    file: [
        './src/mocha/globals/init.global.js',
        './src/mocha/globals/after.each.global.js',
    ],

    exit: true,
}
