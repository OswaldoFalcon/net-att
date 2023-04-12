const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/tasks': {
          target: 'http://localhost:3000',
        },
      },
    },
  },
})