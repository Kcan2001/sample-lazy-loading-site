const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
    entry: ["@babel/polyfill", "./src/index.js"],
    output: {
        path: path.join(__dirname, '/dist'),
        filename: 'index_bundle.js'
    },
    devtool: 'eval-source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['@babel/preset-env']
                      }
                }
            },
            {
                test: /\.(png|jpe?g|gif)$/i,
                exclude: /node_modules/,
                use: [
                  {
                    loader: 'file-loader',
                  },
                ],
              },
              {
                test: /\.mp4$/,
                exclude: /node_modules/,
                use: 'file-loader?name=videos/[name].[ext]',
         },
         { 
            test: /\.css$/i,
            exclude: /node_modules/,
            use: ['style-loader', 'css-loader'],
            },
        ]
    },
    optimization: {
        runtimeChunk: 'single',
        splitChunks: {
          chunks: 'all',
          maxInitialRequests: Infinity,
          minSize: 0,
          cacheGroups: {
            vendor: {
              test: /[\\/]node_modules[\\/]/,
              name(module) {
                // get the name. E.g. node_modules/packageName/not/this/part.js
                // or node_modules/packageName
                const packageName = module.context.match(/[\\/]node_modules[\\/](.*?)([\\/]|$)/)[1];
    
                // npm package names are URL-safe, but some servers don't like @ symbols
                return `npm.${packageName.replace('@', '')}`;
              },
            },
          },
        }
    },
    plugins: [
        new BundleAnalyzerPlugin({
            analyzerMode: 'server',
            generateStatsFile: true,
            statsOptions: { source: true },
            openAnalyzer: true
        }),
        new HtmlWebpackPlugin({
            template: './src/index.html'
        })
    ]
}
