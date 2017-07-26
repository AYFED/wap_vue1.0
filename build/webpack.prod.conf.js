var path = require('path')
var config = require('../config')
var utils = require('./utils')
var webpack = require('webpack')
var merge = require('webpack-merge')
var baseWebpackConfig = require('./webpack.base.conf')
var ExtractTextPlugin = require('extract-text-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var env = process.env.NODE_ENV === 'testing'
  ? require('../config/test.env')
  : config.build.env

module.exports = merge(baseWebpackConfig, {
    module: {
        loaders: utils.styleLoaders({ sourceMap: config.build.productionSourceMap, extract: true })
    },
    devtool: config.build.productionSourceMap ? '#source-map' : false,
    output: {
        path: config.build.assetsRoot,
        filename: utils.assetsPath('js/[name].[chunkhash].js'),
        chunkFilename: utils.assetsPath('js/[id].[chunkhash].js')
    },
    vue: {
        loaders: utils.cssLoaders({
            sourceMap: config.build.productionSourceMap,
            extract: true
        })
    },
    plugins: [
        // http://vuejs.github.io/vue-loader/workflow/production.html
        new webpack.DefinePlugin({
            'process.env': env
        }),
        new webpack.optimize.UglifyJsPlugin({
            compress: {
                warnings: false
            }
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        // extract css into its own file
        new ExtractTextPlugin(utils.assetsPath('css/[name].css')),
        // 公共模块的提取
        new webpack.optimize.CommonsChunkPlugin({
            // 这是 common chunk 的名称。已经存在的 chunk 可以通过传入一个已存在的 chunk 名称而被选择。
            // 如果一个字符串数组被传入，这相当于插件针对每个 chunk 名被多次调用
            // 如果该选项被忽略，同时 `options.async` 或者 `options.children` 被设置，所有的 chunk 都会被使用，否则 `options.filename` 会用于作为 chunk 名。
            name: 'vendor',
            // 在传入  公共chunk(commons chunk) 之前所需要包含的最少数量的 chunks 。
            // 数量必须大于等于2，或者少于等于 chunks的数量
            // 传入 `Infinity` 会马上生成 公共chunk，但里面没有模块。
            // 你可以传入一个 `function` ，以添加定制的逻辑（默认是 chunk 的数量）
            minChunks: function(module, count) {
                return (
                    module.resource && /\.js$/.test(module.resource) && module.resource.indexOf(path.join(__dirname, '../node_modules')) === 0 && count === 3
                )
            }
        }),
        // extract webpack runtime and module manifest to its own file in order to
        // prevent vendor hash from being updated whenever app bundle is updated
        new webpack.optimize.CommonsChunkPlugin({
            name: 'manifest',
            // 通过 chunk name 去选择 chunks 的来源。chunk 必须是  公共chunk 的子模块。
            // 如果被忽略，所有的，所有的 入口chunk (entry chunk) 都会被选择。
            chunks: ['vendor']
        })
    ]
})

if (config.build.productionGzip) {
    var CompressionWebpackPlugin = require('compression-webpack-plugin')

    webpackConfig.plugins.push(
        new CompressionWebpackPlugin({
            asset: '[path].gz[query]',
            algorithm: 'gzip',
            test: new RegExp(
                '\\.(' +
                config.build.productionGzipExtensions.join('|') +
                ')$'
            ),
            threshold: 10240,
            minRatio: 0.8
        })
    )
}

var pages = utils.getEntries('./src/module/**/*.html')
for (var page in pages) {
    // 配置生成的html文件，定义路径等
    var conf = {
            filename: page + '.html',
            template: pages[page], //模板路径
            inject: true,
            // excludeChunks 允许跳过某些chunks, 而chunks告诉插件要引用entry里面的哪几个入口
            // 如何更好的理解这块呢？举个例子：比如本demo中包含两个模块（index和about），最好的当然是各个模块引入自己所需的js，
            // 而不是每个页面都引入所有的js，你可以把下面这个excludeChunks去掉，然后npm run build，然后看编译出来的index.html和about.html就知道了
            // filter：将数据过滤，然后返回符合要求的数据，Object.keys是获取JSON对象中的每个key
            excludeChunks: Object.keys(pages).filter(item => {
                return (item != page)
            })
        }
        // 需要生成几个html文件，就配置几个HtmlWebpackPlugin对象
    module.exports.plugins.push(new HtmlWebpackPlugin(conf))
}