const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      scss: {
        additionalData: `@import "@/assets/scss/base.scss";
                         @import "@/assets/scss/variables.scss";
                         @import "@/assets/scss/mixins.scss";
        `
      },
    },
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/partners-lk/'
    : '/'
})
