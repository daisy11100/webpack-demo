<<<<<<< HEAD
# webpack-demo
webpack学习笔记
=======
<!--
 * @Author: duanxinxin
 * @Date: 2022-10-12 22:56:13
 * @LastEditors: duanxinxin
 * @LastEditTime: 2022-10-16 19:14:41
 * @Description: 
-->
webpack配置   
## 基础配置
### 1、拆分模块  
一般开发分为common.js、dev.js和prod.js  
common.js中放公共配置
dev中开发环境下的配置，devSever等  
prod中放生产环境下的配置 图片压缩 路径变化等

### 2、merge
安装webpack-merge包   
在prod和dev中引入common

### 3、处理ES6
在module中，匹配js文件，使用babel-loader

### 4、处理css
匹配到css文件，然后使用css-loader和style-loader，有时需要postcss-loader

css-loader：将样式生成css文件  
style-loader：是将生成的css文件插入到页面中  
postcss-loader： 做浏览器兼容css用的，需要添加一个postcss.config.js文件，其中熟知的autoprefixer就是为样式添加前缀   

### 5、关于图片


## 高级配置

### 1、多入口
1）修改entry为多入口   
2）修改output的输出文件名[name]（根据入口的属性 输出相应的出口文件名）  
3）几个入口文件写相应数量的HtmlWebpackPlugin，chunks中需要配置引入的资源，不写就打包的js会全部引入进去  

### 2、css文件抽离压缩
#### 抽离  
dev环境中不需要进行css抽离，继续使用原来的css-loader和style-loader，将产出的css代码插入到页面中  
prod环境中需要对css文件进行抽离，用到mini-css-extract-plugin这个loader，替换style-loader。即可达到效果

#### 压缩
使用terser-webpack-plugin和optimize-css-assets-webpack-plugin对其进行压缩  
在webpack的optimization配置选项中


### 3、抽离公共代码和第三方代码
#### 公共代码
A模块中引入了test.js   
B模块中也引入了test.js   
test.js就会被打包两次 


#### 第三方代码
比如引入一个swiper.js,我们是希望第三方代码单独打包的   
因为每次修改一点点业务代码的时候，就会导致重新打包（包含第三方代码），打包很慢   
但其实第三方代码并没有修改，所以没必要重新打包，因此把第三方代码和业务代码拆开打包    
第三方代码重新打包的时候就会命中缓存，从而提高打包速度   

#### 代码分割
主要是在prod环境中，optimization配置下添加部分配置   
这部分是生成chunks的一些配置
```
//代码分割
        splitChunks:{
            chunks:'all',
            // initial:入口chunk,对异步引入的js不做处理
            // async:异步chunk,只对异步引入的js处理
            // all：都处理

            //缓存分组
            cacheGroups:{

                vendor:{
                    name:'vendor',
                    priority:1,  //权重 抽离优先级
                    test:/node_modules/,
                    minSize:0,  //大小限制  有些过于小的第三方模块没必要单独打包
                    minChunks:1,  //最少复用几次  打包匹配规则，当复用次数达到这个数量，就单独打包
                },
                common:{
                    name:'common',
                    priority:0, 
                    minSize:0,
                    minChunks:2,
                }
            }
        }
```

使用chunks的配置在common的htmlwebpackplugin中  

### 4、懒加载

在setTimeOut中import需要的js资源即可，返回的是一个promise（是原生支持的语法 ）  
并且这个异步引入的资源，会单独打包成一个chunk。  
### 5、处理JSX（react）
使用babel里的preset-react  
在.babelrc中配置preset-react 

### 6、处理Vue
使用vue-loader

## module、chunk和bundle的区别
module：各源码文件，一切皆模块   
chunk： 多模块的合成，entry里定义chunk，split定义chunk。分析模块间的引用关系，生成的东西（还没整体的输出）。分析依赖过程中，通过入口生成的模块集合。    
bundle：最终输出文件

## 性能优化
### 优化构建打包速度（提高开发体验和效率）
+ 优化babel-loader（用的比较多）
+ IgnorePlugin（避免一些打包）
+ noParse(不去管哪些)
+ happyPack（多进程打包工具）
+ parallelUglifyPlugin(多进程代码压缩)
+ 自动刷新
+ 热更新
+ DllPlugin（第三方库的打包）

#### 优化babel-loader
cacheDirectory 开启缓存，只要ES6代码没变，就不会重新编译  
include、exclude：确定打包的范围
#### IgnorePlugin（避免一些打包）
生产模式可用
#### noParse
生产模式可用
#### happyPack(多进程打包)
生产模式可用
js单线程，所以需要开启多进程打包，提高构件速度。  
在prod环境下，使用happyPlugin进行配置，替代babel（或其他loader）。
```
{
                test:/\.js$/,
                //开启缓存
                use:['happypack/loader?id=babel'],
                include:srcPath,
                exclude:/node_modules/
            },
```
```
//开启多进程打包
        new HappyPack({
            //用id来标识当前happypack是用来处理哪一类文件的
            id:'babel',
            loaders:['babel-loader?cacheDirectory']
        })
```
#### parallelUglifyPlugin(多进程压缩js)
一般生产模式,不用于本地环境
webpack内置uglify压缩js   
parallelUglifyPlugin开启多进程压缩   
在pulgins中进行配置

#### 关于开启多进程
项目较大，打包较慢时，开启多进程能提高性能  
项目较小的时候，打包很快，开启多进程会降低速度（存在进程开销，进程之间还需要通讯）   
按需使用

#### 自动刷新
开发环境
在配置中设置watch为true即会开启自动刷新
webpack-dev-server 也会自动开启

#### 热更新
开发环境
自动刷新是网页全部更新，状态会丢失（表单内容）  
热更新：新代码生效、网页不刷新、状态不丢失
```
// webpack.dev.js
module.exports = {
  devServer: {
    compress: true,
    hot: true // 开启配置
  },
  
  
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
  ],
}
```

#### DllPlugin（第三方库的打包）
不用于生产环境
Dll动态链接库   
react、vue体积较大，构建较慢，但不常更新。所以只需构建一次，不需要每次构建打包。      

DllPlugin   --先把需要优化的对象,比如react去打包成dll文件   
DllReferencePlugin --把dll文件引入

### 优化产出代码（产品性能）
图片base64编码  --小于5kb的图片使用base64产出，减少网络请求   
bundle加hash  --如果代码不变，hash值不变，加载会命中缓存，提高加载速度   
懒加载  --较大的文件可以使用懒加载   
提取公共代码  --第三方和公共代码可以提取出来单独打包   
IgnorePlugin  --打包出来的代码更少一点   
使用cdn加速   --加publicPath，修改所有静态文件的路径为cdn路径。需要把打包的cdn路径资源上传到cdn上，使其可访问。   
使用production  --mode在production会自动开启代码压缩，vue、react会删除一些调试代码，启动tree shaking    
使用scope hoisting --让多个函数合并为一个，减少作用域，执行会更快一点

#### 什么是Tree Shaking
去除无用代码   
但必须用ES6module才能让tree-shaking生效，commonjs不行  


#### ES6 module和commonjs的区别
ES6 module：是静态引入，编译时引用。不能通过代码变量去引用    
commonjs：动态引入，执行时引用   
只有ES6 module才能静态分析，去确定无用代码，所以才能实现tree-shaking    

#### scope hoisting
多个函数合并成一个  
体积更小   
创建函数作用域少    
条件：由于需要分析模块间的依赖关系，所以源码必须是采用了ES6模块化的

## babel
作用：把ES6转化成ES5代码   
使用：安装一些core、polyfill等插件，配置.babelrc文件   
babel其实是一个工具，然后是通过plugin去转一些代码，比如a plugin的转ES5，b plugin等等  
preset：将一些plugin作为预设  

### babel-polyfill
polyfill 补丁  
core-js：polyfill的集合，所有新语法的集合
regenerator：generator（处理异步的函数）的补丁  
babel-polyfill：core-js和regenerator的集合   
babel7.4之后弃用babel-polyfill，推荐直接使用core-js和regenerator      

### babel-polyfill的问题
#### 污染全局环境 
打补丁的过程，会在window，或者原型上重置方法，这样会影响到其他地方的使用。   
如果做第三库，重新定义方法，会影响使用方的代码逻辑

#### babel-runtime  
和polyfill同样的作用，但是在方法名上会定义特别一些，不会重置之前的方法，也就是不会污染全局  

## 面试题 
### 前端会何要进行打包和构建   
+ 体积更小（tree-shaking、压缩、合并），加载更快  
+ 可以使用更高级的语言或语法（ES6，TS，scss），提高开发效率，webpack编译成低级的语法适应兼容浏览器
+ 兼容性和错误检查（polyfill，ESlint，postcss）  

研发流程方面（前端工程化方面）
+ 统一、高效的开发环境 
+ 统一的构建流程和产出标准
+ 集成公司的构建规范

### module 、chunk和bundle的区别  
module就是我们所说的模块，比如js文件，css文件等   
chunks就是模块的集合，构建过程中的中间产物，比如通过splitchunks会分割代码，将不同的模块合并，产生chunks   
bundle就是最后打包的最终产物 


### loader和plugin的区别 
loader：模块转换器，less-css，将匹配的文件转义成相应的格式   
plugin：扩展插件，比如htmlWebpackPlugin

### 常见的loader和plugin
loader：babel-loader，css-loader，style-loader，postcss-loader，sass-loader、url-loader，vue-loader   
plugin：htmlWebpackPlugin、TerserJsPlugin（压缩js）、MiniCssExtractPlugin（抽离css）、OptimizeCssAssetsPlugin（压缩css）、HappyPack、ParallelUglifyPlugin、HotModuleReplacementPlugin









>>>>>>> a9bf69a83ab2c87d5c1b74792a966c7c5b77a584
