const path = require('path')
// 导入compression-webpack-plugin
const CompressionWebpackPlugin = require('compression-webpack-plugin')
const webpack = require('webpack')
// 定义压缩文件类型
const productionGzipExtensions = ['js', 'css', '.html']

const info = require('./info.js')

let BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

function resolve (dir){return path.join(__dirname, dir)}


//const mockdata = require('./mock/test.json');

module.exports = {
  publicPath: '/', // 默认'/'，部署应用包时的基本 URL
  lintOnSave: false,
  productionSourceMap: false,
  css: {
    sourceMap: false,
    modules: false,
    loaderOptions: { // 向 CSS 相关的 loader 传递选项
      less: {
        javascriptEnabled: true
      }
      ,sass: {
        data: `
          @import "./src/styles/base/mixins.less";
          @import "./src/styles/base/variables.less";
        `
      }
    }
  },
//   module: {
//     rules: [
//       {
//         test: /\.ts$/,
//         loader: 'ts-loader',
//         options: { appendTsSuffixTo: [/\.vue$/] }
//       }
//     ]
//   },
  chainWebpack: (config) => {
    config.plugins.delete('preload'); // TODO: need test
    config.plugins.delete('prefetch'); // TODO: need test
    
    config.resolve.alias
      .set('@', resolve('src'))
      .set('@assets',resolve('src/assets'));
    // config.resolve.extensions = ['.ts', '.js', '.vue', '.json']
    

     config.optimization.splitChunks({
         chunks: 'all',
         cacheGroups: {
           libs: {
             name: 'chunk-libs',
             test: /[\\/]node_modules[\\/]/,
             priority: 10,
             chunks: 'initial' // only package third parties that are initially dependent
           },
           elementUI: {
             name: 'chunk-ui', // split elementUI into a single package
             priority: 20, // the weight needs to be larger than libs and app or it will be packaged into libs or app
             test: /[\\/]node_modules[\\/]_?view-design(.*)/ // in order to adapt to cnpm
           },
           commons: {
             name: 'index',
            //  async: 'vendor-async',
             minChunks: Infinity, //  minimum common number
             priority: 5,
             reuseExistingChunk: true
           }
         }
     });
  },
  configureWebpack: config => {
    // if (isProduction) {
    config.resolve.extensions = ['.ts', '.js', '.vue', '.json']
    config.module.rules.push({    
        test: /\.tsx?$/,    
        loader: 'ts-loader',    
        exclude: /node_modules/,    
        options: {
          appendTsSuffixTo: [/\.vue$/],    
        }    
      })
      console.log(config.module.rules)

    config.plugins.push(new webpack.DefinePlugin({
        'INFO': JSON.stringify(info),
    }))
      config.plugins.push(new CompressionWebpackPlugin({
        algorithm: 'gzip',
        test: new RegExp('\\.(' + productionGzipExtensions.join('|') + ')$'),
        threshold: 10240,
        minRatio: 0.8
      }))
      
    //   config.plugins.push(new BundleAnalyzerPlugin())
    // }
  },
  pluginOptions: {
    "style-resources-loader": {
        preProcessor: "less",
        patterns: [
          //这个是加上自己的路径，
          //注意：试过不能使用别名路径
          path.resolve(__dirname, "./src/styles/base/mixins.less"),
          path.resolve(__dirname, "./src/styles/base/variables.less")
         ]
     }
  },
//   devServer: {
//     port:9000,
//     before(app){
//       app.get('/user/login',(req,res,next)=>{
//         res.json(mockdata);
//       })
//     }
//   }
}
