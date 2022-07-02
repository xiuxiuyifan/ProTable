const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devtool: process.env.NODE_ENV === 'production' ? 'false' : 'source-map'
  },
  css: {
    sourceMap: true
  }
})
