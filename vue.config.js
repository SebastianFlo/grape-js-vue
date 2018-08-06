module.exports = {
    devServer: {
        proxy: {
            '/api': {
                target: 'http://localhost:5000',
                pathRewrite: {'^/api' : ''},
                ws: true,
                changeOrigin: true
            }
        }
    }
}