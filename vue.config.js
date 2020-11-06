module.exports = {
  assetsDir: 'static',
  devServer: {
    host: 'localhost',
    proxy: 'http://localhost:4000/',
  },
}
