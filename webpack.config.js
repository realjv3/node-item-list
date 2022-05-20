const path = require('path')

module.exports = {
    mode: 'development',
    entry: path.join(__dirname, 'src/client.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'public/js')
    },
    module: {
        rules: [{
            loader: 'babel-loader',
            test: /\.js$/,
            exclude: /node_modules/,
        }]
    },
}