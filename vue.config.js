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
      title: 'Moore'
    }
  },
  publicPath: './'
}
