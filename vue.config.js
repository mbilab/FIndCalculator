module.exports = {
  css: {
    loaderOptions: {
      sass: {
        prependData: '@import "~@/assets/variables.sass"'
      }
    }
  },
  pages: {
    index: {
      entry: 'src/main.js',
      title: 'MOORE'
    }
  },
  publicPath: './'
}
