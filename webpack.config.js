const path = require('path')
const nodeExternals = require('webpack-node-externals')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')

module.exports = {
    mode: process.env.NODE_ENV,
    entry: path.resolve(__dirname, 'src', 'index.ts'),
    output: {
        filename: 'server.js',
        path: path.resolve(__dirname, 'dist'),
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    target: 'node',
    externals: [nodeExternals()],
    devtool: process.env.NODE_ENV === 'production' ? false : 'inline-source-map',
    plugins: [new CleanWebpackPlugin()],
}