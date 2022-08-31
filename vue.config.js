module.exports = {
    devServer: {
        port: 8080,
        disableHostCheck: true,
        proxy: 'http://localhost:8080'
    }
};