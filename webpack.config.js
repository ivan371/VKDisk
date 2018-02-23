module.exports = {
    entry: {
        indexBundle: './index',
    },
    context: `${__dirname}/src`,
    output: {
        path: `${__dirname}/static/build`,
        filename: '[name].js',
        publicPath: '/static/build',
        library: '[name]',
    },
    module: {
        rules: [
	    {
                test: /\.css$/,
                loader: 'style-loader!css-loader',
            },
	    {
                test: /\.jsx?$/,
                loader: 'babel-loader',
                exclude: /node_modules/,
                query: {
                    presets: ['es2015', 'stage-0', 'react']
                }
            },
	]
    }
}
