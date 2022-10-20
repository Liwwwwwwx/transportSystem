module.exports = {
  devServer:{
    proxy:{
      '/test':{
        target:'https://api.map.baidu.com',
        changeOrigin:true,
        pathRewrite:{'^/test':''}
      },
      '/api':{
        target:'http://localhost:3000',
        changeOrigin:true,
        pathRewrite:{'^/api':''}
      }
    }
  }
}