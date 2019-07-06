
module.exports = {
  outputDir: './dist',
  devServer: {
    host: '0.0.0.0', port: 8081, open: false, overlay: { errors: true, warning: true },
    proxy: {
      '/api': {
        target: 'http://127.0.0.1',
        ws: true,
        changeOrigin: true,
        headers: {
          referer:'http://127.0.0.1',
          host: 'http://127.0.0.1'
        },
        pathRewrite: { '^/api': '' }
      }
    }
  }
}
