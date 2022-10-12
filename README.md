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
修改entry为多入口   
修改output的输出文件名[name]（根据入口的属性 输出相应的出口文件名）  
几个入口文件写相应数量的HtmlWebpackPlugin，chunks中需要配置引入的资源，不写就打包的js会全部引入进去  




