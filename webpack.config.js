const path = require('path')

const mode = process.env.NODE_ENV || 'development';
const prod = mode === 'production';

module.exports = {
    entry: {
        index: './src/index.js',
        home: './src/home.js',
        dashboard: './src/dashboard.js'
    },
    resolve: {
        alias: {
            svelte: path.resolve('node_modules', 'svelte')
        },
        extensions: ['.mjs', '.js', '.svelte'],
		mainFields: ['svelte', 'browser', 'module', 'main']
    },
	output: {
		path: path.join(__dirname, '/build'),
		filename: '[name].js',
		chunkFilename: '[name].[id].js'
	},
    module: {
        rules: [
            {
                test: /\.(html|svelte)$/,
				use: {
					loader: 'svelte-loader',
					options: {
						compilerOptions: {
							dev: !prod
						},
						emitCss: prod,
						hotReload: !prod
					}
				},
                exclude: /node_modules/
            },
            {
              // required to prevent errors from Svelte on Webpack 5+, omit on Webpack 4
              test: /node_modules\/svelte\/.*\.mjs$/,
              resolve: {
                fullySpecified: false
              }
            }          
        ]
    },
	devtool: prod ? false : 'source-map',
	devServer: {
		hot: true
    },
    mode,
    watch: !prod
}