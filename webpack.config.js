const path = require('path')
const HtmlWebPackPlugin = require('html-webpack-plugin')

const PORT = process.env.PORT

module.exports = {
    entry: path.join(__dirname, 'src/client/index.js'),
    output: {
        path: path.join(__dirname,'./build'),
        filename: 'bundle.js',
        publicPath: '/'
      },
    mode: process.env.NODE_ENV || 'development',
    module : {
        rules: [
            {
                test: /\.(js|jsx)?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader'
                }
            },
            {
                test: /\.html$/,
                use: {
                    loader: 'html-loader'
                }
            },
            {
                test: /\.(css|scss)$/,
                loaders: [
                  'style-loader', // creates style nodes from JS strings
                  'css-loader', // translates CSS into CommonJS
                  'sass-loader' // compiles Sass to CSS, using Node Sass by default
                ]
              },
              {
                test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
                loaders: ['file-loader']
              }
        ]
    },
    devServer: {
        historyApiFallback: true,
        proxy: {
            "/api/*": {
                target: `http://localhost:${PORT}/`,
                secure: false
            }
        }
    },
    plugins: [
        new HtmlWebPackPlugin({
            template: './src/client/index.html',
            filename: 'index.html'
        })
    ]
}