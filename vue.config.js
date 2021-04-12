module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/variables.sass"'
      }
    }
  },
  devServer: { disableHostCheck: true },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'MOORE'
    }
  },
  publicPath: './'
}
