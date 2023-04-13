const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    devServer: {
      proxy: {
        '/tasks': {
          target: 'https://employee-atendance-node-production.up.railway.app/',
          timeout: 6000,
        secure: false,
        changeOrigin: true
        },
      },
    },
  },
})